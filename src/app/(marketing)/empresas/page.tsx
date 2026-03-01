import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { ScrollReveal } from "@/components/animations/ScrollReveal"
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants"
import { Building2, Users, TrendingUp, Shield, CheckCircle2, ArrowRight, Mail, Clock, Star, AlertTriangle, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Soluciones para Empresas",
  description:
    "IA para equipos de marketing y contenido. Capacitación, implementación y soporte continuo.",
  openGraph: {
    title: `Empresas — ${SITE_NAME}`,
    description: "Implementamos IA en tu equipo de marketing y contenido.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const propuesta = [
  {
    icono: <Building2 className="size-8 text-[var(--neon-cyan)]" />,
    titulo: "Diagnóstico de equipo",
    descripcion:
      "Analizamos cómo trabaja tu equipo hoy e identificamos dónde la IA puede ahorrar más tiempo y mejorar resultados.",
    glow: "cyan" as const,
  },
  {
    icono: <Users className="size-8 text-[var(--neon-magenta)]" />,
    titulo: "Capacitación a medida",
    descripcion:
      "Talleres y cursos adaptados a tu industria, tus herramientas y los casos de uso de tu equipo.",
    glow: "magenta" as const,
  },
  {
    icono: <TrendingUp className="size-8 text-[var(--neon-violet)]" />,
    titulo: "Implementación de flujos",
    descripcion:
      "Diseñamos e implementamos los flujos IA para tu producción de contenido, reportes y comunicación.",
    glow: "violet" as const,
  },
  {
    icono: <Shield className="size-8 text-[var(--neon-cyan)]" />,
    titulo: "Política de uso seguro",
    descripcion:
      "Definimos junto a ti qué datos y procesos pueden automatizarse y cuáles requieren supervisión humana.",
    glow: "cyan" as const,
  },
]

const beneficios = [
  "Ahorro de 5–15h/semana por persona del equipo",
  "Mayor volumen de contenido sin aumentar headcount",
  "Consistencia de marca en toda la producción",
  "Adopción guiada: evitamos resistencia al cambio",
  "Políticas de uso seguro para datos corporativos",
  "Medición de impacto real desde el día uno",
]

const datosActuales = [
  {
    stat: "62%",
    titulo: "de empresas en Chile sin talento tech",
    descripcion:
      "ManpowerGroup registra que 6 de cada 10 empresas nacionales no puede cubrir sus vacantes tecnológicas. El talento que sabe usar IA con método es el más escaso y el más cotizado.",
    fuente: "ManpowerGroup · Emol, Feb 2026",
    glow: "magenta" as const,
  },
  {
    stat: "3x",
    titulo: "más resultados con líderes que modelan IA",
    descripcion:
      "McKinsey lo documentó: las organizaciones donde los líderes usan IA ellos mismos —no solo aprueban presupuesto— son tres veces más propensas a lograr transformación real.",
    fuente: "McKinsey · vía Infobae, Feb 2026",
    glow: "cyan" as const,
  },
  {
    stat: "↑ burn",
    titulo: "La IA sin método intensifica el trabajo",
    descripcion:
      "HBR publicó en 2026 que equipos que adoptan IA sin una 'práctica de IA' —normas, método, secuenciación— trabajan a ritmo más rápido, asumen más tareas y alargan su jornada, generando fatiga cognitiva y agotamiento.",
    fuente: "Harvard Business Review, Feb 2026",
    glow: "violet" as const,
  },
]

const casos = [
  {
    tipo: "Agencia de marketing",
    resultado: "Duplicó capacidad de producción sin contratar",
    detalle: "8 personas, 3 semanas de implementación",
  },
  {
    tipo: "Startup SaaS",
    resultado: "Lanzó blog + redes en 2 semanas",
    detalle: "Equipo de 2 personas sin experiencia en contenido",
  },
  {
    tipo: "Consultora B2B",
    resultado: "Reportes automáticos en 15 min/semana",
    detalle: "Antes: 4-6 horas de trabajo manual",
  },
]

const cursosDestacados = [
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

export default function EmpresasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <NeonBadge variant="cyan" className="mb-6">
            Para equipos y empresas
          </NeonBadge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 max-w-3xl leading-tight">
            Implementa IA en tu equipo de{" "}
            <span className="text-gradient-cyan">marketing y contenido</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mb-6">
            No basta con dar acceso a las herramientas. Capacitamos a tu equipo para que adopte la IA de
            forma estratégica, segura y medible.
          </p>
          <div className="flex items-start gap-3 mb-10 p-4 rounded-xl border border-[var(--neon-magenta)]/20 bg-[var(--neon-magenta)]/[0.04] max-w-xl">
            <AlertTriangle className="size-5 text-[var(--neon-magenta)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Harvard Business Review, 2026:</strong> la IA sin método
              no reduce la carga laboral, la intensifica. Los equipos trabajan más horas y acumulan más tareas.
              La solución no es más herramientas — es formación con método.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <NeonButton href="#formulario" variant="neon" size="lg">
              Solicitar diagnóstico <ArrowRight className="size-4" />
            </NeonButton>
            <NeonButton href={`mailto:${CONTACT_EMAIL}`} variant="ghost-neon" size="lg">
              <Mail className="size-4" /> Escribirnos directo
            </NeonButton>
          </div>
        </div>
      </section>

      <GlowDivider color="cyan" />

      {/* Propuesta */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Qué hacemos por tu empresa
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Un proceso completo desde el diagnóstico hasta la implementación y seguimiento.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {propuesta.map((p) => (
              <NeonCard key={p.titulo} glow={p.glow} hoverable className="p-8">
                <div className="mb-4">{p.icono}</div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  {p.titulo}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.descripcion}</p>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider color="magenta" />

      {/* Beneficios */}
      <section className="py-20 bg-[var(--bg-elevated)]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-8">
                Resultados esperados
              </h2>
              <ul className="flex flex-col gap-4">
                {beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-2">
                Casos de referencia
              </h3>
              {casos.map((c) => (
                <NeonCard key={c.tipo} glow="none" className="p-6">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    {c.tipo}
                  </p>
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{c.resultado}</p>
                  <p className="text-sm text-[var(--text-muted)]">{c.detalle}</p>
                </NeonCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="magenta" />
      </ScrollReveal>

      {/* Datos duros — el costo de la IA sin método */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-magenta)]/[0.025] to-transparent pointer-events-none" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <NeonBadge variant="magenta" className="mb-4">Datos 2026</NeonBadge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                El costo real de la{" "}
                <span className="text-gradient-magenta">IA sin método</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Investigaciones de 2026 documentan exactamente el bucle en el que están atrapados la mayoría de los equipos.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {datosActuales.map((d) => (
                <NeonCard key={d.stat} glow={d.glow} hoverable className="p-8 flex flex-col gap-4">
                  <div className={`font-display text-5xl font-bold leading-none text-[var(--neon-${d.glow})]`}>
                    {d.stat}
                  </div>
                  <p className="text-[var(--text-primary)] font-semibold leading-snug">{d.titulo}</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">{d.descripcion}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-60 border-t border-[var(--border-subtle)] pt-3">
                    {d.fuente}
                  </p>
                </NeonCard>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <NeonCard glow="none" className="p-8 md:p-10 max-w-3xl mx-auto">
              <Quote className="size-8 text-[var(--neon-cyan-dim)] mb-4 opacity-50" />
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-3 italic">
                &ldquo;Las organizaciones que se transforman desarrollan un cambio cultural alrededor de la IA que,
                con el tiempo, deja de tener espacio para perfiles que no evolucionaron. No los echan.
                Simplemente dejan de encajar.&rdquo;
              </p>
              <p className="text-[var(--neon-cyan)] font-semibold">
                Con la IA está pasando lo mismo que con Office en los 90. Solo que más rápido.
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] opacity-60 mt-4">
                Infobae · Feb 2026
              </p>
            </NeonCard>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="cyan" />
      </ScrollReveal>

      {/* Cursos para Empresas */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--neon-cyan)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <div>
                <NeonBadge variant="cyan" className="mb-4">
                  Cursos B2B
                </NeonBadge>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                  Lleva tu equipo al siguiente nivel
                </h2>
              </div>
              <Link
                href="/academia"
                className="text-[1.05rem] font-medium text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors inline-flex items-center gap-2 group"
              >
                Ver academia <ArrowRight className="size-5 transform group-hover:translate-x-1 transition-transform" />
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
                          Ver detalles <ArrowRight className="size-4" />
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

      {/* Formulario de contacto */}
      <section id="formulario" className="py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">
              Solicita un diagnóstico gratuito
            </h2>
            <p className="text-[var(--text-secondary)]">
              Cuéntanos tu empresa y objetivos. Te respondemos en 24 horas con una propuesta.
            </p>
          </div>

          <NeonCard glow="cyan" className="p-8 md:p-10">
            <form
              action={`mailto:${CONTACT_EMAIL}`}
              method="GET"
              className="flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email corporativo
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@empresa.cl"
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Tamaño del equipo
                  </label>
                  <select
                    name="tamano"
                    className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
                  >
                    <option value="">Seleccionar</option>
                    <option value="1-5">1–5 personas</option>
                    <option value="6-20">6–20 personas</option>
                    <option value="21-50">21–50 personas</option>
                    <option value="50+">Más de 50</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  ¿Qué quieres lograr con IA?
                </label>
                <textarea
                  name="objetivo"
                  placeholder="Describe brevemente tu objetivo principal..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm resize-none"
                />
              </div>

              <NeonButton type="submit" variant="neon" className="w-full">
                Enviar solicitud <ArrowRight className="size-4" />
              </NeonButton>
              <p className="text-xs text-center text-[var(--text-muted)]">
                Te respondemos en máximo 24 horas hábiles.
              </p>
            </form>
          </NeonCard>
        </div>
      </section>
    </>
  )
}
