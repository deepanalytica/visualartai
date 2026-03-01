import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Protect /app routes
  if (pathname.startsWith("/app")) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect /admin routes — require admin role
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin role via JWT claims or separate query
    // The role is set in auth.users.user_metadata or via the profiles table
    // We check via a simple API route to avoid heavy DB calls in middleware
    const role = user.user_metadata?.role as string | undefined
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/app", request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth") && user) {
    return NextResponse.redirect(new URL("/app", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
