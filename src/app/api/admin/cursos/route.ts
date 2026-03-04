import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { courseSchema } from "@/lib/validations"
import { z } from "zod"

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient()
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        }

        // Verify admin role
        const [profile] = await db
            .select({ role: profiles.role })
            .from(profiles)
            .where(eq(profiles.id, user.id))
            .limit(1)

        if (profile?.role !== "admin") {
            return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
        }

        const body = await req.json()

        // Validate with Zod — courseSchema already covers all required fields
        // Extend to include the extra routes added to the enum
        const extendedSchema = courseSchema.extend({
            route: z.enum(["redes", "productividad", "empresas", "dev", "visual", "musica", "pro"]),
        })

        const parsed = extendedSchema.safeParse(body)
        if (!parsed.success) {
            const message = parsed.error.errors.map((e) => e.message).join(", ")
            return NextResponse.json({ error: message }, { status: 422 })
        }

        const data = parsed.data

        const [created] = await db
            .insert(courses)
            .values({
                title: data.title,
                slug: data.slug,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription ?? null,
                route: data.route,
                level: data.level,
                priceClp: data.isFree ? 0 : data.priceClp,
                priceArs: data.isFree ? 0 : data.priceArs,
                isFree: data.isFree,
                status: data.status,
                instructorId: user.id, // admin creates as themselves by default
            })
            .returning({ id: courses.id, slug: courses.slug })

        return NextResponse.json({ ok: true, course: created }, { status: 201 })
    } catch (err: unknown) {
        console.error("[admin/courses POST]", err)
        // Handle duplicate slug
        if (
            err instanceof Error &&
            err.message.includes("unique") &&
            err.message.includes("slug")
        ) {
            return NextResponse.json({ error: "Ya existe un curso con ese slug" }, { status: 409 })
        }
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
    }
}
