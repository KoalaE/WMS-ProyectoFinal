import { parseApiError } from '../../../shared/api/client'
import type { Producto, ProductoInput } from '../../../shared/types/producto'

const BASE = '/api/Productos'

export async function listarProductos(): Promise<Producto[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function crearProducto(input: ProductoInput): Promise<Producto> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  const data = await res.json()
  return data.producto ?? data
}

export async function actualizarProducto(
  id: number,
  input: ProductoInput,
): Promise<Producto> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  const data = await res.json()
  return data.producto ?? data
}

export async function eliminarProducto(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await parseApiError(res))
}
