import Link from "next/link"
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { db } from "@/db"
import { courses } from "@/db/schema"
import { eq } from "drizzle-orm"

export const metadata = {
  title: "¡Pago exitoso! — Visual Art AI",
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{
    courseSlug?: string
    external_reference?: string // MercadoPago: "userId:courseId"
    collection_status?: string
  }>
}

export default async function PagoExitosoPage({ searchParams }: Props) {
  const params = await searchParams
  let courseSlug = params.courseSlug

  // MercadoPago path: resolve courseId → slug
  if (!courseSlug && params.external_reference) {
    const parts = params.external_reference.split(":")
    const courseId = parts[1]
    if (courseId) {
      try {
        const [course] = await db
          .select({ slug: courses.slug, title: courses.title })
          .from(courses)
          .where(eq(courses.id, courseId))
          .limit(1)
        courseSlug = course?.slug
      } catch {
        // Non-fatal
      }
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <NeonBadge variant="cyan">Pago confirmado</NeonBadge>

        <NeonCard glow="cyan" className="p-10 space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[var(--neon-cyan)] opacity-20 blur-xl scale-150" />
              <CheckCircle2 className="relative size-20 text-[var(--neon-cyan)]" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
              ¡Bienvenido al curso!
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Tu pago fue procesado exitosamente. Ya tienes acceso completo al contenido.
            </p>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            {courseSlug ? (
              <NeonButton
                href={`/app/cursos/${courseSlug}`}
                variant="neon"
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <BookOpen className="size-4" />
                  Empezar ahora
                  <ArrowRight className="size-4" />
                </span>
              </NeonButton>
            ) : (
              <NeonButton href="/app/mis-cursos" variant="neon" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  <BookOpen className="size-4" />
                  Ir a mis cursos
                  <ArrowRight className="size-4" />
                </span>
              </NeonButton>
            )}
            <NeonButton href="/app" variant="ghost" className="w-full">
              Ver dashboard
            </NeonButton>
          </div>
        </NeonCard>

        <p className="text-xs text-[var(--text-muted)]">
          ¿Algún problema con tu acceso?{" "}
          <Link href="/contacto" className="text-[var(--neon-cyan)] hover:underline">
            Contáctanos
          </Link>{" "}
          y lo resolvemos en minutos.
        </p>
      </div>
    </section>
  )
}
