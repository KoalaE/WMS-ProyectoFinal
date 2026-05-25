import { buildQuery, parseApiError } from '../../../shared/api/client'
import type { InventarioReporte, Movimiento } from '../../../shared/types/movimiento'
import type { FiltrosMovimiento } from '../../movimientos/api/movimientos'

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
  filtros?: FiltrosMovimiento,
): Promise<Movimiento[]> {
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
