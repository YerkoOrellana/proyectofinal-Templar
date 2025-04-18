import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
    title: "Información | TEMPLAR",
    description: "Conoce más sobre nuestra tienda y políticas",
}

export default function InfoPage() {
    return (
        <main className="min-h-screen bg-white">
        <Navbar />

        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-center">Información</h1>
            <p className="text-center">
                Somos TEMPLAR, tu tienda de confianza. Conoce más sobre nuestras políticas, historia y servicios.
            </p>
            </div>
        </div>

        <Footer />
        </main>
    )
}