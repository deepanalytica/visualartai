import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { BuyButton } from "@/components/marketing/BuyButton"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import {
  CheckCircle2,
  Clock,
  Users,
  Star,
  BookOpen,
  ChevronDown,
  Lock,
  PlayCircle,
  FileText,
  Layers,
} from "lucide-react"

// In production, this data comes from the DB via Drizzle.
// For now, static data matching the seed.
const cursosData: Record<string, CourseData> = {
  "sistema-ia-contenido-semanal": {
    slug: "sistema-ia-contenido-semanal",
    titulo: "Sistema IA para Contenido Semanal (sin perder calidad)",
    descripcion:
      "Aprende a producir una semana de contenido de calidad en una tarde. Mantén tu voz, escala tu producción, sin burnout.",
    descripcionLarga:
      "¿Pasas horas creando contenido y sientes que nunca es suficiente? Este curso te enseña a construir un sistema completo de producción de contenido con IA, desde la estrategia hasta la publicación, sin sacrificar calidad ni autenticidad. Aprenderás exactamente qué herramientas usar, cómo combinarlas, y cómo adaptar la IA a tu voz y estilo.",
    ruta: "Redes Sociales",
    nivel: "Principiante–Intermedio",
    duracion: "6h aprox.",
    modulos: 6,
    precio_clp: 149000,
    is_free: false,
    rating: 5,
    alumnos: 120,
    version: "1.0",
    objetivos: [
      "Construir un SOP semanal de contenido con IA",
      "Generar piezas visuales coherentes con tu marca",
      "Usar prompts avanzados que mantienen tu voz",
      "Programar y publicar en todas las redes desde un solo flujo",
      "Medir resultados y mejorar semana a semana",
    ],
    requisitos: [
      "Acceso a ChatGPT, Claude o similar (plan gratuito suficiente para empezar)",
      "Tener al menos una red social activa",
      "No se requiere experiencia técnica",
    ],
    tags: ["IA", "Redes", "Contenido", "Automatización", "Prompts"],
    modulosDetalle: [
      {
        titulo: "Módulo 1: Fundamentos útiles",
        descripcion: "Qué es útil ahora, qué ignorar. El estado real de la IA para contenido.",
        lecciones: [
          { titulo: "Estado actual de la IA para creadores", duracion: "12 min", libre: true },
          { titulo: "Herramientas que sí funcionan (y las que no)", duracion: "18 min", libre: true },
          { titulo: "Tu stack de producción personalizado", duracion: "15 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 2: Estrategia de contenido con IA",
        descripcion: "Define tus pilares, audiencia y calendario en menos de 2 horas.",
        lecciones: [
          { titulo: "Define tus pilares de contenido con IA", duracion: "20 min", libre: false },
          { titulo: "Calendario mensual automático", duracion: "22 min", libre: false },
          { titulo: "Banco de ideas infinito", duracion: "18 min", libre: false },
          { titulo: "Prompt de estrategia (plantilla incluida)", duracion: "10 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 3: Producción masiva sin perder voz",
        descripcion: "Cómo generar volumen de contenido que suene 100% a ti.",
        lecciones: [
          { titulo: "El prompt de voz: entrena la IA con tu estilo", duracion: "25 min", libre: false },
          { titulo: "Generación de texto en lote", duracion: "20 min", libre: false },
          { titulo: "Edición mínima de alto impacto", duracion: "15 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 4: Creatividades visuales IA",
        descripcion: "Imágenes, carruseles y videos cortos generados con IA.",
        lecciones: [
          { titulo: "Midjourney / DALL-E para contenido de marca", duracion: "30 min", libre: false },
          { titulo: "Carruseles automáticos con Canva IA", duracion: "25 min", libre: false },
          { titulo: "Reels con IA: guion, voz y subtítulos", duracion: "28 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 5: Publicación, métricas y aprendizaje",
        descripcion: "Automatiza la publicación y mide lo que importa.",
        lecciones: [
          { titulo: "Publicación automática con Buffer o Later", duracion: "20 min", libre: false },
          { titulo: "Dashboard de métricas en 15 min/semana", duracion: "18 min", libre: false },
          { titulo: "Cómo iterar tu sistema con los datos", duracion: "15 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 6: Tu SOP semanal completo",
        descripcion: "Ensambla todo en un sistema que funciona en piloto automático.",
        lecciones: [
          { titulo: "El SOP semanal (plantilla Notion incluida)", duracion: "30 min", libre: false },
          { titulo: "Sesión de trabajo en vivo: producción completa", duracion: "45 min", libre: false },
          { titulo: "Cierre: mantener y mejorar el sistema", duracion: "15 min", libre: false },
        ],
      },
    ],
    incluye: [
      "6 módulos en video HD",
      "+20 lecciones con duración promedio de 20 min",
      "Pack de 30+ prompts listos para usar",
      "Plantilla SOP Semanal (Notion)",
      "Calendario mensual de contenido (editable)",
      "Acceso a comunidad privada",
      "Actualizaciones futuras incluidas",
      "Acceso de por vida",
    ],
  },
  "flujos-ia-productividad": {
    slug: "flujos-ia-productividad",
    titulo: "Ahorra 5–10 horas/semana con Flujos IA",
    descripcion:
      "Sistema completo de automatización con IA para reportes, emails, presentaciones y SOPs. Sin código, sin fricción.",
    descripcionLarga:
      "¿Pasas horas en tareas repetitivas que sientes que una IA debería hacer? Este curso te enseña a identificar exactamente dónde pierdes tiempo y a construir flujos automatizados con IA para recuperarlo. Sin programar, sin herramientas complejas, con las apps que ya usas.",
    ruta: "Productividad",
    nivel: "Principiante",
    duracion: "4h aprox.",
    modulos: 6,
    precio_clp: 99000,
    is_free: false,
    rating: 5,
    alumnos: 89,
    version: "1.0",
    objetivos: [
      "Identificar exactamente dónde pierdes 5-10 horas semanales",
      "Automatizar reportes con IA en minutos",
      "Generar emails, briefs y documentos profesionales al instante",
      "Crear presentaciones completas con IA",
      "Construir SOPs que se actualizan solos",
    ],
    requisitos: [
      "Acceso a ChatGPT o Claude (plan gratuito funciona)",
      "Trabajar en entorno de oficina o remoto (cualquier industria)",
      "No se requiere conocimiento técnico",
    ],
    tags: ["IA", "Productividad", "Automatización", "Flujos", "No-code"],
    modulosDetalle: [
      {
        titulo: "Módulo 1: Diagnóstico de tiempo",
        descripcion: "Identifica exactamente dónde pierdes horas cada semana.",
        lecciones: [
          { titulo: "Auditoría de tiempo: la metodología en 30 min", duracion: "18 min", libre: true },
          { titulo: "Las 5 tareas que más roban tiempo", duracion: "15 min", libre: true },
          { titulo: "Tu mapa de automatización personal", duracion: "20 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 2: Reportes y documentos automáticos",
        descripcion: "De datos brutos a informe ejecutivo en minutos.",
        lecciones: [
          { titulo: "Prompts para analizar datos y generar insights", duracion: "22 min", libre: false },
          { titulo: "Reporte semanal automático con plantilla", duracion: "25 min", libre: false },
          { titulo: "Documentación técnica sin dolor", duracion: "18 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 3: Comunicación inteligente",
        descripcion: "Emails, briefs y mensajes profesionales al instante.",
        lecciones: [
          { titulo: "El prompt de redacción profesional", duracion: "20 min", libre: false },
          { titulo: "Briefs creatievos en 5 minutos", duracion: "18 min", libre: false },
          { titulo: "Respuestas difíciles: cómo la IA te ayuda", duracion: "15 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 4: Presentaciones en minutos",
        descripcion: "De idea a deck completo con IA.",
        lecciones: [
          { titulo: "Estructura de presentaciones con IA", duracion: "20 min", libre: false },
          { titulo: "Slides automáticos: herramientas y prompts", duracion: "25 min", libre: false },
          { titulo: "Narrativa y storytelling con IA", duracion: "18 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 5: SOPs que se generan solos",
        descripcion: "Documenta procesos de forma automática.",
        lecciones: [
          { titulo: "Qué es un SOP y por qué la IA lo cambia todo", duracion: "15 min", libre: false },
          { titulo: "Genera SOPs completos en 15 minutos", duracion: "22 min", libre: false },
          { titulo: "Sistema de actualización automática", duracion: "18 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 6: Seguridad y límites del uso IA",
        descripcion: "Qué nunca debes automatizar y cómo proteger tu información.",
        lecciones: [
          { titulo: "Datos que nunca debes darle a la IA", duracion: "20 min", libre: false },
          { titulo: "Políticas corporativas de uso de IA", duracion: "15 min", libre: false },
          { titulo: "Tu flujo de trabajo seguro y sostenible", duracion: "18 min", libre: false },
        ],
      },
    ],
    incluye: [
      "6 módulos en video HD",
      "+18 lecciones prácticas",
      "Pack de 25+ prompts de productividad",
      "Plantilla de auditoría de tiempo",
      "Plantilla de SOP automático",
      "Acceso de por vida",
      "Actualizaciones futuras incluidas",
    ],
  },
  "claude-core-y-especializaciones": {
    slug: "claude-core-y-especializaciones",
    titulo: "Claude 4.6: Code, Work & Especializaciones Profesionales",
    descripcion:
      "Domina Claude 4.6 Sonnet & Opus — el modelo más avanzado disponible en 2026. Claude Code, Claude for Work, MCP y casos de uso quirúrgicos por industria.",
    descripcionLarga:
      "Claude ya no es solo un chatbot. Con Claude 4.6 Sonnet y Opus estás ante el modelo de razonamiento más avanzado del mercado. Aprenderás a operar Claude Code para desarrollo de software asistido por IA, Claude for Work para transformar tu equipo, MCP (Model Context Protocol) para conectar Claude con tus herramientas reales, y módulos especializados para abogados, médicos, profesores, consultores y psicólogos. Esto no es un tutorial de prompts genéricos — es un sistema de trabajo completo con el modelo más potente disponible hoy.",
    ruta: "Especialización Profesional",
    nivel: "Intermedio–Avanzado",
    duracion: "12h aprox.",
    modulos: 14,
    precio_clp: 199000,
    is_free: false,
    rating: 5,
    alumnos: 34,
    version: "2.0",
    objetivos: [
      "Dominar Claude 4.6 Sonnet & Opus para razonamiento profundo",
      "Usar Claude Code para generar, revisar y debuggear código real",
      "Implementar Claude for Work en tu equipo o empresa",
      "Conectar Claude con tus herramientas vía MCP (Model Context Protocol)",
      "Crear Projects y memorias persistentes para contextos de trabajo",
      "Aplicar Claude en casos de uso reales por industria (legal, salud, educación)",
      "Construir Claude Agents para tareas multi-paso autónomas",
      "Dominar el extended thinking de Opus para análisis de alta complejidad",
    ],
    requisitos: [
      "Acceso a Claude.ai (plan Pro recomendado para usar Opus)",
      "No se requiere saber programar para la mayoría de módulos",
      "Módulo Claude Code requiere conocimientos básicos de terminal",
      "Tener un caso de uso profesional en mente (cualquier industria)",
    ],
    tags: ["Claude 4.6", "Claude Code", "Claude for Work", "MCP", "Opus", "Sonnet", "Agents"],
    modulosDetalle: [
      {
        titulo: "Módulo 1: Claude 4.6 — Estado del arte 2026",
        descripcion: "Qué cambia con Sonnet 4.6 y Opus vs generaciones anteriores. Por qué importa ahora.",
        lecciones: [
          { titulo: "Claude 4.6 Sonnet vs Opus: cuándo usar cada uno", duracion: "20 min", libre: true },
          { titulo: "Extended thinking: razonamiento profundo activado", duracion: "18 min", libre: true },
          { titulo: "La arquitectura que lo hace diferente (sin tecnicismos)", duracion: "15 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 2: Claude.ai avanzado — Projects & Memory",
        descripcion: "Crea contextos persistentes y Projects especializados para cada rol o cliente.",
        lecciones: [
          { titulo: "Projects: tu Claude personalizado por propósito", duracion: "22 min", libre: false },
          { titulo: "Memoria persistente: hace que Claude te conozca de verdad", duracion: "20 min", libre: false },
          { titulo: "Artefactos avanzados: documentos, código y visualizaciones", duracion: "25 min", libre: false },
          { titulo: "Instrucciones de sistema nivel Pro", duracion: "18 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 3: Claude Code — Desarrollo con IA",
        descripcion: "El asistente de código más avanzado del mercado. Del brief al pull request.",
        lecciones: [
          { titulo: "Claude Code: instalación y primeros flujos", duracion: "25 min", libre: false },
          { titulo: "Generar, revisar y refactorizar código con Claude", duracion: "30 min", libre: false },
          { titulo: "Debugging inteligente: Claude analiza el error completo", duracion: "22 min", libre: false },
          { titulo: "Workflows de desarrollo: del prompt al deploy", duracion: "28 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 4: MCP — Model Context Protocol",
        descripcion: "Conecta Claude directamente con Notion, GitHub, Slack, Jira y más.",
        lecciones: [
          { titulo: "Qué es MCP y por qué lo cambia todo", duracion: "18 min", libre: false },
          { titulo: "Configurar MCP con tus herramientas favoritas", duracion: "30 min", libre: false },
          { titulo: "Claude + Notion: tu segundo cerebro integrado", duracion: "25 min", libre: false },
          { titulo: "Claude + GitHub: revisión de código en tiempo real", duracion: "20 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 5: Claude for Work — Tu equipo con IA",
        descripcion: "Implementa Claude en tu empresa de forma estratégica y segura.",
        lecciones: [
          { titulo: "Claude for Work: configuración para tu organización", duracion: "22 min", libre: false },
          { titulo: "Políticas de uso seguro y datos corporativos", duracion: "18 min", libre: false },
          { titulo: "Capacitar equipos para adoptar Claude con método", duracion: "25 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 6: Claude Agents — Automatización autónoma",
        descripcion: "Define agentes que trabajan por ti en tareas de múltiples pasos.",
        lecciones: [
          { titulo: "Qué son los agents y cómo funcionan en Claude 4.6", duracion: "20 min", libre: false },
          { titulo: "Construye tu primer agente de investigación", duracion: "28 min", libre: false },
          { titulo: "Agente de producción de contenido autónomo", duracion: "25 min", libre: false },
        ],
      },
      {
        titulo: "Módulo 7: Opus & Extended Thinking",
        descripcion: "Análisis de alta complejidad, estrategia y decisiones difíciles con el modelo más potente.",
        lecciones: [
          { titulo: "Cuándo usar Opus: casos que justifican el poder", duracion: "15 min", libre: false },
          { titulo: "Extended thinking aplicado: análisis de 10+ páginas en minutos", duracion: "30 min", libre: false },
          { titulo: "Decisiones estratégicas asistidas por Opus", duracion: "22 min", libre: false },
        ],
      },
      {
        titulo: "Módulos 8–14: Especializaciones por Industria",
        descripcion: "Casos de uso quirúrgicos para tu profesión específica.",
        lecciones: [
          { titulo: "Claude para Abogados: contratos, investigación y redacción legal", duracion: "35 min", libre: false },
          { titulo: "Claude para Médicos: diagnóstico diferencial y documentación clínica", duracion: "35 min", libre: false },
          { titulo: "Claude para Profesores: diseño curricular y evaluación personalizada", duracion: "30 min", libre: false },
          { titulo: "Claude para Psicólogos: notas clínicas y psicoeducación", duracion: "30 min", libre: false },
          { titulo: "Claude para Consultores: análisis, propuestas y presentaciones", duracion: "35 min", libre: false },
          { titulo: "Claude para Directivos: estrategia y toma de decisiones", duracion: "30 min", libre: false },
          { titulo: "Claude para Desarrolladores: arquitectura y code review", duracion: "35 min", libre: false },
        ],
      },
    ],
    incluye: [
      "14 módulos en video HD (Claude 4.6 — actualizado 2026)",
      "+40 lecciones con casos de uso reales",
      "Pack de 50+ prompts especializados por industria",
      "Guía de configuración MCP paso a paso",
      "Plantillas de Projects para 7 industrias",
      "Módulo Claude Code con ejercicios prácticos",
      "Actualizaciones automáticas a versiones futuras",
      "Acceso de por vida",
      "Comunidad privada de especialistas",
    ],
  },
}

interface CourseData {
  slug: string
  titulo: string
  descripcion: string
  descripcionLarga: string
  ruta: string
  nivel: string
  duracion: string
  modulos: number
  precio_clp: number
  is_free: boolean
  rating: number
  alumnos: number
  version: string
  objetivos: string[]
  requisitos: string[]
  tags: string[]
  modulosDetalle: {
    titulo: string
    descripcion: string
    lecciones: { titulo: string; duracion: string; libre: boolean }[]
  }[]
  incluye: string[]
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(cursosData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const curso = cursosData[slug]
  if (!curso) return {}

  return {
    title: curso.titulo,
    description: curso.descripcion,
    openGraph: {
      title: `${curso.titulo} — ${SITE_NAME}`,
      description: curso.descripcion,
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: curso.titulo }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${curso.titulo} — ${SITE_NAME}`,
      description: curso.descripcion,
      images: ["/og-default.png"],
    },
  }
}

export default async function CursoDetailPage({ params }: Props) {
  const { slug } = await params
  const curso = cursosData[slug]
  if (!curso) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: curso.titulo,
    description: curso.descripcion,
    url: `${SITE_URL}/academia/cursos/${curso.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: curso.precio_clp,
      priceCurrency: "CLP",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: curso.rating,
      ratingCount: curso.alumnos,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "es",
    },
  }

  const totalLecciones = curso.modulosDetalle.reduce((acc, m) => acc + m.lecciones.length, 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-16 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <NeonBadge variant="cyan">{curso.ruta}</NeonBadge>
                <NeonBadge variant="neutral">{curso.nivel}</NeonBadge>
                <NeonBadge variant="neutral">v{curso.version}</NeonBadge>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                {curso.titulo}
              </h1>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                {curso.descripcionLarga}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-muted)] mb-6">
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 text-[var(--neon-amber)] fill-current" />
                  <strong className="text-[var(--text-primary)]">{curso.rating}.0</strong> rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  <strong className="text-[var(--text-primary)]">{curso.alumnos}</strong> alumnos
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {curso.duracion}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="size-4" />
                  {curso.modulos} módulos · {totalLecciones} lecciones
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {curso.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-[var(--bg-overlay)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Purchase card */}
            <div className="lg:row-span-1">
              <NeonCard glow="cyan" className="p-6 sticky top-24">
                <div className="aspect-video rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--bg-overlay)] to-[var(--bg-void)] flex items-center justify-center mb-6 border border-[var(--border-subtle)]">
                  <BookOpen className="size-12 text-[var(--text-muted)]" />
                </div>

                {curso.is_free ? (
                  <p className="font-display text-3xl font-bold text-[var(--neon-cyan)] mb-2">
                    Gratis
                  </p>
                ) : (
                  <div className="mb-4">
                    <p className="font-display text-3xl font-bold text-[var(--text-primary)]">
                      ${curso.precio_clp.toLocaleString("es-CL")}
                      <span className="text-base font-normal text-[var(--text-muted)] ml-1">CLP</span>
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Pago único · Acceso de por vida</p>
                  </div>
                )}

                <BuyButton
                  courseSlug={curso.slug}
                  label={curso.is_free ? "Inscribirse gratis" : "Comprar ahora"}
                  className="mb-3"
                />
                <NeonButton href="/contacto" variant="ghost-neon" className="w-full">
                  Tengo una pregunta
                </NeonButton>

                <div className="border-t border-[var(--border-subtle)] mt-6 pt-6">
                  <p className="text-xs font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">
                    Este curso incluye
                  </p>
                  <ul className="flex flex-col gap-2">
                    {curso.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 className="size-4 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-center text-[var(--text-muted)] mt-4">
                  Garantía de satisfacción 7 días
                </p>
              </NeonCard>
            </div>
          </div>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Lo que aprenderás */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <NeonCard glow="none" className="p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Lo que aprenderás
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {curso.objetivos.map((obj) => (
                <div key={obj} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-secondary)]">{obj}</span>
                </div>
              ))}
            </div>
          </NeonCard>
        </div>
      </section>

      {/* Contenido del curso */}
      <section className="py-10 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
            Contenido del curso
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            {curso.modulos} módulos · {totalLecciones} lecciones · {curso.duracion}
          </p>

          <div className="flex flex-col gap-2">
            {curso.modulosDetalle.map((modulo, mi) => (
              <details
                key={mi}
                className="group border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--bg-elevated)] overflow-hidden"
                open={mi === 0}
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[var(--bg-overlay)] transition-colors">
                  <div>
                    <span className="font-semibold text-[var(--text-primary)] text-sm">
                      {modulo.titulo}
                    </span>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{modulo.descripcion}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-[var(--text-muted)]">
                      {modulo.lecciones.length} lecciones
                    </span>
                    <ChevronDown className="size-4 text-[var(--text-muted)] group-open:rotate-180 transition-transform" />
                  </div>
                </summary>
                <div className="border-t border-[var(--border-subtle)]">
                  {modulo.lecciones.map((leccion, li) => (
                    <div
                      key={li}
                      className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-subtle)] last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {leccion.libre ? (
                          <PlayCircle className="size-4 text-[var(--neon-cyan)] shrink-0" />
                        ) : (
                          <Lock className="size-4 text-[var(--text-muted)] shrink-0" />
                        )}
                        <span className="text-sm text-[var(--text-secondary)]">{leccion.titulo}</span>
                        {leccion.libre && (
                          <span className="text-xs text-[var(--neon-cyan)] border border-[var(--neon-cyan-dim)] px-2 py-0.5 rounded-full">
                            Gratis
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[var(--text-muted)] shrink-0 ml-4">
                        {leccion.duracion}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      {/* Requisitos */}
      <section className="py-16 bg-[var(--bg-elevated)]">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
            Requisitos
          </h2>
          <ul className="flex flex-col gap-3">
            {curso.requisitos.map((req) => (
              <li key={req} className="flex items-start gap-3 text-[var(--text-secondary)]">
                <FileText className="size-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Acceso inmediato al contenido. Garantía de 7 días.
          </p>
          <BuyButton
            courseSlug={curso.slug}
            label={
              curso.is_free
                ? "Inscribirse gratis"
                : `Comprar por $${curso.precio_clp.toLocaleString("es-CL")} CLP`
            }
            className="max-w-sm mx-auto"
          />
        </div>
      </section>
    </>
  )
}
