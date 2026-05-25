import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../modules/auth/context/AuthContext'
import { ProtectedRoute } from '../modules/auth/components/ProtectedRoute'
import { Login } from '../modules/auth/pages/Login'
import { Layout } from '../modules/layout/components/Layout'
import { Dashboard } from '../modules/dashboard/pages/Dashboard'
import { Productos } from '../modules/productos/pages/Productos'
import { Movimientos } from '../modules/movimientos/pages/Movimientos'
import { Inventario } from '../modules/inventario/pages/Inventario'
import { Reportes } from '../modules/reportes/pages/Reportes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/movimientos" element={<Movimientos />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/reportes" element={<Reportes />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
