
import { Link, useLocation } from 'react-router-dom'
import type { JSX } from 'react'
import { useAuth } from '../services/AuthContext.tsx'

export function Header(): JSX.Element {
  const location = useLocation()
  const { user, logout } = useAuth()
  
  // Determine user role based on current route
  let userRole = 'Student'
  let userName = 'Student'
  
  if (location.pathname.startsWith('/teacher')) {
    userRole = 'Teacher'
    userName = 'Teacher'
  } else if (location.pathname.startsWith('/admin')) {
    userRole = 'Admin'
    userName = 'Admin'
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-purple-600">Attendance Portal</Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Hello, {user?.name ?? userRole}!</span>
          <button onClick={logout} className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}