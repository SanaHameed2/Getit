import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

function Login({ onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      onClose()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg mb-3 bg-white dark:bg-gray-800" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg mb-4 bg-white dark:bg-gray-800" required />
          <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">{loading ? 'Loading...' : 'Login'}</button>
        </form>
        <p className="text-center mt-4">Don't have an account? <button onClick={onSwitchToSignup} className="text-indigo-600 hover:underline">Sign Up</button></p>
      </div>
    </div>
  )
}

export default Login