import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { listarProductos } from '../api/productos'
import {
  actualizarMovimiento,
  crearMovimiento,
  eliminarMovimiento,
  listarMovimientos,
} from '../api/movimientos'
import { DataTable } from '../components/DataTable'
import { MovimientoModal } from '../components/MovimientoModal'
import { useAuth } from '../context/AuthContext'
import type { Producto } from '../types/producto'
import type { Movimiento, MovimientoInput, TipoMovimiento } from '../types/movimiento'
import { formatFecha } from '../utils/format'
import './Movimientos.css'
import './Productos.css'

export function Movimientos() {
  const { user } = useAuth()
  const [productos, setProductos] = useState<Producto[]>([])
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [productoId, setProductoId] = useState('')
  const [tipo, setTipo] = useState<TipoMovimiento>('Entrada')
  const [cantidad, setCantidad] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Movimiento | null>(null)

  const cargar = useCallback(() => {
    setLoading(true)
    setError('')
    Promise.all([listarProductos(), listarMovimientos()])
      .then(([prods, movs]) => {
        setProductos(prods)
        setMovimientos(movs)
      })
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : 'No se pudo conectar con la API. ¿Está corriendo el backend?',
        ),
      )
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(t)
  }, [toast])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const qty = Number(cantidad)
    const pid = Number(productoId)

    if (!pid || !qty || qty <= 0) {
      setError('Selecciona un producto y una cantidad mayor a cero.')
      return
    }

    try {
      await crearMovimiento({
        productoId: pid,
        tipo,
        cantidad: qty,
        usuarioId: user?.usuarioId ?? 1,
      })
      setToast('Movimiento registrado correctamente.')
      setCantidad('')
      setProductoId('')
      cargar()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar')
    }
  }

  async function handleSaveModal(input: MovimientoInput) {
    const payload = { ...input, usuarioId: user?.usuarioId ?? 1 }
    if (editing) {
      await actualizarMovimiento(editing.id, payload)
      setToast('Movimiento actualizado correctamente.')
    } else {
      await crearMovimiento(payload)
      setToast('Movimiento registrado correctamente.')
    }
    setEditing(null)
    cargar()
  }

  async function handleDelete(m: Movimiento) {
    if (!confirm(`¿Eliminar movimiento de ${m.tipo} (${m.productoNombre})?`)) return
    try {
      await eliminarMovimiento(m.id)
      setToast('Movimiento eliminado. Stock revertido.')
      cargar()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar')
    }
  }

  return (
    <div className="movimientos-page">
      <h1 className="page-title">Movimientos</h1>

      <form className="movimiento-form" onSubmit={handleSubmit}>
        <label>
          Producto
          <select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
          >
            <option value="">Seleccionar…</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} ({p.codigo}) — stock: {p.cantidad}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
          >
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </select>
        </label>
        <label>
          Cantidad
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="0"
          />
        </label>
        <button type="submit" className="btn-primary">
          Agregar
        </button>
      </form>

      {error && <p className="banner-error">{error}</p>}
      {toast && <p className="banner-success">{toast}</p>}

      <h2 className="section-heading">Historial de movimientos</h2>

      <DataTable
        columns={[
          { key: 'fecha', header: 'Fecha', render: (r: Movimiento) => formatFecha(r.fecha) },
          { key: 'tipo', header: 'Tipo', render: (r: Movimiento) => (
            <span className={`tipo-pill tipo-pill--${r.tipo.toLowerCase()}`}>{r.tipo}</span>
          )},
          { key: 'productoNombre', header: 'Nombre' },
          { key: 'productoCodigo', header: 'Código' },
          { key: 'cantidad', header: 'Cantidad' },
          { key: 'usuarioNombre', header: 'Usuario' },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (row: Movimiento) => (
              <div className="row-actions">
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => {
                    setEditing(row)
                    setModalOpen(true)
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn-link btn-link--danger"
                  onClick={() => handleDelete(row)}
                >
                  Eliminar
                </button>
              </div>
            ),
          },
        ]}
        rows={movimientos}
        emptyMessage={
          loading ? 'Cargando…' : 'No hay movimientos. Registra el primero arriba.'
        }
      />

      <MovimientoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSave={handleSaveModal}
        productos={productos}
        editing={editing}
      />
    </div>
  )
}
