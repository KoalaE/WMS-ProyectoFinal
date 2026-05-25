import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface UsuarioSesion {
  nombre: string
  email: string
  /** Usuario en BD (login real pendiente; Carla = 1) */
  usuarioId: number
}

interface AuthContextValue {
  user: UsuarioSesion | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'wms_user'

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): UsuarioSesion | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as UsuarioSesion
    return { ...parsed, usuarioId: parsed.usuarioId ?? 1 }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioSesion | null>(loadUser)

  const login = useCallback((email: string, password: string) => {
    const trimmed = email.trim()
    if (!trimmed || !password.trim()) return false

    const local = trimmed.split('@')[0] ?? ''
    const nombre =
      /carla/i.test(local)
        ? 'Carla Duque'
        : local.replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Usuario'

    const session: UsuarioSesion = {
      email: trimmed,
      nombre,
      usuarioId: /carla/i.test(local) ? 1 : 2,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
