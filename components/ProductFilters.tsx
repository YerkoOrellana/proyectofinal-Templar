"use client";


import { useRouter, useSearchParams } from "next/navigation"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Obtener filtros actuales de la URL
  const currentCategory = searchParams.get("categoria")

  // Categorías disponibles
  const categories = [
    { id: "chaquetas", name: "Chaquetas" },
    { id: "pantalones", name: "Pantalones" },
    { id: "camisetas", name: "Camisetas" },
    { id: "sudaderas", name: "Sudaderas" },
    { id: "accesorios", name: "Accesorios" },
  ]

  // Función para aplicar filtros
  const applyFilter = (category: string | null) => {
    // Crear nueva instancia de URLSearchParams
    const params = new URLSearchParams(searchParams.toString())

    // Actualizar o eliminar el parámetro de categoría
    if (category) {
      params.set("categoria", category)
    } else {
      params.delete("categoria")
    }

    // Actualizar la URL con los nuevos parámetros
    router.push(`/productos?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4">Categorías</h3>
        <ul className="space-y-2">
          <li>
            <button onClick={() => applyFilter(null)} className={`text-sm ${!currentCategory ? "font-medium" : ""}`}>
              Todas las categorías
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => applyFilter(category.id)}
                className={`text-sm ${currentCategory === category.id ? "font-medium" : ""}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Aquí se pueden añadir más filtros como precio, talla, etc. */}
    </div>
  )
}
