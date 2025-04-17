"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  // Función para manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para redirigir a la página de resultados
    console.log(`Buscando: ${searchQuery}`)
  }

  // Enlaces de navegación
  const navLinks = [
    { name: "Productos", href: "/productos" },
    { name: "Info", href: "/info" },
    { name: "Login", href: "/login" },
    { name: "Registrarse", href: "/registro" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Barra superior con logo y carrito */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
          <img
            src="/assets/logo/Recurso_22x.png"
            alt="Templar Logo"
            className="h-8 w-auto"
          />
          </Link>

          {/* Carrito de compras */}
          <Link href="/carrito" className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="mr-2"></span>
            <span>|</span>
            <span className="ml-2">$ 0 CLP</span>
          </Link>
        </div>

        {/* Navegación principal */}
        <nav className="hidden md:flex justify-between items-center py-4">
          {/* Enlaces de navegación */}
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm uppercase tracking-wider ${pathname === link.href ? "font-semibold" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 pl-2 pr-8 border-b border-black focus:outline-none text-sm w-40"
            />
            <button type="submit" className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </nav>

        {/* Menú móvil */}
        <div className="md:hidden flex justify-between items-center py-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 pl-2 pr-8 border-b border-black focus:outline-none text-sm w-32"
            />
            <button type="submit" className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`block text-sm uppercase tracking-wider ${
                      pathname === link.href ? "font-semibold" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}