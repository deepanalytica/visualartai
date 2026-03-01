import type { Metadata } from "next"
import Link from "next/link"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import {
  Video,
  Users,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Mentorías — Visual Art AI",
  robots: { index: false, follow: false },
}

const mentoriasOpciones = [
  {
    id: "grupal",
    nombre: "Mentoría Grupal",
    descripcion: "Sesiones semanales en vivo con el instructor y otros alumnos. Preguntas, feedback en directo y comunidad.",
    frecuencia: "Cada martes 18:00 (Chile)",
    duracion: "60 minutos",
    formato: "Video en vivo (Zoom/Meet)",
    capacidad: "Máx. 20 personas",
    incluye: [
      "Acceso a sesiones en vivo semanales",
      "Grabaciones disponibles 48h después",
      "Canal privado en comunidad",
      "Preguntas respondidas en sesión",
    ],
    badge: "Incluida con curso",
    badgeVariant: "cyan" as const,
    precio: null,
    cta: null,
    ctaHref: null,
  },
  {
    id: "privada",
    nombre: "Mentoría 1:1",
    descripcion: "Sesión privada de 45 minutos para trabajar en tu caso específico. Feedback personalizado, revisión de tu flujo de trabajo y plan de acción.",
    frecuencia: "A tu disponibilidad",
    duracion: "45 minutos",
    formato: "Video privado (Zoom)",
    capacidad: "Solo contigo",
    incluye: [
      "Revisión de tu caso particular",
      "Feedback directo sobre tu trabajo",
      "Plan de acción personalizado",
      "Grabación de la sesión",
      "Follow-up por escrito post-sesión",
    ],
    badge: "Cupos limitados",
    badgeVariant: "amber" as const,
    precio: "79.000 CLP",
    cta: "Reservar sesión",
    ctaHref: "/contacto?tipo=mentoria-privada",
  },
]

const preguntasFrecuentes = [
  {
    pregunta: "¿Las mentorías grupales son solo para alumnos del curso?",
    respuesta:
      "Sí, las sesiones grupales semanales son un beneficio exclusivo para quienes tienen acceso a los cursos de Visual Art AI. Las mentorías 1:1 están abiertas a todos.",
  },
  {
    pregunta: "¿Qué pasa si no puedo asistir a la sesión grupal?",
    respuesta:
      "No hay problema. Las grabaciones quedan disponibles en tu área de alumno dentro de las 48 horas posteriores a cada sesión.",
  },
  {
    pregunta: "¿Cómo funciona la reserva de mentorías 1:1?",
    respuesta:
      "Completa el formulario de contacto indicando tu disponibilidad y qué quieres trabajar. Coordinamos fecha y hora, y recibirás el link de pago y el enlace de reunión.",
  },
  {
    pregunta: "¿Puedo preparar preguntas antes de la sesión grupal?",
    respuesta:
      "Sí, y es recomendable. Hay un canal en la comunidad donde puedes publicar tus preguntas con anticipación para que el instructor las pueda preparar.",
  },
]

export default function MentoriasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <NeonBadge variant="cyan">Mentorías</NeonBadge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Aprende más rápido con guía directa
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Las mentorías complementan los cursos con sesiones en vivo donde puedes preguntar,
            compartir tu pantalla y recibir feedback en tiempo real.
          </p>
        </div>
      </section>

      {/* Opciones */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {mentoriasOpciones.map((opcion) => (
            <NeonCard
              key={opcion.id}
              glow={opcion.id === "privada" ? "magenta" : "cyan"}
              className="p-7 flex flex-col gap-5"
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {opcion.nombre}
                  </h2>
                  <NeonBadge variant={opcion.badgeVariant} size="sm">
                    {opcion.badge}
                  </NeonBadge>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {opcion.descripcion}
                </p>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 shrink-0 text-[var(--neon-cyan)]" />
                  {opcion.frecuencia}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 shrink-0 text-[var(--neon-cyan)]" />
                  {opcion.duracion}
                </div>
                <div className="flex items-center gap-2">
                  <Video className="size-3.5 shrink-0 text-[var(--neon-cyan)]" />
                  {opcion.formato}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-3.5 shrink-0 text-[var(--neon-cyan)]" />
                  {opcion.capacidad}
                </div>
              </div>

              {/* Incluye */}
              <div className="bg-[var(--bg-elevated)] rounded-[var(--radius-md)] p-4 space-y-2">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Incluye
                </p>
                <ul className="space-y-1.5">
                  {opcion.incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle2 className="size-3.5 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                {opcion.precio && (
                  <p className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {opcion.precio}
                    <span className="text-sm font-normal text-[var(--text-muted)] ml-1">por sesión</span>
                  </p>
                )}
                {opcion.cta && opcion.ctaHref ? (
                  <NeonButton href={opcion.ctaHref} variant="neon" className="w-full">
                    {opcion.cta} <ArrowRight className="size-4" />
                  </NeonButton>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] bg-[var(--bg-elevated)] rounded-[var(--radius-md)] px-4 py-3">
                    <CheckCircle2 className="size-4 text-[var(--neon-cyan)] shrink-0" />
                    Acceso automático con tu curso activo
                  </div>
                )}
              </div>
            </NeonCard>
          ))}
        </div>
      </section>

      {/* Próxima sesión grupal */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <NeonCard glow="none" className="p-6 border-[var(--neon-cyan)]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-[var(--radius-md)] bg-[var(--neon-cyan-dim)] flex items-center justify-center shrink-0">
                  <MessageSquare className="size-6 text-[var(--neon-cyan)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">
                    Próxima sesión grupal
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Martes · 18:00 hrs (Chile) · Zoom
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    El link de acceso se comparte en la comunidad privada
                  </p>
                </div>
              </div>
              <NeonButton
                href="https://discord.gg/"
                variant="ghost-neon"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir a la comunidad <ExternalLink className="size-3.5" />
              </NeonButton>
            </div>
          </NeonCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
            Preguntas frecuentes
          </h2>

          <div className="flex flex-col gap-3">
            {preguntasFrecuentes.map((item, i) => (
              <details
                key={i}
                className="group border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--bg-elevated)] overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[var(--bg-overlay)] transition-colors">
                  <span className="font-medium text-sm text-[var(--text-primary)] pr-4">
                    {item.pregunta}
                  </span>
                  <span className="text-[var(--neon-cyan)] shrink-0 group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 border-t border-[var(--border-subtle)]">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-4">
                    {item.respuesta}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center space-y-3">
            <p className="text-sm text-[var(--text-muted)]">
              ¿Tienes otra pregunta?
            </p>
            <NeonButton href="/contacto" variant="ghost-neon">
              Contactar al equipo <ArrowRight className="size-4" />
            </NeonButton>
          </div>
        </div>
      </section>
    </div>
  )
}
