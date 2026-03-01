import Link from "next/link"
import { SITE_NAME, FOOTER_LINKS, CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { Zap } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-display font-bold text-lg text-[var(--text-primary)] mb-4"
            >
              <Zap className="size-5 text-[var(--neon-cyan)]" />
              <span>{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Plataforma premium de aprendizaje IA. Resultados reales para creadores y equipos.
            </p>
            <div className="flex flex-col gap-1 mt-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academia */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Academia
            </h4>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.academia.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GlowDivider color="cyan" className="my-0" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Diseñado y construido en Chile 🇨🇱
          </p>
        </div>
      </div>
    </footer>
  )
}
