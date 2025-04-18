import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts";

// Importar datos de ejemplo
import { allProducts } from "@/data/products";

// 🛠️ Función auxiliar para buscar producto o lanzar notFound
function getProductOrThrow(slug: string): NonNullable<(typeof allProducts)[number]> {
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) {
    notFound(); // Este corta la ejecución (ok en runtime)
  }
  return product; // TypeScript ahora entiende que nunca es undefined
}

// 🛠️ Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = allProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Producto no encontrado | TEMPLAR",
    };
  }

  return {
    title: `${product.name} | TEMPLAR`,
    description: product.description,
  };
}

// 🛠️ Componente principal de la página
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductOrThrow(params.slug);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />

        <div className="mt-16">
          <h2 className="text-xl font-medium mb-6">Productos relacionados</h2>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>

      <Footer />
    </main>
  );
}