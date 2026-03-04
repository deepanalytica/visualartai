import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content")

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CourseFrontmatter {
  title: string
  slug: string
  route: "redes" | "productividad" | "empresas" | "dev" | "visual" | "musica" | "pro"
  level: "principiante" | "intermedio" | "avanzado"
  version: string
  status: "draft" | "published" | "archived"
  price_clp: number
  price_ars?: number
  is_free?: boolean
  duration_minutes?: number
  description: string
  objectives?: string[]
  requirements?: string[]
  tags?: string[]
  thumbnail?: string
  instructor_name?: string
}

export interface FlashCard {
  front: string
  back: string
  hint?: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number      // index of the correct option
  explanation?: string
}

export interface LessonQuiz {
  title: string
  passing_score?: number
  questions: QuizQuestion[]
}

export interface LessonFrontmatter {
  title: string
  slug: string
  type: "video" | "text" | "mixed" | "rich"
  video_url?: string
  audio_url?: string          // NotebookLM: audio overview MP3
  slides_url?: string         // NotebookLM: Google Slides / Canva embed
  mindmap_url?: string        // NotebookLM: mind map image
  infographic_url?: string    // NotebookLM: infographic image
  duration_min?: number
  checklist?: string[]
  resources?: Array<{ title: string; path: string }>
  status?: "draft" | "published"
  flashcards?: FlashCard[]    // NotebookLM: Tarjetas
  quiz?: LessonQuiz           // NotebookLM: Cuestionario
  notebooklm_source?: string  // URL of the source notebook
  generated_at?: string       // ISO date of content generation
}

export interface ResourceFrontmatter {
  title: string
  slug: string
  type: "checklist" | "prompt" | "template" | "guide"
  version: string
  tags: string[]
  is_free: boolean
  status: "draft" | "published"
  description?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8")
  return matter(raw)
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export function getCourseContent(slug: string): {
  frontmatter: CourseFrontmatter
  content: string
} | null {
  const indexPath = path.join(CONTENT_DIR, "courses", slug, "index.mdx")
  if (!fs.existsSync(indexPath)) return null

  const { data, content } = readMdx(indexPath)
  return { frontmatter: data as CourseFrontmatter, content }
}

export function getAllCourseSlugs(): string[] {
  const coursesDir = path.join(CONTENT_DIR, "courses")
  if (!fs.existsSync(coursesDir)) return []

  return fs
    .readdirSync(coursesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

export function getLessonContent(
  courseSlug: string,
  moduleId: string,
  lessonSlug: string,
): { frontmatter: LessonFrontmatter; content: string } | null {
  const lessonPath = path.join(
    CONTENT_DIR,
    "courses",
    courseSlug,
    moduleId,
    `${lessonSlug}.mdx`,
  )
  if (!fs.existsSync(lessonPath)) return null

  const { data, content } = readMdx(lessonPath)
  return { frontmatter: data as LessonFrontmatter, content }
}

export function getLessonsForModule(
  courseSlug: string,
  moduleId: string,
): Array<LessonFrontmatter & { filePath: string }> {
  const moduleDir = path.join(CONTENT_DIR, "courses", courseSlug, moduleId)
  if (!fs.existsSync(moduleDir)) return []

  return fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const { data } = readMdx(path.join(moduleDir, file))
      return {
        ...(data as LessonFrontmatter),
        filePath: `courses/${courseSlug}/${moduleId}/${file}`,
      }
    })
}

// ─── Resources ───────────────────────────────────────────────────────────────

export function getResourceContent(slug: string): {
  frontmatter: ResourceFrontmatter
  content: string
} | null {
  const resourcePath = path.join(CONTENT_DIR, "resources", `${slug}.mdx`)
  if (!fs.existsSync(resourcePath)) return null

  const { data, content } = readMdx(resourcePath)
  return { frontmatter: data as ResourceFrontmatter, content }
}

export function getAllResources(): Array<ResourceFrontmatter & { filePath: string }> {
  const resourcesDir = path.join(CONTENT_DIR, "resources")
  if (!fs.existsSync(resourcesDir)) return []

  return fs
    .readdirSync(resourcesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data } = readMdx(path.join(resourcesDir, file))
      return {
        ...(data as ResourceFrontmatter),
        filePath: `resources/${file}`,
      }
    })
}
