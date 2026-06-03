import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'
import { useEffect, useState } from 'react'

export function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart()
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const handleCheckout = async () => {
    if (state.items.length === 0) return
    setLoading(true)
    try {
      // Use first item for demo — in production you'd create a multi-item session
      const url = await createCheckoutSession({ data: state.items[0].product.id })
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-indigo-600" />
            <h2 className="font-bold text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <div>
                <p className="font-medium text-gray-600">Your cart is empty</p>
                <p className="text-sm mt-1">Add some products to get started</p>
              </div>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-tight truncate">{item.product.name}</p>
                  <p className="text-indigo-600 font-bold text-sm mt-0.5">${item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity - 1 })
                      }
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', productId: item.product.id, quantity: item.quantity + 1 })
                      }
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: item.product.id })}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <p className="font-bold text-sm">${(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-5 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-lg">${totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
            {stripeEnabled === false ? (
              <button disabled className="w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed">
                Checkout Unavailable
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={loading || stripeEnabled === null}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait transition-colors"
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>
            )}
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
