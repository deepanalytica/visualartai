import { cn } from "@/lib/utils"

const stats = [
  {
    value: "62%",
    label: "de empresas en Chile no logra cubrir vacantes tech",
    source: "ManpowerGroup · Emol 2026",
  },
  {
    value: "3x",
    label: "más resultados en equipos que usan IA con método",
    source: "McKinsey · Infobae 2026",
  },
  {
    value: "83%",
    label: "de escasez de talento en tecnología y servicios TI",
    source: "ManpowerGroup · Emol 2026",
  },
  {
    value: "↑ carga",
    label: "La IA sin método intensifica el trabajo, no lo reduce",
    source: "Harvard Business Review 2026",
  },
]

export function StatsBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8",
        className
      )}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[var(--neon-cyan)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">{stat.label}</div>
              {"source" in stat && (
                <div className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-wider opacity-60">
                  {stat.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
