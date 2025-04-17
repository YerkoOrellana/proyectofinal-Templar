import { NextResponse } from "next/server"

// POST /api/auth/login - Iniciar sesión
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // En una aplicación real, aquí verificaríamos las credenciales en la base de datos
    // y generaríamos un token JWT

    // Simulamos un login exitoso
    if (email === "usuario@ejemplo.com" && password === "password123") {
      return NextResponse.json({
        user: {
          id: 1,
          name: "Usuario Ejemplo",
          email: "usuario@ejemplo.com",
          role: "customer",
        },
        token: "jwt-token-simulado",
      })
    }

    // Credenciales incorrectas
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 })
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 })
  }
}
