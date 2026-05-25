export type TipoMovimiento = 'Entrada' | 'Salida'

export interface Movimiento {
  id: number
  tipo: TipoMovimiento
  cantidad: number
  fecha: string
  productoId: number
  productoNombre: string
  productoCodigo: string
  usuarioId: number
  usuarioNombre: string
}

export interface MovimientoInput {
  productoId: number
  tipo: TipoMovimiento
  cantidad: number
  usuarioId?: number
}

import type { Producto } from './producto'

export interface InventarioReporte {
  productos: Producto[]
  totalProductos: number
  totalUnidades: number
  productosSinStock: number
}
