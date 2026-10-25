"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

export function DiagnosticoForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle")
  const [error, setError] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending"); setError("")
    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      if (!response.ok) throw new Error("No pudimos registrar la solicitud. Inténtalo nuevamente.")
      setStatus("success")
      form.reset()
    } catch (err) { setError(err instanceof Error ? err.message : "Error de conexión"); setStatus("error") }
  }
  const field = "mt-2 w-full rounded-xl border border-[#d7e1ee] bg-[#fbfcff] px-4 py-3.5 text-sm text-[#14233e] outline-none transition focus:border-[#2866ec] focus:ring-2 focus:ring-[#2866ec]/15"
  if (status === "success") return <div role="status" className="mt-8 rounded-2xl bg-[#eff7f2] p-6 text-[#1c6640]"><strong className="block text-lg">Solicitud recibida.</strong><p className="mt-2 text-sm">Gracias por confiar en Visual Art AI. Te contactaremos para coordinar la revisión.</p></div>
  return <form onSubmit={submit} className="mt-7 space-y-4">
    <div><label htmlFor="diag-name" className="text-sm font-semibold">Tu nombre *</label><input id="diag-name" name="name" required maxLength={120} autoComplete="name" className={field} placeholder="¿Cómo te llamas?"/></div>
    <div><label htmlFor="diag-business" className="text-sm font-semibold">Nombre del negocio *</label><input id="diag-business" name="business" required maxLength={160} className={field} placeholder="Ej. Clínica Los Robles"/></div>
    <div><label htmlFor="diag-presence" className="text-sm font-semibold">Web o Instagram del negocio *</label><input id="diag-presence" name="presence" required maxLength={250} className={field} placeholder="https://... o @minegocio"/></div>
    <div><label htmlFor="diag-email" className="text-sm font-semibold">Correo de contacto *</label><input id="diag-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} placeholder="nombre@negocio.cl"/></div>
    <div><label htmlFor="diag-phone" className="text-sm font-semibold">WhatsApp (opcional)</label><input id="diag-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={field} placeholder="+56 9 ..."/></div>
    <div><label htmlFor="diag-goal" className="text-sm font-semibold">¿Qué te gustaría mejorar?</label><select id="diag-goal" name="goal" className={field} defaultValue=""><option value="">Selecciona una opción</option><option>Que encuentren mi negocio</option><option>Recibir más consultas</option><option>Mejorar mi sitio web</option><option>Publicidad y redes sociales</option><option>No estoy seguro</option></select></div>
    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true"/>
    <label className="flex items-start gap-3 text-xs leading-relaxed text-[#62738c]"><input type="checkbox" name="consent" value="yes" required className="mt-1 accent-[#2866ec]"/><span>Acepto que Visual Art AI utilice estos datos para contactarme y responder a mi solicitud de diagnóstico. *</span></label>
    {status === "error" && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button type="submit" disabled={status === "sending"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2866ec] px-5 py-4 font-semibold text-white transition hover:bg-[#174fc7] disabled:opacity-60">{status === "sending" ? <><Loader2 className="h-5 w-5 animate-spin"/> Enviando...</> : <>Solicitar diagnóstico gratuito <ArrowRight className="h-5 w-5"/></>}</button>
    <p className="text-center text-xs text-[#74839a]">Sin costo y sin obligación de contratar.</p>
  </form>
}
