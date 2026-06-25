import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import StarField from '../components/StarField'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <StarField />
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <p className="text-sm text-[var(--text)]">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text)] transition hover:bg-white/10"
        >
          Log out
        </button>
      </header>
      <main className="relative z-10 flex min-h-[calc(100svh-64px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-4xl font-medium text-[var(--text-h)]">Welcome to MindoOS</h1>
        <p className="text-[var(--text)]">Dashboard coming soon</p>
      </main>
    </>
  )
}
