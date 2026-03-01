import type { Metadata } from "next"
import Image from "next/image"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { FileSearch, Target, Cpu, LineChart, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Nuestro Proceso",
  description:
    "Del caos a la automatización en 4 pasos. Descubre cómo trabajamos en Visual Art AI.",
  openGraph: {
    title: `Proceso de Trabajo — ${SITE_NAME}`,
    description: "Cero fricción. Máximo rendimiento. Así operamos.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const pasos = [
  {
    numero: "01",
    icono: <FileSearch className="size-8 text-[var(--neon-cyan)]" />,
    titulo: "Auditoría Estratégica",
    descripcion:
      "Nada de reuniones de 2 horas para 'conocernos'. Completas un brief estratégico asíncrono. Diagnosticamos exactamente dónde estás perdiendo dinero y tiempo por falta de sistemas.",
    detalle: [
      "Briefing rápido y asíncrono",
      "Detección de 'cuellos de botella' operativos",
      "Identificación de flujos automatizables",
    ],
    glow: "cyan" as const,
  },
  {
    numero: "02",
    icono: <Target className="size-8 text-[var(--neon-magenta)]" />,
    titulo: "Arquitectura del Sistema",
    descripcion:
      "Diseñamos el flujo exacto que tu empresa o marca personal necesita. Definimos qué IAs utilizar, qué roles se automatizan y calculamos el tiempo proyectado que recuperarás.",
    detalle: [
      "Selección de Stack IA (OpenAI, Anthropic, Midjourney)",
      "Diseño del workflow paso a paso",
      "Proyección de ROI en horas/semana",
    ],
    glow: "magenta" as const,
  },
  {
    numero: "03",
    icono: <Cpu className="size-8 text-[var(--neon-violet)]" />,
    titulo: "Ensamblaje e Implementación",
    descripcion:
      "Entramos al barro. Construimos los mega-prompts, configuramos las automatizaciones (Zapier/Make si aplica) y orquestamos el sistema completo. Lo dejamos listo para 'Copia y Pega'.",
    detalle: [
      "Creación de prompts psicológicos y de marca",
      "Setup técnico de herramientas",
      "Pruebas de estrés del sistema",
    ],
    glow: "violet" as const,
  },
  {
    numero: "04",
    icono: <LineChart className="size-8 text-[var(--neon-cyan)]" />,
    titulo: "Onboarding y Traspaso de Poder",
    descripcion:
      "Entregamos las llaves. Te capacitamos a ti o a tu equipo para operar la máquina. Transformamos la dependencia temporal en total autonomía operativa.",
    detalle: [
      "Sesión de capacitación en vivo",
      "Documentación SOP (Standard Operating Procedure)",
      "Soporte de calibración post-entrega",
    ],
    glow: "cyan" as const,
  },
]

export default function ProcesoPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--neon-violet)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <NeonBadge variant="violet" className="mb-6 shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                Modus Operandi
              </NeonBadge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-tight">
                Workflows claros. <span className="text-gradient-violet drop-shadow-lg">Pensamiento Crítico.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-[1.15rem] leading-relaxed text-[var(--text-secondary)] mb-8 max-w-lg">
                Saber usar prompts básicos ya no te diferencia. Necesitas desarrollar un <strong className="text-[var(--text-primary)] font-semibold">pensamiento crítico imparable y tener flujos de trabajo claros para escalar tu creatividad sin morir en el intento.</strong> Nuestro proceso está diseñado para instalar esa mentalidad estratégica en ti.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-5">
                <NeonButton href="/contacto" variant="neon" size="lg" className="hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(138,43,226,0.2)]">
                  Iniciar el Sistema <ArrowRight className="size-5 ml-2" />
                </NeonButton>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4} className="hidden lg:flex justify-end perspective-[1000px]">
            {/* Integrating the nanobanana generated image placeholder with CSS filters for variation */}
            <div className="relative w-[500px] h-[500px] animate-float rotate-y-6 drop-shadow-[0_0_30px_rgba(138,43,226,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-violet)]/20 to-[var(--neon-magenta)]/20 rounded-3xl blur-3xl opacity-60" />
              <Image
                src="/nanobanana_hero_1772244665616.png"
                alt="Nanobanana Proceso Eficiente"
                fill
                className="object-contain relative z-10 hue-rotate-60 contrast-125 saturate-150"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="violet" />
      </ScrollReveal>

      {/* Pasos */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative connecting line */}
        <div className="absolute left-[2.5rem] md:left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-magenta)] to-[var(--neon-violet)] opacity-20 hidden md:block" />

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-16">
            {pasos.map((p, _i) => (
              <ScrollReveal key={p.numero} delay={0.1}>
                <NeonCard glow={p.glow} className="p-8 md:p-12 relative group transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.1)]">
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center">

                    {/* Number & Icon Block */}
                    <div className="flex-shrink-0 relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[var(--neon-cyan-dim)] to-transparent opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-full" />
                      <div className="font-display text-8xl font-black text-[var(--bg-elevated)] [-webkit-text-stroke:2px_var(--neon-cyan)] group-hover:[-webkit-text-stroke:2px_var(--text-primary)] transition-all duration-500 leading-none mb-4 tracking-tighter self-start drop-shadow-md">
                        {p.numero}
                      </div>
                      <div className={cn("size-20 rounded-2xl flex items-center justify-center -mt-8 ml-4 backdrop-blur-md border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110", `bg-[var(--neon-${p.glow}-dim)]/80`)}>
                        {p.icono}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="flex-1">
                      <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-white transition-colors">
                        {p.titulo}
                      </h2>
                      <p className="text-[1.1rem] text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                        {p.descripcion}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mt-4 p-5 bg-black/20 rounded-xl border border-white/5 shadow-inner">
                        {p.detalle.map((d) => (
                          <div key={d} className="flex items-start gap-3">
                            <span className={cn("size-2 rounded-full mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-150 animate-pulse", `bg-[var(--neon-${p.glow})]`, `shadow-[0_0_8px_var(--neon-${p.glow})]`)} />
                            <span className="text-[0.95rem] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with image */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--neon-cyan)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

          <ScrollReveal delay={0.1} className="order-2 lg:order-1 perspective-[1000px]">
            {/* Re-using nanobanana generated image with severe CSS styling to make it look distinct */}
            <div className="relative w-full max-w-[450px] h-[450px] mx-auto animate-float drop-shadow-[0_0_50px_rgba(0,255,255,0.2)]">
              <Image
                src="/nanobanana_hero_1772244665616.png"
                alt="Nanobanana Resultados Sistemáticos"
                fill
                className="object-contain relative z-10 -hue-rotate-[120deg] brightness-125 contrast-110 saturate-[2]"
              />
            </div>
          </ScrollReveal>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-tight">
                Expandir la creatividad o <br className="hidden lg:block" />
                <span className="text-[var(--neon-cyan)] drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">quedar rezagado.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Dejar la adopción de IA para &ldquo;algún día&rdquo; es la decisión financiera y profesional más peligrosa que puedes tomar hoy. Agenda una sesión rápida y aprende a pensar fuera de la caja.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <NeonButton href="/contacto" variant="neon" size="lg" className="w-full sm:w-auto text-[1.05rem] py-6 px-10 hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
                  Agendar auditoría <ArrowRight className="size-5 ml-2" />
                </NeonButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
