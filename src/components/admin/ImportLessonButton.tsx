"use client"

import { useState } from "react"
import { Upload, Check, Loader2 } from "lucide-react"

interface Props {
  contentPath: string
}

export function ImportLessonButton({ contentPath }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")

  async function handleImport() {
    setStatus("loading")
    try {
      const res = await fetch("/api/content/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentPath }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus("done")
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  if (status === "done") {
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-400">
        <Check className="size-3.5" /> Importado
      </span>
    )
  }

  return (
    <button
      onClick={handleImport}
      disabled={status === "loading"}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/40 transition-colors disabled:opacity-50"
      title={status === "error" ? "Error al importar" : "Importar a DB"}
    >
      {status === "loading" ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Upload className="size-3.5" />
      )}
      {status === "error" ? "Error" : "Importar"}
    </button>
  )
}
