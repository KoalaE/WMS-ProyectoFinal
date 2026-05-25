import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarInventario } from '../api/inventario'
import { DataTable } from '../components/DataTable'
import { SearchFilters } from '../components/SearchFilters'
import type { Producto } from '../types/producto'
import '../pages/Dashboard.css'
import './Inventario.css'

export function Inventario() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cargar = useCallback(() => {
    setLoading(true)
    setError('')
    listarInventario({ nombre: nombre || undefined, codigo: codigo || undefined })
      .then(setProductos)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
      .finally(() => setLoading(false))
  }, [nombre, codigo])

  useEffect(() => {
    cargar()
  }, [])

  const totalUnidades = productos.reduce((s, p) => s + p.cantidad, 0)
  const sinStock = productos.filter((p) => p.cantidad === 0).length

  return (
    <div className="inventario-page">
      <h1 className="page-title">Inventario</h1>
      <p className="page-subtitle">
        Stock en tiempo real. Para crear o editar productos ve a{' '}
        <Link to="/productos">Productos</Link>.
      </p>

      <SearchFilters
        nombre={nombre}
        codigo={codigo}
        onNombreChange={setNombre}
        onCodigoChange={setCodigo}
        onBuscar={cargar}
        onLimpiar={() => {
          setNombre('')
          setCodigo('')
          listarInventario()
            .then(setProductos)
            .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
        }}
      />

      <div className="dashboard-summary">
        <div className="summary-card">
          <p className="summary-label">Productos</p>
          <p className="summary-value">{loading ? '—' : productos.length}</p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Unidades totales</p>
          <p className="summary-value">{loading ? '—' : totalUnidades}</p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Sin stock</p>
          <p className="summary-value summary-value--warn">
            {loading ? '—' : sinStock}
          </p>
        </div>
      </div>

      {error && <p className="banner-error">{error}</p>}

      <DataTable
        columns={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'codigo', header: 'Código' },
          {
            key: 'cantidad',
            header: 'Cantidad',
            render: (row: Producto) => (
              <span
                className={
                  row.cantidad === 0 ? 'stock-badge stock-badge--empty' : 'stock-badge'
                }
              >
                {row.cantidad}
              </span>
            ),
          },
        ]}
        rows={productos}
        emptyMessage={loading ? 'Cargando…' : 'No hay productos que coincidan.'}
      />
    </div>
  )
}
