import { useEffect, useState, type FormEvent } from 'react'
import type { Producto } from '../types/producto'
import type { Movimiento, MovimientoInput, TipoMovimiento } from '../types/movimiento'
import './ProductoModal.css'

interface MovimientoModalProps {
  open: boolean
  onClose: () => void
  onSave: (input: MovimientoInput) => Promise<void>
  productos: Producto[]
  editing?: Movimiento | null
}

export function MovimientoModal({
  open,
  onClose,
  onSave,
  productos,
  editing,
}: MovimientoModalProps) {
  const [productoId, setProductoId] = useState('')
  const [tipo, setTipo] = useState<TipoMovimiento>('Entrada')
  const [cantidad, setCantidad] = useState('1')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setProductoId(editing ? String(editing.productoId) : '')
      setTipo(editing?.tipo ?? 'Entrada')
      setCantidad(editing ? String(editing.cantidad) : '1')
      setError('')
    }
  }, [open, editing])

  if (!open) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const qty = Number(cantidad)
    const pid = Number(productoId)

    if (!pid || !qty || qty <= 0) {
      setError('Completa producto y cantidad válida.')
      return
    }

    setSaving(true)
    try {
      await onSave({
        productoId: pid,
        tipo,
        cantidad: qty,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="mov-modal-title"
      >
        <h2 id="mov-modal-title">
          {editing ? 'Editar movimiento' : 'Registrar movimiento'}
        </h2>
        <form onSubmit={handleSubmit} className="modal-form">
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
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
