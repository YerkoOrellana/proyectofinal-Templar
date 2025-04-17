"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Limpiar error al editar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // Validar formulario
  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", password: "" }

    // Validar email
    if (!formData.email) {
      newErrors.email = "El email es requerido"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
      valid = false
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Aquí iría la lógica de autenticación real
      // Por ejemplo, una llamada a la API para verificar credenciales

      // Simulamos un proceso de login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigir al usuario a la página principal
      router.push("/")
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      alert("Credenciales incorrectas. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <Link href="/recuperar-password" className="text-xs hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm">
          Recordarme
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/registro" className="font-medium hover:underline">
          Regístrate
        </Link>
      </div>
    </form>
  )
}
