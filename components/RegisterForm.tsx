"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
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
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    }

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      valid = false
    }

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

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
      valid = false
    }

    // Validar aceptación de términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones"
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
      // Aquí iría la lógica de registro real
      // Por ejemplo, una llamada a la API para crear el usuario

      // Simulamos un proceso de registro
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirigir al usuario a la página de login
      router.push("/login")
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      alert("Error al crear la cuenta. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

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
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-start">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 border-gray-300 rounded mt-1"
        />
        <label htmlFor="acceptTerms" className="ml-2 block text-sm">
          Acepto los{" "}
          <Link href="/terminos" className="underline">
            términos y condiciones
          </Link>{" "}
          y la{" "}
          <Link href="/privacidad" className="underline">
            política de privacidad
          </Link>
        </label>
      </div>
      {errors.acceptTerms && <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </div>

      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="font-medium hover:underline">
          Inicia sesión
        </Link>
      </div>
    </form>
  )
}
