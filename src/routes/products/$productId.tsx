import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Star, ShoppingCart, Check, Package } from 'lucide-react'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const product = products.find((p) => p.id === +params.productId)
    if (!product) throw new Error('Product not found')
    return product
  },
})

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {rating.toFixed(1)} <span className="text-gray-400">({count.toLocaleString()} reviews)</span>
      </span>
    </div>
  )
}

function ProductDetailPage() {
  const product = Route.useLoaderData()
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', product })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = async () => {
    setCheckoutLoading(true)
    try {
      const url = await createCheckoutSession({ data: product.id })
      if (url) window.location.href = url
    } catch {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to all products
      </Link>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-indigo-600 mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

          <StarRating rating={product.rating} count={product.reviewCount} />

          <div className="flex items-baseline gap-3 my-6">
            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
            {product.inStock ? (
              <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <Check size={14} /> In Stock
              </span>
            ) : (
              <span className="text-red-500 text-sm font-medium">Out of Stock</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          {product.features && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            {stripeEnabled !== false && (
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock || checkoutLoading || stripeEnabled === null}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {checkoutLoading ? 'Processing...' : 'Buy Now'}
              </button>
            )}
          </div>

          {/* Shipping note */}
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Package size={14} />
            Free shipping on orders over $75 · 30-day returns
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
