import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CheckoutForm from "@/components/CheckoutForm"
import OrderSummary from "@/components/OrderSummary"

export const metadata: Metadata = {
  title: "Checkout | TEMPLAR",
  description: "Completa tu compra y realiza el pago de tus productos",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de checkout */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
