import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      const savedWishlist = localStorage.getItem('wishlist')
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
      setLoading(false)
    }
  }, [user])

  async function fetchWishlist() {
    const { data } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', user.id)
    setWishlist(data || [])
    setLoading(false)
  }

  const addToWishlist = async (product) => {
    if (user) {
      const { error } = await supabase.from('wishlist').insert({
        user_id: user.id,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_image: product.image_url || product.image
      })
      if (!error) fetchWishlist()
    } else {
      const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
      if (!saved.find(item => item.id === product.id)) {
        const newWishlist = [...saved, product]
        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        setWishlist(newWishlist)
      }
    }
  }

  const removeFromWishlist = async (productId) => {
    if (user) {
      await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId)
      fetchWishlist()
    } else {
      const newWishlist = wishlist.filter(item => item.id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(newWishlist))
      setWishlist(newWishlist)
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId || item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)