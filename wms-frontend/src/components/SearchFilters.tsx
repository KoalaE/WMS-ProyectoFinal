import './SearchFilters.css'

interface SearchFiltersProps {
  nombre: string
  codigo: string
  onNombreChange: (v: string) => void
  onCodigoChange: (v: string) => void
  onBuscar: () => void
  onLimpiar?: () => void
}

export function SearchFilters({
  nombre,
  codigo,
  onNombreChange,
  onCodigoChange,
  onBuscar,
  onLimpiar,
}: SearchFiltersProps) {
  return (
    <div className="search-filters">
      <label>
        Nombre
        <input
          value={nombre}
          onChange={(e) => onNombreChange(e.target.value)}
          placeholder="Buscar por nombre…"
        />
      </label>
      <label>
        Código
        <input
          value={codigo}
          onChange={(e) => onCodigoChange(e.target.value)}
          placeholder="Buscar por código…"
        />
      </label>
      <button type="button" className="btn-primary" onClick={onBuscar}>
        Buscar
      </button>
      {onLimpiar && (
        <button type="button" className="btn-secondary" onClick={onLimpiar}>
          Limpiar
        </button>
      )}
    </div>
  )
}
