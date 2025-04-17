import Link from "next/link"
import ProductGrid from "@/components/ProductGrid"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar con logo, navegación y carrito */}
      <Navbar />

      {/* Sección Hero con imagen principal */}
      <HeroSection />

      {/* Grid de productos destacados */}
      <section className="container mx-auto px-4 py-8">
        <ProductGrid />

        <div className="flex justify-center mt-8">
          <Link href="/productos" className="flex items-center text-sm uppercase tracking-wider hover:underline">
            Todos los productos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
