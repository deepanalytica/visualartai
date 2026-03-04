#!/usr/bin/env node
/**
 * create-course.mjs
 * Scaffolds a new course directory structure from a JSON config file.
 *
 * Usage:
 *   node scripts/create-course.mjs --config scripts/courses-config/nombre-curso.json
 *
 * The config JSON format:
 * {
 *   "slug": "nombre-del-curso",
 *   "title": "Título del Curso",
 *   "route": "productividad",
 *   "level": "principiante",
 *   "version": "1.0",
 *   "status": "draft",
 *   "price_clp": 99000,
 *   "price_ars": 59000,
 *   "description": "Descripción corta del curso",
 *   "objectives": ["objetivo 1", "objetivo 2"],
 *   "requirements": ["requisito 1"],
 *   "tags": ["ia", "productividad"],
 *   "instructor_name": "Alejandro",
 *   "modules": [
 *     {
 *       "id": "modulo-01",
 *       "title": "Nombre del Módulo 1",
 *       "lessons": [
 *         { "slug": "nombre-leccion", "title": "Título de la lección", "type": "mixed", "duration_min": 20 }
 *       ]
 *     }
 *   ]
 * }
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const CONTENT_DIR = path.join(ROOT, "content", "courses")

// ─── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const configIdx = args.indexOf("--config")
if (configIdx === -1 || !args[configIdx + 1]) {
  console.error("Usage: node scripts/create-course.mjs --config <path-to-config.json>")
  process.exit(1)
}

const configPath = path.resolve(ROOT, args[configIdx + 1])
if (!fs.existsSync(configPath)) {
  console.error(`Config not found: ${configPath}`)
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

// ─── Validate ────────────────────────────────────────────────────────────────

const required = ["slug", "title", "route", "level", "description", "modules"]
for (const field of required) {
  if (!config[field]) {
    console.error(`Missing required field: ${field}`)
    process.exit(1)
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function write(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.warn(`  ⚠ Already exists, skipping: ${path.relative(ROOT, filePath)}`)
    return
  }
  fs.writeFileSync(filePath, content, "utf-8")
  console.log(`  ✓ ${path.relative(ROOT, filePath)}`)
}

function lessonTemplate(lesson, sortOrder) {
  const type = lesson.type ?? "mixed"
  return `---
title: "${lesson.title}"
slug: "${lesson.slug}"
type: "${type}"
${type === "video" || type === "mixed" || type === "rich" ? `video_url: ""` : ""}
audio_url: ""
slides_url: ""
mindmap_url: ""
infographic_url: ""
duration_min: ${lesson.duration_min ?? 20}
sort_order: ${sortOrder}
status: "draft"
checklist:
  - ""
resources:
  - title: ""
    path: ""
flashcards:
  - front: ""
    back: ""
quiz:
  title: "Quiz: ${lesson.title}"
  passing_score: 70
  questions:
    - question: ""
      options: ["", "", "", ""]
      correct: 0
      explanation: ""
notebooklm_source: ""
generated_at: ""
---

# ${lesson.title}

<!-- Pega aquí el contenido generado desde NotebookLM (Informe) -->

## Introducción



## Contenido Principal



## Puntos Clave

-
-
-

## Práctica

<!-- Ejercicio o aplicación práctica -->

`
}

// ─── Generate ─────────────────────────────────────────────────────────────────

const courseDir = path.join(CONTENT_DIR, config.slug)
mkdirp(courseDir)

// Course index.mdx
const objectives = (config.objectives ?? []).map((o) => `  - "${o}"`).join("\n")
const requirements = (config.requirements ?? []).map((r) => `  - "${r}"`).join("\n")
const tags = (config.tags ?? []).map((t) => `"${t}"`).join(", ")
const modulesYaml = (config.modules ?? [])
  .map((m) => `  - id: "${m.id}"\n    title: "${m.title}"`)
  .join("\n")

const courseIndex = `---
title: "${config.title}"
slug: "${config.slug}"
route: "${config.route}"
level: "${config.level}"
version: "${config.version ?? "1.0"}"
status: "${config.status ?? "draft"}"
price_clp: ${config.price_clp ?? 0}
price_ars: ${config.price_ars ?? 0}
is_free: ${config.is_free ?? false}
duration_minutes: 0
description: "${config.description}"
objectives:
${objectives || '  - ""'}
requirements:
${requirements || '  - ""'}
tags: [${tags}]
thumbnail: "/images/courses/${config.slug}/thumbnail.webp"
instructor_name: "${config.instructor_name ?? ""}"
modules:
${modulesYaml}
---

# ${config.title}

<!-- Descripción larga del curso generada desde NotebookLM -->

`

write(path.join(courseDir, "index.mdx"), courseIndex)

// Modules and lessons
let totalLessons = 0

for (const mod of config.modules ?? []) {
  const moduleDir = path.join(courseDir, mod.id)
  mkdirp(moduleDir)

  for (let i = 0; i < (mod.lessons ?? []).length; i++) {
    const lesson = mod.lessons[i]
    const num = String(i + 1).padStart(2, "0")
    const filename = `${num}-${lesson.slug}.mdx`
    const filePath = path.join(moduleDir, filename)
    write(filePath, lessonTemplate(lesson, i + 1))
    totalLessons++
  }
}

// Also create courses-config dir if needed
mkdirp(path.join(ROOT, "scripts", "courses-config"))

console.log(`\n✅ Curso creado: ${config.title}`)
console.log(`   Módulos: ${config.modules.length} | Lecciones: ${totalLessons}`)
console.log(`   Directorio: content/courses/${config.slug}/`)
console.log(`\n   Próximos pasos:`)
console.log(`   1. Abre NotebookLM y crea el notebook "vaai-${config.slug}"`)
console.log(`   2. Sube tus fuentes al notebook`)
console.log(`   3. Genera: Mapa Mental → Informe por módulo → Tarjetas → Quiz`)
console.log(`   4. Pega el contenido en cada archivo .mdx`)
console.log(`   5. Ejecuta: node scripts/publish-content.mjs --course ${config.slug}`)
