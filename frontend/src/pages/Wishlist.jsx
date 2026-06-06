import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import { useWishlist } from '../contexts/WishlistContext'
import { useCart } from '../contexts/CartContext'

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item) => {
    const product = {
      id: item.product_id || item.id,
      name: item.product_name || item.name,
      price: item.product_price || item.price,
      image_url: item.product_image || item.image_url,
      image: item.product_image || item.image_url
    }
    addToCart(product, 1)
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <img 
              src={item.product_image || item.image_url || 'https://picsum.photos/300/300'} 
              alt={item.product_name || item.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="font-semibold">{item.product_name || item.name}</h3>
              <p className="text-indigo-600 font-bold mt-1">${item.product_price || item.price}</p>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={() => handleAddToCart(item)} 
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.product_id || item.id)} 
                  className="p-2 bg-red-100 text-red-600 rounded-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist