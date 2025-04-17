import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware para proteger rutas que requieren autenticación
export function middleware(request: NextRequest) {
  // Obtener token de autenticación de las cookies
  const token = request.cookies.get("auth_token")?.value

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ["/mi-cuenta", "/checkout"]

  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: ["/mi-cuenta/:path*", "/checkout/:path*"],
}
