import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  pgEnum,
  index,
  uniqueIndex,
  jsonb,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// ─── Enums ─────────────────────────────────────────────────────────────────────

export const roleEnum = pgEnum("role", ["student", "admin", "mentor"])

export const courseStatusEnum = pgEnum("course_status", [
  "draft",
  "published",
  "archived",
])

export const courseRouteEnum = pgEnum("course_route", [
  "redes",
  "productividad",
  "empresas",
  "dev",
  "visual",
  "musica",
  "pro",
])

export const courseLevelEnum = pgEnum("course_level", [
  "principiante",
  "intermedio",
  "avanzado",
])

export const lessonTypeEnum = pgEnum("lesson_type", ["video", "text", "mixed", "rich"])

export const lessonStatusEnum = pgEnum("lesson_status", [
  "draft",
  "published",
])

export const resourceTypeEnum = pgEnum("resource_type", [
  "checklist",
  "prompt",
  "template",
  "guide",
])

export const resourceStatusEnum = pgEnum("resource_status", [
  "draft",
  "published",
])

export const purchaseStatusEnum = pgEnum("purchase_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
])

export const paymentProviderEnum = pgEnum("payment_provider", [
  "transbank",
  "mercadopago",
  "free",
])

export const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "active",
  "expired",
  "revoked",
])

// ─── Profiles ──────────────────────────────────────────────────────────────────
// Mirrors auth.users via trigger — auto-created on signup.

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => sql`auth.users(id)` as unknown as ReturnType<typeof uuid>, {
        onDelete: "cascade",
      }),
    email: varchar("email", { length: 254 }).notNull().unique(),
    fullName: varchar("full_name", { length: 200 }),
    avatarUrl: text("avatar_url"),
    role: roleEnum("role").notNull().default("student"),
    bio: text("bio"),
    isActive: boolean("is_active").notNull().default(true),
    onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("profiles_email_idx").on(table.email),
    roleIdx: index("profiles_role_idx").on(table.role),
  })
)

// ─── Courses ───────────────────────────────────────────────────────────────────

export const courses = pgTable(
  "courses",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),
    shortDescription: text("short_description").notNull(),
    longDescription: text("long_description"),
    thumbnailUrl: text("thumbnail_url"),
    previewVideoUrl: text("preview_video_url"),
    instructorId: uuid("instructor_id")
      .notNull()
      .references(() => profiles.id),
    status: courseStatusEnum("status").notNull().default("draft"),
    route: courseRouteEnum("route").notNull(),
    level: courseLevelEnum("level").notNull().default("principiante"),
    priceClp: integer("price_clp").notNull().default(0),
    priceArs: integer("price_ars").notNull().default(0),
    isFree: boolean("is_free").notNull().default(false),
    durationMinutes: integer("duration_minutes").default(0),
    totalLessons: integer("total_lessons").default(0),
    tags: text("tags").array(),
    version: varchar("version", { length: 20 }).notNull().default("1.0"),
    metaTitle: varchar("meta_title", { length: 70 }),
    metaDescription: varchar("meta_description", { length: 160 }),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("courses_slug_idx").on(table.slug),
    statusIdx: index("courses_status_idx").on(table.status),
    routeIdx: index("courses_route_idx").on(table.route),
    instructorIdx: index("courses_instructor_idx").on(table.instructorId),
  })
)

// ─── Modules ───────────────────────────────────────────────────────────────────

export const modules = pgTable(
  "modules",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    courseIdx: index("modules_course_idx").on(table.courseId),
    sortIdx: index("modules_sort_idx").on(table.courseId, table.sortOrder),
  })
)

// ─── Lessons ───────────────────────────────────────────────────────────────────

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    type: lessonTypeEnum("type").notNull().default("mixed"),
    status: lessonStatusEnum("status").notNull().default("draft"),
    contentPath: text("content_path"), // path to MDX file
    videoUrl: text("video_url"),
    durationMin: integer("duration_min").default(0),
    sortOrder: integer("sort_order").notNull().default(0),
    isFreePreview: boolean("is_free_preview").notNull().default(false),
    // NotebookLM-generated rich content URLs
    audioUrl: text("audio_url"),        // audio overview (MP3 in Supabase Storage)
    slidesUrl: text("slides_url"),      // Google Slides / Canva embed URL
    mindmapUrl: text("mindmap_url"),    // mind map image in Supabase Storage
    infographicUrl: text("infographic_url"), // infographic image in Supabase Storage
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    moduleIdx: index("lessons_module_idx").on(table.moduleId),
    sortIdx: index("lessons_sort_idx").on(table.moduleId, table.sortOrder),
  })
)

// ─── Resources ─────────────────────────────────────────────────────────────────

export const resources = pgTable(
  "resources",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    type: resourceTypeEnum("type").notNull(),
    status: resourceStatusEnum("status").notNull().default("draft"),
    filePath: text("file_path"), // Supabase Storage path
    tags: text("tags").array(),
    version: varchar("version", { length: 20 }).notNull().default("1.0"),
    isFree: boolean("is_free").notNull().default(false),
    downloadCount: integer("download_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("resources_slug_idx").on(table.slug),
    typeIdx: index("resources_type_idx").on(table.type),
    statusIdx: index("resources_status_idx").on(table.status),
  })
)

// ─── Purchases ─────────────────────────────────────────────────────────────────

export const purchases = pgTable(
  "purchases",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id),
    provider: paymentProviderEnum("provider").notNull(),
    providerRef: varchar("provider_ref", { length: 200 }).unique(), // Transbank token or MP payment_id
    buyOrder: varchar("buy_order", { length: 26 }), // Transbank buy order
    amount: integer("amount").notNull(), // in CLP
    currency: varchar("currency", { length: 3 }).notNull().default("CLP"),
    status: purchaseStatusEnum("status").notNull().default("pending"),
    rawEvent: jsonb("raw_event"), // full provider response for audit
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("purchases_user_idx").on(table.userId),
    courseIdx: index("purchases_course_idx").on(table.courseId),
    statusIdx: index("purchases_status_idx").on(table.status),
    providerRefIdx: uniqueIndex("purchases_provider_ref_idx").on(table.providerRef),
  })
)

// ─── Enrollments ───────────────────────────────────────────────────────────────

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id),
    status: enrollmentStatusEnum("status").notNull().default("active"),
    grantedAt: timestamp("granted_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
  },
  (table) => ({
    userCourseIdx: uniqueIndex("enrollments_user_course_idx").on(
      table.userId,
      table.courseId
    ),
    userIdx: index("enrollments_user_idx").on(table.userId),
    courseIdx: index("enrollments_course_idx").on(table.courseId),
  })
)

// ─── Progress ──────────────────────────────────────────────────────────────────

export const progress = pgTable(
  "progress",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userLessonIdx: uniqueIndex("progress_user_lesson_idx").on(
      table.userId,
      table.lessonId
    ),
    userIdx: index("progress_user_idx").on(table.userId),
  })
)

// ─── Changelog ─────────────────────────────────────────────────────────────────

export const changelog = pgTable(
  "changelog",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    version: varchar("version", { length: 20 }).notNull(),
    notes: text("notes").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    courseIdx: index("changelog_course_idx").on(table.courseId),
  })
)

// ─── Webhook Logs ──────────────────────────────────────────────────────────────

export const webhookLogs = pgTable(
  "webhook_logs",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    provider: paymentProviderEnum("provider").notNull(),
    eventType: varchar("event_type", { length: 100 }),
    payload: jsonb("payload").notNull(),
    processed: boolean("processed").notNull().default(false),
    error: text("error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    providerIdx: index("webhook_logs_provider_idx").on(table.provider),
    processedIdx: index("webhook_logs_processed_idx").on(table.processed),
  })
)

// ─── Quizzes ───────────────────────────────────────────────────────────────────
// One quiz per lesson (optional). Questions stored as JSONB array.
// Question shape: { question: string; options: string[]; correct: number; explanation?: string }

export const quizzes = pgTable(
  "quizzes",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 200 }).notNull(),
    questions: jsonb("questions").notNull().default(sql`'[]'::jsonb`),
    passingScore: integer("passing_score").notNull().default(70),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    lessonIdx: uniqueIndex("quizzes_lesson_idx").on(table.lessonId),
  })
)

// ─── Quiz Attempts ─────────────────────────────────────────────────────────────
// Tracks each student attempt at a quiz.

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    quizId: uuid("quiz_id")
      .notNull()
      .references(() => quizzes.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),    // 0-100
    passed: boolean("passed").notNull().default(false),
    answers: jsonb("answers").notNull().default(sql`'[]'::jsonb`), // selected option indices
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userQuizIdx: index("quiz_attempts_user_quiz_idx").on(table.userId, table.quizId),
  })
)

// ─── Flashcard Decks ───────────────────────────────────────────────────────────
// One deck per lesson (optional). Cards stored as JSONB array.
// Card shape: { front: string; back: string; hint?: string }

export const flashcardDecks = pgTable(
  "flashcard_decks",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    cards: jsonb("cards").notNull().default(sql`'[]'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    lessonIdx: uniqueIndex("flashcard_decks_lesson_idx").on(table.lessonId),
  })
)

// ─── Type Exports ──────────────────────────────────────────────────────────────

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
export type Course = typeof courses.$inferSelect
export type NewCourse = typeof courses.$inferInsert
export type Module = typeof modules.$inferSelect
export type NewModule = typeof modules.$inferInsert
export type Lesson = typeof lessons.$inferSelect
export type NewLesson = typeof lessons.$inferInsert
export type Resource = typeof resources.$inferSelect
export type NewResource = typeof resources.$inferInsert
export type Purchase = typeof purchases.$inferSelect
export type NewPurchase = typeof purchases.$inferInsert
export type Enrollment = typeof enrollments.$inferSelect
export type NewEnrollment = typeof enrollments.$inferInsert
export type Progress = typeof progress.$inferSelect
export type NewProgress = typeof progress.$inferInsert
export type Changelog = typeof changelog.$inferSelect
export type NewChangelog = typeof changelog.$inferInsert
export type WebhookLog = typeof webhookLogs.$inferSelect
export type NewWebhookLog = typeof webhookLogs.$inferInsert
export type Quiz = typeof quizzes.$inferSelect
export type NewQuiz = typeof quizzes.$inferInsert
export type QuizAttempt = typeof quizAttempts.$inferSelect
export type NewQuizAttempt = typeof quizAttempts.$inferInsert
export type FlashcardDeck = typeof flashcardDecks.$inferSelect
export type NewFlashcardDeck = typeof flashcardDecks.$inferInsert
