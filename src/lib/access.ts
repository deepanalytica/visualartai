import { db } from "@/db"
import { enrollments, lessons, modules } from "@/db/schema"
import { eq, and } from "drizzle-orm"

/**
 * Check if a user has access to a specific lesson.
 * Access is granted if:
 * 1. The course is free
 * 2. The user has an active enrollment in the course
 * 3. The lesson is marked as a free preview
 */
export async function checkLessonAccess(
  userId: string,
  lessonId: string
): Promise<{ hasAccess: boolean; reason: string }> {
  // Get lesson with module and course info
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      module: {
        with: {
          course: true,
        },
      },
    },
  })

  if (!lesson) {
    return { hasAccess: false, reason: "Lección no encontrada" }
  }

  // Free preview lesson
  if (lesson.isFreePreview) {
    return { hasAccess: true, reason: "Vista previa gratuita" }
  }

  // Free course
  const course = (lesson as any).module?.course
  if (course?.isFree) {
    return { hasAccess: true, reason: "Curso gratuito" }
  }

  // Check enrollment
  const enrollment = await db.query.enrollments.findFirst({
    where: and(
      eq(enrollments.userId, userId),
      eq(enrollments.courseId, course?.id),
      eq(enrollments.status, "active")
    ),
  })

  if (enrollment) {
    return { hasAccess: true, reason: "Inscripción activa" }
  }

  return { hasAccess: false, reason: "Sin acceso — adquiere el curso para continuar" }
}

/**
 * Get all course IDs a user is enrolled in.
 */
export async function getUserEnrollments(userId: string) {
  return db.query.enrollments.findMany({
    where: and(eq(enrollments.userId, userId), eq(enrollments.status, "active")),
    with: {
      course: true,
    },
  })
}
