import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ThemeProvider } from './app/providers/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header />
          <Home />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App