import type { Metadata } from "next"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { SITE_NAME, CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants"
import { Mail, MessageCircle, ArrowRight, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por email o WhatsApp. Respondemos en menos de 24 horas.",
  openGraph: {
    title: `Contacto — ${SITE_NAME}`,
    description: "Escríbenos. Respondemos en menos de 24 horas.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const motivos = [
  "Quiero información sobre los cursos",
  "Me interesa una mentoría",
  "Busco soluciones para mi empresa",
  "Tengo una pregunta sobre pagos",
  "Quiero acceder a recursos gratuitos",
  "Otro motivo",
]

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <NeonBadge variant="cyan" className="mb-6">
            Contacto
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Escríbenos por el canal que prefieras. Respondemos en menos de 24 horas.
          </p>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Canales rápidos */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <NeonCard glow="cyan" hoverable className="p-8 text-center">
              <div className="size-14 mx-auto rounded-xl bg-[var(--neon-cyan-dim)] flex items-center justify-center mb-5">
                <MessageCircle className="size-7 text-[var(--neon-cyan)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                WhatsApp
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Para consultas rápidas. Respondemos en horario laboral.
              </p>
              <NeonButton
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Visual%20Art%20AI`}
                variant="neon"
                className="w-full"
              >
                Escribir por WhatsApp
              </NeonButton>
            </NeonCard>

            <NeonCard glow="magenta" hoverable className="p-8 text-center">
              <div className="size-14 mx-auto rounded-xl bg-[var(--neon-magenta-dim)] flex items-center justify-center mb-5">
                <Mail className="size-7 text-[var(--neon-magenta)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
                Email
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-2">
                Para consultas detalladas o proyectos empresariales.
              </p>
              <p className="text-sm text-[var(--neon-cyan)] mb-6">{CONTACT_EMAIL}</p>
              <NeonButton
                href={`mailto:${CONTACT_EMAIL}`}
                variant="ghost-neon"
                className="w-full"
              >
                Enviar email
              </NeonButton>
            </NeonCard>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] justify-center mb-12">
            <Clock className="size-4" />
            Tiempo de respuesta promedio: menos de 4 horas en horario hábil
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      {/* Formulario */}
      <section className="py-16 bg-[var(--bg-elevated)]">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
              O escríbenos aquí
            </h2>
            <p className="text-[var(--text-muted)] text-sm">
              Completa el formulario y te contactamos a la brevedad.
            </p>
          </div>

          <NeonCard glow="none" className="p-8">
            <form action={`mailto:${CONTACT_EMAIL}`} method="GET" className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Motivo
                </label>
                <select
                  name="motivo"
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                >
                  {motivos.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm resize-none"
                />
              </div>

              <NeonButton type="submit" variant="neon" className="w-full">
                Enviar mensaje <ArrowRight className="size-4" />
              </NeonButton>
            </form>
          </NeonCard>
        </div>
      </section>
    </>
  )
}
