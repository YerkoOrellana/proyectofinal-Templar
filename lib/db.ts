// Este archivo contendría la configuración de conexión a PostgreSQL
// Utilizando un ORM como Prisma o una biblioteca como pg

import { Pool } from "pg"

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DATABASE,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Función para ejecutar consultas SQL
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start

    // Log para desarrollo
    if (process.env.NODE_ENV !== "production") {
      console.log("Consulta ejecutada", { text, duration, rows: res.rowCount })
    }

    return res
  } catch (error) {
    console.error("Error al ejecutar consulta:", error)
    throw error
  }
}

// Función para cerrar la conexión
export async function closePool() {
  await pool.end()
}
