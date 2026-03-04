"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import {
  ArrowLeft, Loader2, BookOpen, CheckCircle2, AlertCircle,
  Save, Trash2, ExternalLink,
} from "lucide-react"
import Link from "next/link"

const ROUTES = ["redes", "productividad", "empresas", "dev", "visual", "musica", "pro"] as const
const LEVELS = ["principiante", "intermedio", "avanzado"] as const
const STATUSES = ["draft", "published", "archived"] as const

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

type CourseStatus = "draft" | "published" | "archived"
type CourseRoute = typeof ROUTES[number]
type CourseLevel = typeof LEVELS[number]

interface CourseData {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string | null
  route: CourseRoute
  level: CourseLevel
  status: CourseStatus
  priceClp: number
  priceArs: number
  isFree: boolean
  thumbnailUrl: string | null
  previewVideoUrl: string | null
  durationMinutes: number | null
  sortOrder: number
  totalLessons: number | null
  publishedAt: string | null
  createdAt: string
}

export default function EditCursoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [course, setCourse] = useState<CourseData | null>(null)
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form fields (populated from course)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    slugTouched: false,
    shortDescription: "",
    longDescription: "",
    route: "redes" as CourseRoute,
    level: "principiante" as CourseLevel,
    status: "draft" as CourseStatus,
    priceClp: 0,
    priceArs: 0,
    isFree: false,
    thumbnailUrl: "",
    previewVideoUrl: "",
    durationMinutes: 0,
    sortOrder: 0,
  })

  const loadCourse = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/cursos/${id}`)
      if (!res.ok) {
        setError("Curso no encontrado")
        return
      }
      const data: CourseData = await res.json()
      setCourse(data)
      setForm({
        title: data.title,
        slug: data.slug,
        slugTouched: true,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription ?? "",
        route: data.route,
        level: data.level,
        status: data.status,
        priceClp: data.priceClp,
        priceArs: data.priceArs,
        isFree: data.isFree,
        thumbnailUrl: data.thumbnailUrl ?? "",
        previewVideoUrl: data.previewVideoUrl ?? "",
        durationMinutes: data.durationMinutes ?? 0,
        sortOrder: data.sortOrder ?? 0,
      })
    } catch {
      setError("Error al cargar el curso")
    } finally {
      setFetching(false)
    }
  }, [id])

  useEffect(() => { loadCourse() }, [loadCourse])

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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    setSuccess(false)

    try {
      const res = await fetch(`/api/admin/cursos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          shortDescription: form.shortDescription,
          longDescription: form.longDescription || null,
          route: form.route,
          level: form.level,
          status: form.status,
          priceClp: form.isFree ? 0 : form.priceClp,
          priceArs: form.isFree ? 0 : form.priceArs,
          isFree: form.isFree,
          thumbnailUrl: form.thumbnailUrl || null,
          previewVideoUrl: form.previewVideoUrl || null,
          durationMinutes: form.durationMinutes,
          sortOrder: form.sortOrder,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Error al guardar")
        return
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError("Error de conexión")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/cursos/${id}`, { method: "DELETE" })
      if (res.ok) {
        router.push("/admin/cursos")
      } else {
        const data = await res.json()
        setError(data.error ?? "Error al eliminar")
      }
    } catch {
      setError("Error de conexión")
    } finally {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-6 animate-spin text-[var(--neon-cyan)]" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto pt-12 text-center">
        <AlertCircle className="size-10 text-red-400 mx-auto mb-3" />
        <p className="text-[var(--text-primary)] font-semibold">Curso no encontrado</p>
        <Link href="/admin/cursos" className="text-sm text-[var(--neon-cyan)] mt-2 inline-block hover:underline">
          ← Volver a cursos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cursos"
            className="p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Editar curso
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">{course.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <Link
            href={`/academia/cursos/${course.slug}`}
            target="_blank"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
            title="Ver página pública"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-2">
        <NeonBadge variant="neutral">
          {course.totalLessons ?? 0} lecciones
        </NeonBadge>
        {course.publishedAt && (
          <NeonBadge variant="neutral">
            Publicado {new Date(course.publishedAt).toLocaleDateString("es-CL")}
          </NeonBadge>
        )}
        <NeonBadge variant="neutral">
          Creado {new Date(course.createdAt).toLocaleDateString("es-CL")}
        </NeonBadge>
      </div>

      {/* Alerts */}
      {success && (
        <NeonCard glow="cyan" className="p-4 flex items-center gap-3">
          <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0" />
          <p className="text-sm text-[var(--text-primary)]">Cambios guardados correctamente.</p>
        </NeonCard>
      )}
      {error && (
        <NeonCard glow="none" className="p-4 flex items-center gap-3 border-red-500/30 bg-red-500/5">
          <AlertCircle className="size-5 text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </NeonCard>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic info */}
        <NeonCard glow="none" className="p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="size-4 text-[var(--neon-cyan)]" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Información básica</h2>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">Slug (URL)</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)] shrink-0">/academia/cursos/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value, slugTouched: true }))}
                className="flex-1 px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Short desc */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">
              Descripción corta <span className="text-red-400">*</span>
              <span className="ml-2 font-normal">({form.shortDescription.length}/300)</span>
            </label>
            <textarea
              required
              rows={2}
              maxLength={300}
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors resize-none"
            />
          </div>

          {/* Long desc */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">
              Descripción completa <span className="font-normal">(opcional)</span>
            </label>
            <textarea
              rows={5}
              value={form.longDescription}
              onChange={(e) => set("longDescription", e.target.value)}
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors resize-y"
            />
          </div>
        </NeonCard>

        {/* Media */}
        <NeonCard glow="none" className="p-6 space-y-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Media</h2>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">URL de miniatura</label>
            <input
              type="url"
              value={form.thumbnailUrl}
              onChange={(e) => set("thumbnailUrl", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">URL de video preview</label>
            <input
              type="url"
              value={form.previewVideoUrl}
              onChange={(e) => set("previewVideoUrl", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">Duración total (minutos)</label>
            <input
              type="number"
              min={0}
              value={form.durationMinutes}
              onChange={(e) => set("durationMinutes", Number(e.target.value))}
              className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
            />
          </div>
        </NeonCard>

        {/* Classification */}
        <NeonCard glow="none" className="p-6 space-y-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Clasificación</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-muted)]">Ruta *</label>
              <select
                value={form.route}
                onChange={(e) => set("route", e.target.value as CourseRoute)}
                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors appearance-none"
              >
                {ROUTES.map((r) => (
                  <option key={r} value={r} className="bg-[var(--bg-void)]">{r}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--text-muted)]">Nivel *</label>
              <select
                value={form.level}
                onChange={(e) => set("level", e.target.value as CourseLevel)}
                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors appearance-none"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-[var(--bg-void)]">{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--text-muted)]">Estado</label>
            <div className="flex gap-3">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm border transition-colors ${form.status === s
                    ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)]"
                    }`}
                >
                  {s === "draft" ? "📝 Borrador" : s === "published" ? "🟢 Publicado" : "📦 Archivado"}
                </button>
              ))}
            </div>
          </div>

          {/* Sort order */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-muted)]">Orden (sortOrder)</label>
            <input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) => set("sortOrder", Number(e.target.value))}
              className="w-32 px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
            />
          </div>
        </NeonCard>

        {/* Pricing */}
        <NeonCard glow="none" className="p-6 space-y-5">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Precio</h2>
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
                <label className="text-xs font-medium text-[var(--text-muted)]">Precio CLP</label>
                <input
                  type="number"
                  min={0}
                  value={form.priceClp}
                  onChange={(e) => set("priceClp", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-muted)]">Precio ARS</label>
                <input
                  type="number"
                  min={0}
                  value={form.priceArs}
                  onChange={(e) => set("priceArs", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/30 transition-colors"
                />
              </div>
            </div>
          )}
        </NeonCard>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pb-8">
          {/* Delete */}
          <div className="flex items-center gap-2">
            {confirmDelete && (
              <p className="text-xs text-red-400">¿Confirmas? Esta acción es irreversible.</p>
            )}
            <NeonButton
              type="button"
              variant="ghost-neon"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-400 border-red-500/30 hover:bg-red-500/10 hover:border-red-400"
            >
              {deleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              {confirmDelete ? "Confirmar eliminación" : "Eliminar curso"}
            </NeonButton>
            {confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              >
                Cancelar
              </button>
            )}
          </div>

          {/* Save */}
          <div className="flex items-center gap-3">
            <Link href="/admin/cursos">
              <NeonButton variant="ghost-neon" size="sm" type="button">Cancelar</NeonButton>
            </Link>
            <NeonButton variant="neon" size="sm" type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Guardando…
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Guardar cambios
                </>
              )}
            </NeonButton>
          </div>
        </div>
      </form>
    </div>
  )
}
