import { useCallback, useEffect, useState } from 'react'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
} from '../api/productos'
import { DataTable } from '../components/DataTable'
import { ProductoModal } from '../components/ProductoModal'
import type { Producto, ProductoInput } from '../types/producto'
import './Productos.css'

export function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Producto | null>(null)

  const cargar = useCallback(() => {
    setLoading(true)
    setError('')
    listarProductos()
      .then(setProductos)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
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

  async function handleSave(input: ProductoInput) {
    if (editing) {
      await actualizarProducto(editing.id, input)
      setToast('Producto actualizado correctamente.')
    } else {
      await crearProducto(input)
      setToast('Producto guardado correctamente.')
    }
    setEditing(null)
    cargar()
  }

  async function handleDelete(p: Producto) {
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return
    try {
      await eliminarProducto(p.id)
      setToast('Producto eliminado correctamente.')
      cargar()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo eliminar')
    }
  }

  return (
    <div className="productos-page">
      <h1 className="page-title">Productos</h1>

      {error && <p className="banner-error">{error}</p>}
      {toast && <p className="banner-success">{toast}</p>}

      <DataTable
        columns={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'codigo', header: 'Código' },
          { key: 'cantidad', header: 'Cantidad' },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (row: Producto) => (
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
        rows={productos}
        emptyMessage={loading ? 'Cargando…' : 'No hay productos registrados.'}
      />

      <div className="page-footer-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          Agregar
        </button>
      </div>

      <ProductoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSave={handleSave}
        editing={editing}
      />
    </div>
  )
}
