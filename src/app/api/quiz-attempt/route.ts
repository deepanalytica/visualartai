import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { quizAttempts, quizzes } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { quizId, lessonId, answers, score } = body as {
    quizId?: string
    lessonId?: string
    answers?: unknown[]
    score?: number
  }

  if ((!quizId && !lessonId) || answers === undefined || score === undefined) {
    return NextResponse.json(
      { error: "quizId or lessonId, answers, and score are required" },
      { status: 400 }
    )
  }

  // Look up quiz by id or by lessonId
  const [quiz] = await db
    .select()
    .from(quizzes)
    .where(quizId ? eq(quizzes.id, quizId) : eq(quizzes.lessonId, lessonId!))
    .limit(1)

  if (!quiz) {
    // Quiz may not be in DB yet — skip gracefully
    return NextResponse.json({ ok: true, skipped: true })
  }

  const passed = score >= (quiz.passingScore ?? 70)

  const [attempt] = await db
    .insert(quizAttempts)
    .values({
      userId: user.id,
      quizId: quiz.id,
      score,
      passed,
      answers: answers as never,
    })
    .returning()

  return NextResponse.json({ ok: true, attemptId: attempt.id, passed, score })
}
