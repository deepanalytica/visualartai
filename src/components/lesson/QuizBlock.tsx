"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react"
import type { LessonQuiz } from "@/lib/content"

interface Props {
  quiz: LessonQuiz
  lessonId?: string
}

type Phase = "answering" | "submitted"

export function QuizBlock({ quiz, lessonId }: Props) {
  const [phase, setPhase] = useState<Phase>("answering")
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [score, setScore] = useState(0)

  const passingScore = quiz.passing_score ?? 70
  const total = quiz.questions.length

  function select(qIdx: number, oIdx: number) {
    if (phase === "submitted") return
    setSelected((s) => ({ ...s, [qIdx]: oIdx }))
  }

  async function submit() {
    let correct = 0
    quiz.questions.forEach((q, i) => {
      if (selected[i] === q.correct) correct++
    })
    const s = Math.round((correct / total) * 100)
    setScore(s)
    setPhase("submitted")

    // Record attempt if we have a quizId (passed via lessonId for now; full wiring done via DB)
    if (lessonId) {
      try {
        await fetch("/api/quiz-attempt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId,
            answers: Object.values(selected),
            score: s,
          }),
        })
      } catch {
        // Non-critical — don't break the UX
      }
    }
  }

  function reset() {
    setPhase("answering")
    setSelected({})
    setScore(0)
  }

  const allAnswered = Object.keys(selected).length === total
  const passed = score >= passingScore

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--neon-violet)]">✦</span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">{quiz.title}</span>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {total} {total === 1 ? "pregunta" : "preguntas"} · Mínimo {passingScore}%
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Questions */}
        {quiz.questions.map((q, qIdx) => {
          const answered = selected[qIdx] !== undefined
          const isCorrect = phase === "submitted" && selected[qIdx] === q.correct

          return (
            <div key={qIdx} className="space-y-3">
              <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                <span className="text-[var(--text-muted)] mr-2">{qIdx + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oIdx) => {
                  const isSelected = selected[qIdx] === oIdx
                  const isCorrectOption = q.correct === oIdx

                  let className =
                    "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all "

                  if (phase === "submitted") {
                    if (isCorrectOption) {
                      className += "border-[var(--neon-cyan)]/50 bg-[var(--neon-cyan)]/5 text-[var(--neon-cyan)]"
                    } else if (isSelected && !isCorrectOption) {
                      className += "border-red-500/50 bg-red-500/5 text-red-400"
                    } else {
                      className += "border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }
                  } else {
                    if (isSelected) {
                      className += "border-[var(--neon-violet)]/50 bg-[var(--neon-violet)]/5 text-[var(--text-primary)]"
                    } else {
                      className += "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => select(qIdx, oIdx)}
                      className={className}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xs text-[var(--text-muted)] w-4 flex-shrink-0">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {option}
                        {phase === "submitted" && isCorrectOption && (
                          <CheckCircle2 className="size-3.5 ml-auto flex-shrink-0" />
                        )}
                        {phase === "submitted" && isSelected && !isCorrectOption && (
                          <XCircle className="size-3.5 ml-auto flex-shrink-0" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
              {/* Explanation */}
              {phase === "submitted" && q.explanation && (
                <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-overlay)] rounded-lg px-3 py-2 border border-[var(--border-subtle)]">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          )
        })}

        {/* Submit / Result */}
        {phase === "answering" ? (
          <button
            onClick={submit}
            disabled={!allAnswered}
            className="w-full py-3 rounded-lg border border-[var(--neon-violet)]/40 bg-[var(--neon-violet)]/5 text-sm font-medium text-[var(--neon-violet)] hover:bg-[var(--neon-violet)]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Enviar respuestas
          </button>
        ) : (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-overlay)] p-5 text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              {passed ? (
                <Trophy className="size-5 text-[var(--neon-cyan)]" />
              ) : (
                <RotateCcw className="size-5 text-[var(--text-muted)]" />
              )}
              <span
                className={`text-2xl font-bold ${passed ? "text-[var(--neon-cyan)]" : "text-[var(--text-muted)]"}`}
              >
                {score}%
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {passed
                ? "¡Excelente! Pasaste el quiz."
                : `Necesitas ${passingScore}% para aprobar. ¡Sigue repasando!`}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
            >
              <RotateCcw className="size-3" />
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
