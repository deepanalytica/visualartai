import type { Metadata } from "next"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { SITE_NAME, WHATSAPP_NUMBER } from "@/lib/constants"
import { Users, UserCheck, CheckCircle2, ArrowRight, Calendar, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Mentorías IA",
  description:
    "Mentoría grupal y personalizada con IA. Sesiones en vivo, casos reales y feedback directo.",
  openGraph: {
    title: `Mentorías IA — ${SITE_NAME}`,
    description: "Aprende con guía directa. Grupos reducidos o sesiones 1:1.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const modalidades = [
  {
    icono: <Users className="size-10 text-[var(--neon-cyan)]" />,
    titulo: "Mentoría Grupal",
    subtitulo: "La forma más eficiente de aprender con guía",
    precio: "$299.000 CLP",
    formato: "Grupos de máx. 8 personas",
    glow: "cyan" as const,
    incluye: [
      "8 sesiones en vivo (2 por semana × 4 semanas)",
      "Grabaciones de todas las sesiones",
      "Casos reales de cada participante",
      "Acceso a todos los cursos de la Academia",
      "Canal privado del grupo",
      "Recursos y plantillas exclusivos",
      "Certificado de participación",
    ],
    para: [
      "Creadores de contenido independientes",
      "Community managers",
      "Fundadores de startups",
      "Marketers que quieren escalar con IA",
    ],
    destacado: true,
  },
  {
    icono: <UserCheck className="size-10 text-[var(--neon-magenta)]" />,
    titulo: "Mentoría 1:1",
    subtitulo: "Programa personalizado para tu caso específico",
    precio: "A consultar",
    formato: "Sesiones individuales",
    glow: "magenta" as const,
    incluye: [
      "Diagnóstico de tu situación actual",
      "Plan de implementación a medida",
      "4 sesiones 1:1 (1h c/u)",
      "Revisión de tu trabajo entre sesiones",
      "Acceso a todos los cursos de la Academia",
      "Soporte por WhatsApp entre sesiones",
      "Prompts y sistemas personalizados para tu industria",
    ],
    para: [
      "Ejecutivos y consultores",
      "Agencias que quieren implementar IA",
      "Creadores con proyectos avanzados",
      "Equipos que necesitan implementación guiada",
    ],
    destacado: false,
  },
]

const preguntas = [
  {
    q: "¿Cuándo son las sesiones grupales?",
    a: "Los grupos se forman cuando hay al menos 4 participantes confirmados. Te avisamos con 1 semana de anticipación sobre las fechas. Los horarios son vespertinos (18:00–20:00 CLT) para facilitar la asistencia.",
  },
  {
    q: "¿Qué pasa si no puedo asistir a una sesión?",
    a: "Todas las sesiones quedan grabadas y disponibles en tu área de alumno dentro de las 24 horas siguientes.",
  },
  {
    q: "¿Cómo funciona la mentoría 1:1?",
    a: "Empieza con un diagnóstico de 30 minutos (sin costo) para entender tu situación. Después te enviamos una propuesta personalizada con el plan y precio.",
  },
  {
    q: "¿La mentoría incluye acceso a los cursos?",
    a: "Sí. Ambas modalidades incluyen acceso completo a todos los cursos de la Academia.",
  },
]

export default function MentoriasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <NeonBadge variant="magenta" className="mb-6">
            Mentorías
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 max-w-2xl leading-tight">
            Aprende con guía{" "}
            <span className="text-gradient-magenta">directa y personalizada</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mb-10">
            Casos reales, feedback inmediato y un plan que se adapta a tu situación específica.
            No otro curso genérico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NeonButton href="#modalidades" variant="neon" size="lg">
              Ver modalidades <ArrowRight className="size-4" />
            </NeonButton>
            <NeonButton
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="ghost-neon"
              size="lg"
            >
              <MessageCircle className="size-4" /> Consultar por WhatsApp
            </NeonButton>
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      {/* Modalidades */}
      <section id="modalidades" className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {modalidades.map((m) => (
              <NeonCard key={m.titulo} glow={m.glow} className={`p-8 ${m.destacado ? "ring-1 ring-[var(--neon-cyan)]" : ""}`}>
                {m.destacado && (
                  <div className="inline-block px-3 py-1 bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] text-xs font-semibold rounded-full border border-[var(--border-accent)] mb-4">
                    Más popular
                  </div>
                )}
                <div className="mb-4">{m.icono}</div>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {m.titulo}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">{m.subtitulo}</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-3xl font-bold text-[var(--text-primary)]">
                    {m.precio}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-6 flex items-center gap-1">
                  <Calendar className="size-3" /> {m.formato}
                </p>

                <NeonButton
                  href={m.titulo.includes("1:1") ? "/contacto" : `/checkout?mentoria=grupal`}
                  variant={m.destacado ? "neon" : "ghost-neon"}
                  className="w-full mb-6"
                >
                  {m.titulo.includes("1:1") ? "Solicitar diagnóstico gratuito" : "Reservar lugar"}
                  <ArrowRight className="size-4" />
                </NeonButton>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      Incluye
                    </p>
                    <ul className="flex flex-col gap-2">
                      {m.incluye.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="size-4 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                      Ideal para
                    </p>
                    <ul className="flex flex-col gap-1">
                      {m.para.map((item) => (
                        <li key={item} className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[var(--neon-magenta)] inline-block shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      {/* FAQ */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-10 text-center">
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {preguntas.map((item) => (
              <NeonCard key={item.q} glow="none" className="p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.q}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
              </NeonCard>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-[var(--text-muted)] mb-4 text-sm">¿Tienes otra pregunta?</p>
            <NeonButton
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              variant="ghost-neon"
            >
              <MessageCircle className="size-4" /> Escribirnos por WhatsApp
            </NeonButton>
          </div>
        </div>
      </section>
    </>
  )
}
