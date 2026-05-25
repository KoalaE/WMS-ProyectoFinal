import { buildQuery, parseApiError } from '../../../shared/api/client'
import type { Producto } from '../../../shared/types/producto'

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
