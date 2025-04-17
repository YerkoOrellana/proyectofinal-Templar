import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Redes sociales */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="https://facebook.com" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com/templarstore" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            Copyright © 2024 TMPLR - Todos los derechos reservados. Términos y condiciones aplicables.
          </div>
        </div>
      </div>
    </footer>
  )
}
