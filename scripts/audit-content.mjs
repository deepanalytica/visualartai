#!/usr/bin/env node
/**
 * audit-content.mjs
 * Reports content completeness per course/lesson.
 * Shows which rich content fields are present (audio, video, slides, mindmap,
 * infographic, flashcards, quiz) and gives a % completeness score.
 *
 * Usage:
 *   node scripts/audit-content.mjs
 *   node scripts/audit-content.mjs --course [slug]
 *   node scripts/audit-content.mjs --json   # output machine-readable JSON
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const CONTENT_DIR = path.join(ROOT, "content", "courses")

const args = process.argv.slice(2)
const filterCourse = args[args.indexOf("--course") + 1] || null
const jsonOutput = args.includes("--json")

// ─── Parse MDX frontmatter (minimal) ─────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const fm = {}
  const lines = match[1].split("\n")

  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, val] = kv
    const v = val.trim()

    if (v === "" || v === "[]") {
      // Check if next lines are array items
      const subitems = []
      let j = i + 1
      while (j < lines.length && lines[j].startsWith("  ")) {
        subitems.push(lines[j].trim())
        j++
      }
      fm[key] = subitems.filter((l) => l.startsWith("- "))
      i = j - 1
    } else {
      // Strip quotes
      const stripped =
        (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
          ? v.slice(1, -1)
          : v
      fm[key] = stripped
    }
  }

  return fm
}

// ─── Audit fields ─────────────────────────────────────────────────────────────

const FIELDS = [
  { key: "title", label: "Título", critical: true },
  { key: "video_url", label: "Video", critical: false },
  { key: "audio_url", label: "Audio", critical: false },
  { key: "slides_url", label: "Slides", critical: false },
  { key: "mindmap_url", label: "Mapa", critical: false },
  { key: "infographic_url", label: "Infog.", critical: false },
  { key: "flashcards", label: "Flashc.", critical: false },
  { key: "quiz", label: "Quiz", critical: false },
]

const RICH_FIELDS = FIELDS.filter((f) => !f.critical)

function auditLesson(frontmatter) {
  const results = {}
  for (const field of FIELDS) {
    const val = frontmatter[field.key]
    if (field.key === "flashcards" || field.key === "quiz") {
      results[field.key] = Array.isArray(val) ? val.length > 0 : false
    } else {
      results[field.key] = !!val && val !== ""
    }
  }

  const richPresent = RICH_FIELDS.filter((f) => results[f.key]).length
  results._richScore = Math.round((richPresent / RICH_FIELDS.length) * 100)
  results._status = frontmatter.status || "draft"
  results._type = frontmatter.type || "mixed"
  return results
}

// ─── Collect ──────────────────────────────────────────────────────────────────

function collectCourse(cSlug) {
  const courseDir = path.join(CONTENT_DIR, cSlug)
  if (!fs.existsSync(courseDir)) return null

  const lessons = []
  const modDirs = fs
    .readdirSync(courseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  for (const mod of modDirs) {
    const modPath = path.join(courseDir, mod.name)
    const mdxFiles = fs
      .readdirSync(modPath)
      .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
      .sort()

    for (const file of mdxFiles) {
      const content = fs.readFileSync(path.join(modPath, file), "utf-8")
      const fm = parseFrontmatter(content)
      const audit = auditLesson(fm)
      lessons.push({
        module: mod.name,
        file,
        slug: file.replace(".mdx", "").replace(/^\d+-/, ""),
        title: fm.title || file,
        ...audit,
      })
    }
  }

  return lessons
}

// ─── Render ───────────────────────────────────────────────────────────────────

function icon(val) {
  return val ? "✓" : "·"
}

function scoreBar(pct) {
  const filled = Math.round(pct / 10)
  return "█".repeat(filled) + "░".repeat(10 - filled)
}

function printCourse(cSlug, lessons) {
  if (lessons.length === 0) {
    console.log(`  (sin lecciones MDX)\n`)
    return
  }

  const avgScore = Math.round(lessons.reduce((s, l) => s + l._richScore, 0) / lessons.length)
  const published = lessons.filter((l) => l._status === "published").length

  // Header
  console.log(
    `  ${"Lección".padEnd(36)} ${"Tít"} ${"Vid"} ${"Aud"} ${"Sld"} ${"Map"} ${"Inf"} ${"Fls"} ${"Qz"} ${"Score".padStart(5)}  Estado`
  )
  console.log("  " + "─".repeat(80))

  let lastMod = ""
  for (const l of lessons) {
    if (l.module !== lastMod) {
      if (lastMod !== "") console.log("")
      console.log(`  ▸ ${l.module}`)
      lastMod = l.module
    }

    const titleStr = l.title.length > 34 ? l.title.slice(0, 31) + "..." : l.title
    const bar = `${l._richScore}%`.padStart(4)
    const status = l._status === "published" ? "✓ pub" : "  draft"

    console.log(
      `    ${titleStr.padEnd(34)} ${icon(l.title)} ${icon(l.video_url)} ${icon(l.audio_url)} ${icon(l.slides_url)} ${icon(l.mindmap_url)} ${icon(l.infographic_url)} ${icon(l.flashcards)} ${icon(l.quiz)} ${bar}  ${status}`
    )
  }

  console.log("\n  " + "─".repeat(80))
  console.log(
    `  Resumen: ${lessons.length} lecciones · ${published} publicadas · Completitud promedio: ${avgScore}% ${scoreBar(avgScore)}\n`
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`❌ Directorio de contenido no encontrado: ${CONTENT_DIR}`)
  process.exit(1)
}

const courseSlugs = filterCourse
  ? [filterCourse]
  : fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()

if (courseSlugs.length === 0) {
  console.log("No se encontraron cursos en content/courses/")
  process.exit(0)
}

const report = {}

for (const cSlug of courseSlugs) {
  const lessons = collectCourse(cSlug)
  if (!lessons) {
    console.warn(`⚠ Curso no encontrado: ${cSlug}`)
    continue
  }
  report[cSlug] = lessons
}

if (jsonOutput) {
  // Machine-readable summary
  const summary = {}
  for (const [slug, lessons] of Object.entries(report)) {
    summary[slug] = {
      total: lessons.length,
      published: lessons.filter((l) => l._status === "published").length,
      avgRichScore: lessons.length
        ? Math.round(lessons.reduce((s, l) => s + l._richScore, 0) / lessons.length)
        : 0,
      withVideo: lessons.filter((l) => l.video_url).length,
      withAudio: lessons.filter((l) => l.audio_url).length,
      withSlides: lessons.filter((l) => l.slides_url).length,
      withMindmap: lessons.filter((l) => l.mindmap_url).length,
      withFlashcards: lessons.filter((l) => l.flashcards).length,
      withQuiz: lessons.filter((l) => l.quiz).length,
      lessons: lessons.map((l) => ({
        module: l.module,
        slug: l.slug,
        title: l.title,
        status: l._status,
        richScore: l._richScore,
      })),
    }
  }
  console.log(JSON.stringify(summary, null, 2))
  process.exit(0)
}

// ─── Pretty print ─────────────────────────────────────────────────────────────

console.log("\n" + "═".repeat(84))
console.log("  VAAI — Auditoría de Contenido    " + new Date().toLocaleDateString("es-CL"))
console.log("═".repeat(84))
console.log("")
console.log("  Leyenda: ✓ presente  · ausente    Columnas: Tít Vid Aud Sld Map Inf Fls Qz")
console.log("")

let grandTotal = 0
let grandPublished = 0
let grandScoreSum = 0
let grandCourses = 0

for (const [cSlug, lessons] of Object.entries(report)) {
  console.log(`📚 ${cSlug}`)
  printCourse(cSlug, lessons)

  grandTotal += lessons.length
  grandPublished += lessons.filter((l) => l._status === "published").length
  grandScoreSum += lessons.reduce((s, l) => s + l._richScore, 0)
  grandCourses++
}

const grandAvg = grandTotal ? Math.round(grandScoreSum / grandTotal) : 0

console.log("═".repeat(84))
console.log(`  TOTAL: ${grandCourses} cursos · ${grandTotal} lecciones · ${grandPublished} publicadas`)
console.log(`  Completitud del ecosistema: ${grandAvg}% ${scoreBar(grandAvg)}`)
console.log("═".repeat(84) + "\n")
