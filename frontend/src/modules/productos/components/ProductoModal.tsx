import { useEffect, useState, type FormEvent } from 'react'
import type { Producto, ProductoInput } from '../../../shared/types/producto'
import './ProductoModal.css'

interface ProductoModalProps {
  open: boolean
  onClose: () => void
  onSave: (input: ProductoInput) => Promise<void>
  editing?: Producto | null
}

const empty: ProductoInput = { nombre: '', codigo: '', cantidad: 0 }

export function ProductoModal({
  open,
  onClose,
  onSave,
  editing,
}: ProductoModalProps) {
  const [form, setForm] = useState<ProductoInput>(empty)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(
        editing
          ? {
              nombre: editing.nombre,
              codigo: editing.codigo,
              cantidad: editing.cantidad,
            }
          : empty,
      )
      setError('')
    }
  }, [open, editing])

  if (!open) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.nombre.trim() || !form.codigo.trim()) {
      setError('Nombre y código son obligatorios.')
      return
    }
    if (form.cantidad < 0) {
      setError('La cantidad debe ser mayor o igual a cero.')
      return
    }

    setSaving(true)
    try {
      await onSave({
        nombre: form.nombre.trim(),
        codigo: form.codigo.trim(),
        cantidad: form.cantidad,
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
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">{editing ? 'Editar producto' : 'Agregar producto'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Nombre
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Ej. Hierro"
            />
          </label>
          <label>
            Código
            <input
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              placeholder="Ej. 001"
            />
          </label>
          <label>
            Cantidad
            <input
              type="number"
              min={0}
              value={form.cantidad}
              onChange={(e) =>
                setForm({ ...form, cantidad: Number(e.target.value) || 0 })
              }
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
