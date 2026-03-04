import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const updateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().min(3).max(100).optional(),
  shortDescription: z.string().min(10).max(300).optional(),
  longDescription: z.string().optional().nullable(),
  route: z.enum(["redes", "productividad", "empresas", "dev", "visual", "musica", "pro"]).optional(),
  level: z.enum(["principiante", "intermedio", "avanzado"]).optional(),
  priceClp: z.number().int().min(0).optional(),
  priceArs: z.number().int().min(0).optional(),
  isFree: z.boolean().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  thumbnailUrl: z.string().url().optional().nullable(),
  previewVideoUrl: z.string().url().optional().nullable(),
  durationMinutes: z.number().int().min(0).optional(),
  sortOrder: z.number().int().min(0).optional(),
})

async function getAdmin(userId: string) {
  const [profile] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1)
  return profile?.role === "admin"
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    if (!(await getAdmin(user.id))) return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

    const [course] = await db.select().from(courses).where(eq(courses.id, params.id)).limit(1)
    if (!course) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 })

    return NextResponse.json(course)
  } catch (err) {
    console.error("[admin/courses GET]", err)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    if (!(await getAdmin(user.id))) return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

    const [existing] = await db.select({ id: courses.id }).from(courses).where(eq(courses.id, params.id)).limit(1)
    if (!existing) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 })

    const body = await req.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join(", ")
      return NextResponse.json({ error: message }, { status: 422 })
    }

    const data = parsed.data

    // If marking as free, zero out prices
    const updatePayload: Record<string, unknown> = {
      ...data,
      updatedAt: new Date(),
    }
    if (data.isFree) {
      updatePayload.priceClp = 0
      updatePayload.priceArs = 0
    }
    // Set publishedAt when publishing for the first time
    if (data.status === "published") {
      updatePayload.publishedAt = new Date()
    }

    const [updated] = await db
      .update(courses)
      .set(updatePayload)
      .where(eq(courses.id, params.id))
      .returning({ id: courses.id, slug: courses.slug })

    return NextResponse.json({ ok: true, course: updated })
  } catch (err: unknown) {
    console.error("[admin/courses PATCH]", err)
    if (err instanceof Error && err.message.includes("unique") && err.message.includes("slug")) {
      return NextResponse.json({ error: "Ya existe un curso con ese slug" }, { status: 409 })
    }
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    if (!(await getAdmin(user.id))) return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })

    await db.delete(courses).where(eq(courses.id, params.id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[admin/courses DELETE]", err)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
