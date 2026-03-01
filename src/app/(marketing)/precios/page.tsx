import type { Metadata } from "next"
import { PricingTiers } from "@/components/marketing/PricingTiers"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME } from "@/lib/constants"
import { CheckCircle2, X, ArrowRight, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Precios y Planes",
  description:
    "El ROI más rápido de tu carrera. Sistemas IA para creadores y agencias sin suscripciones eternas.",
  openGraph: {
    title: `Inversión — ${SITE_NAME}`,
    description: "Invierte hoy, recupera tu tiempo y dinero mañana.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const comparativa = [
  {
    feature: "Acceso a plataforma de lecciones (De por vida)",
    individual: true,
    grupal: true,
    personal: true,
  },
  {
    feature: "Bóveda de prompts y plantillas avanzadas",
    individual: true,
    grupal: true,
    personal: true,
  },
  {
    feature: "Comunidad de dudas y networking",
    individual: true,
    grupal: true,
    personal: true,
  },
  {
    feature: "Actualizaciones gratuitas del sistema",
    individual: true,
    grupal: true,
    personal: true,
  },
  {
    feature: "Sesiones grupales intensivas en vivo",
    individual: false,
    grupal: true,
    personal: true,
  },
  {
    feature: "Feedback directo sobre tus propios prompts",
    individual: false,
    grupal: true,
    personal: true,
  },
  {
    feature: "Construcción del sistema 1 a 1 contigo",
    individual: false,
    grupal: false,
    personal: true,
  },
  {
    feature: "Onboarding estratégico para tu equipo",
    individual: false,
    grupal: false,
    personal: true,
  },
  {
    feature: "Reuniones de KPIs y seguimiento de adopción",
    individual: false,
    grupal: false,
    personal: true,
  },
]

const faq = [
  {
    q: "¿Tengo que seguir pagando mes a mes?",
    a: "Absolutamente no. Estamos en contra del modelo de suscripción eterna para educación. Haces un solo pago y el sistema, junto con todas sus futuras actualizaciones, es tuyo para siempre.",
  },
  {
    q: "¿Esto es 'solo otro curso más' sobre ChatGPT?",
    a: "No. Si quieres aprender a pedirle recetas a ChatGPT, usa YouTube. Esto es la instalación de sistemas de producción, metodologías de delegación y workflows que usamos en la agencia para manejar decenas de clientes y desarrollar pensamiento crítico.",
  },
  {
    q: "¿Qué pasa si las herramientas de IA (Claude, GPT) cambian?",
    a: "Nosotros actualizamos los mega-prompts y el material. Como alumno, tienes acceso permanente a la bóveda actualizada sin pagar de nuevo por la v2 o v3.",
  },
  {
    q: "No soy técnico, ¿esto es para mí?",
    a: "Nuestros sistemas están pensados para creativos, directores de cuenta y fundadores. Trabajamos bajo el enfoque 'No-Code'. Si sabes copiar, pegar, y tienes la curiosidad para pensar estratégicamente, tienes lo necesario.",
  },
  {
    q: "¿Ofrecen factura para empresas?",
    a: "Sí, emitimos facturas comerciales sin problema. Para compras en volumen para equipos corporativos, sugerimos contactarnos primero.",
  },
  {
    q: "¿Hay garantía si el contenido no es lo que esperaba?",
    a: "Sí. Ofrecemos 7 días de garantía incondicional en los cursos individuales. Si entras, lo ves y no te aporta valor real a tu negocio, te devolvemos el 100% de tu dinero.",
  },
]

export default function PreciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[300px] bg-[var(--neon-cyan)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] font-semibold shadow-inner">
              <TrendingUp className="size-4" />
              <span>10x tu capacidad. 1 solo pago.</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight tracking-tight">
              Ahorrarás <span className="text-gradient-cyan">más en tiempo</span> de lo que invertirás aquí
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              La IA avanza a diario. Quedarte atrás y seguir haciendo el trabajo manual te cuesta más dinero cada semana que pasa. No caigas en la obsolescencia: elige tu plan y comienza la actualización de tus capacidades creativas y lógicas hoy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.3}>
            <PricingTiers />
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="magenta" className="mt-12" />
      </ScrollReveal>

      {/* Tabla comparativa */}
      <section className="py-24 bg-[var(--bg-elevated)] relative">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--neon-magenta)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
                Diseccionando la Oferta
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">Transparencia absoluta sobre dónde irá tu inversión para catapultarte sobre la competencia.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] shadow-2xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <th className="text-left py-6 px-6 text-[var(--text-primary)] font-semibold">
                      Desglose de funcionalidades
                    </th>
                    <th className="py-6 px-4 text-center text-[1.05rem] font-bold text-[var(--text-secondary)]">
                      Curso Autónomo
                    </th>
                    <th className="py-6 px-4 text-center text-[1.05rem] font-bold text-[var(--neon-cyan)] relative">
                      {/* Glow background for highlight header */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-cyan-dim)] to-transparent opacity-50 pointer-events-none" />
                      <span className="relative z-10">Mentoría VIP</span>
                    </th>
                    <th className="py-6 px-4 text-center text-[1.05rem] font-bold text-[var(--text-secondary)]">
                      Soporte B2B
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparativa.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-surface)]`}
                    >
                      <td className="py-5 px-6 text-[1.05rem] text-[var(--text-secondary)] font-medium">{row.feature}</td>
                      <td className="py-5 px-4 text-center">
                        {row.individual ? (
                          <CheckCircle2 className="size-5 text-[var(--neon-cyan)] mx-auto" />
                        ) : (
                          <X className="size-5 text-[var(--text-muted)] opacity-50 mx-auto" />
                        )}
                      </td>
                      <td className="py-5 px-4 text-center bg-[var(--neon-cyan-dim)]/10">
                        {row.grupal ? (
                          <CheckCircle2 className="size-5 text-[var(--neon-cyan)] mx-auto drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                        ) : (
                          <X className="size-5 text-[var(--text-muted)] opacity-50 mx-auto" />
                        )}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {row.personal ? (
                          <CheckCircle2 className="size-5 text-[var(--text-primary)] mx-auto" />
                        ) : (
                          <X className="size-5 text-[var(--text-muted)] opacity-50 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="violet" />
      </ScrollReveal>

      {/* FAQ */}
      <section className="py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Respuestas directas. Cero fricción.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((item, i) => (
              <ScrollReveal key={item.q} delay={0.1 + (i * 0.1)}>
                <NeonCard glow="none" hoverable className="p-8 h-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <h3 className="font-semibold text-[1.1rem] text-[var(--text-primary)] mb-4 leading-snug">{item.q}</h3>
                  <p className="text-[var(--text-secondary)] text-[1.05rem] leading-relaxed">{item.a}</p>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-16 p-8 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)]">
              <p className="text-[var(--text-secondary)] text-lg mb-6">
                ¿Aún tienes dudas sobre cuál es el camino óptimo para expandir tu creatividad sin quedar fuera del mercado?
              </p>
              <NeonButton href="/contacto" variant="neon" size="lg">
                Hablar con un estratega <ArrowRight className="size-5 ml-2" />
              </NeonButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
