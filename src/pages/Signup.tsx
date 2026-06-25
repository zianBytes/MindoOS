import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import StarField from '../components/StarField'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <StarField />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-1 text-2xl font-medium text-[var(--text-h)]">Create account</h2>
          <p className="mb-8 text-sm text-[var(--text)]">Start building your universe</p>

          {submitted ? (
            <div className="flex flex-col gap-4">
              <p className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                Check your email to confirm your account.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {error && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[var(--text)]">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[var(--text-h)] placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[var(--text)]">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[var(--text-h)] placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[var(--text)]">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-[var(--text-h)] placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-[var(--text)]">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-[var(--accent)] hover:underline"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  )
}
