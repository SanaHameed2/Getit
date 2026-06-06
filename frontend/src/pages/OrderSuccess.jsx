import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function OrderSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link to="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Continue Shopping
      </Link>
    </div>
  )
}

export default OrderSuccess