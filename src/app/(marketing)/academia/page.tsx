import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { CTABanner } from "@/components/marketing/CTABanner"
import { TechMarquee } from "@/components/marketing/TechMarquee"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { BookOpen, Users, FolderOpen, ArrowRight, Star, Clock, Target, Skull, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Sistemas IA y Habilidades Humanas",
  description:
    "El mundo no te va a esperar. Evita quedar rezagado, expande tus límites creativos y desarrolla pensamiento crítico.",
  openGraph: {
    title: `Sistemas IA y Habilidades Humanas — ${SITE_NAME}`,
    description: "Sistemas probados de facturación y eficiencia. Deja la teoría atrás.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const pilares = [
  {
    icono: <Target className="size-10 text-[var(--neon-cyan)]" />,
    titulo: "Sistemas Escalables & Workflows",
    descripcion:
      "Deja de improvisar. Implementa workflows claros y definidos para multiplicar tu producción de contenido y clientes hoy mismo. Cursos enfocados 100% en ROI financiero y ahorro de tiempo.",
    cta: { label: "Ver sistemas", href: "/academia/cursos" },
    glow: "cyan" as const,
    stat: "No te quedes atrás",
  },
  {
    icono: <Users className="size-10 text-[var(--neon-magenta)]" />,
    titulo: "Desarrollo de Pensamiento Crítico",
    descripcion:
      "La IA opera, los humanos dirigen. McKinsey (2026) lo confirmó: los líderes que usan IA ellos mismos logran 3x más resultados que los que solo aprueban herramientas. Desarrolla las habilidades que ningún modelo puede reemplazar.",
    cta: { label: "Agendar auditoría", href: "/academia/mentorias" },
    glow: "magenta" as const,
    stat: "Dato McKinsey 2026",
  },
  {
    icono: <FolderOpen className="size-10 text-[var(--neon-violet)]" />,
    titulo: "La Bóveda de Ofertas Irresistibles",
    descripcion:
      "Acceso directo a las plantillas, mega-prompts y estructuras psicológicas que usamos internamente para crear textos que atacan directamente al dolor y facturan todos los días.",
    cta: { label: "Ingresar a la bóveda", href: "/academia/recursos" },
    glow: "violet" as const,
    stat: "Copia, Pega, Piensa",
  },
]

const cursosDestacados = [
  {
    slug: "sistema-ia-contenido-semanal",
    titulo: "Sistema IA para Contenido Semanal",
    descripcion:
      "El SOP definitivo para agencias y creadores. Produce decenas de piezas interconectadas manteniendo tu propia voz. Adiós al bloqueo creativo.",
    ruta: "Conversión de Redes",
    nivel: "Int.-Avanzado",
    duracion: "Formato intensivo",
    precio: "$149.000 CLP",
    rating: 5,
    alumnos: "2.4k+",
    imagen: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "flujos-ia-productividad",
    titulo: "Clonación Digital: Ahorra 10h/sem",
    descripcion:
      "Delega reportes, emails y análisis. Un sistema profundo sin fricción. No te quedes atrás en la carrera corporativa.",
    ruta: "Delegación Absoluta",
    nivel: "Principiante",
    duracion: "Acción Rápida",
    precio: "$99.000 CLP",
    rating: 5,
    alumnos: "1.8k+",
    imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "musica-ia-lanzamiento-ep",
    titulo: "Music AI Producer: Crea tu propio EP",
    descripcion:
      "Domina Suno, Claude y Bandlab. Prompts para líricas profundas, creación de ritmos magistrales y masterización sin ser músico. Publica tu álbum en Spotify.",
    ruta: "Creatividad",
    nivel: "Intermedio",
    duracion: "Acción Completa",
    precio: "$129.000 CLP",
    rating: 5,
    alumnos: "450+",
    imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "claude-core-y-especializaciones",
    titulo: "Claude 4.6: Code, Work & Especializaciones",
    descripcion:
      "Domina Claude 4.6 Sonnet & Opus — el modelo más avanzado de 2026. Claude Code para devs, Claude for Work para equipos, MCP y especializaciones quirúrgicas por industria.",
    ruta: "Especialización",
    nivel: "Intermedio–Avanzado",
    duracion: "Masterclass v2.0",
    precio: "$199.000 CLP",
    rating: 5,
    alumnos: "34+",
    imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "copywriting-ia",
    titulo: "AI Copywriter: Ofertas Irresistibles",
    descripcion:
      "Escribe directo al dolor y vende más. Combina la psicología humana con la potencia de los LLMs. Un curso crítico en un mercado saturado.",
    ruta: "Ventas & Texto",
    nivel: "Intermedio",
    duracion: "Estratégico",
    precio: "$89.000 CLP",
    rating: 5,
    alumnos: "980+",
    imagen: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "storytelling-ia",
    titulo: "AI Storytelling: Expande tu Creatividad",
    descripcion:
      "Las máquinas operan, los humanos conectan. Aprende a crear universos narrativos apoyados en IA para lograr retención máxima.",
    ruta: "Creatividad",
    nivel: "Principiante",
    duracion: "Básico",
    precio: "$79.000 CLP",
    rating: 5,
    alumnos: "600+",
    imagen: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "implementacion-ia-equipos",
    titulo: "Implementación de IA para Equipos",
    descripcion:
      "Estandariza el uso de IA en tu empresa. Crea directrices, capacita a tu equipo y establece políticas de seguridad y metodologías claras.",
    ruta: "Business",
    nivel: "Avanzado",
    duracion: "Transformación",
    precio: "$299.000 CLP",
    rating: 5,
    alumnos: "300+",
    imagen: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "automatizacion-ventas-b2b",
    titulo: "Sistemas IA para Agencias B2B",
    descripcion:
      "Automatiza la prospección, el seguimiento y el cierre en tu agencia. Crea sistemas de ventas predecibles apoyados por agentes virtuales.",
    ruta: "Business",
    nivel: "Avanzado",
    duracion: "Acelerador",
    precio: "$249.000 CLP",
    rating: 5,
    alumnos: "180+",
    imagen: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  }
]

export default function AcademiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        {/* Background glow for hero */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--neon-cyan)] opacity-[0.05] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 font-semibold shadow-inner border border-red-500/20">
                <Skull className="size-4" />
                <span>Si no usas IA hoy, estarás obsoleto mañana.</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-[1.1] tracking-tight">
                El atajo hacia el <br /><span className="text-gradient-cyan drop-shadow-lg">pensamiento crítico</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg">
                El conocimiento de &ldquo;apretar botones&rdquo; en ChatGPT ya es genérico y gratuito en YouTube. Aquí vienes a expandir los límites de tu creatividad y adquirir <strong className="text-[var(--text-primary)] font-semibold">workflows comprobados que te hacen indispensable</strong>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-5">
                <NeonButton href="/academia/cursos" variant="neon" size="lg" className="shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:scale-105 transition-transform duration-300">
                  Ver Sistemas Disponibles <ArrowRight className="size-5 ml-2" />
                </NeonButton>
                <NeonButton href="/academia/recursos" variant="ghost-neon" size="lg">
                  Ver Bóveda Gratuita
                </NeonButton>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4} className="hidden lg:flex justify-end perspective-[1000px]">
            {/* Integrating the nanobanana generated image */}
            <div className="relative w-[500px] h-[500px] animate-float drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.8)]">
              {/* Fallback styling in case image doesn't load immediately */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-magenta)]/20 rounded-3xl blur-2xl" />
              <Image
                src="/nanobanana_hero_1772244665616.png"
                alt="Nanobanana Cyberpunk Tool"
                fill
                className="object-contain filter saturate-150 relative z-10"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack */}
      <TechMarquee />

      <ScrollReveal>
        <GlowDivider color="cyan" />
      </ScrollReveal>

      {/* 3 Pilares */}
      <section className="py-24 relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                Habilidades humanas. Apalancamiento IA.
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                No hay tiempo para la teoría vacía. O aprendes a pensar estratégicamente con estos flujos, o corres el riesgo de quedar fuera del mapa laboral.{" "}
                <strong className="text-[var(--text-primary)]">El 62% de las empresas en Chile ya no encuentra el talento que necesita</strong>{" "}
                — no seas parte de ese número.{" "}
                <span className="text-[var(--text-muted)] text-sm">(ManpowerGroup · Emol 2026)</span>
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pilares.map((p, i) => (
              <ScrollReveal key={p.titulo} delay={0.1 + (i * 0.1)}>
                <NeonCard glow={p.glow} hoverable className="p-10 h-full flex flex-col group transition-all duration-500 hover:-translate-y-2">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 origin-left drop-shadow-[0_0_15px_currentColor]">
                    {p.icono}
                  </div>
                  <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", `text-[var(--neon-${p.glow})] opacity-80`)}>
                    {p.stat}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4 leading-tight group-hover:text-white transition-colors">
                    {p.titulo}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-8 flex-1 text-[1.05rem]">
                    {p.descripcion}
                  </p>
                  <NeonButton href={p.cta.href} variant="outline" size="sm" className="w-full justify-center group-hover:bg-white/5 transition-colors">
                    {p.cta.label} <ArrowRight className="size-4 ml-1" />
                  </NeonButton>
                </NeonCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="magenta" />
      </ScrollReveal>

      {/* Cursos destacados */}
      <section className="py-24 bg-[var(--bg-elevated)] relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--neon-magenta)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <div>
                <NeonBadge variant="magenta" className="mb-4">
                  Ofertas Irresistibles
                </NeonBadge>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                  Catálogo Completo
                </h2>
              </div>
              <Link
                href="/academia/cursos"
                className="text-[1.05rem] font-medium text-[var(--text-muted)] hover:text-[var(--neon-magenta)] transition-colors inline-flex items-center gap-2 group"
              >
                Ver más detalles <ArrowRight className="size-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {cursosDestacados.map((curso, i) => (
              <ScrollReveal key={curso.slug} delay={0.1 + ((i % 2) * 0.1)}>
                <Link href={`/academia/cursos/${curso.slug}`} className="block h-full group">
                  <NeonCard glow="cyan" className="h-full flex flex-col transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:border-[rgba(0,255,255,0.3)] hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden border-b border-[var(--border-subtle)]">
                      <Image
                        src={curso.imagen}
                        alt={curso.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-screen"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-90" />
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <NeonBadge variant="cyan" className="shadow-sm">{curso.ruta}</NeonBadge>
                        <NeonBadge variant="neutral">{curso.nivel}</NeonBadge>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--neon-cyan)] transition-colors leading-tight">
                        {curso.titulo}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-[1.1rem] leading-relaxed mb-8 flex-1">
                        {curso.descripcion}
                      </p>

                      <div className="text-sm text-[var(--text-muted)] mb-8 bg-black/20 p-4 rounded-xl flex items-center justify-between">
                        <span className="flex items-center gap-2 font-medium">
                          <Clock className="size-4 text-[var(--neon-cyan)]" /> {curso.duracion}
                        </span>
                        <span className="flex items-center gap-2 font-medium">
                          <Users className="size-4 text-[var(--neon-magenta)]" /> {curso.alumnos}
                        </span>
                        <span className="flex items-center gap-2 font-medium">
                          <Star className="size-4 text-[var(--neon-amber)] fill-current" /> {curso.rating}/5
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6 mt-auto">
                        <span className="font-display text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                          {curso.precio}
                        </span>
                        <span className="text-[0.95rem] font-bold uppercase tracking-wider text-[var(--neon-cyan)] flex items-center gap-2 group-hover:gap-3 transition-all">
                          Desbloquear <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </NeonCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="violet" />
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <CTABanner
              title="¿Miedo a quedarte atrás?"
              description="No te paralices. Cuéntanos tu cuello de botella actual (creación, negocios, tiempo) y te diremos exactamente por qué sistema debes empezar para ser irremplazable."
              primaryCta={{ label: "Diagnóstico gratuito", href: "/contacto" }}
              secondaryCta={{ label: "Explorar la bóveda", href: "/academia/recursos" }}
            />
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
