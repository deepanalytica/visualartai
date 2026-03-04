"use client"

import { useState, useRef } from "react"
import { Headphones, Play, Pause, Volume2 } from "lucide-react"

interface Props {
  src: string
  title?: string
}

export function AudioOverview({ src, title = "Resumen en audio" }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function toggle() {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-overlay)] hover:border-[var(--neon-cyan)]/40 transition-colors">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 flex items-center justify-center">
        <Headphones className="size-4 text-[var(--neon-cyan)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)] mb-0.5">NotebookLM</p>
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{title}</p>
      </div>
      <button
        onClick={toggle}
        className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 flex items-center justify-center hover:bg-[var(--neon-cyan)]/20 transition-colors"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? (
          <Pause className="size-4 text-[var(--neon-cyan)]" />
        ) : (
          <Play className="size-4 text-[var(--neon-cyan)]" />
        )}
      </button>
      <Volume2 className="size-4 text-[var(--text-muted)] flex-shrink-0" />
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  )
}
