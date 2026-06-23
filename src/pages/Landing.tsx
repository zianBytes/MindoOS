import { useNavigate } from 'react-router-dom'
import StarField from '../components/StarField'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <>
      <StarField />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-6xl font-medium tracking-tight text-[var(--text-h)] md:text-7xl">
          MindoOS
        </h1>
        <p className="mb-10 max-w-sm text-lg text-[var(--text)]">
          Your goals, visualized as a living solar system.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate('/signup')}
            className="rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg border border-white/20 px-8 py-3 text-sm font-semibold text-[var(--text-h)] transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Login
          </button>
        </div>
      </main>
    </>
  )
}
