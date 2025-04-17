"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function CartSummary() {
  const { items, totalPrice } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Calcular impuestos (19% IVA en Chile)
  const tax = totalPrice * 0.19

  // Calcular envío (gratis sobre 100.000 CLP)
  const shipping = totalPrice > 100000 ? 0 : 2990

  // Calcular total final
  const finalTotal = totalPrice + tax + shipping

  // Función para proceder al checkout
  const handleCheckout = async () => {
    if (items.length === 0) return

    setLoading(true)

    try {
      // Aquí iría la lógica para iniciar el proceso de checkout
      // Por ejemplo, crear una orden en la base de datos y redirigir a la página de pago

      // Simulamos un proceso de checkout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigir a la página de checkout
      router.push("/checkout")
    } catch (error) {
      console.error("Error al procesar el checkout:", error)
      alert("Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

      <div className="space-y-3">
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

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${finalTotal.toLocaleString("es-CL")} CLP</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0 || loading}
        className="mt-6 w-full bg-black text-white py-3 px-6 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Proceder al pago"}
      </button>

      <p className="text-xs text-gray-500 mt-4">Los impuestos y gastos de envío se calculan en el total</p>
    </div>
  )
}
