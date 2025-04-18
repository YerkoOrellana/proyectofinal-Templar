"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function OrderSummary() {
  const { items, totalPrice } = useCart()

  // Calcular impuestos (19% IVA en Chile)
  const tax = totalPrice * 0.19

  // Calcular envío (gratis sobre 100.000 CLP)
  const shipping = totalPrice > 100000 ? 0 : 2990

  // Calcular total final
  const finalTotal = totalPrice + tax + shipping

  return (
    <div className="bg-white p-6 border rounded-lg sticky top-4">
      <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

      {/* Lista de productos */}
      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No hay productos en el carrito</p>
        ) : (
          items.map((item) => (
            <div key={item.product.id} className="flex items-center">
              <div className="h-16 w-16 relative flex-shrink-0">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium">${(item.product.price * item.quantity).toLocaleString("es-CL")}</div>
            </div>
          ))
        )}
      </div>

      {/* Totales */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${totalPrice.toLocaleString("es-CL")} CLP</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>IVA (19%)</span>
          <span>${tax.toLocaleString("es-CL")} CLP</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString("es-CL")} CLP`}</span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${finalTotal.toLocaleString("es-CL")} CLP</span>
          </div>
        </div>
      </div>
    </div>
  )
}