import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, modules, lessons, quizzes, flashcardDecks } from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"
import { sql } from "drizzle-orm"

function parseFrontmatter(content: string): { fm: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { fm: {}, body: content }

  const body = content.slice(match[0].length).trim()
  const fm: Record<string, unknown> = {}
  const lines = match[1].split("\n")

  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, val] = kv
    const v = val.trim()

    if (v === "" || v === "[]") {
      const subitems: string[] = []
      let j = i + 1
      while (j < lines.length && lines[j].startsWith("  ")) {
        subitems.push(lines[j].trim())
        j++
      }
      fm[key] = subitems.filter((l) => l.startsWith("- "))
      i = j - 1
    } else {
      const stripped =
        (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
          ? v.slice(1, -1)
          : v
      const asNum = Number(stripped)
      fm[key] = !isNaN(asNum) && stripped !== "" ? asNum : stripped
    }
  }

  return { fm, body }
}

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()
  if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await req.json()
  const { contentPath } = body as { contentPath?: string }

  if (!contentPath) {
    return NextResponse.json({ error: "contentPath required" }, { status: 400 })
  }

  // contentPath: "courses/[courseSlug]/[moduleDir]/[file].mdx"
  const parts = contentPath.split("/")
  if (parts.length !== 4 || parts[0] !== "courses") {
    return NextResponse.json({ error: "Invalid contentPath format" }, { status: 400 })
  }

  const [, courseSlug, moduleDir, fileName] = parts
  const lessonSlug = fileName.replace(".mdx", "").replace(/^\d+-/, "")

  const filePath = path.join(process.cwd(), "content", contentPath)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  const rawContent = fs.readFileSync(filePath, "utf-8")
  const { fm } = parseFrontmatter(rawContent)

  // Get course
  const [course] = await db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1)
  if (!course) {
    return NextResponse.json(
      { error: `Course "${courseSlug}" not found in DB. Create it first.` },
      { status: 422 }
    )
  }

  // Get or create module
  let [mod] = await db
    .select()
    .from(modules)
    .where(and(eq(modules.courseId, course.id), eq(modules.slug, moduleDir)))
    .limit(1)

  if (!mod) {
    const sortNum = parseInt(moduleDir.replace(/\D+/g, "") || "0")
    const [created] = await db
      .insert(modules)
      .values({
        courseId: course.id,
        slug: moduleDir,
        title: moduleDir,
        sortOrder: sortNum,
      })
      .returning()
    mod = created
  }

  // Upsert lesson
  const sortOrder = parseInt(fileName.replace(/\D+.*/, "") || "0")
  const lessonValues = {
    moduleId: mod.id,
    slug: lessonSlug,
    title: (fm.title as string) || lessonSlug,
    description: (fm.description as string) || null,
    type: ((fm.type as string) || "mixed") as "video" | "text" | "mixed" | "rich",
    status: ((fm.status as string) || "draft") as "draft" | "published",
    sortOrder,
    contentPath,
    videoUrl: (fm.video_url as string) || null,
    audioUrl: (fm.audio_url as string) || null,
    slidesUrl: (fm.slides_url as string) || null,
    mindmapUrl: (fm.mindmap_url as string) || null,
    infographicUrl: (fm.infographic_url as string) || null,
    durationMin: (fm.duration_min as number) || 20,
  }

  const [existingLesson] = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.moduleId, mod.id), eq(lessons.slug, lessonSlug)))
    .limit(1)

  let lessonId: string
  if (existingLesson) {
    lessonId = existingLesson.id
    await db.update(lessons).set({ ...lessonValues, updatedAt: new Date() }).where(eq(lessons.id, lessonId))
  } else {
    const [created] = await db.insert(lessons).values(lessonValues).returning()
    lessonId = created.id
  }

  const synced: string[] = []

  // Upsert quiz
  const quiz = fm.quiz as { title?: string; passing_score?: number; questions?: unknown[] } | undefined
  if (quiz?.questions?.length) {
    const [existingQuiz] = await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId)).limit(1)
    if (existingQuiz) {
      await db.update(quizzes).set({
        title: quiz.title || "Quiz",
        questions: quiz.questions as never,
        passingScore: quiz.passing_score || 70,
        updatedAt: new Date(),
      }).where(eq(quizzes.id, existingQuiz.id))
    } else {
      await db.insert(quizzes).values({
        lessonId,
        title: quiz.title || "Quiz",
        questions: quiz.questions as never,
        passingScore: quiz.passing_score || 70,
      })
    }
    synced.push(`quiz(${quiz.questions.length}q)`)
  }

  // Upsert flashcard deck
  const flashcards = fm.flashcards as unknown[] | undefined
  if (flashcards?.length) {
    const [existingDeck] = await db.select().from(flashcardDecks).where(eq(flashcardDecks.lessonId, lessonId)).limit(1)
    if (existingDeck) {
      await db.update(flashcardDecks).set({
        cards: flashcards as never,
        updatedAt: new Date(),
      }).where(eq(flashcardDecks.id, existingDeck.id))
    } else {
      await db.insert(flashcardDecks).values({
        lessonId,
        cards: flashcards as never,
      })
    }
    synced.push(`flashcards(${flashcards.length})`)
  }

  return NextResponse.json({
    ok: true,
    lessonId,
    synced,
    message: `Lección "${lessonValues.title}" importada correctamente${synced.length ? ` + ${synced.join(", ")}` : ""}`,
  })
}
