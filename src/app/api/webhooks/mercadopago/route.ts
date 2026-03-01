import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { purchases, enrollments, webhookLogs } from "@/db/schema"
import { eq } from "drizzle-orm"
import { verifyMercadoPagoSignature } from "@/lib/payments/mercadopago"

/**
 * MercadoPago IPN webhook.
 * Docs: https://www.mercadopago.com.ar/developers/es/docs/notifications/webhooks
 *
 * Always returns HTTP 200 to avoid retries.
 * Access is authorized via HMAC-SHA256 x-signature header.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}

  try {
    body = await request.json()
  } catch {
    // Malformed body — still return 200
    return NextResponse.json({ ok: true })
  }

  try {
    const xSignature = request.headers.get("x-signature") ?? ""
    const xRequestId = request.headers.get("x-request-id") ?? ""
    const url = new URL(request.url)

    // MP sends the payment ID as ?data.id= query param
    const dataId =
      url.searchParams.get("data.id") ??
      url.searchParams.get("id") ??
      (body?.data as Record<string, unknown>)?.id?.toString() ??
      ""

    // ─── Signature verification ─────────────────────────────────────────────
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    if (secret && xSignature) {
      const isValid = verifyMercadoPagoSignature({
        xRequestId,
        xSignature,
        dataId,
        secret,
      })

      if (!isValid) {
        await db.insert(webhookLogs).values({
          provider: "mercadopago",
          eventType: (body.type as string) ?? "unknown",
          payload: body,
          processed: false,
          error: "Invalid HMAC signature",
        })
        // Return 200 anyway to stop retries; the alert is in logs
        return NextResponse.json({ ok: true })
      }
    }

    // ─── Only handle payment events ──────────────────────────────────────────
    if (body.type !== "payment" || !(body.data as Record<string, unknown>)?.id) {
      await db.insert(webhookLogs).values({
        provider: "mercadopago",
        eventType: (body.type as string) ?? "unknown",
        payload: body,
        processed: true,
      })
      return NextResponse.json({ ok: true })
    }

    const paymentId = ((body.data as Record<string, unknown>).id as string | number).toString()

    // ─── Fetch payment details from MP REST API ───────────────────────────────
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    })

    if (!mpRes.ok) {
      await db.insert(webhookLogs).values({
        provider: "mercadopago",
        eventType: "payment",
        payload: body,
        processed: false,
        error: `MP API error: ${mpRes.status}`,
      })
      return NextResponse.json({ ok: true })
    }

    const payment: Record<string, unknown> = await mpRes.json()

    // external_reference format: "userId:courseId"
    const externalRef = payment.external_reference as string | undefined
    if (!externalRef) {
      await db.insert(webhookLogs).values({
        provider: "mercadopago",
        eventType: "payment",
        payload: { ...body, _payment: payment },
        processed: false,
        error: "Missing external_reference",
      })
      return NextResponse.json({ ok: true })
    }

    const [userId, courseId] = externalRef.split(":")
    if (!userId || !courseId) {
      return NextResponse.json({ ok: true })
    }

    // ─── Idempotency: skip if already processed ───────────────────────────────
    const [existingByPaymentId] = await db
      .select()
      .from(purchases)
      .where(eq(purchases.providerRef, paymentId))
      .limit(1)

    if (existingByPaymentId?.status === "paid") {
      await db.insert(webhookLogs).values({
        provider: "mercadopago",
        eventType: "payment",
        payload: { ...body, _payment: payment },
        processed: true,
      })
      return NextResponse.json({ ok: true })
    }

    const paymentStatus = payment.status as string

    if (paymentStatus === "approved") {
      const amount = Math.round((payment.transaction_amount as number) ?? 0)
      const currency = (payment.currency_id as string) ?? "CLP"
      const description = (payment.description as string) ?? ""

      if (existingByPaymentId) {
        // Update existing pending purchase
        await db
          .update(purchases)
          .set({
            status: "paid",
            providerRef: paymentId,
            rawEvent: payment,
            updatedAt: new Date(),
          })
          .where(eq(purchases.id, existingByPaymentId.id))
      } else {
        // Find by preference_id (providerRef set at creation time)
        const prefId = payment.preference_id as string | undefined
        const [byPref] = prefId
          ? await db
              .select()
              .from(purchases)
              .where(eq(purchases.providerRef, prefId))
              .limit(1)
          : [undefined]

        if (byPref) {
          await db
            .update(purchases)
            .set({
              status: "paid",
              providerRef: paymentId,
              rawEvent: payment,
              updatedAt: new Date(),
            })
            .where(eq(purchases.id, byPref.id))
        } else {
          // Fallback: insert new paid purchase record
          await db.insert(purchases).values({
            userId,
            courseId,
            provider: "mercadopago",
            providerRef: paymentId,
            amount,
            currency,
            status: "paid",
            description,
            rawEvent: payment,
          })
        }
      }

      // Create enrollment (idempotent)
      await db
        .insert(enrollments)
        .values({
          userId,
          courseId,
          status: "active",
          grantedAt: new Date(),
        })
        .onConflictDoNothing()
    } else if (paymentStatus === "rejected" || paymentStatus === "cancelled") {
      const target = existingByPaymentId
      if (target) {
        await db
          .update(purchases)
          .set({ status: "failed", rawEvent: payment, updatedAt: new Date() })
          .where(eq(purchases.id, target.id))
      }
    }

    await db.insert(webhookLogs).values({
      provider: "mercadopago",
      eventType: "payment",
      payload: { ...body, _payment: payment, _status: paymentStatus },
      processed: true,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/webhooks/mercadopago]", err)
    // Log the error but always return 200
    try {
      await db.insert(webhookLogs).values({
        provider: "mercadopago",
        eventType: "error",
        payload: body,
        processed: false,
        error: err instanceof Error ? err.message : String(err),
      })
    } catch {
      // Silent fail
    }
    return NextResponse.json({ ok: true })
  }
}
