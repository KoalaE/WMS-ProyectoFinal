import { buildQuery, parseApiError } from './client'
import type { Producto } from '../types/producto'
import type { InventarioReporte } from '../types/movimiento'

export async function listarInventario(filtros?: {
  nombre?: string
  codigo?: string
}): Promise<Producto[]> {
  const res = await fetch(
    `/api/Inventario${buildQuery({
      nombre: filtros?.nombre,
      codigo: filtros?.codigo,
    })}`,
  )
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function reporteInventario(filtros?: {
  nombre?: string
  codigo?: string
}): Promise<InventarioReporte> {
  const res = await fetch(
    `/api/Reportes/inventario${buildQuery({
      nombre: filtros?.nombre,
      codigo: filtros?.codigo,
    })}`,
  )
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function reporteMovimientos(
  filtros?: import('./movimientos').FiltrosMovimiento,
): Promise<import('../types/movimiento').Movimiento[]> {
  const res = await fetch(
    `/api/Reportes/movimientos${buildQuery({
      tipo: filtros?.tipo,
      productoId: filtros?.productoId,
      desde: filtros?.desde,
      hasta: filtros?.hasta,
    })}`,
  )
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}
