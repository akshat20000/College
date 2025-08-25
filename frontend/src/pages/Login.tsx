
import { useState, useEffect } from 'react'
import type { JSX, FormEvent } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../services/AuthContext.tsx'

function isEmail(value: string): boolean {
  return /.+@.+\..+/.test(value)
}

export function Login(): JSX.Element {
  const navigate = useNavigate()
  const { login, loading, error, isAuthenticated, user, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!email.trim()) next.email = 'Email is required'
    else if (!isEmail(email.trim())) next.email = 'Enter a valid email'
    if (!password) next.password = 'Password is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'teacher' ? '/teacher' : '/student', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    clearError()
    await login(email, password)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Promotional */}
      <div className="hidden lg:flex lg:w-2/5 bg-purple-100 flex-col justify-between p-12">
        <div>
          <h1 className="text-4xl font-bold text-purple-800 mb-8">Campus Life</h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Attendance, Simplified.</h2>
          <p className="text-white text-lg">Streamlining academic management for students and faculty.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account.</p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <Button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}