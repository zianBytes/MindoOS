import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import StarField from './StarField'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <>
        <StarField />
        <main className="relative z-10 flex min-h-svh items-center justify-center">
          <p className="text-sm text-[var(--text)]">Loading…</p>
        </main>
      </>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
