export const dynamic = 'force-dynamic'

import Link from "next/link"
import { Zap } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-void)] flex flex-col">
      {/* Header mínimo */}
      <header className="py-6 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display font-bold text-lg text-[var(--text-primary)]"
        >
          <Zap className="size-5 text-[var(--neon-cyan)]" />
          {SITE_NAME}
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">{children}</main>

      {/* Footer mínimo */}
      <footer className="py-6 text-center">
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
