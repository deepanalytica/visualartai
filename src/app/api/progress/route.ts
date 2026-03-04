import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { progress, lessons, modules, enrollments } from "@/db/schema"
import { eq, and } from "drizzle-orm"

// The `progress` table only has: id, userId, lessonId, completedAt
// There is NO `completed` boolean — a row existing = lesson is completed.
// To mark complete  → INSERT (on conflict do nothing)
// To unmark        → DELETE the row

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await req.json()
    const { lessonId, markComplete } = body as { lessonId: string; markComplete: boolean }

    if (!lessonId || typeof markComplete !== "boolean") {
      return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 })
    }

    // Verify lesson exists
    const [lesson] = await db
      .select({ id: lessons.id, moduleId: lessons.moduleId, isFreePreview: lessons.isFreePreview })
      .from(lessons)
      .where(eq(lessons.id, lessonId))
      .limit(1)

    if (!lesson) {
      return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 })
    }

    // Verify enrollment for paid lessons (resolve courseId via module)
    if (!lesson.isFreePreview) {
      const [mod] = await db
        .select({ courseId: modules.courseId })
        .from(modules)
        .where(eq(modules.id, lesson.moduleId))
        .limit(1)

      if (!mod) {
        return NextResponse.json({ error: "Módulo no encontrado" }, { status: 404 })
      }

      const [enrollment] = await db
        .select({ id: enrollments.id })
        .from(enrollments)
        .where(
          and(
            eq(enrollments.userId, user.id),
            eq(enrollments.courseId, mod.courseId),
            eq(enrollments.status, "active")
          )
        )
        .limit(1)

      if (!enrollment) {
        return NextResponse.json({ error: "Sin acceso a esta lección" }, { status: 403 })
      }
    }

    if (markComplete) {
      // Mark complete: insert a row (idempotent — UNIQUE on userId+lessonId)
      await db
        .insert(progress)
        .values({
          userId: user.id,
          lessonId,
          completedAt: new Date(),
        })
        .onConflictDoNothing({ target: [progress.userId, progress.lessonId] })
    } else {
      // Unmark: delete the row
      await db
        .delete(progress)
        .where(and(eq(progress.userId, user.id), eq(progress.lessonId, lessonId)))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[progress POST]", err)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
