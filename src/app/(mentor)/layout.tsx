export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import {
    Zap,
    LayoutDashboard,
    BookOpen,
    Users,
    ExternalLink,
} from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const navItems = [
    { href: "/mentor", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/mentor/cursos", label: "Mis cursos", icon: BookOpen },
    { href: "/mentor/alumnos", label: "Alumnos", icon: Users },
]

export default async function MentorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect("/auth/login")

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .single()

    // Only mentors (and admins) can access this area
    if (profile?.role !== "mentor" && profile?.role !== "admin") {
        redirect("/app")
    }

    return (
        <div className="flex h-screen bg-[var(--bg-void)] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-56 shrink-0 bg-[var(--bg-elevated)] border-r border-[var(--border-subtle)] flex flex-col h-full">
                {/* Logo */}
                <div className="p-4 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 mb-1">
                        <Zap className="size-4 text-[var(--neon-violet)]" />
                        <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                            {SITE_NAME}
                        </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--neon-violet)] tracking-widest">
                        MENTOR
                    </span>
                </div>

                {/* Profile pill */}
                <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                    <p className="text-xs text-[var(--text-muted)]">Hola,</p>
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {profile?.full_name ?? user.email}
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => (
                        <MentorNavLink key={item.href} {...item} />
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

            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
    )
}

// Client nav link — inline to avoid extra file
function MentorNavLink({
    href,
    label,
    icon: Icon,
    exact,
}: {
    href: string
    label: string
    icon: React.ElementType
    exact?: boolean
}) {
    // Can't use usePathname in server component — use a simple approach
    // The active state will be handled via CSS :has or we keep it simple
    return (
        <Link
            href={href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
        >
            <Icon className="size-4 shrink-0" />
            {label}
        </Link>
    )
}
