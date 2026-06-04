import { Link, createFileRoute } from '@tanstack/react-router'
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Checkout Cancelled</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your payment was cancelled. No charges were made. Your cart items are still saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <ShoppingBag size={16} />
            Try Again
          </Link>
        </div>
      </div>
    </div>
  )
}
