import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Pedido Confirmado | TEMPLAR",
  description: "Tu pedido ha sido confirmado y está siendo procesado",
}

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500" />

          <h1 className="text-2xl font-bold mt-6 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-8">
            Tu pedido ha sido recibido y está siendo procesado. Hemos enviado un correo de confirmación a tu dirección
            de email.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-medium mb-4">Detalles del pedido</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Número de pedido:</span>
              <span className="font-medium">TNP-12345</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Fecha:</span>
              <span className="font-medium">{new Date().toLocaleDateString("es-CL")}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Método de pago:</span>
              <span className="font-medium">Tarjeta de crédito</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-medium text-green-600">Procesando</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
              Volver a la tienda
            </Link>
            <Link
              href="/mi-cuenta/pedidos"
              className="bg-white text-black py-2 px-6 border border-black rounded-md hover:bg-gray-100"
            >
              Ver mis pedidos
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
