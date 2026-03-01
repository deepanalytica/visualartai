"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { NeonButton } from "@/components/brand/NeonButton"
import { Menu, X, Zap } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)]",
        scrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      )}
    >
      <nav className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-[var(--text-primary)] hover:text-[var(--neon-cyan)] transition-colors"
        >
          <Zap className="size-5 text-[var(--neon-cyan)]" />
          <span>{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[var(--neon-cyan)] bg-[var(--neon-cyan-dim)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Ingresar
          </Link>
          <NeonButton href="/academia/cursos" variant="neon" size="sm">
            Comenzar
          </NeonButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[var(--neon-cyan)] bg-[var(--neon-cyan-dim)]"
                      : "text-[var(--text-secondary)]"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <Link
              href="/auth/login"
              className="text-center py-2.5 text-sm text-[var(--text-secondary)]"
              onClick={() => setIsOpen(false)}
            >
              Ingresar
            </Link>
            <NeonButton
              href="/academia/cursos"
              variant="neon"
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              Comenzar
            </NeonButton>
          </div>
        </div>
      )}
    </header>
  )
}
