"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, LayoutDashboard, BookOpen, FolderOpen, Users, User, LogOut } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/app/mis-cursos", label: "Mis Cursos", icon: BookOpen },
  { href: "/app/recursos", label: "Recursos", icon: FolderOpen },
  { href: "/app/mentorias", label: "Mentorías", icon: Users },
  { href: "/app/cuenta", label: "Mi Cuenta", icon: User },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <aside className="w-60 shrink-0 bg-[var(--bg-elevated)] border-r border-[var(--border-subtle)] flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border-subtle)]">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="size-5 text-[var(--neon-cyan)]" />
          <span className="font-display font-bold text-[var(--text-primary)]">{SITE_NAME}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-colors ${
                active
                  ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)]"
              }`}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[var(--border-subtle)]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut className="size-4 shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
