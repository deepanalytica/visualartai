"use client"

import { useState } from "react"
import { Maximize2, X, ExternalLink } from "lucide-react"

interface Props {
  url: string
  title?: string
}

export function SlidesEmbed({ url, title = "Presentación" }: Props) {
  const [fullscreen, setFullscreen] = useState(false)

  // Convert Google Slides share URL to embed URL
  const embedUrl = url.includes("docs.google.com/presentation")
    ? url.replace(/\/pub\??.*$/, "/embed").replace(/\/edit.*$/, "/embed")
    : url

  return (
    <>
      <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--neon-violet)]">▣</span>
            <span className="text-xs font-medium text-[var(--text-secondary)]">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
              aria-label="Abrir en nueva pestaña"
            >
              <ExternalLink className="size-3.5" />
            </a>
            <button
              onClick={() => setFullscreen(true)}
              className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
              aria-label="Pantalla completa"
            >
              <Maximize2 className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="aspect-video bg-[var(--bg-void)]">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            title={title}
          />
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--bg-overlay)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
          <div className="w-full max-w-5xl aspect-video">
            <iframe
              src={embedUrl}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title={title}
            />
          </div>
        </div>
      )}
    </>
  )
}
