import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  Store,
  Stethoscope,
  Target,
  WandSparkles,
} from "lucide-react"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonCard } from "@/components/brand/NeonCard"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { CyberpunkGrid } from "@/components/brand/CyberpunkGrid"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: `${SITE_NAME} — Presencia digital, posicionamiento y clientes`,
  description:
    "Ayudamos a profesionales, emprendedores y pymes a construir su presencia digital, ser encontrados, conseguir clientes y recuperar tiempo con tecnología y automatización.",
  openGraph: {
    title: `${SITE_NAME} — Haz que te encuentren. Haz crecer tu negocio.`,
    description:
      "Presencia, posicionamiento, contenido, publicidad y automatización para profesionales, emprendedores y pequeñas empresas.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const problems = [
  { icon: MapPin, text: "Nadie me encuentra en Google Maps.", action: "Quiero que me encuentren" },
  { icon: Store, text: "Tengo mi negocio funcionando, pero casi nadie sabe que existe.", action: "Necesito visibilidad" },
  { icon: Stethoscope, text: "Tengo horas disponibles y necesito conseguir más pacientes.", action: "Quiero captar clientes" },
  { icon: Clock3, text: "Pierdo demasiado tiempo publicando y respondiendo siempre lo mismo por WhatsApp.", action: "Quiero recuperar tiempo" },
  { icon: Sparkles, text: "Tengo una idea de negocio y necesito crear mi presencia digital y encontrar clientes.", action: "Quiero empezar bien" },
  { icon: Palette, text: "Hago productos únicos, pero no sé cómo encontrar personas dispuestas a pagar lo que realmente valen.", action: "Quiero encontrar a mi cliente" },
]

const paths = [
  {
    number: "01",
    icon: WandSparkles,
    title: "Construimos",
    copy: "Convertimos tu idea o negocio en una presencia clara, profesional y preparada para vender.",
    items: "Marca · Web · Landing · Tienda · Imágenes · Video · Contenido",
  },
  {
    number: "02",
    icon: Search,
    title: "Te hacemos encontrable",
    copy: "Trabajamos las señales que ayudan a que las personas descubran y entiendan tu negocio.",
    items: "Google · Maps · SEO · Contenido · Búsqueda local · Asistentes de IA",
  },
  {
    number: "03",
    icon: Target,
    title: "Generamos oportunidades",
    copy: "Conectamos tu oferta con personas que realmente pueden convertirse en clientes.",
    items: "Campañas · Ads · Landing · Leads · Formularios · WhatsApp",
  },
  {
    number: "04",
    icon: Bot,
    title: "Simplificamos",
    copy: "Automatizamos tareas repetitivas para que puedas volver a ocuparte de tu negocio y de tu tiempo.",
    items: "Respuestas · Reservas · Filtros · Seguimiento · Automatización",
  },
]

const audiences = [
  "Profesionales independientes",
  "Comercio local",
  "Emprendedores",
  "Artesanos y marcas de autor",
  "Corredores y arriendos",
  "Pequeñas y medianas empresas",
]

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[78vh] flex items-center overflow-hidden py-24">
        <CyberpunkGrid className="opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,255,255,0.08),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(255,0,255,0.07),transparent_30%)]" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <NeonBadge variant="cyan" className="mb-6">Para profesionales, emprendedores y pymes</NeonBadge>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text-primary)] leading-[0.98] mb-7">
              Tú haces funcionar tu negocio.
              <span className="block text-gradient-cyan mt-2">Hagamos que lo encuentren.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-5">
              Construimos la presencia digital que necesitas para posicionarte, encontrar clientes y vender — sin obligarte a convertirte en experto en marketing o tecnología.
            </p>
            <p className="text-[var(--text-muted)] max-w-2xl mb-9">
              Web, marca, contenido, Google, publicidad, asistentes de IA y automatización trabajando como un solo sistema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NeonButton href="/contacto" variant="neon" size="lg">
                Cuéntanos tu negocio <ArrowRight className="size-5" />
              </NeonButton>
              <NeonButton href="#problemas" variant="outline" size="lg">Ver cómo podemos ayudarte</NeonButton>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider color="cyan" />

      <section id="problemas" className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mb-14">
              <NeonBadge variant="magenta" className="mb-4">Empecemos por tu problema</NeonBadge>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-5">
                No necesitas saber qué herramienta necesitas.
              </h2>
              <p className="text-xl text-[var(--text-secondary)]">
                Cuéntanos dónde estás y qué quieres conseguir. Nosotros diseñamos el camino más simple para avanzar.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((problem, i) => {
              const Icon = problem.icon
              return (
                <ScrollReveal key={problem.text} delay={0.05 * i}>
                  <NeonCard glow={i % 2 ? "magenta" : "cyan"} hoverable className="p-7 h-full flex flex-col">
                    <Icon className="size-7 text-[var(--neon-cyan)] mb-5" />
                    <p className="text-[var(--text-primary)] text-lg font-semibold leading-relaxed flex-1">“{problem.text}”</p>
                    <Link href="/contacto" className="mt-6 text-sm font-semibold text-[var(--neon-cyan)] flex items-center gap-2">
                      {problem.action} <ArrowRight className="size-4" />
                    </Link>
                  </NeonCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <NeonBadge variant="violet" className="mb-4">Un sistema, no piezas sueltas</NeonBadge>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-5">
                De existir a ser elegido.
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                Usamos la tecnología que haga falta. Tú compras progreso: una presencia mejor, más oportunidades y menos trabajo repetitivo.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path, i) => {
              const Icon = path.icon
              return (
                <ScrollReveal key={path.number} delay={0.08 * i}>
                  <NeonCard glow={i % 2 ? "violet" : "cyan"} hoverable className="p-8 md:p-10 h-full">
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-display text-5xl font-bold text-[var(--text-muted)]/40">{path.number}</span>
                      <div className="size-12 rounded-xl bg-[var(--neon-cyan-dim)] flex items-center justify-center">
                        <Icon className="size-6 text-[var(--neon-cyan)]" />
                      </div>
                    </div>
                    <h3 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">{path.title}</h3>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">{path.copy}</p>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{path.items}</p>
                  </NeonCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
            <ScrollReveal>
              <div>
                <NeonBadge variant="cyan" className="mb-4">Diagnóstico inicial</NeonBadge>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
                  Primero entendemos dónde se está perdiendo la oportunidad.
                </h2>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                  Revisamos tu presencia actual, cómo te encuentran, qué entiende una persona al llegar y dónde se corta el camino hacia la consulta o la venta. Después priorizamos lo que realmente vale la pena corregir.
                </p>
                <NeonButton href="/contacto" variant="neon" size="lg">
                  Analizar mi negocio <ArrowRight className="size-5" />
                </NeonButton>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <NeonCard glow="magenta" className="p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--neon-magenta)] mb-6">Lo que miramos</p>
                <div className="space-y-5">
                  {[
                    ["01", "¿Pueden encontrarte?", "Google, Maps, buscadores, redes y asistentes de IA."],
                    ["02", "¿Entienden lo que vendes?", "Oferta, mensaje, diferenciación y confianza."],
                    ["03", "¿Pueden dar el siguiente paso?", "Web, WhatsApp, reserva, compra o formulario."],
                    ["04", "¿Te consume demasiado tiempo?", "Tareas repetitivas que podemos simplificar o automatizar."],
                  ].map(([n, title, copy]) => (
                    <div key={n} className="border-b border-[var(--border-subtle)] pb-5 last:border-0 last:pb-0">
                      <div className="flex gap-4">
                        <span className="text-[var(--neon-cyan)] font-mono text-sm">{n}</span>
                        <div>
                          <p className="text-[var(--text-primary)] font-semibold mb-1">{title}</p>
                          <p className="text-sm text-[var(--text-muted)]">{copy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </NeonCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-[0.22em] text-[var(--text-muted)] mb-8">Pensado para negocios reales</p>
            <div className="flex flex-wrap justify-center gap-3">
              {audiences.map((audience) => (
                <span key={audience} className="px-5 py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-overlay)] text-[var(--text-secondary)]">
                  {audience}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.07),transparent_38%)]" />
        <div className="container max-w-4xl mx-auto px-4 relative text-center">
          <ScrollReveal>
            <Megaphone className="size-10 text-[var(--neon-cyan)] mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Tu negocio no necesita más herramientas. Necesita avanzar.
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-9">
              Cuéntanos qué haces, qué te está frenando y qué quieres conseguir. Te ayudamos a identificar el próximo movimiento.
            </p>
            <NeonButton href="/contacto" variant="neon" size="lg">
              Cuéntanos qué necesitas <ArrowRight className="size-5" />
            </NeonButton>
            <p className="text-xs text-[var(--text-muted)] mt-5">Sin promesas mágicas. Priorizamos lo que puede generar impacto real.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
