import React, { useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

function StripeCheckout() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ').substring(0, 19)
  }

  const handlePayment = async () => {
    // Basic validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter valid card number')
      return
    }
    if (!expiry || expiry.length < 5) {
      setError('Please enter valid expiry date')
      return
    }
    if (!cvv || cvv.length < 3) {
      setError('Please enter valid CVV')
      return
    }
    if (!cardName) {
      setError('Please enter name on card')
      return
    }
    if (!user) {
      setError('Please login to checkout')
      return
    }
    if (cart.length === 0) {
      setError('Your cart is empty')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create order in Supabase
      const orderData = {
        user_id: user.id,
        total: getCartTotal(),
        items: cart,
        status: 'pending',
        shipping_address: 'Address saved',
        created_at: new Date().toISOString()
      }

      const { error: orderError } = await supabase
        .from('orders')
        .insert([orderData])

      if (orderError) throw orderError

      // Clear cart and redirect
      clearCart()
      window.location.href = '/order-success'
      
    } catch (err) {
      setError(err.message || 'Order failed')
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            className="w-full p-3 border rounded-lg dark:bg-gray-700"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="12/28"
              className="w-full p-3 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="w-full p-3 border rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Name on Card</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 border rounded-lg dark:bg-gray-700"
          />
        </div>
        
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Place Order • $${getCartTotal().toFixed(2)}`}
        </button>
        
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
          Test Card: 4242 4242 4242 4242 | Any Expiry | Any CVV
        </p>
      </div>
    </div>
  )
}

export default StripeCheckout