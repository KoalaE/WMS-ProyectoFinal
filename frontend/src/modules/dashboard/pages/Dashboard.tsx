import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarProductos } from '../../productos/api/productos'
import { DataTable } from '../../../shared/components/DataTable'
import type { Producto } from '../../../shared/types/producto'
import './Dashboard.css'

export function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
      .finally(() => setLoading(false))
  }, [])

  const totalStock = productos.reduce((s, p) => s + p.cantidad, 0)

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-summary">
        <div className="summary-card summary-card--chart">
          <p className="summary-label">Resumen de inventario</p>
          <div className="chart-placeholder">
            <span>{productos.length}</span>
            <small>productos registrados</small>
          </div>
        </div>
        <div className="summary-card">
          <p className="summary-label">Stock total</p>
          <p className="summary-value">{loading ? '—' : totalStock}</p>
          <p className="summary-hint">unidades en bodega</p>
        </div>
      </div>

      {error && <p className="banner-error">{error}</p>}

      <DataTable
        columns={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'codigo', header: 'Código' },
          { key: 'cantidad', header: 'Cantidad' },
        ]}
        rows={productos}
        emptyMessage={
          loading
            ? 'Cargando productos…'
            : 'Sin productos. Agrega el primero en Productos.'
        }
      />

      <div className="page-footer-actions">
        <Link to="/productos" className="btn-primary">
          Productos
        </Link>
      </div>
    </div>
  )
}
