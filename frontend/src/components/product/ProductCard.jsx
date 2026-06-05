import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../contexts/CartContext'

const BADGE_COLORS = {
  'Best Seller': 'bg-amber-100 text-amber-800',
  New: 'bg-green-100 text-green-800',
  Sale: 'bg-red-100 text-red-800',
  Handmade: 'bg-purple-100 text-purple-800',
}

function StarRating({ rating = 0, count = 0 }) {
  const safeRating = Number(rating) || 0
  const safeCount = Number(count) || 0

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.round(safeRating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200 fill-gray-200'
            }
          />
        ))}
      </div>

      <span className="text-xs text-gray-500">
        {safeRating.toFixed(1)} ({safeCount.toLocaleString()})
      </span>
    </div>
  )
}

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const imageUrl = product?.image_url || product?.image || 'https://picsum.photos/300/300'
  const rating = Number(product?.rating) || 0
  const reviewCount = Number(product?.reviewCount) || 0

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <Link to={`/product/${product?.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
          <img
            src={imageUrl}
            alt={product?.name || 'Product'}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/300/300'
            }}
          />
        </div>
        {product?.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              BADGE_COLORS[product.badge] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-4">
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">
          {product?.category || 'Uncategorized'}
        </p>
        <Link to={`/product/${product?.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
            {product?.name}
          </h3>
        </Link>
        <StarRating rating={rating} count={reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product?.price || 0}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard