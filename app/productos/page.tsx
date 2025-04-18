import { Suspense } from "react";
import type { Metadata } from "next";
import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Productos | TEMPLAR",
  description: "Explora nuestra colección de ropa y accesorios techwear",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Productos</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros envueltos también */}
          <div className="w-full md:w-1/4">
            <Suspense fallback={<p>Cargando filtros...</p>}>
              <ProductFilters />
            </Suspense>
          </div>

          {/* Lista de productos */}
          <div className="w-full md:w-3/4">
            <Suspense fallback={<p>Cargando productos...</p>}>
              <ProductList />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}