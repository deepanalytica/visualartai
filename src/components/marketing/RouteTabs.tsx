"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { ROUTES } from "@/lib/constants"
import { ArrowRight } from "lucide-react"

const routeData = [
  {
    ...ROUTES.redes,
    modules: [
      "Estrategia de contenido de alto impacto",
      "Producción masiva 10x sin perder tu voz",
      "El SOP definitivo: 1 mes de posts en 3 horas",
      "Copywriting psicológico que fideliza",
    ],
    outcome: "4 semanas de contenido listo cada domingo",
    courseSlug: "sistema-ia-contenido-semanal",
  },
  {
    ...ROUTES.productividad,
    modules: [
      "Auditoría de fuga de horas",
      "Creación de tu Asistente Digital Permanente",
      "Delegación absoluta de emails y minutas",
      "Generación de reportes automáticos",
    ],
    outcome: "5–10 horas recuperadas cada semana",
    courseSlug: "flujos-ia-productividad",
  },
  {
    ...ROUTES.empresas,
    modules: [
      "Onboarding corporativo a flujos IA",
      "Creación de la bóveda de Mega-Prompts del equipo",
      "Sistemas de escalabilidad horizontal",
      "Medición de adopción y ROI directo",
    ],
    outcome: "Equipos que hacen el triple en el mismo horario",
    courseSlug: null,
  },
]

const colorClasses = {
  cyan: {
    tab: "data-[active=true]:text-[var(--neon-cyan)] data-[active=true]:border-b-[var(--neon-cyan)]",
    dot: "bg-[var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]",
    badge: "text-[var(--neon-cyan)] bg-[var(--neon-cyan-dim)]",
  },
  violet: {
    tab: "data-[active=true]:text-[var(--neon-violet)] data-[active=true]:border-b-[var(--neon-violet)]",
    dot: "bg-[var(--neon-violet)] shadow-[0_0_8px_var(--neon-violet)]",
    badge: "text-[var(--neon-violet)] bg-[var(--neon-violet-dim)]",
  },
  magenta: {
    tab: "data-[active=true]:text-[var(--neon-magenta)] data-[active=true]:border-b-[var(--neon-magenta)]",
    dot: "bg-[var(--neon-magenta)] shadow-[0_0_8px_var(--neon-magenta)]",
    badge: "text-[var(--neon-magenta)] bg-[var(--neon-magenta-dim)]",
  },
}

export function RouteTabs() {
  const [activeTab, setActiveTab] = useState(routeData[0].id)
  const activeRoute = routeData.find((r) => r.id === activeTab)!
  const colors = colorClasses[activeRoute.color as keyof typeof colorClasses]

  return (
    <div className="w-full">
      {/* Tab navigation */}
      <div className="flex border-b border-[var(--border-subtle)] mb-10 overflow-x-auto pb-1 scrollbar-hide">
        {routeData.map((route) => {
          const c = colorClasses[route.color as keyof typeof colorClasses]
          return (
            <button
              key={route.id}
              onClick={() => setActiveTab(route.id)}
              data-active={activeTab === route.id}
              className={cn(
                "px-6 py-4 text-sm font-semibold border-b-2 border-transparent relative",
                "transition-colors duration-300 whitespace-nowrap",
                "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                c.tab
              )}
            >
              <span className="flex items-center gap-2 relative z-10">
                <span>{route.icon}</span>
                <span className="hidden sm:inline">{route.label}</span>
                <span className="sm:hidden">{route.id === "redes" ? "Redes" : route.id === "productividad" ? "Productividad" : "Empresas"}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[420px]">
        {/* Modules list (Left side) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-info"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">
                {activeRoute.label}
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{activeRoute.description}</p>
            </div>

            <ul className="flex flex-col gap-4 my-2">
              {activeRoute.modules.map((module, i) => (
                <motion.li
                  key={module}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  className="flex items-center gap-4 group"
                >
                  <span
                    className={cn(
                      "size-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300",
                      colors.badge
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium text-[1.05rem] group-hover:text-[var(--text-primary)] transition-colors">{module}</span>
                </motion.li>
              ))}
            </ul>

            {/* Outcome */}
            <div className="flex items-center gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-lg mt-2">
              <span className={cn("size-3 rounded-full shrink-0 animate-pulse", colors.dot)} />
              <span className="text-[1.05rem] font-bold text-[var(--text-primary)]">
                {activeRoute.outcome}
              </span>
            </div>

            <div className="flex gap-4 mt-2">
              <NeonButton
                href={
                  activeRoute.courseSlug
                    ? `/academia/cursos/${activeRoute.courseSlug}`
                    : activeRoute.href
                }
                variant={activeRoute.color === "cyan" ? "neon" : "ghost-neon"}
                size="lg"
                className="flex-1 justify-center sm:flex-none"
              >
                {activeRoute.courseSlug ? "Garantiza tu acceso" : "Quiero delegar"}
                <ArrowRight className="size-5" />
              </NeonButton>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Visual card (Right side) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-card"}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full"
          >
            <NeonCard
              glow={activeRoute.color as any}
              hoverable
              className="p-8 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden group"
            >
              {/* Background abstract element */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 rounded-full blur-3xl pointer-events-none transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110"
                style={{ backgroundColor: `var(--neon-${activeRoute.color})` }}
              />

              <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
                <div className="text-7xl mb-8 flex justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {activeRoute.icon}
                </div>
                <div className="font-display text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  {activeRoute.label}
                </div>
                <div className={cn("text-sm mt-4 font-semibold tracking-wider uppercase", `text-[var(--neon-${activeRoute.color})] opacity-80`)}>
                  Ruta desbloqueada
                </div>
              </div>
            </NeonCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
