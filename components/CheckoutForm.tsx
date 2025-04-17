"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function CheckoutForm() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Dirección de envío
    address: "",
    city: "",
    state: "",
    postalCode: "",

    // Datos de pago
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  // Estado para errores de validación
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    const newErrors = { ...errors }

    // Validar campos requeridos
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key as keyof typeof errors] = "Este campo es requerido"
        valid = false
      }
    })

    // Validar email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      valid = false
    }

    // Validar número de tarjeta (16 dígitos)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Número de tarjeta inválido"
      valid = false
    }

    // Validar fecha de expiración (MM/YY)
    if (formData.cardExpiry && !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Formato inválido (MM/YY)"
      valid = false
    }

    // Validar CVC (3-4 dígitos)
    if (formData.cardCvc && !/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = "CVC inválido"
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
      // Aquí iría la lógica para procesar el pago y crear el pedido
      // Por ejemplo, una llamada a la API para procesar el pago y guardar el pedido

      // Simulamos un proceso de pago
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Limpiar carrito
      clearCart()

      // Redirigir a la página de confirmación
      router.push("/checkout/confirmacion")
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Error al procesar el pago. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Datos personales */}
      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-lg font-medium mb-4">Datos personales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Dirección de envío */}
      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-lg font-medium mb-4">Dirección de envío</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Dirección
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                Ciudad
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                Región
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                Código Postal
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Información de pago */}
      <div className="bg-white p-6 border rounded-lg">
        <h2 className="text-lg font-medium mb-4">Información de pago</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium mb-1">
              Nombre en la tarjeta
            </label>
            <input
              id="cardName"
              name="cardName"
              type="text"
              value={formData.cardName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.cardName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
              Número de tarjeta
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={formData.cardNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                Fecha de expiración
              </label>
              <input
                id="cardExpiry"
                name="cardExpiry"
                type="text"
                placeholder="MM/YY"
                value={formData.cardExpiry}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.cardExpiry ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
            </div>

            <div>
              <label htmlFor="cardCvc" className="block text-sm font-medium mb-1">
                CVC
              </label>
              <input
                id="cardCvc"
                name="cardCvc"
                type="text"
                placeholder="XXX"
                value={formData.cardCvc}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.cardCvc ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
              />
              {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Completar compra"}
      </button>
    </form>
  )
}
