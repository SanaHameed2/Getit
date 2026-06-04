import { Link, createFileRoute } from '@tanstack/react-router'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and will be on its way shortly.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-8 text-left">
          <Package size={20} className="text-indigo-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Shipping in 2-5 business days</p>
            <p className="text-xs text-gray-500">You'll receive a tracking email once dispatched</p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
