import { buildQuery, parseApiError } from './client'
import type { Movimiento, MovimientoInput } from '../types/movimiento'

const BASE = '/api/Movimientos'

export interface FiltrosMovimiento {
  tipo?: string
  productoId?: number
  desde?: string
  hasta?: string
}

export async function listarMovimientos(
  filtros?: FiltrosMovimiento,
): Promise<Movimiento[]> {
  const res = await fetch(
    `${BASE}${buildQuery({
      tipo: filtros?.tipo,
      productoId: filtros?.productoId,
      desde: filtros?.desde,
      hasta: filtros?.hasta,
    })}`,
  )
  if (!res.ok) throw new Error(await parseApiError(res))
  return res.json()
}

export async function crearMovimiento(
  input: MovimientoInput,
): Promise<Movimiento> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  const data = await res.json()
  return data.movimiento ?? data
}

export async function actualizarMovimiento(
  id: number,
  input: MovimientoInput,
): Promise<Movimiento> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await parseApiError(res))
  const data = await res.json()
  return data.movimiento ?? data
}

export async function eliminarMovimiento(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await parseApiError(res))
}
