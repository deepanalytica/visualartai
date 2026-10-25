import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

export const runtime = "nodejs"
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  business: z.string().trim().min(2).max(160),
  presence: z.string().trim().min(2).max(250),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  goal: z.string().trim().max(100).optional().default(""),
  consent: z.literal("yes"),
  website: z.string().max(100).optional().default(""),
})

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") || 0)
  if (length > 8000) return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 })
  let payload: unknown
  try { payload = await request.json() } catch { return NextResponse.json({ error: "Datos inválidos" }, { status: 400 }) }
  const parsed = schema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ error: "Revisa los datos del formulario" }, { status: 400 })
  const data = parsed.data
  if (data.website) return NextResponse.json({ ok: true }) // honeypot
  const key = process.env.RESEND_API_KEY
  const recipient = process.env.DIAGNOSTICO_RECIPIENT_EMAIL
  const sender = process.env.RESEND_FROM_EMAIL
  if (!key || !recipient || !sender) {
    console.error("Diagnostico: faltan variables de correo")
    return NextResponse.json({ error: "Servicio temporalmente no disponible" }, { status: 503 })
  }
  const resend = new Resend(key)
  const lines = [
    "Nueva solicitud de diagnóstico 360°", "",
    "Nombre: " + data.name, "Negocio: " + data.business,
    "Presencia: " + data.presence, "Correo: " + data.email,
    "WhatsApp: " + (data.phone || "No indicado"),
    "Objetivo: " + (data.goal || "No indicado"),
    "Consentimiento: sí", "Fecha: " + new Date().toISOString(),
  ]
  try {
    const result = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: data.email,
      subject: "Diagnóstico solicitado · " + data.business.replace(/[\r\n]/g, " "),
      text: lines.join("\n"),
    })
    if (result.error) throw new Error(result.error.message)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Diagnostico: no se pudo entregar notificación", error)
    return NextResponse.json({ error: "No pudimos enviar tu solicitud. Inténtalo más tarde." }, { status: 502 })
  }
}
