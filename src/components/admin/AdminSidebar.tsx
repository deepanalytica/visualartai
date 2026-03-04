"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Zap,
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Users,
  CreditCard,
  Webhook,
  FileText,
  Settings,
  ExternalLink,
} from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const navGroups = [
  {
    label: "General",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "Contenido",
    items: [
      { href: "/admin/cursos", label: "Cursos", icon: BookOpen },
      { href: "/admin/contenido", label: "Pipeline MDX", icon: FileText },
      { href: "/admin/recursos", label: "Recursos", icon: FolderOpen },
      { href: "/admin/changelog", label: "Changelog", icon: FileText },
    ],
  },
  {
    label: "Usuarios",
    items: [
      { href: "/admin/usuarios", label: "Usuarios", icon: Users },
      { href: "/admin/pagos", label: "Pagos", icon: CreditCard },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/admin/webhooks", label: "Webhooks", icon: Webhook },
      { href: "/admin/configuracion", label: "Configuración", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside className="w-56 shrink-0 bg-[var(--bg-elevated)] border-r border-[var(--border-subtle)] flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="size-4 text-[var(--neon-cyan)]" />
          <span className="font-display font-bold text-sm text-[var(--text-primary)]">
            {SITE_NAME}
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--neon-magenta)] tracking-widest">
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest px-3 mb-1">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, item.exact)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors ${
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
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[var(--border-subtle)] space-y-1">
        <Link
          href="/app"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] rounded-[var(--radius-md)] transition-colors"
        >
          <ExternalLink className="size-4" />
          Ir a la Academia
        </Link>
      </div>
    </aside>
  )
}
