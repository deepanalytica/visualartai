import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { purchases, enrollments, courses } from "@/db/schema"
import { eq } from "drizzle-orm"
import { transbankCommit } from "@/lib/payments/transbank"
import { SITE_URL } from "@/lib/constants"

/**
 * Transbank llama a esta URL vía POST con el resultado del pago.
 * Body (application/x-www-form-urlencoded):
 *   - token_ws: token si el pago fue completado (exitoso o rechazado)
 *   - TBK_TOKEN: token si el usuario canceló o tiempo expiró
 *   - TBK_ORDEN_COMPRA + TBK_ID_SESION: presentes en cancelación (sin token_ws)
 */
async function handleReturn(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tokenWs = formData.get("token_ws") as string | null
    const tbkToken = formData.get("TBK_TOKEN") as string | null

    // Cancelled or timed out (TBK_TOKEN present but no token_ws)
    if (!tokenWs) {
      const reason = tbkToken ? "cancelado" : "token_missing"
      return NextResponse.redirect(`${SITE_URL}/pagos/error?reason=${reason}`, {
        status: 302,
      })
    }

    // Commit the transaction with Transbank
    let commitResponse: Awaited<ReturnType<typeof transbankCommit>>
    try {
      commitResponse = await transbankCommit(tokenWs)
    } catch (err) {
      console.error("[Transbank commit error]", err)
      return NextResponse.redirect(`${SITE_URL}/pagos/error?reason=commit_failed`, {
        status: 302,
      })
    }

    // Find the pending purchase by buy order
    const [purchase] = await db
      .select()
      .from(purchases)
      .where(eq(purchases.providerRef, commitResponse.buyOrder))
      .limit(1)

    if (!purchase) {
      console.error("[Transbank] Purchase not found for buyOrder:", commitResponse.buyOrder)
      return NextResponse.redirect(`${SITE_URL}/pagos/error?reason=purchase_not_found`, {
        status: 302,
      })
    }

    // Idempotency: already processed
    if (purchase.status === "paid") {
      const [course] = await db
        .select({ slug: courses.slug })
        .from(courses)
        .where(eq(courses.id, purchase.courseId!))
        .limit(1)
      return NextResponse.redirect(
        `${SITE_URL}/pagos/exitoso?courseSlug=${course?.slug ?? ""}`,
        { status: 302 },
      )
    }

    // Verify Transbank approved the transaction
    // responseCode === 0 means approved
    if (commitResponse.responseCode !== 0) {
      await db
        .update(purchases)
        .set({
          status: "failed",
          rawEvent: commitResponse as Record<string, unknown>,
          updatedAt: new Date(),
        })
        .where(eq(purchases.id, purchase.id))

      const reason = commitResponse.responseCode === -1 ? "rechazado" : "error_transbank"
      return NextResponse.redirect(`${SITE_URL}/pagos/error?reason=${reason}`, {
        status: 302,
      })
    }

    // ✅ Payment approved — update purchase & create enrollment
    await db
      .update(purchases)
      .set({
        status: "paid",
        rawEvent: commitResponse as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .where(eq(purchases.id, purchase.id))

    if (purchase.courseId) {
      await db
        .insert(enrollments)
        .values({
          userId: purchase.userId,
          courseId: purchase.courseId,
          status: "active",
          grantedAt: new Date(),
        })
        .onConflictDoNothing()
    }

    // Get course slug for the success redirect
    const [course] = await db
      .select({ slug: courses.slug })
      .from(courses)
      .where(eq(courses.id, purchase.courseId!))
      .limit(1)

    return NextResponse.redirect(
      `${SITE_URL}/pagos/exitoso?courseSlug=${course?.slug ?? ""}`,
      { status: 302 },
    )
  } catch (err) {
    console.error("[/api/payments/transbank/return]", err)
    return NextResponse.redirect(`${SITE_URL}/pagos/error?reason=error_interno`, {
      status: 302,
    })
  }
}

// Transbank sends a POST; occasionally a GET on timeout
export const POST = handleReturn
export const GET = handleReturn
