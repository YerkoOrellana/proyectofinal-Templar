import { NextResponse } from "next/server"

// GET /api/orders/[id] - Obtener un pedido por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación
    // y que el usuario tenga acceso a este pedido

    const id = Number.parseInt(params.id)

    // Simulamos un pedido de ejemplo
    const order = {
      id,
      userId: 1,
      items: [
        { productId: 1, quantity: 1, price: 89990 },
        { productId: 3, quantity: 2, price: 79990 },
      ],
      status: "delivered",
      total: 249970,
      shippingAddress: {
        street: "Calle Ejemplo 123",
        city: "Santiago",
        state: "Región Metropolitana",
        postalCode: "8320000",
        country: "Chile",
      },
      createdAt: "2023-11-15T14:30:00Z",
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error al obtener pedido:", error)
    return NextResponse.json({ error: "Error al obtener pedido" }, { status: 500 })
  }
}

// PUT /api/orders/[id] - Actualizar estado de un pedido (solo admin)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación y autorización

    const id = Number.parseInt(params.id)
    const { status } = await request.json()

    // Validar estado
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Estado de pedido inválido" }, { status: 400 })
    }

    // En una aplicación real, aquí actualizaríamos el pedido en la base de datos

    return NextResponse.json({
      id,
      status,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error al actualizar pedido:", error)
    return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 })
  }
}
