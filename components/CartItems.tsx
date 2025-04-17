"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CartItems() {
  const { items, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h2 className="text-xl font-medium">Tu carrito está vacío</h2>
        <p className="mt-2 text-gray-500">Añade algunos productos para continuar</p>
        <Link href="/productos" className="mt-4 inline-block underline">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.product.id}>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-16 w-16 relative flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <Link href={`/productos/${item.product.slug}`} className="text-sm font-medium hover:underline">
                      {item.product.name}
                    </Link>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">${item.product.price.toLocaleString("es-CL")} CLP</td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center border border-gray-300 w-24">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                    className="w-10 text-center border-x border-gray-300 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                ${(item.product.price * item.quantity).toLocaleString("es-CL")} CLP
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
