"use client";

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

// Datos de ejemplo para todos los productos
import { allProducts } from "@/data/products"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  const category = searchParams.get("categoria")

  useEffect(() => {
    // Simulación de carga de productos desde la API con filtros
    const fetchProducts = async () => {
      try {
        setTimeout(() => {
          let filteredProducts = [...allProducts]

          // Aplicar filtro de categoría si existe
          if (category) {
            filteredProducts = filteredProducts.filter((product) => product.category === category)
          }

          setProducts(filteredProducts)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error al cargar productos:", error)
        setLoading(false)
      }
    }

    setLoading(true)
    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-80 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">No se encontraron productos</h2>
        <p className="mt-2 text-gray-500">Intenta con otros filtros o categorías</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group">
          <Link href={`/productos/${product.slug}`}>
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm mt-1">${product.price.toLocaleString("es-CL")} CLP</p>
            </div>
          </Link>
          <button onClick={() => addToCart(product)} className="mt-2 text-xs uppercase tracking-wider hover:underline">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )
}
