import { useNavigate } from 'react-router-dom'
import StarField from '../components/StarField'

export default function Login() {
  const navigate = useNavigate()

  return (
    <>
      <StarField />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-1 text-2xl font-medium text-[var(--text-h)]">Welcome back</h2>
          <p className="mb-8 text-sm text-[var(--text)]">Sign in to your MindoOS account</p>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text)]">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[var(--text-h)] placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text)]">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[var(--text-h)] placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--text)]">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[var(--accent)] hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
