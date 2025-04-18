import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
    title: "Contacto | TEMPLAR",
    description: "Ponte en contacto con nuestro equipo para resolver tus dudas",
    }

    export default function ContactoPage() {
    return (
        <main className="min-h-screen bg-white">
        <Navbar />

        <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-center">Contáctanos</h1>
            <form className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full border-b border-black focus:outline-none py-2 px-1 text-sm"
                />
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full border-b border-black focus:outline-none py-2 px-1 text-sm"
                />
                </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mensaje
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full border-b border-black focus:outline-none py-2 px-1 text-sm resize-none"
                ></textarea>
                </div>

                <div className="text-center">
                <button
                    type="submit"
                    className="inline-block bg-black text-white px-6 py-2 rounded-md text-sm uppercase tracking-wider hover:bg-gray-800"
                >
                    Enviar
                </button>
                </div>
            </form>
            </div>
        </div>

        <Footer />
        </main>
    )
}