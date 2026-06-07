import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import StripeCheckout from '../components/payment/StripeCheckout'

function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to checkout')
      navigate('/')
      return
    }

    setLoading(true)
    
    const orderData = {
      user_id: user.id,
      total: getCartTotal(),
      items: cart,
      status: 'pending',
      shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
      created_at: new Date().toISOString()
    }

    try {
      const { error } = await supabase.from('orders').insert([orderData])
      if (error) throw error
      clearCart()
      navigate('/order-success')
    } catch (error) {
      console.error('Order error:', error)
      alert('Order failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <img 
                  src={item.image_url || item.image || 'https://picsum.photos/60/60'} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded" 
                  onError={(e) => e.target.src = 'https://picsum.photos/60/60'}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                  <p className="text-indigo-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <input 
                type="text" 
                name="fullName" 
                placeholder="Full Name" 
                value={formData.fullName} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                required 
              />
              
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                required 
              />
              
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={formData.address} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                required 
              />
              
              <div className="flex gap-4">
                <input 
                  type="text" 
                  name="city" 
                  placeholder="City" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
                <input 
                  type="text" 
                  name="postalCode" 
                  placeholder="Postal Code" 
                  value={formData.postalCode} 
                  onChange={handleChange} 
                  className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600" 
                required 
              />
            </div>

            {/* Place Order Button - Remove this if using Stripe only */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Place Order • $${getCartTotal().toFixed(2)}`}
            </button>

            {/* Add StripeCheckout here */}
            <StripeCheckout />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout