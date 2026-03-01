"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonButton } from "@/components/brand/NeonButton"
import { CheckCircle2, Circle } from "lucide-react"

interface Props {
  lessonId: string
  courseSlug: string
  isCompleted: boolean
  nextLessonSlug?: string
}

export function MarkLessonCompleteButton({
  lessonId,
  courseSlug,
  isCompleted,
  nextLessonSlug,
}: Props) {
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function toggle() {
    setLoading(true)
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: !completed }),
      })

      if (res.ok) {
        setCompleted(!completed)
        if (!completed && nextLessonSlug) {
          router.push(`/app/cursos/${courseSlug}/${nextLessonSlug}`)
        }
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <NeonButton
      onClick={toggle}
      variant={completed ? "solid" : "neon"}
      size="sm"
      disabled={loading}
      className="shrink-0"
    >
      {completed ? (
        <>
          <CheckCircle2 className="size-4" />
          Completada
        </>
      ) : (
        <>
          <Circle className="size-4" />
          Marcar como completada
        </>
      )}
    </NeonButton>
  )
}
