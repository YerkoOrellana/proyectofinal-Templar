import { NextResponse } from "next/server"
import type { Order } from "@/types"

// GET /api/orders - Obtener pedidos del usuario actual
export async function GET(request: Request) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación
    // y obtendríamos el ID del usuario del token

    // Simulamos pedidos de ejemplo para un usuario
    const orders: Order[] = [
      {
        id: 1,
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
      },
      {
        id: 2,
        userId: 1,
        items: [{ productId: 7, quantity: 1, price: 29990 }],
        status: "processing",
        total: 29990,
        shippingAddress: {
          street: "Calle Ejemplo 123",
          city: "Santiago",
          state: "Región Metropolitana",
          postalCode: "8320000",
          country: "Chile",
        },
        createdAt: "2024-01-20T10:15:00Z",
      },
    ]

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 })
  }
}

// POST /api/orders - Crear un nuevo pedido
export async function POST(request: Request) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación
    // y obtendríamos el ID del usuario del token

    const orderData = await request.json()

    // Validar datos requeridos
    if (!orderData.items || !orderData.shippingAddress) {
      return NextResponse.json({ error: "Faltan datos requeridos para el pedido" }, { status: 400 })
    }

    // En una aplicación real, aquí verificaríamos el stock de los productos,
    // calcularíamos el total correcto y guardaríamos el pedido en la base de datos

    // Simulamos la creación de un pedido
    const newOrder: Order = {
      id: 3,
      userId: 1,
      items: orderData.items,
      status: "pending",
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error al crear pedido:", error)
    return NextResponse.json({ error: "Error al crear pedido" }, { status: 500 })
  }
}
