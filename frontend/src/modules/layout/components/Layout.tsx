import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/context/AuthContext'
import './Layout.css'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/inventario', label: 'Inventario' },
  { to: '/movimientos', label: 'Movimientos' },
  { to: '/reportes', label: 'Reportes' },
] as const

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const initials = user?.nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon" aria-hidden>
            W
          </span>
          <div>
            <strong>Warner & Spencer</strong>
            <span>Sistema WMS</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <p className="greeting">
            Buen día, <strong>{user?.nombre ?? 'Usuario'}</strong>!
          </p>
          <div className="topbar-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              Cerrar sesión
            </button>
            <div className="avatar" title={user?.email}>
              {initials}
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
