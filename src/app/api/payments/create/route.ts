import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { db } from "@/db"
import { purchases, courses, enrollments } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { getPaymentProvider, transbankCreate, mercadopagoCreate } from "@/lib/payments"
import { SITE_URL } from "@/lib/constants"

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: any[]) {
            cookiesToSet.forEach(({ name, value, options }: any) =>
              cookieStore.set(name, value, options),
            )
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { courseSlug } = body as { courseSlug?: string }

    if (!courseSlug) {
      return NextResponse.json({ error: "courseSlug requerido" }, { status: 400 })
    }

    // Fetch course
    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, courseSlug))
      .limit(1)

    if (!course || course.status !== "published") {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 })
    }

    // Check if already enrolled
    const [existingEnrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.userId, user.id), eq(enrollments.courseId, course.id)))
      .limit(1)

    if (existingEnrollment?.status === "active") {
      return NextResponse.json({
        alreadyEnrolled: true,
        redirectUrl: `/app/cursos/${courseSlug}`,
      })
    }

    // Free course → enroll directly
    if (course.isFree) {
      await db
        .insert(purchases)
        .values({
          userId: user.id,
          courseId: course.id,
          provider: "free",
          providerRef: `free_${user.id}_${course.id}`,
          amount: 0,
          currency: "CLP",
          status: "paid",
        })
        .onConflictDoNothing()

      await db
        .insert(enrollments)
        .values({
          userId: user.id,
          courseId: course.id,
          status: "active",
          grantedAt: new Date(),
        })
        .onConflictDoNothing()

      return NextResponse.json({
        free: true,
        redirectUrl: `/app/cursos/${courseSlug}`,
      })
    }

    const provider = getPaymentProvider()
    const amount = course.priceClp ?? 0

    if (amount <= 0) {
      return NextResponse.json({ error: "Precio inválido" }, { status: 400 })
    }

    // ─── Transbank ────────────────────────────────────────────────────────────
    if (provider === "transbank") {
      const result = await transbankCreate({
        amount,
        sessionId: user.id,
        returnUrl: `${SITE_URL}/api/payments/transbank/return`,
      })

      await db.insert(purchases).values({
        userId: user.id,
        courseId: course.id,
        provider: "transbank",
        providerRef: result.buyOrder,
        amount,
        currency: "CLP",
        status: "pending",
      })

      return NextResponse.json({
        provider: "transbank",
        url: result.url,
        token: result.token,
        method: "POST",
      })
    }

    // ─── MercadoPago ──────────────────────────────────────────────────────────
    if (provider === "mercadopago") {
      const result = await mercadopagoCreate({
        title: course.title,
        amount,
        currency: "CLP",
        externalReference: `${user.id}:${course.id}`,
        buyerEmail: user.email,
        notificationUrl: `${SITE_URL}/api/webhooks/mercadopago`,
      })

      await db.insert(purchases).values({
        userId: user.id,
        courseId: course.id,
        provider: "mercadopago",
        providerRef: result.preferenceId,
        amount,
        currency: "CLP",
        status: "pending",
      })

      return NextResponse.json({
        provider: "mercadopago",
        url: result.initPoint,
        method: "GET",
      })
    }

    return NextResponse.json({ error: "Proveedor de pagos no configurado" }, { status: 500 })
  } catch (err) {
    console.error("[/api/payments/create]", err)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
