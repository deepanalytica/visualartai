import { cn } from "@/lib/utils"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { CheckIcon, Zap } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
  badge?: string
}

const tiers: PricingTier[] = [
  {
    id: "curso-individual",
    name: "Curso Individual",
    price: "desde $99.000",
    period: "pago único",
    description:
      "El atajo directo. Accede a los sistemas probados, plantillas y empieza a ejecutarlos a tu propio ritmo hoy mismo.",
    features: [
      "Acceso de por vida garantizado",
      "Todos los módulos y lecciones",
      "Librería de Mega-Prompts descargable",
      "Actualizaciones constantes (v2, v3)",
      "Comunidad de dudas y networking",
    ],
    cta: "Comprar Curso Independiente",
    href: "/academia/cursos",
  },
  {
    id: "mentoría-grupal",
    name: "Mentoría Grupal VIP",
    price: "$299.000",
    period: "4 semanas (10x ROI)",
    description:
      "Acompañamiento directo. Revisamos tu sistema, ajustamos tus prompts y nos aseguramos de que recuperes tu tiempo.",
    features: [
      "Todo lo del Curso Individual incluido",
      "4 sesiones grupales intensivas en vivo",
      "Auditoría de tus propios prompts creados",
      "Grupos de élite (máx. 8 personas)",
      "Prioridad alta de soporte técnico",
      "KPIs y retorno de inversión medido",
    ],
    cta: "Reservar Cupo (Plazas limitadas)",
    href: "/academia/mentorias",
    highlighted: true,
    badge: "El más elegido",
  },
  {
    id: "mentoría-1:1",
    name: "Mentoría B2B 1:1",
    price: "A consultar",
    description:
      "Tercerizamos nuestro cerebro estrátegico. Instalamos el sistema completo dentro de tu agencia o empresa.",
    features: [
      "Todo lo de la Mentoría Grupal VIP",
      "Onboarding corporativo a medida",
      "Sesiones exclusivas 1 a 1",
      "Creación de GPTs/Asistentes privados",
      "Acompañamiento por Slack/WhatsApp",
      "Estrategia de adopción de equipo",
    ],
    cta: "Agendar Auditoría Gratuita",
    href: "/contacto?tipo=mentoría-1-1",
  },
]

export function PricingTiers() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <NeonCard
            key={tier.id}
            glow={tier.highlighted ? "cyan" : "none"}
            className={cn(
              "p-8 flex flex-col gap-8 transition-transform duration-500 hover:-translate-y-2",
              tier.highlighted &&
              "border-[rgba(0,229,255,0.4)] shadow-[0_0_40px_rgba(0,229,255,0.15)] relative overflow-hidden ring-1 ring-[var(--neon-cyan)]/30 group"
            )}
          >
            {/* Background blur for highlighted */}
            {tier.highlighted && (
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--neon-cyan)] opacity-[0.03] rounded-full blur-[80px] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
            )}

            {/* Header */}
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  {tier.name}
                </h3>
                {tier.badge && (
                  <NeonBadge color="cyan" className="animate-pulse shadow-sm shadow-[var(--neon-cyan-dim)]">
                    <Zap className="size-3 mr-1" />
                    {tier.badge}
                  </NeonBadge>
                )}
              </div>
              <div className="mt-2">
                <span className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-[1rem] font-medium text-[var(--text-muted)] ml-2 inline-block">
                    / {tier.period}
                  </span>
                )}
              </div>
              <p className="text-[1.05rem] text-[var(--text-secondary)] leading-relaxed mt-2">
                {tier.description}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border-subtle)] relative z-10" />

            {/* Features */}
            <ul className="flex flex-col gap-4 flex-1 relative z-10">
              {tier.features.map((feature, i) => (
                <li key={feature} className="flex items-start gap-4 text-[1.05rem] group/feature">
                  <div className={cn(
                    "mt-0.5 rounded-full p-0.5 transition-colors duration-300",
                    tier.highlighted ? "bg-[var(--neon-cyan-dim)] group-hover/feature:bg-[var(--neon-cyan)]" : "bg-[var(--bg-elevated)]"
                  )}>
                    <CheckIcon className={cn(
                      "size-4 shrink-0 transition-colors duration-300",
                      tier.highlighted ? "text-[var(--neon-cyan)] group-hover/feature:text-black" : "text-[var(--neon-cyan)]"
                    )} />
                  </div>
                  <span className="text-[var(--text-secondary)] font-medium group-hover/feature:text-[var(--text-primary)] transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-auto relative z-10">
              <NeonButton
                href={tier.href}
                variant={tier.highlighted ? "neon" : "outline"}
                size="lg"
                className="w-full justify-center shadow-lg"
              >
                {tier.cta}
              </NeonButton>
            </div>
          </NeonCard>
        ))}
      </div>

      {/* B2B note */}
      <div className="text-center mt-12 bg-[var(--bg-elevated)] p-6 rounded-2xl border border-[var(--border-subtle)] max-w-2xl mx-auto shadow-sm">
        <p className="text-[1.05rem] font-medium text-[var(--text-muted)]">
          ¿No necesitas capacitación, pero quieres los sistemas implementados en tu empresa?{" "}
          <a href="/empresas" className="text-[var(--neon-cyan)] hover:text-white hover:underline underline-offset-4 transition-colors font-bold block sm:inline mt-2 sm:mt-0">
            Descubre nuestras Auditorías B2B
          </a>
        </p>
      </div>
    </div>
  )
}
