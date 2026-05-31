import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, TrendingUp, Shield, Truck, RefreshCw } from 'lucide-react'
import products, { categories } from '../data/products'
import ProductCard from '../components/product/ProductCard'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let list = [...products]

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q),
      )
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
    }

    return list
  }, [selectedCategory, sortBy, searchQuery])

  const featuredProduct = products[0]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Everyday Deals & More
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Everything You
              <br />
              <span className="text-indigo-300">Need in One Place</span>
            </h1>
            <p className="text-indigo-200 text-lg mb-8">
              Browse thousands of products at unbeatable prices — all under one roof.
            </p>
            <a
              href="#products"
              className="inline-block bg-white text-indigo-900 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Browse Products
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                <picture>
                  <source 
                    srcSet={`${featuredProduct.image}&fm=webp`}
                    type="image/webp"
                  />
                  <source 
                    srcSet={`${featuredProduct.image}`}
                    type="image/jpeg"
                  />
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fetchpriority="high"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 rounded-2xl p-4 shadow-xl">
                <p className="text-xs text-gray-500">Today's Pick</p>
                <p className="font-bold text-sm">{featuredProduct.name}</p>
                <p className="text-indigo-600 font-bold">${featuredProduct.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
              { icon: Shield, title: 'Secure Checkout', desc: 'SSL encrypted payments' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: TrendingUp, title: 'Low Prices', desc: 'Unbeatable value guaranteed' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 pr-2 text-sm focus:outline-none bg-transparent cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Search size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-medium text-gray-600">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 text-indigo-600 font-medium text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay in the Know</h2>
          <p className="text-indigo-100 mb-8">
            Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default HomePage