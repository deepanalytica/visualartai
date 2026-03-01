# Data Model — Documentación Técnica

## Stack

- **ORM:** Drizzle ORM (`drizzle-orm/postgres-js`)
- **DB:** PostgreSQL (Supabase)
- **Migrations:** `drizzle-kit push` (dev) / `drizzle-kit generate` + `migrate` (prod)
- **Schema:** `src/db/schema.ts`
- **Relations:** `src/db/relations.ts`

---

## Diagrama de Relaciones

```
auth.users (Supabase)
    │ 1:1 (trigger)
    ▼
profiles ─────────────────────────────┐
    │                                  │ instructor_id
    │ 1:N                              ▼
    │                              courses
enrollments ◄──────────────────── courses ──────── modules ──────── lessons
    │ (user_id + course_id)          │ 1:N             │ 1:N            │ 1:N
    │                                │                  │                │
progress ◄──────────────────────────────────────────────          progress
    (user_id + lesson_id)            │                           (user_id + lesson_id)
                                     │
purchases ◄──────────────────── courses
    (user_id + course_id)            │
                                     │
                                changelog
                             (course_id)

resources (standalone — no FK a cursos)

webhook_logs (standalone — solo logs de pagos)
```

---

## Tablas

### `profiles`

Espejo de `auth.users`. Se crea automáticamente vía trigger al registrarse.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | = `auth.users.id` (FK cascade delete) |
| `email` | `varchar(254) UNIQUE NOT NULL` | Email del usuario |
| `full_name` | `varchar(200)` | Nombre completo |
| `avatar_url` | `text` | URL del avatar (Supabase Storage) |
| `role` | `enum(student,admin,mentor)` | Rol del usuario, default `student` |
| `bio` | `text` | Biografía (para instructores) |
| `is_active` | `boolean` | Si la cuenta está activa, default `true` |
| `onboarding_completed` | `boolean` | Si completó onboarding, default `false` |
| `created_at` | `timestamptz` | Auto |
| `updated_at` | `timestamptz` | Auto |

**Índices:**
- `profiles_email_idx` UNIQUE on `email`
- `profiles_role_idx` on `role`

---

### `courses`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | `gen_random_uuid()` |
| `slug` | `varchar(100) UNIQUE NOT NULL` | URL-friendly ID (ej: `sistema-ia-contenido-semanal`) |
| `title` | `varchar(200) NOT NULL` | Título del curso |
| `short_description` | `text NOT NULL` | Para cards y metadatos (≤160 chars recomendado) |
| `long_description` | `text` | Descripción completa para la página del curso |
| `thumbnail_url` | `text` | URL de la miniatura (Supabase Storage) |
| `preview_video_url` | `text` | Video de preview (YouTube/Vimeo embed URL) |
| `instructor_id` | `uuid FK→profiles.id NOT NULL` | Instructor del curso |
| `status` | `enum(draft,published,archived)` | Estado del curso, default `draft` |
| `route` | `enum(redes,productividad,empresas) NOT NULL` | Ruta de aprendizaje |
| `level` | `enum(principiante,intermedio,avanzado)` | Nivel, default `principiante` |
| `price_clp` | `integer NOT NULL` | Precio en CLP (sin decimales), default `0` |
| `price_ars` | `integer NOT NULL` | Precio en ARS (sin decimales), default `0` |
| `is_free` | `boolean NOT NULL` | Si es gratuito, default `false` |
| `duration_minutes` | `integer` | Duración total estimada |
| `total_lessons` | `integer` | Lecciones totales (denormalizado) |
| `tags` | `text[]` | Array de tags |
| `version` | `varchar(20) NOT NULL` | Versión del contenido, default `1.0` |
| `meta_title` | `varchar(70)` | SEO title override |
| `meta_description` | `varchar(160)` | SEO description override |
| `sort_order` | `integer NOT NULL` | Orden en catálogo, default `0` |
| `published_at` | `timestamptz` | Cuándo fue publicado |
| `created_at` | `timestamptz` | Auto |
| `updated_at` | `timestamptz` | Auto |

**Índices:**
- `courses_slug_idx` UNIQUE on `slug`
- `courses_status_idx` on `status`
- `courses_route_idx` on `route`
- `courses_instructor_idx` on `instructor_id`

---

### `modules`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `course_id` | `uuid FK→courses.id CASCADE` | |
| `title` | `varchar(200) NOT NULL` | Título del módulo |
| `description` | `text` | Descripción corta |
| `sort_order` | `integer NOT NULL` | Orden dentro del curso, default `0` |
| `created_at` | `timestamptz` | |

**Índices:**
- `modules_course_idx` on `course_id`
- `modules_sort_idx` on `(course_id, sort_order)`

---

### `lessons`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `module_id` | `uuid FK→modules.id CASCADE` | |
| `slug` | `varchar(100) NOT NULL` | URL slug dentro del módulo |
| `title` | `varchar(200) NOT NULL` | |
| `description` | `text` | |
| `type` | `enum(video,text,mixed)` | Tipo de contenido, default `mixed` |
| `status` | `enum(draft,published)` | default `draft` |
| `content_path` | `text` | Ruta al archivo MDX (ej: `courses/[slug]/modulo-01/01-intro.mdx`) |
| `video_url` | `text` | URL del video (Vimeo/YouTube) |
| `duration_min` | `integer` | Duración estimada en minutos |
| `sort_order` | `integer NOT NULL` | Orden dentro del módulo |
| `is_free_preview` | `boolean NOT NULL` | Si es preview gratuita, default `false` |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

**Índices:**
- `lessons_module_idx` on `module_id`
- `lessons_sort_idx` on `(module_id, sort_order)`

---

### `resources`

Recursos descargables (checklists, prompts, plantillas, guías). **No tienen FK a cursos** — son standalone.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `slug` | `varchar(100) UNIQUE NOT NULL` | |
| `title` | `varchar(200) NOT NULL` | |
| `description` | `text NOT NULL` | |
| `type` | `enum(checklist,prompt,template,guide) NOT NULL` | |
| `status` | `enum(draft,published)` | default `draft` |
| `file_path` | `text` | Ruta en Supabase Storage (bucket `resources`) |
| `tags` | `text[]` | |
| `version` | `varchar(20) NOT NULL` | default `1.0` |
| `is_free` | `boolean NOT NULL` | default `false` |
| `download_count` | `integer NOT NULL` | Contador denormalizado, default `0` |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

**Índices:**
- `resources_slug_idx` UNIQUE on `slug`
- `resources_type_idx` on `type`
- `resources_status_idx` on `status`

---

### `purchases`

Registro de intenciones de pago y pagos completados.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `user_id` | `uuid FK→profiles.id NOT NULL` | |
| `course_id` | `uuid FK→courses.id NOT NULL` | |
| `provider` | `enum(transbank,mercadopago,free) NOT NULL` | |
| `provider_ref` | `varchar(200) UNIQUE` | `buyOrder` (TB) o `payment_id` (MP). Clave de idempotencia |
| `buy_order` | `varchar(26)` | Buy order de Transbank (≤26 chars alfanuméricos) |
| `amount` | `integer NOT NULL` | Monto en CLP (sin decimales) |
| `currency` | `varchar(3) NOT NULL` | default `CLP` |
| `status` | `enum(pending,paid,failed,refunded)` | default `pending` |
| `raw_event` | `jsonb` | Respuesta completa del proveedor (para auditoría) |
| `created_at` | `timestamptz` | Cuándo se creó la intención de pago |
| `updated_at` | `timestamptz` | Cuándo fue el último cambio de estado |

**Índices:**
- `purchases_user_idx` on `user_id`
- `purchases_course_idx` on `course_id`
- `purchases_status_idx` on `status`
- `purchases_provider_ref_idx` UNIQUE on `provider_ref`

**Flujo de estados:**
```
pending → paid (pago confirmado)
       → failed (pago rechazado/cancelado)
paid   → refunded (reembolso manual por admin)
```

---

### `enrollments`

Inscripciones activas. Se crean **solo** cuando el pago es confirmado (no en pending).

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `user_id` | `uuid FK→profiles.id NOT NULL` | |
| `course_id` | `uuid FK→courses.id NOT NULL` | |
| `status` | `enum(active,expired,revoked)` | default `active` |
| `granted_at` | `timestamptz NOT NULL` | Cuándo se concedió el acceso |
| `expires_at` | `timestamptz` | Si es acceso con fecha de expiración (null = de por vida) |

**Constraint:**
- `enrollments_user_course_idx` UNIQUE on `(user_id, course_id)` — garantiza que un usuario no pueda tener dos inscripciones al mismo curso

**Índices:**
- `enrollments_user_idx` on `user_id`
- `enrollments_course_idx` on `course_id`

---

### `progress`

Registro de lecciones completadas por el usuario.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `user_id` | `uuid FK→profiles.id NOT NULL` | |
| `lesson_id` | `uuid FK→lessons.id CASCADE NOT NULL` | |
| `completed_at` | `timestamptz NOT NULL` | Cuándo se marcó como completada |

**Constraint:**
- `progress_user_lesson_idx` UNIQUE on `(user_id, lesson_id)` — upsert idempotente

**Índices:**
- `progress_user_idx` on `user_id`

---

### `changelog`

Historial de actualizaciones de contenido por curso.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `course_id` | `uuid FK→courses.id CASCADE NOT NULL` | |
| `version` | `varchar(20) NOT NULL` | Versión (ej: `1.1`, `2.0`) |
| `notes` | `text NOT NULL` | Qué cambió (Markdown) |
| `created_at` | `timestamptz` | |

**Índices:**
- `changelog_course_idx` on `course_id`

---

### `webhook_logs`

Trazabilidad de todos los webhooks recibidos.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid PK` | |
| `provider` | `enum(transbank,mercadopago,free) NOT NULL` | |
| `event_type` | `varchar(100)` | Tipo de evento (ej: `payment`, `notification`) |
| `payload` | `jsonb NOT NULL` | Cuerpo completo del webhook |
| `processed` | `boolean NOT NULL` | Si fue procesado exitosamente, default `false` |
| `error` | `text` | Mensaje de error si falló |
| `created_at` | `timestamptz` | |

**Índices:**
- `webhook_logs_provider_idx` on `provider`
- `webhook_logs_processed_idx` on `processed`

---

## Enums

| Enum | Valores |
|---|---|
| `role` | `student`, `admin`, `mentor` |
| `course_status` | `draft`, `published`, `archived` |
| `course_route` | `redes`, `productividad`, `empresas` |
| `course_level` | `principiante`, `intermedio`, `avanzado` |
| `lesson_type` | `video`, `text`, `mixed` |
| `lesson_status` | `draft`, `published` |
| `resource_type` | `checklist`, `prompt`, `template`, `guide` |
| `resource_status` | `draft`, `published` |
| `purchase_status` | `pending`, `paid`, `failed`, `refunded` |
| `payment_provider` | `transbank`, `mercadopago`, `free` |
| `enrollment_status` | `active`, `expired`, `revoked` |

---

## Queries frecuentes (Drizzle)

### Cursos publicados con filtros

```typescript
const cursos = await db
  .select()
  .from(courses)
  .where(
    and(
      eq(courses.status, "published"),
      eq(courses.route, "redes") // opcional
    )
  )
  .orderBy(asc(courses.sortOrder))
```

### Progreso de un usuario en un curso

```typescript
const totalLessons = await db
  .select({ count: count() })
  .from(lessons)
  .innerJoin(modules, eq(lessons.moduleId, modules.id))
  .where(eq(modules.courseId, courseId))

const completedLessons = await db
  .select({ count: count() })
  .from(progress)
  .innerJoin(lessons, eq(progress.lessonId, lessons.id))
  .innerJoin(modules, eq(lessons.moduleId, modules.id))
  .where(
    and(
      eq(progress.userId, userId),
      eq(modules.courseId, courseId)
    )
  )

const percentage = Math.round(
  (completedLessons[0].count / totalLessons[0].count) * 100
)
```

### Verificar acceso a una lección

```typescript
// src/lib/access.ts
export async function checkLessonAccess(userId: string, lessonId: string) {
  const [lesson] = await db
    .select({ moduleId: lessons.moduleId, isFreePreview: lessons.isFreePreview })
    .from(lessons)
    .where(eq(lessons.id, lessonId))
    .limit(1)

  if (!lesson) return { hasAccess: false, reason: "Lección no encontrada" }
  if (lesson.isFreePreview) return { hasAccess: true, reason: "preview" }

  const [enrollment] = await db
    .select()
    .from(enrollments)
    .innerJoin(modules, eq(enrollments.courseId, modules.courseId))
    .where(
      and(
        eq(enrollments.userId, userId),
        eq(modules.id, lesson.moduleId),
        eq(enrollments.status, "active")
      )
    )
    .limit(1)

  if (enrollment) return { hasAccess: true, reason: "enrolled" }
  return { hasAccess: false, reason: "Sin inscripción activa" }
}
```

---

## Migrations

### Comandos

```bash
# Generar migration desde cambios en schema.ts
npx drizzle-kit generate

# Aplicar en dev (push directo, sin archivo de migration)
npx drizzle-kit push

# Ver estado actual
npx drizzle-kit studio
```

### Drizzle config (`drizzle.config.ts`)

```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

---

## Consideraciones de diseño

### ¿Por qué `provider_ref` y no el ID del purchase?

El `provider_ref` es el identificador del pago en el sistema externo (Transbank `buyOrder` o MercadoPago `paymentId`). Es el campo que llega en el webhook/return y necesitamos para hacer lookup rápido. El `id` del purchase es interno.

### ¿Por qué denormalizar `total_lessons` en `courses`?

Para evitar un COUNT(*) en cada request de listado de cursos. Se actualiza con un trigger o manualmente al publicar/despublicar lecciones.

### ¿Por qué `enrollments` separado de `purchases`?

Un usuario podría tener acceso gratis (sin purchase), o el admin puede darle acceso manualmente. La enrollment es el "permiso real" — la purchase es el registro financiero.

### ¿Por qué no FK entre `resources` y `courses`?

Los recursos son independientes y pueden pertenecer a múltiples cursos o a ninguno. Una tabla pivote `resource_course_assignments` podría crearse en el futuro si es necesario.
