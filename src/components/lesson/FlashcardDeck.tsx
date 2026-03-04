"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, RefreshCw } from "lucide-react"
import type { FlashCard } from "@/lib/content"

interface Props {
  cards: FlashCard[]
}

export function FlashcardDeck({ cards }: Props) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState<Set<number>>(new Set())
  const [review, setReview] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  const card = cards[index]
  const progress = known.size + review.size

  function flip() {
    setIsFlipped((v) => !v)
  }

  function markKnown() {
    const next = new Set(known).add(index)
    setKnown(next)
    advance(next.size + review.size)
  }

  function markReview() {
    const next = new Set(review).add(index)
    setReview(next)
    advance(known.size + next.size)
  }

  function advance(total: number) {
    setIsFlipped(false)
    if (total >= cards.length) {
      setDone(true)
      return
    }
    // Find next unrated card
    let next = (index + 1) % cards.length
    const rated = new Set([...known, ...review])
    while (rated.has(next) && rated.size < cards.length) {
      next = (next + 1) % cards.length
    }
    setIndex(next)
  }

  function reset() {
    setIndex(0)
    setIsFlipped(false)
    setKnown(new Set())
    setReview(new Set())
    setDone(false)
  }

  if (done) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle)] p-6 text-center space-y-4">
        <div className="text-3xl font-bold text-[var(--neon-cyan)]">
          {Math.round((known.size / cards.length) * 100)}%
        </div>
        <p className="text-[var(--text-secondary)] text-sm">
          <span className="text-[var(--neon-cyan)]">{known.size}</span> dominadas ·{" "}
          <span className="text-[var(--text-muted)]">{review.size}</span> para repasar
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
        >
          <RefreshCw className="size-3.5" />
          Reiniciar mazo
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--neon-cyan)]">⊟</span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">Flashcards</span>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {index + 1} / {cards.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[var(--bg-void)]">
        <div
          className="h-full bg-[var(--neon-cyan)] transition-all duration-300"
          style={{ width: `${(progress / cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="p-6">
        <div
          className="relative w-full min-h-40 cursor-pointer select-none"
          onClick={flip}
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isFlipped ? "back" : "front"}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-overlay)] p-6 min-h-40 flex flex-col items-center justify-center text-center gap-3">
                <p className="text-xs text-[var(--text-muted)]">
                  {isFlipped ? "Respuesta" : "Pregunta"}
                </p>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {isFlipped ? card.back : card.front}
                </p>
                {!isFlipped && card.hint && (
                  <p className="text-xs text-[var(--text-muted)] italic">{card.hint}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-3">
          Click para {isFlipped ? "ver la pregunta" : "ver la respuesta"}
        </p>
      </div>

      {/* Actions */}
      {isFlipped && (
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <button
            onClick={markReview}
            className="flex-1 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-muted)] hover:border-[var(--neon-violet)]/40 hover:text-[var(--text-secondary)] transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="size-3.5" />
            Repasar
          </button>
          <button
            onClick={markKnown}
            className="flex-1 py-2 rounded-lg border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 text-sm text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="size-3.5" />
            Lo sé
          </button>
        </div>
      )}

      {/* Nav arrows */}
      <div className="px-6 pb-4 flex items-center justify-between">
        <button
          onClick={() => { setIndex((i) => Math.max(0, i - 1)); setIsFlipped(false) }}
          disabled={index === 0}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                known.has(i)
                  ? "bg-[var(--neon-cyan)]"
                  : review.has(i)
                  ? "bg-[var(--neon-violet)]/60"
                  : i === index
                  ? "bg-[var(--text-secondary)]"
                  : "bg-[var(--border-subtle)]"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => { setIndex((i) => Math.min(cards.length - 1, i + 1)); setIsFlipped(false) }}
          disabled={index === cards.length - 1}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
