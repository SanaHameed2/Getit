import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App