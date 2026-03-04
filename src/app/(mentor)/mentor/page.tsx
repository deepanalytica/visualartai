import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, enrollments, modules, lessons } from "@/db/schema"
import { eq, count, inArray } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import {
    BookOpen,
    Users,
    Eye,
    TrendingUp,
    Calendar,
    Layers,
} from "lucide-react"

export const metadata = { title: "Mentor — Dashboard" }

export default async function MentorDashboard() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) redirect("/auth/login")

    // Get courses where this user is the instructor
    const myCourses = await db
        .select()
        .from(courses)
        .where(eq(courses.instructorId, user.id))

    const courseIds = myCourses.map((c) => c.id)

    // Count total enrolled students across all my courses
    const [enrollmentCount] = await (courseIds.length > 0
        ? db
            .select({ count: count() })
            .from(enrollments)
            .where(inArray(enrollments.courseId, courseIds))
        : Promise.resolve([{ count: 0 }]))

    // Count total modules and lessons
    const [moduleCount] = await (courseIds.length > 0
        ? db
            .select({ count: count() })
            .from(modules)
            .where(inArray(modules.courseId, courseIds))
        : Promise.resolve([{ count: 0 }]))

    // Count published lessons
    const allModules = courseIds.length > 0
        ? await db.select({ id: modules.id }).from(modules).where(inArray(modules.courseId, courseIds))
        : []
    const moduleIds = allModules.map((m) => m.id)

    const [lessonCount] = await (moduleIds.length > 0
        ? db
            .select({ count: count() })
            .from(lessons)
            .where(inArray(lessons.moduleId, moduleIds))
        : Promise.resolve([{ count: 0 }]))

    const stats = [
        {
            label: "Mis cursos",
            value: myCourses.length,
            icon: BookOpen,
            color: "text-[var(--neon-cyan)]",
            bg: "text-[var(--neon-cyan-dim)]",
        },
        {
            label: "Alumnos totales",
            value: enrollmentCount?.count ?? 0,
            icon: Users,
            color: "text-[var(--neon-violet)]",
            bg: "text-[var(--neon-violet-dim)]",
        },
        {
            label: "Total lecciones",
            value: lessonCount?.count ?? 0,
            icon: Layers,
            color: "text-[var(--neon-magenta)]",
            bg: "text-[var(--neon-magenta-dim)]",
        },
        {
            label: "Total módulos",
            value: moduleCount?.count ?? 0,
            icon: TrendingUp,
            color: "text-amber-400",
            bg: "text-amber-900",
        },
    ]

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    Dashboard del Mentor
                </h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                    Resumen de tus cursos y alumnos inscritos.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <NeonCard key={s.label} glow="none" className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                            <s.icon className={`size-4 ${s.color}`} />
                        </div>
                        <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
                    </NeonCard>
                ))}
            </div>

            {/* My courses */}
            <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Mis cursos</h2>

                {myCourses.length === 0 ? (
                    <NeonCard glow="none" className="p-8 text-center">
                        <BookOpen className="size-10 text-[var(--text-muted)] mx-auto mb-3" />
                        <p className="text-sm text-[var(--text-muted)]">
                            No tienes cursos asignados como instructor todavía.
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                            Contacta a un admin para que te asigne cursos.
                        </p>
                    </NeonCard>
                ) : (
                    <div className="flex flex-col gap-3">
                        {myCourses.map((course) => (
                            <NeonCard key={course.id} glow="none" className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <NeonBadge variant="cyan">{course.route}</NeonBadge>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full ${course.status === "published"
                                                        ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                                                        : "bg-amber-500/10 text-amber-400"
                                                    }`}
                                            >
                                                {course.status}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-[var(--text-primary)] truncate">
                                            {course.title}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                                            {course.shortDescription}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                                            <span className="flex items-center gap-1">
                                                <Layers className="size-3" />
                                                {course.totalLessons ?? 0} lecciones
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="size-3" />
                                                {course.createdAt
                                                    ? new Date(course.createdAt).toLocaleDateString("es-CL")
                                                    : "—"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={`/academia/cursos/${course.slug}`}
                                            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
                                            title="Ver página pública"
                                        >
                                            <Eye className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </NeonCard>
                        ))}
                    </div>
                )}
            </div>

            {/* Mentorías placeholder */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-[var(--text-primary)]">
                        Próximas mentorías
                    </h2>
                    <NeonBadge variant="neutral">Próximamente</NeonBadge>
                </div>
                <NeonCard glow="none" className="p-6 text-center border-dashed">
                    <Calendar className="size-8 text-[var(--text-muted)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--text-muted)]">
                        El sistema de agendamiento de mentorías estará disponible pronto.
                    </p>
                </NeonCard>
            </div>
        </div>
    )
}
