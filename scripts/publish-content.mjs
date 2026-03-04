#!/usr/bin/env node
/**
 * publish-content.mjs
 * Reads MDX lesson files from /content/courses/ and upserts them into Supabase.
 * Syncs: lessons + quizzes + flashcard_decks tables.
 *
 * Usage:
 *   node scripts/publish-content.mjs --course [slug]
 *   node scripts/publish-content.mjs --course [slug] --module [module-dir]
 *   node scripts/publish-content.mjs --course [slug] --lesson [lesson-slug]
 *   node scripts/publish-content.mjs --all          # process every course
 *   node scripts/publish-content.mjs --dry-run      # preview without writing
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const CONTENT_DIR = path.join(ROOT, "content", "courses")

// ─── Parse args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

function getArg(flag) {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const courseSlug = getArg("--course")
const moduleDir = getArg("--module")
const lessonSlug = getArg("--lesson")
const processAll = args.includes("--all")
const dryRun = args.includes("--dry-run")

if (!courseSlug && !processAll) {
  console.error("Usage: node scripts/publish-content.mjs --course <slug> [--module <dir>] [--lesson <slug>]")
  console.error("       node scripts/publish-content.mjs --all [--dry-run]")
  process.exit(1)
}

if (dryRun) {
  console.log("🔍 DRY RUN — no changes will be written to DB\n")
}

// ─── Load env + DB client ─────────────────────────────────────────────────────

try {
  const { config } = await import("dotenv")
  config({ path: path.join(ROOT, ".env.local") })
  config({ path: path.join(ROOT, ".env") })
} catch {}

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not set in .env.local or .env")
  process.exit(1)
}

// Dynamically import postgres + drizzle
const { default: postgres } = await import("postgres")
const { drizzle } = await import("drizzle-orm/postgres-js")
const { sql } = await import("drizzle-orm")

const client = postgres(DATABASE_URL, { max: 1 })
const db = drizzle(client)

// ─── Parse MDX frontmatter ────────────────────────────────────────────────────

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { frontmatter: {}, body: fileContent }

  const yamlStr = match[1]
  const body = fileContent.slice(match[0].length).trim()

  // Minimal YAML parser for our frontmatter (handles strings, numbers, booleans, arrays of objects)
  const frontmatter = {}
  const lines = yamlStr.split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const keyMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!keyMatch) { i++; continue }

    const key = keyMatch[1]
    const value = keyMatch[2].trim()

    if (value === "" || value === "|" || value === ">") {
      // Could be a block or array — collect indented lines
      const indented = []
      i++
      while (i < lines.length && (lines[i].startsWith("  ") || lines[i].trim() === "")) {
        indented.push(lines[i])
        i++
      }
      // Try to detect array of objects vs multiline string
      const trimmed = indented.map((l) => l.trimStart())
      if (trimmed[0]?.startsWith("- ")) {
        // array
        frontmatter[key] = parseYamlArray(indented)
      } else {
        frontmatter[key] = indented.map((l) => l.replace(/^  /, "")).join("\n").trim()
      }
    } else if (value === "[]") {
      frontmatter[key] = []
      i++
    } else if (value === "{}") {
      frontmatter[key] = {}
      i++
    } else {
      frontmatter[key] = parseScalar(value)
      i++
    }
  }

  return { frontmatter, body }
}

function parseScalar(val) {
  if (val === "true") return true
  if (val === "false") return false
  if (val === "null" || val === "~" || val === '""' || val === "''") return null
  if (!isNaN(Number(val)) && val !== "") return Number(val)
  // Strip surrounding quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1)
  }
  return val
}

function parseYamlArray(lines) {
  // Parse simple "-" arrays and "- key: value" object arrays
  const items = []
  let current = null

  for (const line of lines) {
    const stripped = line.trim()
    if (stripped.startsWith("- ")) {
      const rest = stripped.slice(2)
      const kvMatch = rest.match(/^(\w+):\s*(.*)$/)
      if (kvMatch) {
        if (current !== null) items.push(current)
        current = { [kvMatch[1]]: parseScalar(kvMatch[2]) }
      } else {
        if (current !== null) items.push(current)
        current = parseScalar(rest)
      }
    } else if (stripped.match(/^(\w+):\s*(.*)$/) && current !== null && typeof current === "object") {
      const kvMatch = stripped.match(/^(\w+):\s*(.*)$/)
      current[kvMatch[1]] = parseScalar(kvMatch[2])
    }
  }
  if (current !== null) items.push(current)
  return items
}

// ─── Collect MDX files ────────────────────────────────────────────────────────

function collectMdxFiles(cSlug, mDir, lSlug) {
  const courseDir = path.join(CONTENT_DIR, cSlug)
  if (!fs.existsSync(courseDir)) {
    console.warn(`⚠ Course directory not found: ${courseDir}`)
    return []
  }

  const files = []
  const moduleDirs = fs
    .readdirSync(courseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  for (const mod of moduleDirs) {
    if (mDir && mod.name !== mDir) continue

    const modPath = path.join(courseDir, mod.name)
    const mdxFiles = fs
      .readdirSync(modPath)
      .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
      .sort()

    for (const file of mdxFiles) {
      const slug = file.replace(".mdx", "").replace(/^\d+-/, "")
      if (lSlug && slug !== lSlug) continue
      files.push({
        courseSlug: cSlug,
        moduleDir: mod.name,
        lessonSlug: slug,
        lessonFile: file,
        fullPath: path.join(modPath, file),
        contentPath: `courses/${cSlug}/${mod.name}/${file}`,
      })
    }
  }

  return files
}

// ─── DB upsert helpers ────────────────────────────────────────────────────────

async function getCourseId(slug) {
  const rows = await db.execute(
    sql`SELECT id FROM courses WHERE slug = ${slug} LIMIT 1`
  )
  return rows[0]?.id ?? null
}

async function getOrCreateModule(courseId, moduleDir) {
  // Module slug = moduleDir (e.g. "modulo-01")
  const existing = await db.execute(
    sql`SELECT id FROM modules WHERE course_id = ${courseId} AND slug = ${moduleDir} LIMIT 1`
  )
  if (existing[0]) return existing[0].id

  // Create module
  const created = await db.execute(sql`
    INSERT INTO modules (id, course_id, slug, title, sort_order, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      ${courseId},
      ${moduleDir},
      ${moduleDir},
      ${parseInt(moduleDir.replace(/\D+/g, "") || "0")},
      now(),
      now()
    )
    RETURNING id
  `)
  console.log(`  📦 Módulo creado: ${moduleDir}`)
  return created[0].id
}

async function upsertLesson(moduleId, file, frontmatter, body) {
  const existing = await db.execute(
    sql`SELECT id FROM lessons WHERE module_id = ${moduleId} AND slug = ${file.lessonSlug} LIMIT 1`
  )

  const sortOrder = parseInt(file.lessonFile.replace(/\D+.*/, "") || "0")
  const lessonData = {
    module_id: moduleId,
    slug: file.lessonSlug,
    title: frontmatter.title || file.lessonSlug,
    description: frontmatter.description || null,
    type: frontmatter.type || "mixed",
    status: frontmatter.status || "draft",
    sort_order: sortOrder,
    content_path: file.contentPath,
    video_url: frontmatter.video_url || null,
    audio_url: frontmatter.audio_url || null,
    slides_url: frontmatter.slides_url || null,
    mindmap_url: frontmatter.mindmap_url || null,
    infographic_url: frontmatter.infographic_url || null,
    duration_min: frontmatter.duration_min || 20,
  }

  let lessonId
  if (existing[0]) {
    lessonId = existing[0].id
    await db.execute(sql`
      UPDATE lessons SET
        title = ${lessonData.title},
        description = ${lessonData.description},
        type = ${lessonData.type}::lesson_type,
        status = ${lessonData.status}::lesson_status,
        sort_order = ${lessonData.sort_order},
        content_path = ${lessonData.content_path},
        video_url = ${lessonData.video_url},
        audio_url = ${lessonData.audio_url},
        slides_url = ${lessonData.slides_url},
        mindmap_url = ${lessonData.mindmap_url},
        infographic_url = ${lessonData.infographic_url},
        duration_min = ${lessonData.duration_min},
        updated_at = now()
      WHERE id = ${lessonId}
    `)
  } else {
    const created = await db.execute(sql`
      INSERT INTO lessons (id, module_id, slug, title, description, type, status, sort_order,
        content_path, video_url, audio_url, slides_url, mindmap_url, infographic_url, duration_min,
        created_at, updated_at)
      VALUES (
        gen_random_uuid(), ${lessonData.module_id}, ${lessonData.slug}, ${lessonData.title},
        ${lessonData.description}, ${lessonData.type}::lesson_type, ${lessonData.status}::lesson_status,
        ${lessonData.sort_order}, ${lessonData.content_path}, ${lessonData.video_url},
        ${lessonData.audio_url}, ${lessonData.slides_url}, ${lessonData.mindmap_url},
        ${lessonData.infographic_url}, ${lessonData.duration_min}, now(), now()
      )
      RETURNING id
    `)
    lessonId = created[0].id
  }

  return lessonId
}

async function upsertQuiz(lessonId, quiz) {
  if (!quiz || !quiz.questions?.length) return

  const existing = await db.execute(
    sql`SELECT id FROM quizzes WHERE lesson_id = ${lessonId} LIMIT 1`
  )

  if (existing[0]) {
    await db.execute(sql`
      UPDATE quizzes SET
        title = ${quiz.title || "Quiz"},
        questions = ${JSON.stringify(quiz.questions)}::jsonb,
        passing_score = ${quiz.passing_score || 70},
        updated_at = now()
      WHERE lesson_id = ${lessonId}
    `)
  } else {
    await db.execute(sql`
      INSERT INTO quizzes (id, lesson_id, title, questions, passing_score, created_at, updated_at)
      VALUES (
        gen_random_uuid(), ${lessonId}, ${quiz.title || "Quiz"},
        ${JSON.stringify(quiz.questions)}::jsonb, ${quiz.passing_score || 70}, now(), now()
      )
    `)
  }
}

async function upsertFlashcards(lessonId, cards) {
  if (!cards?.length) return

  const existing = await db.execute(
    sql`SELECT id FROM flashcard_decks WHERE lesson_id = ${lessonId} LIMIT 1`
  )

  if (existing[0]) {
    await db.execute(sql`
      UPDATE flashcard_decks SET
        cards = ${JSON.stringify(cards)}::jsonb,
        updated_at = now()
      WHERE lesson_id = ${lessonId}
    `)
  } else {
    await db.execute(sql`
      INSERT INTO flashcard_decks (id, lesson_id, cards, created_at, updated_at)
      VALUES (gen_random_uuid(), ${lessonId}, ${JSON.stringify(cards)}::jsonb, now(), now())
    `)
  }
}

// ─── Process one file ─────────────────────────────────────────────────────────

async function processFile(courseId, file) {
  const raw = fs.readFileSync(file.fullPath, "utf-8")
  const { frontmatter, body } = parseFrontmatter(raw)

  const label = `${file.moduleDir}/${file.lessonFile}`

  if (dryRun) {
    const hasDeck = frontmatter.flashcards?.length > 0
    const hasQuiz = frontmatter.quiz?.questions?.length > 0
    console.log(`  📄 ${label}`)
    console.log(`     title: ${frontmatter.title || "(vacío)"}`)
    console.log(`     status: ${frontmatter.status || "draft"}`)
    console.log(`     flashcards: ${hasDeck ? frontmatter.flashcards.length : 0}`)
    console.log(`     quiz: ${hasQuiz ? frontmatter.quiz.questions.length + " preguntas" : "—"}`)
    return
  }

  const moduleId = await getOrCreateModule(courseId, file.moduleDir)
  const lessonId = await upsertLesson(moduleId, file, frontmatter, body)

  const extras = []
  if (frontmatter.quiz?.questions?.length) {
    await upsertQuiz(lessonId, frontmatter.quiz)
    extras.push(`quiz(${frontmatter.quiz.questions.length}q)`)
  }
  if (frontmatter.flashcards?.length) {
    await upsertFlashcards(lessonId, frontmatter.flashcards)
    extras.push(`flashcards(${frontmatter.flashcards.length})`)
  }

  const extrasStr = extras.length ? ` + ${extras.join(", ")}` : ""
  console.log(`  ✅ ${label} → ${frontmatter.title || file.lessonSlug}${extrasStr}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const coursesToProcess = processAll
  ? fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [courseSlug]

let totalFiles = 0
let totalErrors = 0

for (const cSlug of coursesToProcess) {
  console.log(`\n📚 Curso: ${cSlug}`)

  const files = collectMdxFiles(cSlug, moduleDir, lessonSlug)
  if (files.length === 0) {
    console.log("   (sin archivos MDX encontrados)")
    continue
  }

  let courseId = null
  if (!dryRun) {
    courseId = await getCourseId(cSlug)
    if (!courseId) {
      console.warn(`  ⚠ Curso "${cSlug}" no encontrado en DB. Crea el curso primero.`)
      console.warn(`    Inserta el registro en la tabla 'courses' con slug="${cSlug}".`)
      continue
    }
  }

  for (const file of files) {
    try {
      await processFile(courseId, file)
      totalFiles++
    } catch (err) {
      console.error(`  ❌ Error en ${file.lessonFile}: ${err.message}`)
      totalErrors++
    }
  }
}

await client.end()

console.log(`\n${"─".repeat(50)}`)
if (dryRun) {
  console.log(`🔍 DRY RUN completado — ${totalFiles} archivos analizados, ${totalErrors} errores`)
  console.log("   Ejecuta sin --dry-run para aplicar los cambios.")
} else {
  console.log(`✅ Publicación completada — ${totalFiles} lecciones procesadas, ${totalErrors} errores`)
}
