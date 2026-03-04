import Image from "next/image"

interface Props {
  src: string
  alt?: string
}

export function MindMapViewer({ src, alt = "Mapa mental de la lección" }: Props) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center gap-2">
        <span className="text-xs text-[var(--neon-violet)]">◆</span>
        <span className="text-xs font-medium text-[var(--text-secondary)]">Mapa Mental</span>
      </div>
      <div className="relative w-full bg-[var(--bg-void)]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={700}
          className="w-full h-auto object-contain"
          unoptimized
        />
      </div>
    </div>
  )
}
