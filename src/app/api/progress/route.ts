import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { progress, lessons, enrollments } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { lessonId, completed } = await req.json()

    if (!lessonId || typeof completed !== "boolean") {
      return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 })
    }

    // Verify lesson exists and user has enrollment for that course
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1)
    if (!lesson) {
      return NextResponse.json({ error: "Lección no encontrada" }, { status: 404 })
    }

    // Verify enrollment (skip for free preview lessons)
    if (!lesson.isFreePreview) {
      const [enrollment] = await db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.userId, user.id),
            eq(enrollments.courseId, lesson.courseId),
            eq(enrollments.status, "active")
          )
        )
        .limit(1)

      if (!enrollment) {
        return NextResponse.json({ error: "Sin acceso a esta lección" }, { status: 403 })
      }
    }

    // Upsert progress
    await db
      .insert(progress)
      .values({
        userId: user.id,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [progress.userId, progress.lessonId],
        set: {
          completed,
          completedAt: completed ? new Date() : null,
          updatedAt: new Date(),
        },
      })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[progress POST]", err)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
