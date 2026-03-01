import { relations } from "drizzle-orm"
import {
  profiles,
  courses,
  modules,
  lessons,
  resources,
  purchases,
  enrollments,
  progress,
  changelog,
} from "./schema"

// ─── Profiles ─────────────────────────────────────────────────────────────────

export const profilesRelations = relations(profiles, ({ many }) => ({
  instructedCourses: many(courses),
  purchases: many(purchases),
  enrollments: many(enrollments),
  progress: many(progress),
}))

// ─── Courses ──────────────────────────────────────────────────────────────────

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(profiles, {
    fields: [courses.instructorId],
    references: [profiles.id],
  }),
  modules: many(modules),
  enrollments: many(enrollments),
  purchases: many(purchases),
  changelog: many(changelog),
}))

// ─── Modules ─────────────────────────────────────────────────────────────────

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}))

// ─── Lessons ─────────────────────────────────────────────────────────────────

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  progress: many(progress),
}))

// ─── Resources ───────────────────────────────────────────────────────────────

export const resourcesRelations = relations(resources, () => ({}))

// ─── Purchases ───────────────────────────────────────────────────────────────

export const purchasesRelations = relations(purchases, ({ one }) => ({
  user: one(profiles, {
    fields: [purchases.userId],
    references: [profiles.id],
  }),
  course: one(courses, {
    fields: [purchases.courseId],
    references: [courses.id],
  }),
}))

// ─── Enrollments ─────────────────────────────────────────────────────────────

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(profiles, {
    fields: [enrollments.userId],
    references: [profiles.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}))

// ─── Progress ────────────────────────────────────────────────────────────────

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(profiles, {
    fields: [progress.userId],
    references: [profiles.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}))

// ─── Changelog ───────────────────────────────────────────────────────────────

export const changelogRelations = relations(changelog, ({ one }) => ({
  course: one(courses, {
    fields: [changelog.courseId],
    references: [courses.id],
  }),
}))
