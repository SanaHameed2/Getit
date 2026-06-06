import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { supabase } from '../lib/supabase'
import { Star, ShoppingCart, Minus, Plus, ArrowLeft, Check } from 'lucide-react'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="text-indigo-600 hover:underline">
          Back to Home
        </button>
      </div>
    )
  }

  const imageUrl = product.image_url || product.image || 'https://picsum.photos/400/400'
  const rating = product.rating || 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="sticky top-24">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg object-cover"
              onError={(e) => e.target.src = 'https://picsum.photos/400/400'}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({rating.toFixed(1)})
            </span>
          </div>

          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            ${product.price}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {product.description || 'High-quality product with excellent features. Perfect for your everyday needs.'}
          </p>

          {product.stock && (
            <p className="text-sm text-green-600 dark:text-green-400 mb-4">
              ✓ In Stock ({product.stock} available)
            </p>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              addedToCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {addedToCart ? (
              <>
                <Check size={20} />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails