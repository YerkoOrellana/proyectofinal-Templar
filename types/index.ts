// Definición de tipos para la aplicación

// Tipo para productos
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured?: boolean
}

// Tipo para usuarios
export interface User {
  id: number
  name: string
  email: string
  role: "customer" | "admin"
}

// Tipo para pedidos
export interface Order {
  id: number
  userId: number
  items: OrderItem[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shippingAddress: Address
  createdAt: string
}

// Tipo para items de pedido
export interface OrderItem {
  productId: number
  quantity: number
  price: number
}

// Tipo para direcciones
export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}
