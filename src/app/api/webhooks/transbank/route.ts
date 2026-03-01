import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { webhookLogs } from "@/db/schema"

/**
 * Transbank additional notification webhook (optional).
 * Transbank puede enviar notificaciones adicionales a esta URL.
 * El flujo principal de confirmación ocurre en /api/payments/transbank/return.
 *
 * Esta ruta simplemente registra los eventos recibidos.
 */
export async function POST(request: NextRequest) {
  try {
    let payload: unknown = {}
    const contentType = request.headers.get("content-type") ?? ""

    if (contentType.includes("application/json")) {
      payload = await request.json()
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData()
      payload = Object.fromEntries(formData.entries())
    } else {
      payload = { raw: await request.text() }
    }

    await db.insert(webhookLogs).values({
      provider: "transbank",
      eventType: "notification",
      payload: payload as Record<string, unknown>,
      processed: true,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/webhooks/transbank]", err)
    return NextResponse.json({ ok: true })
  }
}
