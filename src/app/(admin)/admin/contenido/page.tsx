import fs from "fs"
import path from "path"
import { db } from "@/db"
import { courses, modules, lessons, quizzes, flashcardDecks } from "@/db/schema"
import { eq, inArray, and } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { ImportLessonButton } from "@/components/admin/ImportLessonButton"
import { FileText, CheckCircle2, AlertCircle, Music, Layers, Video, BookOpen } from "lucide-react"

export const metadata = { title: "Admin — Pipeline de Contenido" }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const fm: Record<string, unknown> = {}
  const lines = match[1].split("\n")

  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, val] = kv
    const v = val.trim()

    if (v === "" || v === "[]") {
      const subitems: string[] = []
      let j = i + 1
      while (j < lines.length && lines[j].startsWith("  ")) {
        subitems.push(lines[j].trim())
        j++
      }
      fm[key] = subitems.filter((l) => l.startsWith("- "))
      i = j - 1
    } else {
      const stripped =
        (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
          ? v.slice(1, -1)
          : v
      fm[key] = stripped
    }
  }

  return fm
}

interface MdxFile {
  courseSlug: string
  moduleDir: string
  lessonSlug: string
  fileName: string
  contentPath: string
  frontmatter: Record<string, unknown>
}

function collectMdxFiles(contentDir: string): MdxFile[] {
  if (!fs.existsSync(contentDir)) return []

  const files: MdxFile[] = []
  const courseDirs = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  for (const courseEntry of courseDirs) {
    const courseDir = path.join(contentDir, courseEntry.name)
    const modDirs = fs
      .readdirSync(courseDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))

    for (const modEntry of modDirs) {
      const modDir = path.join(courseDir, modEntry.name)
      const mdxFiles = fs
        .readdirSync(modDir)
        .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
        .sort()

      for (const file of mdxFiles) {
        const raw = fs.readFileSync(path.join(modDir, file), "utf-8")
        const frontmatter = parseFrontmatter(raw)
        const lessonSlug = file.replace(".mdx", "").replace(/^\d+-/, "")

        files.push({
          courseSlug: courseEntry.name,
          moduleDir: modEntry.name,
          lessonSlug,
          fileName: file,
          contentPath: `courses/${courseEntry.name}/${modEntry.name}/${file}`,
          frontmatter,
        })
      }
    }
  }

  return files
}

function richScore(fm: Record<string, unknown>): number {
  const fields = ["video_url", "audio_url", "slides_url", "mindmap_url", "infographic_url", "flashcards", "quiz"]
  const present = fields.filter((f) => {
    const v = fm[f]
    if (Array.isArray(v)) return v.length > 0
    return !!v && v !== ""
  }).length
  return Math.round((present / fields.length) * 100)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminContenidoPage() {
  const contentDir = path.join(process.cwd(), "content", "courses")
  const mdxFiles = collectMdxFiles(contentDir)

  // Get all lessons from DB for comparison
  const dbLessons = await db
    .select({
      id: lessons.id,
      slug: lessons.slug,
      title: lessons.title,
      status: lessons.status,
      contentPath: lessons.contentPath,
      audioUrl: lessons.audioUrl,
      videoUrl: lessons.videoUrl,
      slidesUrl: lessons.slidesUrl,
      mindmapUrl: lessons.mindmapUrl,
    })
    .from(lessons)

  const dbLessonsByPath = new Map(dbLessons.map((l) => [l.contentPath, l]))

  // Get quizzes + flashcard decks
  const lessonIds = dbLessons.map((l) => l.id)
  const dbQuizzes = lessonIds.length
    ? await db.select({ lessonId: quizzes.lessonId }).from(quizzes).where(inArray(quizzes.lessonId, lessonIds))
    : []
  const dbDecks = lessonIds.length
    ? await db.select({ lessonId: flashcardDecks.lessonId }).from(flashcardDecks).where(inArray(flashcardDecks.lessonId, lessonIds))
    : []

  const quizLessonIds = new Set(dbQuizzes.map((q) => q.lessonId))
  const deckLessonIds = new Set(dbDecks.map((d) => d.lessonId))

  // Group by course
  const byCourse = new Map<string, MdxFile[]>()
  for (const f of mdxFiles) {
    if (!byCourse.has(f.courseSlug)) byCourse.set(f.courseSlug, [])
    byCourse.get(f.courseSlug)!.push(f)
  }

  const totalFiles = mdxFiles.length
  const inDb = mdxFiles.filter((f) => dbLessonsByPath.has(f.contentPath)).length
  const notInDb = totalFiles - inDb
  const published = mdxFiles.filter((f) => {
    const dbLesson = dbLessonsByPath.get(f.contentPath)
    return dbLesson?.status === "published"
  }).length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          Pipeline de Contenido
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Filesystem MDX → Supabase DB
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Archivos MDX", value: totalFiles, icon: FileText, color: "cyan" },
          { label: "En DB", value: inDb, icon: CheckCircle2, color: "green" },
          { label: "Sin importar", value: notInDb, icon: AlertCircle, color: notInDb > 0 ? "amber" : "muted" },
          { label: "Publicadas", value: published, icon: BookOpen, color: "violet" },
        ].map((stat) => (
          <NeonCard key={stat.label} glow="none" className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon
                className={`size-5 shrink-0 ${
                  stat.color === "cyan"
                    ? "text-[var(--neon-cyan)]"
                    : stat.color === "green"
                      ? "text-emerald-400"
                      : stat.color === "amber"
                        ? "text-amber-400"
                        : stat.color === "violet"
                          ? "text-[var(--neon-violet)]"
                          : "text-[var(--text-muted)]"
                }`}
              />
              <div>
                <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            </div>
          </NeonCard>
        ))}
      </div>

      {/* CLI hint */}
      <NeonCard glow="none" className="p-4 border-dashed">
        <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">
          <span className="text-[var(--neon-cyan)]">$</span>{" "}
          <span className="text-[var(--text-secondary)]">
            node scripts/publish-content.mjs --course [slug] --dry-run
          </span>
          <br />
          <span className="text-[var(--neon-cyan)]">$</span>{" "}
          <span className="text-[var(--text-secondary)]">node scripts/audit-content.mjs</span>
        </p>
      </NeonCard>

      {/* Course tables */}
      {byCourse.size === 0 ? (
        <NeonCard glow="none" className="p-12 text-center">
          <p className="text-[var(--text-muted)]">
            No se encontraron archivos MDX en{" "}
            <code className="font-mono text-xs bg-[var(--bg-overlay)] px-1.5 py-0.5 rounded">
              content/courses/
            </code>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Usa{" "}
            <code className="font-mono text-xs">node scripts/create-course.mjs --config ...</code>{" "}
            para generar la estructura.
          </p>
        </NeonCard>
      ) : (
        Array.from(byCourse.entries()).map(([cSlug, files]) => {
          const coursePublished = files.filter((f) => {
            const dbL = dbLessonsByPath.get(f.contentPath)
            return dbL?.status === "published"
          }).length

          return (
            <NeonCard key={cSlug} glow="none" className="overflow-hidden">
              {/* Course header */}
              <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-[var(--neon-cyan)]" />
                  <span className="font-mono text-sm font-medium text-[var(--text-primary)]">
                    {cSlug}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    ({files.length} lecciones · {coursePublished} publicadas)
                  </span>
                </div>
              </div>

              {/* Lessons table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)]">
                      <th className="text-left px-4 py-2 text-xs text-[var(--text-muted)] font-medium w-8">#</th>
                      <th className="text-left px-4 py-2 text-xs text-[var(--text-muted)] font-medium">Lección</th>
                      <th className="text-left px-4 py-2 text-xs text-[var(--text-muted)] font-medium">DB</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Video">Vid</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Audio">Aud</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Slides">Sld</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Mapa mental">Map</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Flashcards">Fls</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium text-center" title="Quiz">Qz</th>
                      <th className="px-2 py-2 text-xs text-[var(--text-muted)] font-medium">Score</th>
                      <th className="px-4 py-2 text-xs text-[var(--text-muted)] font-medium">Estado</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, idx) => {
                      const dbLesson = dbLessonsByPath.get(file.contentPath)
                      const hasQuiz = dbLesson ? quizLessonIds.has(dbLesson.id) : false
                      const hasDeck = dbLesson ? deckLessonIds.has(dbLesson.id) : false
                      const fm = file.frontmatter
                      const score = richScore(fm)

                      const dot = (v: unknown, fromDb?: boolean) => {
                        const present = fromDb !== undefined ? fromDb : (!!v && v !== "")
                        return present ? (
                          <span className="text-emerald-400 text-xs">✓</span>
                        ) : (
                          <span className="text-[var(--text-muted)] text-xs opacity-30">·</span>
                        )
                      }

                      return (
                        <tr
                          key={file.contentPath}
                          className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors"
                        >
                          <td className="px-4 py-2.5 text-xs text-[var(--text-muted)] font-mono">
                            {String(idx + 1).padStart(2, "0")}
                          </td>
                          <td className="px-4 py-2.5">
                            <p className="text-sm text-[var(--text-primary)] line-clamp-1">
                              {(fm.title as string) || file.lessonSlug}
                            </p>
                            <p className="text-xs font-mono text-[var(--text-muted)]">
                              {file.moduleDir}/{file.fileName}
                            </p>
                          </td>
                          <td className="px-4 py-2.5">
                            {dbLesson ? (
                              <span className="text-xs text-emerald-400">en DB</span>
                            ) : (
                              <span className="text-xs text-amber-400">nuevo</span>
                            )}
                          </td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.video_url)}</td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.audio_url)}</td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.slides_url)}</td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.mindmap_url)}</td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.flashcards, hasDeck)}</td>
                          <td className="px-2 py-2.5 text-center">{dot(fm.quiz, hasQuiz)}</td>
                          <td className="px-2 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <div className="w-10 h-1.5 rounded-full bg-[var(--bg-overlay)] overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[var(--neon-cyan)]"
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                              <span className="text-xs text-[var(--text-muted)]">{score}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                dbLesson?.status === "published"
                                  ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                                  : "bg-amber-500/10 text-amber-400"
                              }`}
                            >
                              {dbLesson?.status ?? (fm.status as string) ?? "draft"}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <ImportLessonButton contentPath={file.contentPath} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </NeonCard>
          )
        })
      )}
    </div>
  )
}
