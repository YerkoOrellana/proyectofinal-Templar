"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types"

// Definición del tipo para los items del carrito
interface CartItem {
  product: Product
  quantity: number
}

// Definición del contexto del carrito
interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

// Creación del contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider")
  }
  return context
}

// Proveedor del contexto
export function CartProvider({ children }: { children: ReactNode }) {
  // Estado para los items del carrito
  const [items, setItems] = useState<CartItem[]>([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart)
        } else {
          console.warn("El carrito guardado no tiene el formato esperado.")
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Calcular total de items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calcular precio total
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Función para añadir un producto al carrito
  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id)

      if (existingItemIndex >= 0) {
        // Si existe, actualizar la cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Si no existe, añadir nuevo item
        return [...prevItems, { product, quantity }]
      }
    })
  }

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // Función para vaciar el carrito
  const clearCart = () => {
    setItems([])
  }

  // Valor del contexto
  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}