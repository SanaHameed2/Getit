import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-gray-900">
              <Header />
              <Home />
              <Footer />
              <CartDrawer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App