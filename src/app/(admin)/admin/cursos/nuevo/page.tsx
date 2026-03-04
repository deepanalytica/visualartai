"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { ArrowLeft, Loader2, BookOpen, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const ROUTES = ["redes", "productividad", "empresas", "dev", "visual", "musica", "pro"] as const
const LEVELS = ["principiante", "intermedio", "avanzado"] as const

function slugify(str: string) {
    return str
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}

export default function NuevoCursoPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        title: "",
        slug: "",
        slugTouched: false,
        shortDescription: "",
        longDescription: "",
        route: "redes" as (typeof ROUTES)[number],
        level: "principiante" as (typeof LEVELS)[number],
        priceClp: 0,
        priceArs: 0,
        isFree: false,
        status: "draft" as "draft" | "published",
    })

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const title = e.target.value
        setForm((f) => ({
            ...f,
            title,
            slug: f.slugTouched ? f.slug : slugify(title),
        }))
    }

    function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
        setForm((f) => ({ ...f, [key]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await fetch("/api/admin/cursos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: form.title,
                    slug: form.slug,
                    shortDescription: form.shortDescription,
                    longDescription: form.longDescription || undefined,
                    route: form.route,
                    level: form.level,
                    priceClp: form.isFree ? 0 : form.priceClp,
                    priceArs: form.isFree ? 0 : form.priceArs,
                    isFree: form.isFree,
                    status: form.status,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error ?? "Error al crear el curso")
                return
            }

            setSuccess(true)
            setTimeout(() => router.push("/admin/cursos"), 1500)
        } catch {
            setError("Error de conexión, intenta de nuevo")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Link
                    href="/admin/cursos"
                    className="p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
                >
                    <ArrowLeft className="size-4" />
                </Link>
                <div>
                    <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                        Nuevo curso
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        Crea el esqueleto del curso. Luego agrega módulos y lecciones.
                    </p>
                </div>
            </div>

            {/* Success */}
            {success && (
                <NeonCard glow="cyan" className="p-4 flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0" />
                    <p className="text-sm text-[var(--text-primary)]">
                        Curso creado correctamente. Redirigiendo…
                    </p>
                </NeonCard>
            )}

            {/* Error */}
            {error && (
                <NeonCard glow="none" className="p-4 flex items-center gap-3 border-red-500/30 bg-red-500/5">
                    <AlertCircle className="size-5 text-red-400 shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                </NeonCard>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic info */}
                <NeonCard glow="none" className="p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="size-4 text-[var(--neon-cyan)]" />
                        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Información básica</h2>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)]">
                            Título del curso <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={handleTitleChange}
                            placeholder="Ej: Sistema IA para Contenido Semanal"
                            className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)]">
                            Slug (URL) <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--text-muted)] shrink-0">/academia/cursos/</span>
                            <input
                                type="text"
                                required
                                value={form.slug}
                                onChange={(e) => {
                                    const val = e.target.value
                                    setForm((f) => ({ ...f, slug: val, slugTouched: true }))
                                }}
                                placeholder="sistema-ia-contenido-semanal"
                                className="flex-1 px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors font-mono"
                            />
                        </div>
                    </div>

                    {/* Short description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)]">
                            Descripción corta <span className="text-red-400">*</span>
                            <span className="ml-2 text-[var(--text-muted)] font-normal">
                                ({form.shortDescription.length}/300)
                            </span>
                        </label>
                        <textarea
                            required
                            rows={2}
                            maxLength={300}
                            value={form.shortDescription}
                            onChange={(e) => set("shortDescription", e.target.value)}
                            placeholder="Para cards y metadatos. Máx 300 caracteres."
                            className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors resize-none"
                        />
                    </div>

                    {/* Long description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)]">
                            Descripción completa
                            <span className="ml-2 text-[var(--text-muted)] font-normal">(opcional)</span>
                        </label>
                        <textarea
                            rows={4}
                            value={form.longDescription}
                            onChange={(e) => set("longDescription", e.target.value)}
                            placeholder="Descripción detallada para la página del curso…"
                            className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors resize-y"
                        />
                    </div>
                </NeonCard>

                {/* Classification */}
                <NeonCard glow="none" className="p-6 space-y-5">
                    <h2 className="text-sm font-semibold text-[var(--text-primary)]">Clasificación</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Route */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[var(--text-muted)]">Ruta *</label>
                            <select
                                value={form.route}
                                onChange={(e) => set("route", e.target.value as typeof form.route)}
                                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors appearance-none"
                            >
                                {ROUTES.map((r) => (
                                    <option key={r} value={r} className="bg-[var(--bg-void)]">
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Level */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[var(--text-muted)]">Nivel *</label>
                            <select
                                value={form.level}
                                onChange={(e) => set("level", e.target.value as typeof form.level)}
                                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors appearance-none"
                            >
                                {LEVELS.map((l) => (
                                    <option key={l} value={l} className="bg-[var(--bg-void)]">
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-[var(--text-muted)]">Estado</label>
                        <div className="flex gap-3">
                            {(["draft", "published"] as const).map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => set("status", s)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm border transition-colors ${form.status === s
                                        ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                                        : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)]"
                                        }`}
                                >
                                    {s === "draft" ? "📝 Borrador" : "🟢 Publicado"}
                                </button>
                            ))}
                        </div>
                    </div>
                </NeonCard>

                {/* Pricing */}
                <NeonCard glow="none" className="p-6 space-y-5">
                    <h2 className="text-sm font-semibold text-[var(--text-primary)]">Precio</h2>

                    {/* Is free toggle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.isFree}
                            onChange={(e) => set("isFree", e.target.checked)}
                            className="size-4 rounded accent-[var(--neon-cyan)]"
                        />
                        <span className="text-sm text-[var(--text-primary)]">Curso gratuito</span>
                        {form.isFree && <NeonBadge variant="cyan">GRATIS</NeonBadge>}
                    </label>

                    {!form.isFree && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-[var(--text-muted)]">
                                    Precio CLP (sin decimales)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form.priceClp}
                                    onChange={(e) => set("priceClp", Number(e.target.value))}
                                    placeholder="49000"
                                    className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-[var(--text-muted)]">
                                    Precio ARS (sin decimales)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={form.priceArs}
                                    onChange={(e) => set("priceArs", Number(e.target.value))}
                                    placeholder="25000"
                                    className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
                                />
                            </div>
                        </div>
                    )}
                </NeonCard>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3">
                    <Link href="/admin/cursos">
                        <NeonButton variant="ghost-neon" size="sm" type="button">
                            Cancelar
                        </NeonButton>
                    </Link>
                    <NeonButton variant="neon" size="sm" type="submit" disabled={loading || success}>
                        {loading ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Creando…
                            </>
                        ) : (
                            "Crear curso"
                        )}
                    </NeonButton>
                </div>
            </form>
        </div>
    )
}
