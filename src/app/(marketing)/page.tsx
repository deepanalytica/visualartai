import type { Metadata } from "next"
import Link from "next/link"
import { HeroShowcase } from "@/components/marketing/HeroShowcase"
import { StatsBar } from "@/components/marketing/StatsBar"
import { TechMarquee } from "@/components/marketing/TechMarquee"
import { RouteTabs } from "@/components/marketing/RouteTabs"
import { PricingTiers } from "@/components/marketing/PricingTiers"
import { CTABanner } from "@/components/marketing/CTABanner"
import { BentoGrid } from "@/components/brand/BentoGrid"
import { NeonCard } from "@/components/brand/NeonCard"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { CyberpunkGrid } from "@/components/brand/CyberpunkGrid"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"
import {
  Zap,
  BrainCircuit,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react"

export const metadata: Metadata = {
  title: `${SITE_NAME} — Crea contenido profesional con IA`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Crea contenido profesional con IA`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Crea contenido profesional con IA`,
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
}

const proof = [
  {
    icon: <BrainCircuit className="size-6 text-[var(--neon-cyan)]" />,
    title: "Desarrollo Pensamiento Crítico",
    description: "Apretar botones lo hace cualquiera. Aprende a operar la IA para conectar, pensar fuera de la caja y construir flujos estratégicos que las empresas ruegan tener.",
    size: "wide" as const,
  },
  {
    icon: <Zap className="size-6 text-[var(--neon-magenta)]" />,
    title: "No te quedes rezagado",
    description: "La IA avanza cada día. La demanda exige innovación. Ignorarlo es la decisión más cara que tomarás.",
    size: "normal" as const,
  },
  {
    icon: <TrendingUp className="size-6 text-[var(--neon-violet)]" />,
    title: "Ofertas irresistibles",
    description: "Accede a prompts de copywriting avanzado para escribir directo al dolor de clientes, transformando tu comunicación base en cierres efectivos.",
    size: "normal" as const,
  },
  {
    icon: <Users className="size-6 text-[var(--neon-cyan)]" />,
    title: "Expande tus límites",
    description: "Desde automatizar tareas administrativas (clonación digital) hasta crear Ep's completos de música comercial con IA. Supera el bloqueo creativo con workflows claros y definidos.",
    size: "wide" as const,
  },
]

const testimonios = [
  {
    name: "Camila R.",
    role: "Creadora de contenido",
    quote:
      "Pasé de tardar 3 días en producir una semana de contenido a hacerlo en una tarde. Los sistemas que aprendí en el curso son parte de mi rutina diaria hoy. Nunca más he vuelto a la 'hoja en blanco'.",
    rating: 5,
  },
  {
    name: "Felipe M.",
    role: "Fundador de agencia",
    quote:
      "Implementamos los flujos IA en el equipo y triplicamos nuestra capacidad de producción semanal sin contratar a un solo copywriter más. Todo el ROI se justificó en la primera semana.",
    rating: 5,
  },
  {
    name: "Valentina S.",
    role: "Consultora de marketing",
    quote:
      "Esperaba otro curso genérico de ChatGPT. En cambio, recibí un sistema blindado y ultra profesional con prompts específicos y probados en industria.",
    rating: 5,
  },
]

const features = [
  "Acceso de por vida al contenido y metodologías",
  "Actualizaciones incluidas (v1 → v2 → v3 asegurado)",
  "Librería de prompts y plantillas avanzadas",
  "Comunidad privada de creadores élite",
  "Soporte directo para dudas técnicas",
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroShowcase />

      {/* Stats */}
      <ScrollReveal>
        <StatsBar />
      </ScrollReveal>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Route Tabs */}
      <section className="py-20 relative overflow-hidden">
        <CyberpunkGrid className="opacity-20" />
        <div className="container max-w-6xl mx-auto px-4 relative">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-12">
              <NeonBadge variant="magenta" className="mb-4">
                3 rutas especializadas
              </NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Tu atajo hacia la maestría IA
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
                No pierdas tiempo con teorías irrelevantes. Desbloquea creatividad ilimitada, mejora tu pensamiento crítico y no dejes que el mundo avance sin ti.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <RouteTabs />
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="magenta" />
      </ScrollReveal>

      {/* Proof / Bento */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-16">
              <NeonBadge variant="cyan" className="mb-4">
                Por qué Visual Art AI es diferente
              </NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Habilidades Humanas. <br className="hidden md:block" /> Apalancamiento IA.
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
                El mundo cambió. Dominar IA es el mínimo esperado. Aquí te enseñamos workflows definidos para expandir tu creatividad, dominar el storytelling y desarrollar el pensamiento crítico que necesitas para ser absolutamente irremplazable.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <BentoGrid
              items={proof.map((p, i) => ({
                id: `proof-${i}`,
                className: p.size === "wide" ? "md:col-span-2" : "",
                children: (
                  <NeonCard glow="cyan" hoverable className="p-8 h-full flex flex-col justify-center">
                    <div className="mb-6 size-12 rounded-xl bg-[var(--neon-cyan-dim)] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.15)]">
                      {p.icon}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-[1.05rem]">
                      {p.description}
                    </p>
                  </NeonCard>
                )
              }))}
            />
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="cyan" />
      </ScrollReveal>

      {/* Dolor con datos — sección de validación editorial */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-magenta)]/[0.02] to-transparent pointer-events-none" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-14">
              <NeonBadge variant="magenta" className="mb-4">
                Lo que dicen las investigaciones
              </NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-5 leading-tight">
                El problema no es la IA.{" "}
                <span className="text-gradient-magenta">Es cómo la estás usando.</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
                Datos duros de 2026 que explican por qué tantos equipos trabajan <em>más</em> desde que adoptaron IA —
                y cómo salir de ese bucle.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <NeonCard glow="magenta" hoverable className="p-8 flex flex-col gap-4">
                <div className="font-display text-5xl font-bold text-[var(--neon-magenta)] leading-none">↑ carga</div>
                <p className="text-[var(--text-primary)] font-semibold leading-snug">
                  La IA no reduce el trabajo. Lo intensifica.
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                  Los empleados trabajan más rápido, asumen más tareas y amplían su jornada —{" "}
                  <strong className="text-[var(--text-primary)]">a menudo sin que nadie se los pida</strong>. El
                  aumento inicial de productividad da paso a fatiga cognitiva y agotamiento.
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-70 border-t border-[var(--border-subtle)] pt-3">
                  Harvard Business Review · Feb 2026
                </p>
              </NeonCard>

              <NeonCard glow="cyan" hoverable className="p-8 flex flex-col gap-4">
                <div className="font-display text-5xl font-bold text-[var(--neon-cyan)] leading-none">3x</div>
                <p className="text-[var(--text-primary)] font-semibold leading-snug">
                  Más resultados cuando los líderes modelan el uso de IA.
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                  Las organizaciones con líderes que <strong className="text-[var(--text-primary)]">usan IA ellos
                    mismos</strong> son 3 veces más propensas a lograr resultados reales. No basta con aprobar el presupuesto.
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-70 border-t border-[var(--border-subtle)] pt-3">
                  McKinsey · vía Infobae · Feb 2026
                </p>
              </NeonCard>

              <NeonCard glow="violet" hoverable className="p-8 flex flex-col gap-4">
                <div className="font-display text-5xl font-bold text-[var(--neon-violet)] leading-none">62%</div>
                <p className="text-[var(--text-primary)] font-semibold leading-snug">
                  De empresas en Chile no puede cubrir vacantes de talento tech.
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                  El sector TI registra un <strong className="text-[var(--text-primary)]">83% de escasez</strong>.
                  Saber usar IA con método ya no es un diferencial — es el requisito mínimo para no quedar fuera.
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-70 border-t border-[var(--border-subtle)] pt-3">
                  ManpowerGroup · Emol · Feb 2026
                </p>
              </NeonCard>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="max-w-3xl mx-auto text-center border border-[var(--border-subtle)] rounded-2xl p-8 bg-[var(--bg-overlay)]">
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-2">
                <strong className="text-[var(--text-primary)]">La analogía es exacta:</strong> en los 90, no saber usar Word o Excel no era una postura ideológica.
                Era simplemente quedar fuera. Las habilidades de Office tardaron una década en volverse indispensables.
              </p>
              <p className="text-[var(--neon-cyan)] font-semibold text-lg">
                La IA está recorriendo ese camino en años.
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-60 mt-4">
                Infobae · Feb 2026
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features list */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal delay={0.1}>
              <div>
                <NeonBadge variant="violet" className="mb-4">
                  Nivel Premium. Desde el día 1.
                </NeonBadge>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                  El sistema definitivo para dominar tu industria con IA
                </h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 uppercase tracking-widest text-xs font-semibold">
                  Una sola inversión. Retorno inmediato.
                </p>
                <ul className="flex flex-col gap-4 mb-10">
                  {features.map((f, i) => (
                    <li key={f} className="flex items-center gap-4 text-[var(--text-secondary)] group">
                      <div className="rounded-full bg-[var(--neon-cyan-dim)] p-1 group-hover:bg-[var(--neon-cyan)] group-hover:text-black transition-colors duration-300">
                        <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0 group-hover:text-black transition-colors duration-300" />
                      </div>
                      <span className="text-[1.05rem] group-hover:text-[var(--text-primary)] transition-colors duration-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <NeonButton href="/academia/cursos" variant="neon" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 ease-out">
                  Garantiza tu acceso <ArrowRight className="size-5" />
                </NeonButton>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <NeonCard glow="violet" className="p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--neon-violet)] opacity-5 rounded-full blur-[100px] group-hover:opacity-20 transition-opacity duration-700" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-5 transition-transform duration-300 hover:translate-x-2">
                    <div className="size-12 rounded-xl bg-[var(--neon-cyan-dim)] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                      <Zap className="size-6 text-[var(--neon-cyan)]" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-lg">Actualización garantizada</p>
                      <p className="text-[var(--text-muted)]">A nuevas versiones de modelos (GPT, Claude)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 transition-transform duration-300 hover:translate-x-2">
                    <div className="size-12 rounded-xl bg-[var(--neon-magenta-dim)] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                      <BrainCircuit className="size-6 text-[var(--neon-magenta)]" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-lg">Librería de mega-prompts</p>
                      <p className="text-[var(--text-muted)]">Copy & paste directamente en tu trabajo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 transition-transform duration-300 hover:translate-x-2">
                    <div className="size-12 rounded-xl bg-[var(--neon-violet-dim)] flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.1)]">
                      <TrendingUp className="size-6 text-[var(--neon-violet)]" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-primary)] text-lg">Flujos escalables</p>
                      <p className="text-[var(--text-muted)]">Delegación automática a tu nuevo becario digital</p>
                    </div>
                  </div>
                  <div className="border-t border-[var(--border-subtle)] pt-8 mt-4">
                    <p className="text-sm text-[var(--text-muted)] mb-2 uppercase tracking-wider font-semibold">Valor incalculable. Inversión inicial a partir de</p>
                    <p className="font-display text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                      $99.000{" "}
                      <span className="text-xl font-medium text-[var(--text-muted)] lining-nums">CLP</span>
                    </p>
                  </div>
                </div>
              </NeonCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="violet" />
      </ScrollReveal>

      {/* Testimonios */}
      <section className="py-24 relative">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-16">
              <NeonBadge variant="cyan" className="mb-4">
                Casos de Éxito
              </NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
                Inviertieron hoy. Facturan el triple mañana.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((t, i) => (
              <ScrollReveal delay={0.2 + (i * 0.1)} key={t.name}>
                <NeonCard glow="cyan" hoverable className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <Quote className="size-10 text-[var(--neon-cyan-dim)] mb-6 opacity-60" />
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-[1.05rem] italic">"{t.quote}"</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-5 text-[var(--neon-amber)] fill-current" />
                      ))}
                    </div>
                    <div className="border-t border-[var(--border-subtle)] pt-4">
                      <p className="font-bold text-[var(--text-primary)] text-lg">{t.name}</p>
                      <p className="text-sm text-[var(--neon-cyan)]">{t.role}</p>
                    </div>
                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="magenta" />
      </ScrollReveal>

      {/* Pricing preview */}
      <section className="py-24 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal delay={0.1}>
            <div className="text-center mb-16">
              <NeonBadge variant="magenta" className="mb-4">
                Elige tu Escalabilidad
              </NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6">
                Protege tu tiempo, multiplica tus ingresos
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
                La IA avanza a diario. Quedarte atrás es más costoso que empezar hoy. Sin suscripciones molestas. Inviertes, aprendes para siempre.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <PricingTiers />
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/precios"
                className="text-[1.05rem] font-medium text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors underline underline-offset-8 decoration-2 decoration-[var(--border-accent)]"
              >
                Ver todos los detalles, alcances y garantías completas de cada plan →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 overflow-hidden relative">
        <ScrollReveal delay={0.1}>
          <div className="container max-w-6xl mx-auto px-4">
            <CTABanner
              title="Tu competencia ya está usando esto. ¿Qué esperas?"
              description="Empieza en menos de 2 minutos. Entra a la comunidad, descarga tus prompts y lanza tu primera campaña automatizada hoy."
              primaryCta={{ label: "Desbloquear Cursos", href: "/academia/cursos" }}
              secondaryCta={{ label: "Agenda una Demo", href: "/contacto" }}
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
