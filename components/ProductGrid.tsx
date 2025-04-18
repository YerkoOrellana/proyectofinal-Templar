"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  // Simulación de carga de productos desde la API
  useEffect(() => {
    // En producción, esto sería un fetch real a la API
    const fetchProducts = async () => {
      try {
        // Simulamos una llamada a la API
        setTimeout(() => {
          setProducts(featuredProducts)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error al cargar productos:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-64 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
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
          <button onClick={() => addToCart(product)} className="mt-2 text-xs uppercase tracking-wider hover:underline">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  )
}

// Datos de ejemplo para productos destacados
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "[ ACRONYM ] MNM - 012 -",
    slug: "chaqueta-acronym-verde-negro-cortaviento",
    description:
      "Chaqueta técnica con diseño bicolor, bolsillos funcionales y detalles reflectantes. Perfecta para condiciones climáticas variables y uso urbano.",
    price: 89990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "jackets",
    stock: 15,
    featured: true,
  },
  {
    id: 2,
    name: "[ PROTOTYPE ] MNM - 021 -",
    slug: "pantalon-cargo-prototype-tactico",
    description:
      "Pantalón cargo con múltiples bolsillos, cintas ajustables y diseño urbano. Fabricado con materiales resistentes y duraderos.",
    price: 59990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "pantalones",
    stock: 20,
    featured: true,
  },
  {
    id: 3,
    name: "[ ACRONYM ] MNM - 005 -",
    slug: "chaqueta-cortaviento-cargo-acronym-negra",
    description:
      "Cortaviento táctico respirable resistente al agua.",
    price: 79990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "accesorios",
    stock: 8,
    featured: true,
  },
  {
    id: 4,
    name: " [ UNICODE ] MNM - 029 -",
    slug: "pantalon-cargo-unicode-tactico",
    description:
      "Pantalón cargo con 8 compartimentos.",
    price: 99990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "chaquetas",
    stock: 12,
    featured: true,
  },
  {
    id: 5,
    name: " [ NEOBIT ] MNM - 005 -",
    slug: "pantalon-cargo-neobit-tactico",
    description:
      "Pantalón cargo con 5 compartimentos.",
    price: 49990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "pantalones",
    stock: 25,
    featured: true,
  },
  {
    id: 6,
    name: "[ HOLO-BLAST ] NRG - A21 -",
    slug: "hoodie-poleron-holo-blast-pez",
    description:
      "Polerón canguro boca de pez 100% algodón.",
    price: 69990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "hoodies",
    stock: 18,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
  {
    id: 7,
    name: "[ PHANTOM ] NRG - A02 -",
    slug: "pantalon-cargo-phantom",
    description: "Pantalón cargo de alta gama con muchos compartimentos.",
    price: 29990,
    image: "/assets/jackets/acronym/acronym_landing.jpg",
    category: "camisetas",
    stock: 30,
    featured: true,
  },
]