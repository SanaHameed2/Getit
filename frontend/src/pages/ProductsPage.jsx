import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/product/ProductCard'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*')
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage