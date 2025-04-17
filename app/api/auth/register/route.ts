import { NextResponse } from "next/server"

// POST /api/auth/register - Registrar nuevo usuario
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validar datos requeridos
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Formato de email inválido" }, { status: 400 })
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    // En una aplicación real, aquí verificaríamos si el email ya existe,
    // hashearíamos la contraseña y guardaríamos el usuario en la base de datos

    // Simulamos un registro exitoso
    return NextResponse.json(
      {
        user: {
          id: 2,
          name,
          email,
          role: "customer",
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
  }
}
