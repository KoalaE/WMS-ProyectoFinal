import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('carla.duque@warner.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (!ok) {
      setError('Ingresa correo y contraseña.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-window">
        <div className="login-chrome" aria-hidden />
        <div className="login-card">
          <h1>Login</h1>
          <p className="login-subtitle">¡Hola de nuevo!</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@empresa.com"
                autoComplete="email"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="btn-primary btn-login">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
