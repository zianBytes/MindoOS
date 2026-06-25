import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layouts/AppShell'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}
