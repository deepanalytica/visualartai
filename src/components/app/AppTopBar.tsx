"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import { Bell, ExternalLink } from "lucide-react"
import { getInitials } from "@/lib/utils"

interface Profile {
  full_name: string | null
  avatar_url: string | null
  role: string | null
}

interface Props {
  user: User
  profile: Profile | null
}

export function AppTopBar({ user, profile }: Props) {
  const displayName = profile?.full_name ?? user.email ?? "Usuario"
  const initials = getInitials(displayName)

  return (
    <header className="h-14 shrink-0 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6">
      {/* Left: breadcrumb placeholder */}
      <div />

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Back to site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <ExternalLink className="size-3.5" />
          Ver sitio
        </Link>

        {/* Notifications */}
        <button className="relative size-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-overlay)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
          <Bell className="size-4" />
        </button>

        {/* Avatar */}
        <Link
          href="/app/cuenta"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="size-8 rounded-full object-cover border border-[var(--border-subtle)]"
            />
          ) : (
            <div className="size-8 rounded-full bg-[var(--neon-cyan-dim)] border border-[var(--border-accent)] flex items-center justify-center">
              <span className="text-xs font-semibold text-[var(--neon-cyan)]">{initials}</span>
            </div>
          )}
          <span className="hidden sm:block text-sm text-[var(--text-secondary)] max-w-32 truncate">
            {displayName}
          </span>
        </Link>
      </div>
    </header>
  )
}
