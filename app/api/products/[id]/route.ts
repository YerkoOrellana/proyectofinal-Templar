import { NextResponse } from "next/server"
import { allProducts } from "@/data/products"

// GET /api/products/[id] - Obtener un producto por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Buscar el producto por ID
    const product = allProducts.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 })
  }
}

// PUT /api/products/[id] - Actualizar un producto (solo admin)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación y autorización

    const id = Number.parseInt(params.id)
    const productData = await request.json()

    // Buscar el producto por ID
    const productIndex = allProducts.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // En una aplicación real, aquí actualizaríamos en la base de datos

    // Simulamos la actualización del producto
    const updatedProduct = {
      ...allProducts[productIndex],
      ...productData,
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Eliminar un producto (solo admin)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación y autorización

    const id = Number.parseInt(params.id)

    // Buscar el producto por ID
    const productIndex = allProducts.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // En una aplicación real, aquí eliminaríamos de la base de datos

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 })
  }
}
