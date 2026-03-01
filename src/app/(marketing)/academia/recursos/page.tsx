import type { Metadata } from "next"
import Link from "next/link"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { SITE_NAME } from "@/lib/constants"
import { Download, Lock, ArrowRight, FileText, CheckSquare, MessageSquare, BookMarked } from "lucide-react"

export const metadata: Metadata = {
  title: "Biblioteca de Recursos",
  description:
    "Prompts, plantillas, checklists y guías de IA. Recursos descargables para creadores y equipos.",
  openGraph: {
    title: `Recursos IA — ${SITE_NAME}`,
    description: "+30 recursos descargables: prompts, plantillas, checklists y guías.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const tipoIcono = {
  checklist: <CheckSquare className="size-5 text-[var(--neon-cyan)]" />,
  prompt: <MessageSquare className="size-5 text-[var(--neon-magenta)]" />,
  template: <FileText className="size-5 text-[var(--neon-violet)]" />,
  guide: <BookMarked className="size-5 text-[var(--neon-amber)]" />,
}

const tipoBadge = {
  checklist: "cyan" as const,
  prompt: "magenta" as const,
  template: "violet" as const,
  guide: "amber" as const,
}

const recursos = [
  {
    slug: "checklist-qa-piezas-visuales",
    titulo: "Checklist QA de Piezas Visuales",
    descripcion: "25 puntos de control para revisar tus piezas visuales antes de publicar.",
    tipo: "checklist" as const,
    tags: ["calidad", "visual", "redes"],
    version: "1.0",
    is_free: true,
  },
  {
    slug: "calendario-contenido-semanal",
    titulo: "Calendario Semanal de Contenido",
    descripcion: "Plantilla de planificación semanal con slots por red social y tipo de contenido.",
    tipo: "checklist" as const,
    tags: ["planificación", "calendario", "redes"],
    version: "1.0",
    is_free: true,
  },
  {
    slug: "checklist-seguridad-ia",
    titulo: "Checklist Seguridad y Privacidad IA",
    descripcion: "Qué datos nunca compartir con herramientas IA. 20 puntos de control.",
    tipo: "checklist" as const,
    tags: ["seguridad", "privacidad", "IA"],
    version: "1.0",
    is_free: true,
  },
  {
    slug: "prompts-redes-sociales",
    titulo: "Pack de Prompts para Redes Sociales",
    descripcion: "30 prompts probados para posts, stories, carruseles y captions.",
    tipo: "prompt" as const,
    tags: ["prompts", "redes", "contenido"],
    version: "1.2",
    is_free: false,
  },
  {
    slug: "prompts-productividad",
    titulo: "Pack de Prompts de Productividad",
    descripcion: "25 prompts para reportes, emails, reuniones y documentación.",
    tipo: "prompt" as const,
    tags: ["prompts", "productividad", "trabajo"],
    version: "1.0",
    is_free: false,
  },
  {
    slug: "prompts-presentaciones",
    titulo: "Pack de Prompts para Presentaciones",
    descripcion: "20 prompts para estructurar slides, narrativas y decks ejecutivos.",
    tipo: "prompt" as const,
    tags: ["prompts", "presentaciones", "slides"],
    version: "1.0",
    is_free: false,
  },
  {
    slug: "plantilla-brief-creativo",
    titulo: "Plantilla Brief Creativo",
    descripcion: "Brief estructurado para proyectos creativos con IA. Exportable a Notion.",
    tipo: "template" as const,
    tags: ["brief", "creatividad", "agencias"],
    version: "1.0",
    is_free: false,
  },
  {
    slug: "plantilla-sop-semanal",
    titulo: "Plantilla SOP Semanal",
    descripcion: "Sistema operativo para tu semana de contenido. Incluye checklist de publicación.",
    tipo: "template" as const,
    tags: ["SOP", "productividad", "contenido"],
    version: "1.1",
    is_free: false,
  },
  {
    slug: "plantilla-reporte-mensual",
    titulo: "Plantilla Reporte Mensual",
    descripcion: "Reporte de métricas mensual para redes sociales. Generado con IA.",
    tipo: "template" as const,
    tags: ["reporte", "métricas", "redes"],
    version: "1.0",
    is_free: false,
  },
  {
    slug: "guia-errores-ia",
    titulo: "Mini Guía: Errores Comunes con IA",
    descripcion: "Los 10 errores más frecuentes al usar IA y cómo evitarlos.",
    tipo: "guide" as const,
    tags: ["guía", "errores", "principiantes"],
    version: "1.0",
    is_free: true,
  },
  {
    slug: "guia-iterar-prompts",
    titulo: "Mini Guía: Cómo Iterar Prompts",
    descripcion: "Método paso a paso para mejorar cualquier prompt hasta obtener el resultado que buscas.",
    tipo: "guide" as const,
    tags: ["guía", "prompts", "metodología"],
    version: "1.0",
    is_free: false,
  },
  {
    slug: "guia-metricas-ia",
    titulo: "Mini Guía: Métricas que Importan",
    descripcion: "Las 8 métricas clave para medir el impacto real de tu contenido con IA.",
    tipo: "guide" as const,
    tags: ["guía", "métricas", "análisis"],
    version: "1.0",
    is_free: false,
  },
]

const tipos = ["Todos", "Checklist", "Prompt", "Plantilla", "Guía"]
const libres = recursos.filter((r) => r.is_free)
const pagos = recursos.filter((r) => !r.is_free)

export default function RecursosPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <NeonBadge variant="violet" className="mb-6">
            Biblioteca de recursos
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 max-w-2xl">
            Herramientas listas para{" "}
            <span className="text-gradient-violet">usar hoy</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mb-10">
            Prompts, plantillas, checklists y guías. Todos diseñados para ahorrar tiempo y mejorar
            resultados con IA.
          </p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-[var(--neon-cyan)]">
                {libres.length}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Gratuitos</p>
            </div>
            <div className="w-px h-10 bg-[var(--border-subtle)]" />
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-[var(--text-primary)]">
                {recursos.length}
              </p>
              <p className="text-sm text-[var(--text-muted)]">En total</p>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider color="violet" />

      {/* Filtros */}
      <section className="py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {tipos.map((t, i) => (
              <span
                key={t}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${i === 0
                    ? "bg-[var(--neon-violet-dim)] text-[var(--neon-violet)] border border-[var(--neon-violet)]"
                    : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-secondary)]"
                  }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos gratuitos */}
      <section className="pb-10">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
            Recursos gratuitos
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {libres.map((r) => (
              <NeonCard key={r.slug} glow="none" hoverable className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center">
                    {tipoIcono[r.tipo]}
                  </div>
                  <NeonBadge variant={tipoBadge[r.tipo]}>{r.tipo}</NeonBadge>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm leading-snug">
                  {r.titulo}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {r.descripcion}
                </p>
                <div className="flex flex-wrap gap-1 mb-5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-overlay)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">v{r.version}</span>
                  <NeonButton href={`/app/recursos`} variant="ghost-neon" size="sm">
                    <Download className="size-3.5" /> Descargar
                  </NeonButton>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Recursos de pago */}
      <section className="py-10 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Recursos premium
            </h2>
            <NeonBadge variant="amber">Incluidos en cursos y mentorías</NeonBadge>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pagos.map((r) => (
              <NeonCard key={r.slug} glow="none" className="p-6 opacity-80">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center">
                    {tipoIcono[r.tipo]}
                  </div>
                  <NeonBadge variant={tipoBadge[r.tipo]}>{r.tipo}</NeonBadge>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm leading-snug">
                  {r.titulo}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {r.descripcion}
                </p>
                <div className="flex flex-wrap gap-1 mb-5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-overlay)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">v{r.version}</span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Lock className="size-3.5" />
                    Requiere acceso
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>

          <NeonCard glow="cyan" className="mt-8 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
              Accede a todos los recursos premium
            </h3>
            <p className="text-[var(--text-secondary)] mb-6 text-sm">
              Los recursos premium están incluidos en todos nuestros cursos y mentorías.
            </p>
            <NeonButton href="/academia/cursos" variant="neon">
              Ver cursos <ArrowRight className="size-4" />
            </NeonButton>
          </NeonCard>
        </div>
      </section>
    </>
  )
}
