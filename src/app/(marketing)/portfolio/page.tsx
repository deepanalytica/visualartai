import type { Metadata } from "next"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { CTABanner } from "@/components/marketing/CTABanner"
import { SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Galería de trabajos creativos generados con IA. Imagen, video, ads y branding para marcas reales.",
  openGraph: {
    title: `Portfolio — ${SITE_NAME}`,
    description: "Galería de trabajos creativos generados con IA.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const categorias = ["Todos", "Imagen", "Video", "Ads", "Branding"]

const items = [
  { id: 1, titulo: "Campaña Verano 2024", tipo: "Ads", descripcion: "Pack completo para Meta Ads" },
  { id: 2, titulo: "Identidad Visual Startup", tipo: "Branding", descripcion: "Logo + paleta + guía de estilo" },
  { id: 3, titulo: "Contenido Semanal SaaS", tipo: "Imagen", descripcion: "30 posts para LinkedIn e Instagram" },
  { id: 4, titulo: "Reels Educativos", tipo: "Video", descripcion: "Serie de 10 videos cortos" },
  { id: 5, titulo: "Lanzamiento E-commerce", tipo: "Ads", descripcion: "Piezas visuales para Google y Meta" },
  { id: 6, titulo: "Rebrand Consultoría", tipo: "Branding", descripcion: "Modernización de identidad visual" },
  { id: 7, titulo: "Pack Navidad", tipo: "Imagen", descripcion: "Piezas visuales festivas para redes" },
  { id: 8, titulo: "Curso Online Promo", tipo: "Video", descripcion: "Trailer y clips de lanzamiento" },
  { id: 9, titulo: "Campaña Performance Q1", tipo: "Ads", descripcion: "A/B testing con 20+ variantes" },
]

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <NeonBadge variant="cyan" className="mb-6">
            Portfolio
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 max-w-2xl">
            Trabajo real, <span className="text-gradient-cyan">resultados reales</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl">
            Una selección de proyectos creativos desarrollados con herramientas IA para marcas y
            creadores de contenido.
          </p>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Filtros + Grid */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Filtros (UI estática — sin JS en server) */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categorias.map((c, i) => (
              <span
                key={c}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${i === 0
                    ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] border border-[var(--border-accent)]"
                    : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-secondary)]"
                  }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Grid de trabajos */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--border-accent)] transition-all duration-300"
              >
                {/* Placeholder visual */}
                <div className="aspect-square bg-gradient-to-br from-[var(--bg-overlay)] to-[var(--bg-void)] flex items-center justify-center">
                  <div className="text-center p-6">
                    <span className="block text-4xl mb-3">
                      {item.tipo === "Video"
                        ? "🎬"
                        : item.tipo === "Ads"
                          ? "📢"
                          : item.tipo === "Branding"
                            ? "🎨"
                            : "🖼️"}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                      {item.tipo}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.titulo}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--text-muted)] mt-12">
            Portfolio actualizado constantemente. Más casos disponibles al contactarnos.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <CTABanner
            title="¿Quieres resultados similares para tu marca?"
            description="Contáctanos y te enviamos una propuesta personalizada en 24 horas."
            primaryCta={{ label: "Solicitar propuesta", href: "/contacto" }}
            secondaryCta={{ label: "Ver servicios", href: "/studio" }}
          />
        </div>
      </section>
    </>
  )
}
