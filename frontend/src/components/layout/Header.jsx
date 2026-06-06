import React from 'react';
import { useCart } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, Zap, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../../app/providers/ThemeProvider'
import { useAuth } from '../../contexts/AuthContext'
import Login from '../auth/Login'
import Signup from '../auth/Signup'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { openCart, getCartCount } = useCart()
  const { user, signOut } = useAuth()
  const totalItems = getCartCount()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">GetIt</span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <Link to="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profile</Link>
              <Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Orders</Link>
              <a href="#products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Products</a>
              <a href="#categories" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Categories</a>
            </nav>

            <div className="flex-1" />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
                  {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-3 py-1.5 text-sm border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Signup
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/profile" className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/orders" className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Orders
              </Link>
              <a href="#products" className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Products
              </a>
              <a href="#categories" className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Categories
              </a>
              {!user && (
                <>
                  <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false) }} className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg">
                    Login
                  </button>
                  <button onClick={() => { setShowSignup(true); setMobileMenuOpen(false) }} className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg">
                    Signup
                  </button>
                </>
              )}
              {user && (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false) }} className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600 rounded-lg">
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false)
            setShowSignup(true)
          }} 
        />
      )}
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={() => {
            setShowSignup(false)
            setShowLogin(true)
          }} 
        />
      )}
    </>
  )
}

export default Header