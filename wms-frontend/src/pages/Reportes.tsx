import { useCallback, useEffect, useState } from 'react'
import { listarProductos } from '../api/productos'
import { reporteInventario, reporteMovimientos } from '../api/inventario'
import { DataTable } from '../components/DataTable'
import type { Producto } from '../types/producto'
import type { InventarioReporte, Movimiento } from '../types/movimiento'
import { formatFecha } from '../utils/format'
import '../pages/Dashboard.css'
import './Reportes.css'

export function Reportes() {
  const [tab, setTab] = useState<'inventario' | 'movimientos'>('inventario')
  const [productos, setProductos] = useState<Producto[]>([])
  const [reporte, setReporte] = useState<InventarioReporte | null>(null)
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [tipo, setTipo] = useState('')
  const [productoId, setProductoId] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    listarProductos().then(setProductos).catch(() => {})
  }, [])

  const cargarInventario = useCallback(() => {
    setLoading(true)
    setError('')
    reporteInventario({ nombre: nombre || undefined, codigo: codigo || undefined })
      .then((r) => {
        setReporte(r)
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [nombre, codigo])

  const cargarMovimientos = useCallback(() => {
    setLoading(true)
    setError('')
    reporteMovimientos({
      tipo: tipo || undefined,
      productoId: productoId ? Number(productoId) : undefined,
      desde: desde || undefined,
      hasta: hasta || undefined,
    })
      .then(setMovimientos)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false))
  }, [tipo, productoId, desde, hasta])

  useEffect(() => {
    if (tab === 'inventario') cargarInventario()
    else cargarMovimientos()
  }, [tab])

  return (
    <div className="reportes-page">
      <h1 className="page-title">Reportes</h1>

      <div className="reportes-tabs">
        <button
          type="button"
          className={tab === 'inventario' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('inventario')}
        >
          Inventario
        </button>
        <button
          type="button"
          className={tab === 'movimientos' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('movimientos')}
        >
          Auditoría de movimientos
        </button>
      </div>

      {error && <p className="banner-error">{error}</p>}

      {tab === 'inventario' && (
        <>
          <div className="reportes-filters">
            <label>
              Nombre
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Filtrar…"
              />
            </label>
            <label>
              Código
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Filtrar…"
              />
            </label>
            <button type="button" className="btn-primary" onClick={cargarInventario}>
              Aplicar filtros
            </button>
          </div>

          {reporte && (
            <div className="dashboard-summary reportes-summary">
              <div className="summary-card">
                <p className="summary-label">Productos</p>
                <p className="summary-value">{reporte.totalProductos}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">Unidades</p>
                <p className="summary-value">{reporte.totalUnidades}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">Sin stock</p>
                <p className="summary-value">{reporte.productosSinStock}</p>
              </div>
            </div>
          )}

          <DataTable
            columns={[
              { key: 'nombre', header: 'Nombre' },
              { key: 'codigo', header: 'Código' },
              { key: 'cantidad', header: 'Stock' },
            ]}
            rows={reporte?.productos ?? []}
            emptyMessage={loading ? 'Cargando…' : 'Sin datos.'}
          />
        </>
      )}

      {tab === 'movimientos' && (
        <>
          <div className="reportes-filters reportes-filters--wide">
            <label>
              Tipo
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Todos</option>
                <option value="Entrada">Entrada</option>
                <option value="Salida">Salida</option>
              </select>
            </label>
            <label>
              Producto
              <select
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
              >
                <option value="">Todos</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Desde
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
            </label>
            <label>
              Hasta
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            </label>
            <button type="button" className="btn-primary" onClick={cargarMovimientos}>
              Aplicar filtros
            </button>
          </div>

          <DataTable
            columns={[
              { key: 'fecha', header: 'Fecha', render: (r: Movimiento) => formatFecha(r.fecha) },
              { key: 'tipo', header: 'Tipo', render: (r: Movimiento) => (
                <span className={`tipo-badge tipo-badge--${r.tipo.toLowerCase()}`}>{r.tipo}</span>
              )},
              { key: 'productoNombre', header: 'Producto' },
              { key: 'productoCodigo', header: 'Código' },
              { key: 'cantidad', header: 'Cantidad' },
              { key: 'usuarioNombre', header: 'Usuario' },
            ]}
            rows={movimientos}
            emptyMessage={loading ? 'Cargando…' : 'Sin movimientos en el período.'}
          />
        </>
      )}
    </div>
  )
}
