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
        <Header />
        <Home />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App