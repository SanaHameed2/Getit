import React, { createContext, useContext, useState, useEffect } from 'react'
import { syncCartToDB, loadCartFromDB, mergeGuestCartWithUserCart } from '../lib/cart'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Load cart based on auth state
  useEffect(() => {
    async function loadCart() {
      setLoading(true)
      if (user) {
        const dbCart = await loadCartFromDB()
        if (dbCart && dbCart.length > 0) {
          setCart(dbCart)
        } else {
          const guestCart = JSON.parse(localStorage.getItem('cart') || '[]')
          if (guestCart.length > 0) {
            const mergedCart = await mergeGuestCartWithUserCart(guestCart)
            if (mergedCart) setCart(mergedCart)
            localStorage.removeItem('cart')
          } else {
            setCart([])
          }
        }
      } else {
        const savedCart = localStorage.getItem('cart')
        setCart(savedCart ? JSON.parse(savedCart) : [])
      }
      setLoading(false)
    }
    loadCart()
  }, [user])

  // Save cart whenever it changes
  useEffect(() => {
    if (!loading) {
      if (user) {
        syncCartToDB(cart)
      } else {
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    }
  }, [cart, user, loading])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      let newCart
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        newCart = [...prevCart, { ...product, quantity }]
      }
      return newCart
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}