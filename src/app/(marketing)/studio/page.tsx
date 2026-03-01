import type { Metadata } from "next"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { CTABanner } from "@/components/marketing/CTABanner"
import { CyberpunkGrid } from "@/components/brand/CyberpunkGrid"
import { SITE_NAME } from "@/lib/constants"
import { ImageIcon, Video, Megaphone, Palette, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Studio Creativo IA",
  description:
    "Servicios creativos con IA para marcas que quieren destacar. Imagen, video, ads y branding generados con inteligencia artificial.",
  openGraph: {
    title: `Studio Creativo IA — ${SITE_NAME}`,
    description: "Servicios creativos con IA para marcas que quieren destacar.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const servicios = [
  {
    icon: <ImageIcon className="size-8 text-[var(--neon-cyan)]" />,
    title: "Piezas Visuales para Redes",
    description:
      "Posts, stories, carruseles y reels con identidad visual coherente. Generamos assets listos para publicar, adaptados a tu marca.",
    incluye: [
      "Pack mensual de piezas visuales",
      "Formatos para todas las redes",
      "Revisiones incluidas",
      "Entrega en 48-72h",
    ],
    glow: "cyan" as const,
  },
  {
    icon: <Video className="size-8 text-[var(--neon-magenta)]" />,
    title: "Video Shorts IA",
    description:
      "Videos cortos generados con IA para TikTok, Instagram Reels y YouTube Shorts. Scripts, edición y subtítulos automáticos.",
    incluye: [
      "Videos 9:16 y 1:1",
      "Scripts con IA",
      "Subtítulos automáticos",
      "Versiones en español e inglés",
    ],
    glow: "magenta" as const,
  },
  {
    icon: <Megaphone className="size-8 text-[var(--neon-violet)]" />,
    title: "Ads & Performance",
    description:
      "Piezas visuales para campañas pagadas. Múltiples variantes para A/B testing, optimizadas para conversión.",
    incluye: [
      "Múltiples variantes creativas",
      "Formatos Meta y Google",
      "Copy testado con IA",
      "Análisis de performance",
    ],
    glow: "violet" as const,
  },
  {
    icon: <Palette className="size-8 text-[var(--neon-cyan)]" />,
    title: "Branding IA",
    description:
      "Identidad visual generada y refinada con IA. Logo concepts, paletas, tipografías y guía de estilo para tu marca.",
    incluye: [
      "Concepts de logo IA",
      "Paleta de colores",
      "Guía de estilo básica",
      "Formatos editables",
    ],
    glow: "cyan" as const,
  },
]

const proceso = [
  { step: "01", title: "Brief", description: "Nos cuentas tu marca, objetivos y estilo visual." },
  {
    step: "02",
    title: "Propuesta",
    description: "Enviamos un plan de trabajo y cotización en 24h.",
  },
  { step: "03", title: "Producción", description: "Generamos las piezas visuales con IA + revisión humana." },
  {
    step: "04",
    title: "Entrega",
    description: "Recibes los archivos finales listos para usar.",
  },
]

export default function StudioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <CyberpunkGrid className="opacity-30" />
        <div className="container max-w-6xl mx-auto px-4 relative">
          <NeonBadge variant="magenta" className="mb-6">
            Studio Creativo IA
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 max-w-3xl leading-tight">
            Piezas visuales profesionales{" "}
            <span className="text-gradient-magenta">generadas con IA</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-10">
            Producimos contenido visual de alto impacto para marcas y creadores. Imagen, video, ads y
            branding — todo con inteligencia artificial aplicada por diseñadores que saben usarla.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NeonButton href="/contacto" variant="neon" size="lg">
              Solicitar cotización <ArrowRight className="size-4" />
            </NeonButton>
            <NeonButton href="/portfolio" variant="ghost-neon" size="lg">
              Ver portfolio
            </NeonButton>
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      {/* Servicios */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Servicios disponibles
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Seleccionamos las mejores herramientas IA según cada proyecto. Tú recibes el resultado
              final, nosotros gestionamos la tecnología.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {servicios.map((s) => (
              <NeonCard key={s.title} glow={s.glow} hoverable className="p-8">
                <div className="mb-5">{s.icon}</div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  {s.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{s.description}</p>
                <ul className="flex flex-col gap-2">
                  {s.incluye.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <CheckCircle2 className="size-4 text-[var(--neon-cyan)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Proceso */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <NeonBadge variant="cyan" className="mb-4">
              Cómo trabajamos
            </NeonBadge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Proceso simple, resultados rápidos
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {proceso.map((p) => (
              <div key={p.step} className="text-center">
                <div className="font-display text-5xl font-bold text-gradient-cyan mb-4">{p.step}</div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <CTABanner
            title="¿Listo para escalar tu contenido visual?"
            description="Cuéntanos tu proyecto y te enviamos una propuesta en 24 horas."
            primaryCta={{ label: "Contactar ahora", href: "/contacto" }}
            secondaryCta={{ label: "Ver proceso completo", href: "/proceso" }}
          />
        </div>
      </section>
    </>
  )
}
