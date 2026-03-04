#!/usr/bin/env node
/**
 * format-notebooklm-export.mjs
 * Cleans up and formats NotebookLM text exports into MDX or JSON.
 *
 * Usage:
 *   node scripts/format-notebooklm-export.mjs \
 *     --input ./tmp/notebooklm-export.txt \
 *     --output ./content/courses/[slug]/[modulo]/01-leccion.mdx \
 *     --type lesson
 *
 *   Types: lesson | quiz | flashcards
 *
 * Optional: Set ANTHROPIC_API_KEY in .env to polish content with Claude.
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")

// ─── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

function getArg(flag) {
  const idx = args.indexOf(flag)
  return idx !== -1 ? args[idx + 1] : null
}

const inputPath = getArg("--input")
const outputPath = getArg("--output")
const type = getArg("--type") ?? "lesson"
const noAi = args.includes("--no-ai")

if (!inputPath || !outputPath) {
  console.error(
    "Usage: node scripts/format-notebooklm-export.mjs --input <file> --output <file> --type lesson|quiz|flashcards"
  )
  process.exit(1)
}

const inputFile = path.resolve(ROOT, inputPath)
if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`)
  process.exit(1)
}

// ─── Read input ───────────────────────────────────────────────────────────────

const raw = fs.readFileSync(inputFile, "utf-8")
console.log(`📄 Leyendo: ${inputPath} (${raw.length} chars)`)

// ─── Clean common NotebookLM artefacts ───────────────────────────────────────

function cleanText(text) {
  return (
    text
      // Remove source citations like [1], [2], [Source 1], etc.
      .replace(/\[\d+\]/g, "")
      .replace(/\[Source \d+\]/gi, "")
      // Remove trailing whitespace on each line
      .split("\n")
      .map((l) => l.trimEnd())
      .join("\n")
      // Collapse 3+ consecutive blank lines to 2
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

// ─── Parse quiz format ────────────────────────────────────────────────────────
// NotebookLM quiz output is typically:
// 1. Question text
//    A. Option A
//    B. Option B
//    C. Option C  ← correct (usually marked somehow)
//    D. Option D
// Answer: C
// Explanation: ...

function parseQuiz(text) {
  const questions = []
  const blocks = text
    .split(/\n(?=\d+\.\s)/)
    .map((b) => b.trim())
    .filter(Boolean)

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
    if (lines.length < 3) continue

    const question = lines[0].replace(/^\d+\.\s*/, "")
    const options = []
    let correct = 0
    let explanation = ""

    for (const line of lines.slice(1)) {
      const optMatch = line.match(/^([A-D])\.\s*(.+)/)
      if (optMatch) {
        options.push(optMatch[2])
      }
      const answerMatch = line.match(/^(?:Answer|Respuesta|Correct):\s*([A-D])/i)
      if (answerMatch) {
        correct = "ABCD".indexOf(answerMatch[1].toUpperCase())
      }
      const explMatch = line.match(/^(?:Explanation|Explicación):\s*(.+)/i)
      if (explMatch) {
        explanation = explMatch[1]
      }
    }

    if (question && options.length >= 2) {
      questions.push({ question, options, correct, ...(explanation ? { explanation } : {}) })
    }
  }

  return { title: "Quiz", passing_score: 70, questions }
}

// ─── Parse flashcards format ──────────────────────────────────────────────────
// NotebookLM flashcard output is typically:
// Front: question or term
// Back: answer or definition
// ---
// (or numbered like 1. Front: ... / Back: ...)

function parseFlashcards(text) {
  const cards = []
  // Split by separators: "---", blank line after a "Back:" line, or numbered cards
  const blocks = text
    .split(/\n---\n|\n\n(?=(?:\d+\.|Front:|Frente:))/i)
    .map((b) => b.trim())
    .filter(Boolean)

  for (const block of blocks) {
    const frontMatch = block.match(/^(?:Front|Frente|Pregunta|Term):\s*(.+)/im)
    const backMatch = block.match(/(?:Back|Reverso|Respuesta|Definition):\s*(.+)/im)
    if (frontMatch && backMatch) {
      cards.push({ front: frontMatch[1].trim(), back: backMatch[1].trim() })
    }
  }

  // Fallback: numbered pairs
  if (cards.length === 0) {
    const numbered = text.split(/\n(?=\d+\.)/)
    for (const block of numbered) {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean)
      if (lines.length >= 2) {
        const front = lines[0].replace(/^\d+\.\s*/, "")
        const back = lines[1]
        if (front && back) cards.push({ front, back })
      }
    }
  }

  return cards
}

// ─── Wrap in MDX lesson template ─────────────────────────────────────────────

function wrapAsLesson(content, outputFile) {
  const slug = path.basename(outputFile, ".mdx").replace(/^\d+-/, "")
  return `---
title: ""
slug: "${slug}"
type: "mixed"
video_url: ""
audio_url: ""
slides_url: ""
mindmap_url: ""
infographic_url: ""
duration_min: 20
status: "draft"
checklist:
  - ""
flashcards: []
quiz:
  title: ""
  passing_score: 70
  questions: []
notebooklm_source: ""
generated_at: "${new Date().toISOString().split("T")[0]}"
---

${content}
`
}

// ─── Optional Claude polish ───────────────────────────────────────────────────

async function polishWithClaude(text, contentType) {
  // Try to load dotenv
  try {
    const { config } = await import("dotenv")
    config({ path: path.join(ROOT, ".env.local") })
    config({ path: path.join(ROOT, ".env") })
  } catch {}

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  console.log("🤖 Puliendo contenido con Claude...")

  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk")
    const client = new Anthropic({ apiKey })

    const systemPrompts = {
      lesson: `Eres un editor de contenido educativo para una plataforma de cursos de IA premium en español latinoamericano.
Mejora el siguiente texto manteniendo:
- Voz directa, práctica y motivadora
- Estructura clara con secciones (## Introducción, ## Contenido, ## Puntos Clave, ## Práctica)
- Ejemplos concretos y aplicables
- Terminología técnica precisa pero accesible
Devuelve SOLO el texto mejorado en Markdown, sin frontmatter.`,
      quiz: `Eres un experto en evaluación educativa. Mejora estas preguntas de quiz en español:
- Preguntas claras y sin ambigüedad
- Opciones de respuesta plausibles pero con una claramente correcta
- Explicaciones breves y útiles
Devuelve el texto mejorado manteniendo el mismo formato.`,
      flashcards: `Eres un experto en aprendizaje espaciado. Mejora estas flashcards en español:
- Frente: conciso, una idea por tarjeta
- Reverso: respuesta completa pero breve
Devuelve las tarjetas mejoradas en el mismo formato.`,
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: systemPrompts[contentType] ?? systemPrompts.lesson,
      messages: [{ role: "user", content: text }],
    })

    return message.content[0].type === "text" ? message.content[0].text : null
  } catch (err) {
    console.warn("⚠ Claude polish failed:", err.message)
    return null
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

let cleaned = cleanText(raw)

// Optionally polish with Claude
if (!noAi) {
  const polished = await polishWithClaude(cleaned, type)
  if (polished) {
    cleaned = polished
    console.log("✨ Contenido mejorado con Claude")
  }
}

let output = ""

if (type === "quiz") {
  const quiz = parseQuiz(cleaned)
  output = JSON.stringify(quiz, null, 2)
  console.log(`📝 Parseadas ${quiz.questions.length} preguntas`)
} else if (type === "flashcards") {
  const cards = parseFlashcards(cleaned)
  output = JSON.stringify(cards, null, 2)
  console.log(`🃏 Parseadas ${cards.length} tarjetas`)
} else {
  // lesson
  output = wrapAsLesson(cleaned, outputPath)
}

// Ensure output directory exists
const outFile = path.resolve(ROOT, outputPath)
const outDir = path.dirname(outFile)
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(outFile, output, "utf-8")
console.log(`\n✅ Guardado en: ${outputPath}`)

if (type === "lesson") {
  console.log("\n   Próximos pasos:")
  console.log("   1. Agrega el título, video_url y otros campos en el frontmatter")
  console.log("   2. Pega las flashcards (JSON) en el campo flashcards[]")
  console.log("   3. Pega el quiz (JSON) en el campo quiz.questions[]")
  console.log("   4. Cambia status a 'published' cuando esté listo")
}
