"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/types"

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // Función para manejar la adición al carrito
  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Mostrar notificación o feedback
    alert(`${quantity} ${product.name} añadido al carrito`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
      <div className="relative h-[500px] w-full">
        <Image src={product.image || "/assets/jackets/acronym/acronym_landing.jpg"} alt={product.name} fill className="object-cover" />
      </div>

      {/* Detalles del producto */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-xl mt-2">${product.price.toLocaleString("es-CL")} CLP</p>

        <div className="mt-6">
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Selector de cantidad */}
        <div className="mt-8 flex items-center">
          <label htmlFor="quantity" className="mr-4 text-sm">
            Cantidad:
          </label>
          <div className="flex items-center border border-gray-300">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-12 text-center border-x border-gray-300 py-1"
            />
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="mt-4">
          <p className="text-sm">
            Disponibilidad:
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? ` ${product.stock} en stock` : " Agotado"}
            </span>
          </p>
        </div>

        {/* Botón de añadir al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-8 w-full bg-black text-white py-3 px-6 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
