import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Star, Trash2, Edit2 } from 'lucide-react'

function ProductReviews({ productId }) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [userReview, setUserReview] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [editing, setEditing] = useState(false)
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  async function updateProductRating() {
    const { data: allReviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
    
    if (allReviews && allReviews.length > 0) {
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      await supabase
        .from('products')
        .update({ rating: parseFloat(avgRating.toFixed(1)) })
        .eq('id', productId)
    } else {
      await supabase
        .from('products')
        .update({ rating: 0 })
        .eq('id', productId)
    }
  }

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    
    setReviews(data || [])
    
    if (data && data.length > 0) {
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length
      setAverageRating(avg)
    } else {
      setAverageRating(0)
    }

    if (user) {
      const userRev = data?.find(r => r.user_id === user.id)
      if (userRev) {
        setUserReview(userRev)
        setRating(userRev.rating)
        setComment(userRev.comment || '')
      } else {
        setUserReview(null)
        setRating(5)
        setComment('')
      }
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please login to leave a review')
      return
    }

    if (editing) {
      const { error } = await supabase
        .from('reviews')
        .update({ rating, comment, updated_at: new Date() })
        .eq('id', userReview.id)
      if (!error) {
        await fetchReviews()
        await updateProductRating()
      }
      setEditing(false)
    } else {
      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
        rating,
        comment
      })
      if (!error) {
        await fetchReviews()
        await updateProductRating()
        setRating(5)
        setComment('')
      }
    }
  }

  const handleDelete = async () => {
    if (confirm('Delete your review?')) {
      await supabase.from('reviews').delete().eq('id', userReview.id)
      await fetchReviews()
      await updateProductRating()
      setUserReview(null)
      setRating(5)
      setComment('')
      setEditing(false)
    }
  }

  if (loading) return <div className="text-center py-4">Loading reviews...</div>

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        {averageRating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={16} className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* Write Review Form */}
      {!userReview || editing ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-3">{editing ? 'Edit Your Review' : 'Write a Review'}</h4>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star size={20} className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full p-3 border rounded-lg dark:bg-gray-700 mb-3"
            rows="3"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              {editing ? 'Update Review' : 'Submit Review'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(false); setRating(userReview?.rating || 5); setComment(userReview?.comment || '') }} className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Your Review</span>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={14} className={star <= userReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{userReview.comment}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                <Edit2 size={16} />
              </button>
              <button onClick={handleDelete} className="p-1 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Reviews */}
      <div className="space-y-4">
        {reviews.filter(r => !user || r.user_id !== user.id).map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">{review.user_name}</span>
              <span className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={14} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            {review.comment && <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>}
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center text-gray-500 py-4">No reviews yet. Be the first to review!</p>}
      </div>
    </div>
  )
}

export default ProductReviews