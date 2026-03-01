"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { NeonButton } from "@/components/brand/NeonButton"
import { CyberpunkGrid } from "@/components/brand/CyberpunkGrid"
import { ArrowRight, Sparkles, BrainCircuit, Zap, TrendingUp, Users } from "lucide-react"

const BANNERS = [
  {
    id: "banner-1",
    eyebrow: "Sistema Comprobado",
    icon: <Sparkles className="size-3.5" />,
    headlinePart1: "Deja de adivinar.",
    headlinePart2: "Empieza a crear con IA.",
    subhead:
      "Transforma horas de bloqueo mental en minutos de producción impecable. Sistemas probados para creadores y equipos que valoran su tiempo.",
    accent: "cyan" as const,
  },
  {
    id: "banner-2",
    eyebrow: "Calidad Profesional",
    icon: <BrainCircuit className="size-3.5" />,
    headlinePart1: "Contenido que destaca.",
    headlinePart2: "Cero textos de robot.",
    subhead:
      "Domina los prompts avanzados y haz que la IA escriba con tu voz, tono y estilo exacto. El fin del contenido aburrido.",
    accent: "magenta" as const,
  },
  {
    id: "banner-3",
    eyebrow: "Flujos de Trabajo",
    icon: <Zap className="size-3.5" />,
    headlinePart1: "Recupera hasta",
    headlinePart2: "10 horas cada semana.",
    subhead:
      "Automatiza la ideación, planificación y redacción. Tu tiempo debe enfocarse en la estrategia; que la IA haga el trabajo pesado.",
    accent: "violet" as const,
  },
  {
    id: "banner-4",
    eyebrow: "Acompañamiento VIP",
    icon: <Users className="size-3.5" />,
    headlinePart1: "No aprendas solo.",
    headlinePart2: "Únete a la élite creativa.",
    subhead:
      "Acceso a nuestra bóveda de prompts, actualizaciones de por vida y una comunidad privada de creadores escalando sus marcas.",
    accent: "amber" as const,
  },
]

interface HeroShowcaseProps {
  className?: string
}

export function HeroShowcase({ className }: HeroShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentBanner = BANNERS[currentIndex]

  // Dynamic colors based on active banner
  const getBannerColor = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "var(--neon-cyan)"
      case "magenta":
        return "var(--neon-magenta)"
      case "violet":
        return "var(--neon-violet)"
      case "amber":
        return "var(--neon-amber)"
      default:
        return "var(--neon-cyan)"
    }
  }

  const getBannerShadow = (accent: string) => {
    switch (accent) {
      case "cyan":
        return "rgba(0, 255, 255, 0.2)"
      case "magenta":
        return "rgba(255, 0, 255, 0.2)"
      case "violet":
        return "rgba(138, 43, 226, 0.2)"
      case "amber":
        return "rgba(255, 191, 0, 0.2)"
      default:
        return "rgba(0, 255, 255, 0.2)"
    }
  }

  const activeColor = getBannerColor(currentBanner.accent)
  const activeShadow = getBannerShadow(currentBanner.accent)

  return (
    <section
      className={cn(
        "relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16",
        className
      )}
    >
      <CyberpunkGrid radialColor={currentBanner.accent} />

      <div className="relative z-10 container max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Main Content Area: AnimatePresence for smooth transitions */}
        <div className="min-h-[400px] flex flex-col items-center justify-center w-full text-center gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)", transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-accent)] bg-black/40 backdrop-blur-md text-sm font-medium"
                style={{
                  color: activeColor,
                  boxShadow: `0 0 15px ${activeShadow}`,
                }}
              >
                {currentBanner.icon}
                <span>{currentBanner.eyebrow}</span>
              </motion.div>

              {/* Headline */}
              <div className="flex flex-col gap-4 max-w-4xl">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-[var(--text-primary)]">{currentBanner.headlinePart1}</span>
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${activeColor}, white)`,
                    }}
                  >
                    {currentBanner.headlinePart2}
                  </span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                {currentBanner.subhead}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* BTNs are kept outside AnimatePresence so they don't unmount, just animate color if needed */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <NeonButton href="/academia/cursos" size="lg" variant="neon">
              Ver cursos disponibles
              <ArrowRight className="size-5" />
            </NeonButton>
            <NeonButton href="/studio" size="lg" variant="ghost-neon">
              Studio Creativo
            </NeonButton>
          </motion.div>
        </div>

        {/* Carousel Indicators / Controls */}
        <div className="flex items-center gap-3 mt-12 z-20">
          {BANNERS.map((banner, index) => {
            const isActive = index === currentIndex
            return (
              <button
                key={banner.id}
                onClick={() => setCurrentIndex(index)}
                className="relative h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: isActive ? "2.5rem" : "0.75rem",
                  backgroundColor: isActive ? getBannerColor(banner.accent) : "var(--border-subtle)",
                  boxShadow: isActive ? `0 0 8px ${getBannerShadow(banner.accent)}` : "none",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>

        {/* Floating Abstract Elements to replace static gallery grid */}
        <div className="mt-16 w-full flex justify-center perspective-[1000px]">
          <div className="relative w-full max-w-4xl h-[120px] sm:h-[160px] flex justify-center items-center gap-4 sm:gap-8">
            {[TrendingUp, Zap, Sparkles].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  rotateX: [0, 10, 0],
                  rotateY: [0, 15, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className={cn(
                  "flex items-center justify-center rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-elevated)] backdrop-blur-xl shadow-2xl",
                  i === 0 && "w-24 h-24 sm:w-32 sm:h-32 text-[var(--neon-magenta)] -rotate-6",
                  i === 1 && "w-32 h-32 sm:w-40 sm:h-40 text-[var(--neon-cyan)] z-10 shadow-[0_0_30px_rgba(0,255,255,0.1)]",
                  i === 2 && "w-24 h-24 sm:w-32 sm:h-32 text-[var(--neon-amber)] rotate-6"
                )}
              >
                <Icon className="size-1/3 opacity-80" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

