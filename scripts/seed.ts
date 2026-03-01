/**
 * Seed script for Visual Art AI
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *   npx tsx scripts/seed.ts --reset   (drops enrollments first)
 *   npx tsx scripts/seed.ts --admin-only
 *
 * Requires:
 *   - DATABASE_URL in .env.local
 *   - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for creating users
 */

import "dotenv/config"
import { createClient } from "@supabase/supabase-js"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { eq, and } from "drizzle-orm"
import {
  profiles,
  courses,
  modules,
  lessons,
  resources,
  enrollments,
} from "../src/db/schema"

// ─── Config ──────────────────────────────────────────────────────────────────

const DATABASE_URL = process.env.DATABASE_URL!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!DATABASE_URL) throw new Error("DATABASE_URL is required")
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.warn("⚠️  Supabase env vars missing — user creation will be skipped")
}

const sql = postgres(DATABASE_URL, { prepare: false })
const db = drizzle(sql)

const supabaseAdmin =
  SUPABASE_URL && SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null

const args = process.argv.slice(2)
const RESET = args.includes("--reset")
const ADMIN_ONLY = args.includes("--admin-only")

// ─── Types ────────────────────────────────────────────────────────────────────

type LessonData = {
  slug: string
  title: string
  type: "video" | "text" | "mixed"
  durationMin: number
  sortOrder: number
  status: "draft" | "published"
}

type ModuleData = {
  id: string
  title: string
  lessons: LessonData[]
}

type CourseData = {
  slug: string
  title: string
  shortDescription: string
  route: "redes" | "productividad" | "empresas" | "dev" | "visual" | "musica" | "pro"
  level: "principiante" | "intermedio" | "avanzado"
  priceClp: number
  priceArs?: number
  isFree: boolean
  status: "draft" | "published" | "archived"
  version: string
  tags: string[]
  modules: ModuleData[]
}

// ─── Course A: Sistema IA Contenido Semanal ───────────────────────────────────

const COURSE_A: CourseData = {
  slug: "sistema-ia-contenido-semanal",
  title: "Sistema IA para Contenido Semanal (sin perder calidad)",
  shortDescription:
    "Produce 4 semanas de contenido auténtico en un domingo. El sistema que creadores reales ya usan para mantener consistencia sin sacrificar su voz.",
  route: "redes",
  level: "principiante",
  priceClp: 149000,
  priceArs: 89000,
  isFree: false,
  status: "published",
  version: "1.0",
  tags: ["ia", "redes sociales", "contenido", "automatización"],
  modules: [
    {
      id: "modulo-01",
      title: "Fundamentos útiles: qué es útil ahora, qué ignorar",
      lessons: [
        { slug: "bienvenida", title: "Bienvenida y panorama del curso", type: "video", durationMin: 8, sortOrder: 1, status: "published" },
        { slug: "estado-del-arte", title: "El estado actual de la IA: qué usar y qué ignorar", type: "mixed", durationMin: 18, sortOrder: 2, status: "published" },
        { slug: "mentalidad-correcta", title: "La mentalidad correcta: IA como asistente, tú como director", type: "text", durationMin: 12, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-02",
      title: "Estrategia de contenido con IA",
      lessons: [
        { slug: "estrategia-contenido", title: "Estrategia de contenido con IA: pilares, formatos y frecuencia", type: "mixed", durationMin: 25, sortOrder: 1, status: "published" },
        { slug: "investigacion-audiencia", title: "Investigación de audiencia con IA", type: "mixed", durationMin: 20, sortOrder: 2, status: "published" },
        { slug: "calendario-editorial", title: "Construir tu calendario editorial con IA", type: "video", durationMin: 22, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-03",
      title: "Producción masiva sin perder tu voz",
      lessons: [
        { slug: "prompts-voz-propia", title: "Prompts que mantienen tu voz auténtica", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "formatos-instagram", title: "Producción para Instagram: posts, carruseles y reels", type: "video", durationMin: 28, sortOrder: 2, status: "published" },
        { slug: "formatos-linkedin", title: "Producción para LinkedIn: hilos y artículos", type: "video", durationMin: 22, sortOrder: 3, status: "published" },
        { slug: "edicion-autenticidad", title: "El proceso de edición para preservar autenticidad", type: "text", durationMin: 15, sortOrder: 4, status: "published" },
      ],
    },
    {
      id: "modulo-04",
      title: "Creatividades visuales con IA",
      lessons: [
        { slug: "fundamentos-imagen", title: "Fundamentos de prompts para imagen generativa", type: "mixed", durationMin: 25, sortOrder: 1, status: "published" },
        { slug: "midjourney-workflow", title: "Workflow con Midjourney y DALL-E", type: "video", durationMin: 35, sortOrder: 2, status: "published" },
        { slug: "canva-ia", title: "Integrar IA en tu flujo de Canva", type: "video", durationMin: 20, sortOrder: 3, status: "published" },
        { slug: "qa-creatividades", title: "QA de creatividades: el checklist de calidad", type: "mixed", durationMin: 12, sortOrder: 4, status: "published" },
      ],
    },
    {
      id: "modulo-05",
      title: "Publicación, métricas y aprendizaje",
      lessons: [
        { slug: "scheduling-ia", title: "Scheduling inteligente: cuándo y con qué frecuencia", type: "mixed", durationMin: 18, sortOrder: 1, status: "published" },
        { slug: "metricas-importan", title: "Las métricas que realmente importan (y las que ignorar)", type: "text", durationMin: 15, sortOrder: 2, status: "published" },
        { slug: "iterar-con-datos", title: "Cómo usar datos para mejorar tu sistema semana a semana", type: "mixed", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-06",
      title: "Tu SOP semanal: el sistema completo",
      lessons: [
        { slug: "sop-semanal", title: "Tu SOP semanal: el sistema completo", type: "mixed", durationMin: 35, sortOrder: 1, status: "published" },
        { slug: "automatizacion-avanzada", title: "Automatización avanzada con Make y Zapier", type: "video", durationMin: 30, sortOrder: 2, status: "published" },
        { slug: "siguiente-nivel", title: "El siguiente nivel: ¿qué sigue después?", type: "video", durationMin: 10, sortOrder: 3, status: "published" },
      ],
    },
  ],
}

// ─── Course B: Flujos IA Productividad ───────────────────────────────────────

const COURSE_B: CourseData = {
  slug: "flujos-ia-productividad",
  title: "Ahorra 5–10 horas/semana con Flujos IA",
  shortDescription:
    "Recupera tiempo que no debería haberse ido nunca. Automatiza reportes, emails, presentaciones y SOPs con flujos de IA que trabajan mientras tú piensas.",
  route: "productividad",
  level: "principiante",
  priceClp: 99000,
  priceArs: 59000,
  isFree: false,
  status: "published",
  version: "1.0",
  tags: ["ia", "productividad", "automatización", "flujos", "eficiencia"],
  modules: [
    {
      id: "modulo-01",
      title: "Diagnóstico de tiempo: dónde pierdes horas",
      lessons: [
        { slug: "diagnostico-tiempo", title: "Diagnóstico de tiempo: dónde pierdes realmente tus horas", type: "mixed", durationMin: 20, sortOrder: 1, status: "published" },
        { slug: "mapa-flujos", title: "Crear tu mapa de flujos actuales", type: "mixed", durationMin: 18, sortOrder: 2, status: "published" },
        { slug: "priorizar-automatizacion", title: "Cómo priorizar qué automatizar primero", type: "text", durationMin: 12, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-02",
      title: "Reportes y documentos automáticos",
      lessons: [
        { slug: "reporte-semanal-ia", title: "Reporte semanal automático con IA", type: "video", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "documentos-plantilla", title: "Documentos inteligentes con plantillas de IA", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "resumenes-reuniones", title: "Resúmenes de reuniones automáticos", type: "video", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-03",
      title: "Comunicación inteligente: emails y briefs",
      lessons: [
        { slug: "emails-10x-rapido", title: "Escribir emails 10x más rápido con IA", type: "mixed", durationMin: 25, sortOrder: 1, status: "published" },
        { slug: "briefs-creativos", title: "Briefs creativos perfectos en minutos", type: "mixed", durationMin: 20, sortOrder: 2, status: "published" },
        { slug: "comunicacion-equipo", title: "Comunicación de equipo: actualizaciones y reportes", type: "text", durationMin: 15, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-04",
      title: "Presentaciones profesionales en minutos",
      lessons: [
        { slug: "estructura-presentacion", title: "Estructurar presentaciones con IA en 5 minutos", type: "video", durationMin: 25, sortOrder: 1, status: "published" },
        { slug: "slides-ia", title: "Generar slides con IA: Gamma y alternativas", type: "video", durationMin: 30, sortOrder: 2, status: "published" },
        { slug: "datos-visualizacion", title: "Datos y visualizaciones con IA", type: "mixed", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-05",
      title: "SOPs que se generan solos",
      lessons: [
        { slug: "sop-ia", title: "Generar SOPs completos con IA", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "documentar-procesos", title: "Documentar procesos existentes con IA", type: "video", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "actualizar-sops", title: "Mantener y actualizar SOPs con IA", type: "text", durationMin: 15, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-06",
      title: "Seguridad, privacidad y límites del uso de IA",
      lessons: [
        { slug: "datos-sensibles", title: "Qué datos NUNCA poner en herramientas de IA", type: "text", durationMin: 15, sortOrder: 1, status: "published" },
        { slug: "politicas-empresa", title: "Políticas de uso de IA en empresas", type: "mixed", durationMin: 18, sortOrder: 2, status: "published" },
        { slug: "limites-ia", title: "Los límites reales de la IA: qué no puede hacer", type: "text", durationMin: 12, sortOrder: 3, status: "published" },
      ],
    },
  ],
}

// ─── Course C: Desarrollo Web con IA ─────────────────────────────────────────

const COURSE_C: CourseData = {
  slug: "desarrollo-web-ia",
  title: "Desarrollo Web con IA: del Brief al Deploy",
  shortDescription:
    "El workflow completo para construir apps web con Claude, Next.js, Supabase y Vercel. Del brief al deploy en un día. System prompts, MCP servers y dirección de arte incluidos.",
  route: "dev",
  level: "intermedio",
  priceClp: 199000,
  priceArs: 119000,
  isFree: false,
  status: "published",
  version: "1.0",
  tags: ["ia", "nextjs", "supabase", "vercel", "claude", "typescript", "desarrollo web", "mcp", "fullstack"],
  modules: [
    {
      id: "modulo-01",
      title: "El nuevo rol del dev con IA",
      lessons: [
        { slug: "mentalidad-dev-ia", title: "La mentalidad del dev asistido por IA", type: "text", durationMin: 20, sortOrder: 1, status: "published" },
        { slug: "stack-scaffold-proyecto", title: "El stack completo: scaffold en 10 minutos", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "primera-app-datos-reales", title: "Tu primera página con datos reales en 20 minutos", type: "mixed", durationMin: 25, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-02",
      title: "Claude como copiloto profesional",
      lessons: [
        { slug: "system-prompts-desarrollo", title: "System prompts que marcan la diferencia", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "skills-mcp-servers-desarrollo", title: "Skills y MCP servers: Claude conectado a todo", type: "mixed", durationMin: 35, sortOrder: 2, status: "published" },
        { slug: "notion-mcp-workflow-desarrollo", title: "Notion como cerebro del proyecto con MCP", type: "mixed", durationMin: 28, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-03",
      title: "Next.js + Vercel: del scaffold al deploy",
      lessons: [
        { slug: "nextjs-app-router-ia", title: "Next.js App Router: la estructura que funciona con IA", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "vercel-cicd-preview", title: "Vercel: CI/CD automático y preview environments", type: "mixed", durationMin: 22, sortOrder: 2, status: "published" },
        { slug: "errores-comunes-loop-ia", title: "Los errores más comunes y cómo el loop de IA los resuelve", type: "mixed", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-04",
      title: "Supabase: backend completo con IA",
      lessons: [
        { slug: "supabase-schema-ia", title: "Supabase: schema-first development con IA", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "auth-rls-supabase-ia", title: "Auth y RLS: seguridad real generada con IA", type: "mixed", durationMin: 32, sortOrder: 2, status: "published" },
        { slug: "queries-drizzle-edge-functions", title: "Queries con Drizzle y Edge Functions", type: "mixed", durationMin: 28, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-05",
      title: "Diseño y dirección de arte para devs",
      lessons: [
        { slug: "conceptos-diseno-dev", title: "Los 5 conceptos de diseño que todo dev debe saber", type: "text", durationMin: 22, sortOrder: 1, status: "published" },
        { slug: "arte-direccion-ia", title: "Dirección de arte con IA: de la referencia al código", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "design-system-practica", title: "Construir un design system con IA en una tarde", type: "mixed", durationMin: 30, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-06",
      title: "Proyecto real: del brief al deploy en un día",
      lessons: [
        { slug: "proyecto-brief-arquitectura", title: "Del brief a la arquitectura con Claude", type: "mixed", durationMin: 25, sortOrder: 1, status: "published" },
        { slug: "construccion-app-completa", title: "Construir la app completa en un día con Claude Code", type: "mixed", durationMin: 35, sortOrder: 2, status: "published" },
        { slug: "deploy-produccion", title: "Deploy, monetización y primeros usuarios", type: "mixed", durationMin: 28, sortOrder: 3, status: "published" },
      ],
    },
  ],
}

// ─── Course D: Imágenes Realistas Nano Banana ─────────────────────────────────

const COURSE_D: CourseData = {
  slug: "imagenes-realistas-nano-banana",
  title: "Imágenes Realistas con IA: Método Nano Banana",
  shortDescription:
    "El sistema de 4 capas que transforma tus prompts en imágenes que parecen fotos reales. Retratos, productos, interiores y escenas cinematográficas con calidad profesional.",
  route: "visual",
  level: "principiante",
  priceClp: 89000,
  priceArs: 52000,
  isFree: false,
  status: "published",
  version: "1.0",
  tags: ["ia", "imagen", "midjourney", "dalle", "flux", "prompts", "fotografía", "realismo", "nano banana"],
  modules: [
    {
      id: "modulo-01",
      title: "Cómo piensan los modelos de imagen",
      lessons: [
        { slug: "como-piensan-modelos-imagen", title: "Cómo piensan los modelos de imagen", type: "text", durationMin: 18, sortOrder: 1, status: "published" },
        { slug: "realismo-vs-hiperrealismo", title: "Realismo vs hiperrealismo: la diferencia que cambia todo", type: "text", durationMin: 15, sortOrder: 2, status: "published" },
        { slug: "herramientas-comparativa", title: "Las herramientas: cuál usar y cuándo", type: "mixed", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-02",
      title: "La anatomía del prompt perfecto",
      lessons: [
        { slug: "anatomia-prompt-imagen", title: "Anatomía del prompt: los 4 elementos que controlan todo", type: "mixed", durationMin: 22, sortOrder: 1, status: "published" },
        { slug: "iluminacion-camara-parametros", title: "Iluminación y cámara: los parámetros que hacen la diferencia", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "composicion-imagen-ia", title: "Composición: cómo dirigir el ojo dentro de la imagen", type: "text", durationMin: 18, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-03",
      title: "El Método Nano Banana",
      lessons: [
        { slug: "sistema-capas-nano-banana", title: "El sistema de 4 capas Nano Banana", type: "mixed", durationMin: 30, sortOrder: 1, status: "published" },
        { slug: "modificadores-clave-realismo", title: "Modificadores clave: las palabras que multiplican el realismo", type: "mixed", durationMin: 22, sortOrder: 2, status: "published" },
        { slug: "consistencia-entre-imagenes", title: "Consistencia entre imágenes: el reto más difícil", type: "mixed", durationMin: 20, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-04",
      title: "Estilos, referencias y moodboards de prompt",
      lessons: [
        { slug: "referencias-moodboards", title: "Referencias y moodboards: la base de todo buen resultado", type: "mixed", durationMin: 20, sortOrder: 1, status: "published" },
        { slug: "estilos-fotograficos", title: "Los 8 estilos fotográficos más buscados", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "estilo-cinematografico-profundo", title: "El estilo cinematográfico: fotografía que parece película", type: "mixed", durationMin: 22, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-05",
      title: "Casos avanzados: personas, productos y espacios",
      lessons: [
        { slug: "personas-hiperrealistas", title: "Personas hiperrealistas: el reto más difícil", type: "mixed", durationMin: 28, sortOrder: 1, status: "published" },
        { slug: "productos-espacios-comercial", title: "Productos y espacios: fotografía comercial con IA", type: "mixed", durationMin: 25, sortOrder: 2, status: "published" },
        { slug: "escenas-complejas-narrativa", title: "Escenas complejas: múltiples sujetos y narrativa", type: "mixed", durationMin: 22, sortOrder: 3, status: "published" },
      ],
    },
    {
      id: "modulo-06",
      title: "Flujo de producción y portfolio",
      lessons: [
        { slug: "batch-prompting-produccion-masiva", title: "Batch prompting: producir 50 imágenes en una tarde", type: "mixed", durationMin: 22, sortOrder: 1, status: "published" },
        { slug: "postproduccion-imagen-ia", title: "Post-producción: de bueno a excelente", type: "mixed", durationMin: 20, sortOrder: 2, status: "published" },
        { slug: "portfolio-cierre-curso", title: "Tu portfolio de imágenes IA y los próximos pasos", type: "mixed", durationMin: 18, sortOrder: 3, status: "published" },
      ],
    },
  ],
}

// ─── Resources ────────────────────────────────────────────────────────────────

const RESOURCES_DATA = [
  {
    slug: "checklist-creatividades",
    title: "Checklist QA de Creatividades con IA",
    description: "Lista de verificación para revisar creatividades generadas con IA antes de publicar. Evita los errores que delatan que fue 'hecho con IA'.",
    type: "checklist" as const,
    version: "1.0",
    tags: ["checklist", "creatividades", "calidad"],
    isFree: true,
    status: "published" as const,
  },
  {
    slug: "calendario-semanal-contenido",
    title: "Calendario Semanal de Contenido",
    description: "Template de calendario semanal para planificar un mes de contenido en una sesión de trabajo con IA.",
    type: "checklist" as const,
    version: "1.0",
    tags: ["checklist", "calendario", "planificación"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "checklist-seguridad-ia",
    title: "Checklist Seguridad y Privacidad con IA",
    description: "Qué datos proteger y cómo usar herramientas de IA sin exponer información sensible de tu empresa o clientes.",
    type: "checklist" as const,
    version: "1.0",
    tags: ["checklist", "seguridad", "privacidad"],
    isFree: true,
    status: "published" as const,
  },
  {
    slug: "prompts-redes-sociales",
    title: "Pack de Prompts para Redes Sociales (30 prompts)",
    description: "30 prompts probados para generar contenido auténtico en Instagram, LinkedIn y TikTok sin perder tu voz.",
    type: "prompt" as const,
    version: "1.0",
    tags: ["prompts", "redes sociales", "contenido"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "prompts-productividad",
    title: "Pack de Prompts de Productividad (25 prompts)",
    description: "25 prompts para emails, reportes, reuniones y documentación. Copia, adapta, recupera horas.",
    type: "prompt" as const,
    version: "1.0",
    tags: ["prompts", "productividad", "trabajo"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "prompts-presentaciones",
    title: "Pack de Prompts para Presentaciones (20 prompts)",
    description: "20 prompts para estructurar, redactar y diseñar presentaciones que convencen en menos tiempo del que tomas café.",
    type: "prompt" as const,
    version: "1.0",
    tags: ["prompts", "presentaciones", "slides"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "plantilla-brief-creativo",
    title: "Plantilla Brief Creativo con IA",
    description: "Template de brief creativo que le da a Claude el contexto exacto para producir sin adivinanzas.",
    type: "template" as const,
    version: "1.0",
    tags: ["template", "brief", "creativo"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "plantilla-sop-semanal",
    title: "Plantilla SOP Semanal de Contenido",
    description: "Template completo del SOP semanal: el mismo sistema que permite producir 4 semanas de contenido en un día.",
    type: "template" as const,
    version: "1.0",
    tags: ["template", "sop", "contenido"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "plantilla-reporte-mensual",
    title: "Plantilla Reporte Mensual con IA",
    description: "Template de reporte mensual listo para generar con IA. Llena el contexto, obtén el reporte.",
    type: "template" as const,
    version: "1.0",
    tags: ["template", "reporte", "mensual"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "guia-errores-comunes-ia",
    title: "Mini Guía: Errores Comunes al Usar IA para Contenido",
    description: "Los 7 errores que hacen que tu contenido IA suene como de IA. Cómo evitarlos desde hoy.",
    type: "guide" as const,
    version: "1.0",
    tags: ["guía", "errores", "ia"],
    isFree: true,
    status: "published" as const,
  },
  {
    slug: "guia-iterar-prompts",
    title: "Mini Guía: Cómo Iterar Prompts Efectivamente",
    description: "Framework para mejorar tus prompts de forma sistemática. De 'más o menos' a 'exactamente lo que quería'.",
    type: "guide" as const,
    version: "1.0",
    tags: ["guía", "prompts", "iteración"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "guia-metricas-importan",
    title: "Mini Guía: Las Métricas que Importan en Redes Sociales",
    description: "Cuáles métricas seguir para tomar decisiones reales, cuáles ignorar, y cómo interpretarlas sin perderte en números.",
    type: "guide" as const,
    version: "1.0",
    tags: ["guía", "métricas", "redes sociales"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "prompts-desarrollo-web",
    title: "Pack de Prompts para Desarrollo Web con Claude (20 prompts)",
    description: "20 prompts categorizados por fase de desarrollo: inicio de sesión, arquitectura, implementación, debugging y code review. Copia y empieza.",
    type: "prompt" as const,
    version: "1.0",
    tags: ["prompts", "desarrollo web", "claude code", "nextjs"],
    isFree: false,
    status: "published" as const,
  },
  {
    slug: "cheatsheet-mcp-servers",
    title: "Cheatsheet: MCP Servers para Claude Code",
    description: "Configuración completa de los 5 MCP servers más útiles: Notion, Supabase, GitHub, Vercel y Filesystem. Copia la config, conecta, trabaja.",
    type: "guide" as const,
    version: "1.0",
    tags: ["mcp", "claude code", "desarrollo web", "configuración"],
    isFree: true,
    status: "published" as const,
  },
  {
    slug: "prompts-imagen-realista",
    title: "Biblioteca de Prompts Nano Banana: 40 prompts listos para usar",
    description: "40 prompts completos organizados por categoría (retratos, producto, lifestyle, cinematográfico, ambientes). Listos para copiar en Midjourney, Flux o DALL·E 3.",
    type: "prompt" as const,
    version: "1.0",
    tags: ["prompts", "midjourney", "imagen", "nano banana", "fotografía"],
    isFree: false,
    status: "published" as const,
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed script...\n")

  if (ADMIN_ONLY) {
    await seedAdminUser()
    await sql.end()
    return
  }

  if (RESET) {
    console.log("🗑️  Resetting enrollment data...")
    await db.delete(enrollments)
    console.log("   enrollments cleared")
  }

  await seedResources()
  await seedCourse(COURSE_A)
  await seedCourse(COURSE_B)
  await seedCourse(COURSE_C)
  await seedCourse(COURSE_D)
  await seedAdminUser()

  console.log("\n✅ Seed complete!")
  await sql.end()
}

// ─── Seed functions ───────────────────────────────────────────────────────────

async function seedResources() {
  console.log("\n📚 Seeding resources...")

  for (const resource of RESOURCES_DATA) {
    const existing = await db
      .select({ id: resources.id })
      .from(resources)
      .where(eq(resources.slug, resource.slug))
      .limit(1)

    if (existing.length > 0) {
      await db
        .update(resources)
        .set({
          title: resource.title,
          description: resource.description,
          type: resource.type,
          version: resource.version,
          tags: resource.tags,
          isFree: resource.isFree,
          status: resource.status,
          updatedAt: new Date(),
        })
        .where(eq(resources.slug, resource.slug))
      console.log(`   ↻ Updated resource: ${resource.slug}`)
    } else {
      await db.insert(resources).values({
        slug: resource.slug,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        version: resource.version,
        tags: resource.tags,
        isFree: resource.isFree,
        status: resource.status,
        filePath: `resources/${resource.slug}.mdx`,
      })
      console.log(`   + Created resource: ${resource.slug}`)
    }
  }
}

async function seedCourse(courseData: CourseData) {
  console.log(`\n🎓 Seeding course: ${courseData.slug}`)

  // ── Upsert course ──
  const existingCourse = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, courseData.slug))
    .limit(1)

  let courseId: string

  if (existingCourse.length > 0) {
    await db
      .update(courses)
      .set({
        title: courseData.title,
        shortDescription: courseData.shortDescription,
        route: courseData.route,
        level: courseData.level,
        priceClp: courseData.priceClp,
        priceArs: courseData.priceArs ?? 0,
        isFree: courseData.isFree,
        status: courseData.status,
        version: courseData.version,
        tags: courseData.tags,
        updatedAt: new Date(),
      })
      .where(eq(courses.slug, courseData.slug))
    courseId = existingCourse[0].id
    console.log(`   ↻ Updated course: ${courseData.slug}`)
  } else {
    const [newCourse] = await db
      .insert(courses)
      .values({
        slug: courseData.slug,
        title: courseData.title,
        shortDescription: courseData.shortDescription,
        route: courseData.route,
        level: courseData.level,
        priceClp: courseData.priceClp,
        priceArs: courseData.priceArs ?? 0,
        isFree: courseData.isFree,
        status: courseData.status,
        version: courseData.version,
        tags: courseData.tags,
      })
      .returning({ id: courses.id })
    courseId = newCourse.id
    console.log(`   + Created course: ${courseData.slug} (${courseId})`)
  }

  // ── Fetch all existing modules for this course (for upsert matching) ──
  const existingModules = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, courseId))

  // ── Seed modules + lessons ──
  for (let modIdx = 0; modIdx < courseData.modules.length; modIdx++) {
    const mod = courseData.modules[modIdx]
    const sortOrder = modIdx + 1

    // Match by title (titles are stable across seed runs)
    const existingModule = existingModules.find((m) => m.title === mod.title)

    let moduleId: string

    if (existingModule) {
      await db
        .update(modules)
        .set({ title: mod.title, sortOrder })
        .where(eq(modules.id, existingModule.id))
      moduleId = existingModule.id
    } else {
      const [newModule] = await db
        .insert(modules)
        .values({
          courseId,
          title: mod.title,
          sortOrder,
        })
        .returning({ id: modules.id })
      moduleId = newModule.id
      console.log(`     + Module: ${mod.title}`)
    }

    // ── Seed lessons ──
    for (const lesson of mod.lessons) {
      const contentPath = `courses/${courseData.slug}/${mod.id}/${lesson.slug}.mdx`

      // Lessons have a slug field — use it as the stable identifier
      const existingLesson = await db
        .select({ id: lessons.id })
        .from(lessons)
        .where(and(eq(lessons.moduleId, moduleId), eq(lessons.slug, lesson.slug)))
        .limit(1)

      if (existingLesson.length > 0) {
        await db
          .update(lessons)
          .set({
            title: lesson.title,
            type: lesson.type,
            durationMin: lesson.durationMin,
            sortOrder: lesson.sortOrder,
            status: lesson.status,
            contentPath,
            updatedAt: new Date(),
          })
          .where(eq(lessons.id, existingLesson[0].id))
      } else {
        await db.insert(lessons).values({
          moduleId,
          slug: lesson.slug,
          title: lesson.title,
          type: lesson.type,
          durationMin: lesson.durationMin,
          sortOrder: lesson.sortOrder,
          status: lesson.status,
          contentPath,
        })
      }
    }

    console.log(`     ✓ Module ${sortOrder}: ${mod.lessons.length} lessons`)
  }
}

async function seedAdminUser() {
  if (!supabaseAdmin) {
    console.log("\n⚠️  Skipping admin user creation (Supabase env vars not configured)")
    return
  }

  console.log("\n👤 Seeding admin user...")

  const adminEmail = "admin@visualartai.cl"
  const adminPassword = "Admin123456!"

  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
  const existing = existingUsers?.users?.find((u) => u.email === adminEmail)

  let adminUserId: string

  if (existing) {
    adminUserId = existing.id
    console.log(`   ↻ Admin user already exists: ${adminEmail}`)
  } else {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { full_name: "Admin Visual Art AI" },
    })

    if (error || !data.user) {
      console.error("   ✗ Failed to create admin user:", error?.message)
      return
    }

    adminUserId = data.user.id
    console.log(`   + Created admin user: ${adminEmail}`)
  }

  const existingProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, adminUserId))
    .limit(1)

  if (existingProfile.length > 0) {
    await db
      .update(profiles)
      .set({ role: "admin", fullName: "Admin Visual Art AI", isActive: true })
      .where(eq(profiles.id, adminUserId))
    console.log(`   ✓ Admin role set for: ${adminEmail}`)
  } else {
    await db.insert(profiles).values({
      id: adminUserId,
      email: adminEmail,
      fullName: "Admin Visual Art AI",
      role: "admin",
      isActive: true,
    })
    console.log(`   + Admin profile created`)
  }

  console.log(`\n   📋 Admin credentials:`)
  console.log(`      Email:    ${adminEmail}`)
  console.log(`      Password: ${adminPassword}`)
  console.log(`      ⚠️  Change the password after first login!`)
}

// ─── Run ─────────────────────────────────────────────────────────────────────

main().catch((err) => {
  console.error("\n❌ Seed failed:", err)
  process.exit(1)
})
