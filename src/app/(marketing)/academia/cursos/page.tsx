import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { GlowDivider } from "@/components/brand/GlowDivider"
import { SITE_NAME } from "@/lib/constants"
import { Clock, Users, Star, ArrowRight, BookOpen, Skull } from "lucide-react"
import { ScrollReveal } from "@/components/animations/ScrollReveal"

export const metadata: Metadata = {
  title: "Catálogo de Sistemas IA",
  description:
    "El mundo no te va a esperar. Si no dominas la IA hoy, estás obsoleto mañana. Únete a Visual Art AI.",
  openGraph: {
    title: `Catálogo de Sistemas IA — ${SITE_NAME}`,
    description: "Sistemas prácticos de IA. Deja la teoría atrás, empieza a hiper-producir.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
}

const cursos = [
  {
    slug: "sistema-ia-contenido-semanal",
    titulo: "Sistema IA para Contenido Semanal",
    descripcion:
      "Aprende a producir una semana de contenido original y estratégico en una tarde. Supera el bloqueo creativo, manteniendo tu voz exacta y escalando sin burnout.",
    ruta: "Redes Sociales",
    nivel: "Principiante–Intermedio",
    duracion: "6h aprox.",
    modulos: 6,
    precio: "$149.000 CLP",
    rating: 5,
    alumnos: 120,
    destacado: true,
    tags: ["IA", "Contenido", "Automatización", "Productividad"],
    imagen: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "flujos-ia-productividad",
    titulo: "Clonación Digital: Ahorra 10h/semana",
    descripcion:
      "Delega reportes, emails y análisis a tu clon digital. Este no es un curso de 'qué bonita es la IA', es un sistema de automatización profundo sin fricción ni código.",
    ruta: "Productividad",
    nivel: "Principiante",
    duracion: "4h aprox.",
    modulos: 6,
    precio: "$99.000 CLP",
    rating: 5,
    alumnos: 89,
    destacado: false,
    tags: ["Delegación", "SOPs", "Automatización"],
    imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "musica-ia-lanzamiento-ep",
    titulo: "Music AI Producer: Lanza tu EP de 5 Canciones",
    descripcion:
      "Crea música profesional. Mejores prompts para líricas (Claude), estilos musicales increíbles (Suno), y masterización final (Bandlab). Crea y publica en Spotify/Youtube desde cero.",
    ruta: "Creatividad",
    nivel: "Intermedio",
    duracion: "8h aprox.",
    modulos: 8,
    precio: "$129.000 CLP",
    rating: 5,
    alumnos: 45,
    destacado: true,
    tags: ["Suno", "Claude", "Música", "Masterización"],
    imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "claude-core-y-especializaciones",
    titulo: "Claude 4.6: Code, Work & Especializaciones",
    descripcion:
      "Domina Claude 4.6 Sonnet & Opus — el modelo más avanzado disponible. Claude Code para desarrollo, Claude for Work para tu empresa, MCP y casos de uso reales para profesionales de cualquier industria.",
    ruta: "Especialización Profesional",
    nivel: "Intermedio–Avanzado",
    duracion: "12h aprox.",
    modulos: 14,
    precio: "$199.000 CLP",
    rating: 5,
    alumnos: 34,
    destacado: true,
    tags: ["Claude 4.6", "Claude Code", "MCP", "Opus", "Sonnet"],
    imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "copywriting-ia",
    titulo: "AI Copywriter: Ofertas Irresistibles",
    descripcion:
      "Conviértete en un copywriter de élite. Escribe directo al dolor, desarrolla pensamiento crítico y vende en un mercado saturado aprovechando el análisis profundo de los grandes LLMs.",
    ruta: "Ventas & Texto",
    nivel: "Intermedio",
    duracion: "5h aprox.",
    modulos: 5,
    precio: "$89.000 CLP",
    rating: 5,
    alumnos: 156,
    destacado: false,
    tags: ["Copywriting", "Ventas", "Psicología"],
    imagen: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "storytelling-ia",
    titulo: "AI Storytelling: Expande tu Creatividad",
    descripcion:
      "Las máquinas operan, pero los humanos conectan. Usa IA para estructurar narrativas que cautiven a tu audiencia, pensando fuera de la caja para generar mundos e historias memorables.",
    ruta: "Creatividad",
    nivel: "Principiante–Intermedio",
    duracion: "4h aprox.",
    modulos: 4,
    precio: "$79.000 CLP",
    rating: 5,
    alumnos: 60,
    destacado: false,
    tags: ["Storytelling", "Conexión Emocional"],
    imagen: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
  },
  {
    slug: "implementacion-ia-equipos",
    titulo: "Implementación de IA para Equipos",
    descripcion:
      "Estandariza el uso de IA en tu empresa. Crea directrices, capacita a tu equipo y establece políticas de seguridad de datos.",
    ruta: "Business",
    nivel: "Avanzado",
    duracion: "12h aprox.",
    modulos: 10,
    precio: "$299.000 CLP",
    rating: 5,
    alumnos: 300,
    destacado: true,
    tags: ["Empresas", "Directivos", "Implementación B2B"],
    imagen: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "automatizacion-ventas-b2b",
    titulo: "Sistemas IA para Agencias B2B",
    descripcion:
      "Automatiza la prospección, el seguimiento y el cierre en tu agencia. Crea sistemas de ventas predecibles apoyados por agentes virtuales.",
    ruta: "Business",
    nivel: "Avanzado",
    duracion: "8h aprox.",
    modulos: 7,
    precio: "$249.000 CLP",
    rating: 5,
    alumnos: 180,
    destacado: true,
    tags: ["Ventas", "B2B", "Agencias"],
    imagen: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  }
]

const rutas = ["Todos", "Productividad", "Redes Sociales", "Creatividad", "Especialización Profesional", "Ventas & Texto"]
const niveles = ["Todos los niveles", "Principiante", "Intermedio", "Avanzado"]

export default function CursosPage() {
  return (
    <>
      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--neon-cyan)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center md:text-left">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 font-semibold shadow-inner border border-red-500/20">
              <Skull className="size-4" />
              <span>O aprendes IA, o te quedas atrás.</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight leading-tight">
              Instala <span className="text-gradient-cyan">Sistemas Avanzados</span> en tu mente.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              En el mundo actual, saber apretar botones ya no es suficiente. Lo que las empresas demandan hoy es <strong>pensamiento crítico, habilidades de conexión humana (Storytelling) y la capacidad de pensar "fuera de la caja" (Creativity)</strong> usando la IA como palanca. Adquiere estas habilidades aquí y no te quedes rezagado.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <GlowDivider color="cyan" />
      </ScrollReveal>

      <section className="py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              {rutas.map((r, i) => (
                <span
                  key={r}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${i === 0
                    ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] border border-[var(--border-accent)]"
                    : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-secondary)]"
                    }`}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {niveles.map((n, i) => (
                <span
                  key={n}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-colors ${i === 0
                    ? "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {cursos.map((curso, index) => (
              <ScrollReveal key={curso.slug} delay={0.1 * (index % 4)}>
                <Link href={`/academia/cursos/${curso.slug}`} className="group h-full block">
                  <NeonCard glow={curso.destacado ? "cyan" : "violet"} hoverable className="h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.05)] border-[rgba(255,255,255,0.02)] overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden border-b border-[var(--border-subtle)]">
                      <Image
                        src={curso.imagen}
                        alt={curso.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-screen"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-90" />
                    </div>
                    <div className="flex flex-col gap-6 flex-1 p-8">
                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <NeonBadge variant={curso.destacado ? "cyan" : "violet"}>{curso.ruta}</NeonBadge>
                          <NeonBadge variant="neutral">{curso.nivel}</NeonBadge>
                          {curso.destacado && (
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--neon-amber)] animate-pulse ml-auto bg-[rgba(255,215,64,0.1)] px-3 py-1 rounded-full border border-[rgba(255,215,64,0.3)]">
                              🔥 Irresistible
                            </span>
                          )}
                        </div>

                        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--neon-cyan)] transition-colors leading-tight">
                          {curso.titulo}
                        </h2>

                        <p className="text-[var(--text-secondary)] text-[1.05rem] leading-relaxed mb-6 font-medium flex-1">
                          {curso.descripcion}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-6 bg-[var(--bg-void)] p-4 rounded-xl border border-[var(--border-subtle)] w-full">
                          <span className="flex items-center gap-2">
                            <Clock className="size-4 text-[var(--neon-cyan)]" /> {curso.duracion}
                          </span>
                          <span className="flex items-center gap-2">
                            <BookOpen className="size-4 text-[var(--neon-magenta)]" /> {curso.modulos} mód.
                          </span>
                          <span className="flex items-center gap-2">
                            <Star className="size-4 text-[var(--neon-amber)] fill-current" /> {curso.rating}.0
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {curso.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] border border-white/10 group-hover:border-[var(--neon-cyan)]/30 group-hover:text-[var(--text-secondary)] transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-end mt-auto pt-6 border-t border-[var(--border-subtle)]">
                          <div className="flex flex-col">
                            <span className="font-display text-3xl font-black text-[var(--text-primary)] tracking-tight">
                              {curso.precio}
                            </span>
                            <span className="text-xs uppercase tracking-wider font-bold text-[var(--text-muted)] mt-1">
                              Pago único + Updates
                            </span>
                          </div>
                          <div className="size-12 rounded-full bg-[var(--neon-cyan-dim)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                            <ArrowRight className="size-5 text-[var(--neon-cyan)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
