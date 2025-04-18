import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoginForm from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "Iniciar Sesión | TEMPLAR",
  description: "Accede a tu cuenta para gestionar tus pedidos y preferencias",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Iniciar Sesión</h1>
          <LoginForm />
        </div>
      </div>

      <Footer />
    </main>
  )
}