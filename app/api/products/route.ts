"use client"


import { NextResponse } from "next/server"
import { allProducts } from "@/data/products"
import type { Product } from "@/types"

// GET /api/products - Obtener todos los productos
export async function GET(request: Request) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    let filteredProducts = [...allProducts]

    // Aplicar filtros si existen
    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    if (featured === "true") {
      filteredProducts = filteredProducts.filter((product) => product.featured === true)
    }

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

// POST /api/products - Crear un nuevo producto (solo admin)
export async function POST(request: Request) {
  try {
    // En una aplicación real, aquí verificaríamos la autenticación y autorización

    const productData: Partial<Product> = await request.json()

    // Validar datos requeridos
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // En una aplicación real, aquí guardaríamos en la base de datos
    // y generaríamos un ID real

    // Simulamos la creación de un producto
    const newProduct: Product = {
      id: allProducts.length + 1,
      name: productData.name,
      slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, "-"),
      description: productData.description || "",
      price: productData.price,
      image: productData.image || "/images/products/placeholder.jpg",
      category: productData.category,
      stock: productData.stock || 0,
      featured: productData.featured || false,
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}
