"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"

// Importar datos de ejemplo
import { allProducts } from "@/data/products"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    // Filtrar productos relacionados (misma categoría, excluyendo el actual)
    const related = allProducts.filter((p) => p.category === category && p.id !== currentProductId).slice(0, 4) // Limitar a 4 productos

    setRelatedProducts(related)
  }, [currentProductId, category])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relatedProducts.map((product) => (
        <div key={product.id} className="group">
          <Link href={`/productos/${product.slug}`}>
            <div className="relative h-64 w-full overflow-hidden">
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
        </div>
      ))}
    </div>
  )
}