import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RegisterForm from "@/components/RegisterForm"

export const metadata: Metadata = {
  title: "Registro | TEMPLAR",
  description: "Crea una cuenta para acceder a ofertas exclusivas y gestionar tus pedidos",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Crear Cuenta</h1>
          <RegisterForm />
        </div>
      </div>

      <Footer />
    </main>
  )
}
