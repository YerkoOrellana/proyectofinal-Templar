import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CartItems from "@/components/CartItems"
import CartSummary from "@/components/CartSummary"

export const metadata: Metadata = {
  title: "Carrito de Compras | TEMPLAR",
  description: "Revisa y gestiona los productos en tu carrito de compras",
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos en el carrito */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Resumen del carrito */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
