import StarField from '../components/StarField'

export default function Dashboard() {
  return (
    <>
      <StarField />
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-4xl font-medium text-[var(--text-h)]">Welcome to MindoOS</h1>
        <p className="text-[var(--text)]">Dashboard coming soon</p>
      </main>
    </>
  )
}
