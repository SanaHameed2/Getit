import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { 
  Package, ShoppingBag, DollarSign, Edit, Trash2, Plus, 
  Search, Eye, Clock, Truck, CheckCircle, TrendingUp, Download
} from 'lucide-react'

function AdminDashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '', price: '', category: '', image_url: '', description: '', stock: 10, rating: 0
  })

  useEffect(() => {
    fetchProducts()
    fetchOrders()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('id')
    setProducts(data || [])
    setLoading(false)
  }

  async function fetchOrders() {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
  }

  async function fetchCategories() {
    const { data } = await supabase.from('products').select('category')
    const uniqueCategories = [...new Set(data?.map(p => p.category) || [])]
    setCategories(uniqueCategories)
  }

  const handleSaveProduct = async () => {
    const productData = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      image_url: productForm.image_url,
      description: productForm.description,
      stock: parseInt(productForm.stock),
      rating: parseFloat(productForm.rating)
    }

    if (editingProduct) {
      await supabase.from('products').update(productData).eq('id', editingProduct.id)
    } else {
      await supabase.from('products').insert([productData])
    }
    fetchProducts()
    fetchCategories()
    setShowProductModal(false)
    setEditingProduct(null)
    setProductForm({ name: '', price: '', category: '', image_url: '', description: '', stock: 10, rating: 0 })
  }

  const handleDeleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id)
      fetchProducts()
      fetchCategories()
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    fetchOrders()
  }

  const editProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name, price: product.price, category: product.category,
      image_url: product.image_url, description: product.description || '',
      stock: product.stock, rating: product.rating
    })
    setShowProductModal(true)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const stats = {
    products: products.length,
    orders: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  }

  const topProducts = () => {
    const productSales = {}
    orders.forEach(order => {
      order.items?.forEach(item => {
        productSales[item.name] = (productSales[item.name] || 0) + item.quantity
      })
    })
    return Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }

  if (!user) {
    return <div className="text-center py-20">Please login to access admin panel</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button onClick={() => setActiveTab('dashboard')} className={`py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab('products')} className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>
          Products
        </button>
        <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>
          Orders
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="flex items-center gap-3 mb-2">
                <Package className="text-indigo-600" />
                <h3 className="text-lg font-semibold">Products</h3>
              </div>
              <p className="text-3xl font-bold">{stats.products}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="text-green-600" />
                <h3 className="text-lg font-semibold">Orders</h3>
              </div>
              <p className="text-3xl font-bold">{stats.orders}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="text-yellow-600" />
                <h3 className="text-lg font-semibold">Revenue</h3>
              </div>
              <p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
            {topProducts().map(([name, qty], idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded mb-2">
                <span>{idx + 1}. {name}</span>
                <span className="text-indigo-600 font-semibold">{qty} sold</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 border rounded-lg dark:bg-gray-800" />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border rounded-lg dark:bg-gray-800">
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', category: '', image_url: '', description: '', stock: 10, rating: 0 }); setShowProductModal(true) }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <Plus size={16} /> Add Product
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Category</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Stock</th><th className="p-3 text-left">Actions</th></tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">
                    <button onClick={() => editProduct(product)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr><th className="p-3 text-left">Order ID</th><th className="p-3 text-left">Total</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Action</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-3 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                  <td className="p-3">${order.total}</td>
                  <td className="p-3">
                    <select value={order.status || 'pending'} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="px-2 py-1 text-sm border rounded-lg">
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} className="text-indigo-600 hover:underline">
                      {selectedOrder?.id === order.id ? 'Hide' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold mb-3">Order Details</h3>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 font-bold flex justify-between">
                <span>Total:</span><span>${selectedOrder.total}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <input type="text" placeholder="Name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full p-3 border rounded-lg mb-3" />
            <input type="number" placeholder="Price" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="w-full p-3 border rounded-lg mb-3" />
            <input type="text" placeholder="Category" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full p-3 border rounded-lg mb-3" />
            <input type="text" placeholder="Image URL" value={productForm.image_url} onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })} className="w-full p-3 border rounded-lg mb-3" />
            <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full p-3 border rounded-lg mb-3" rows="3" />
            <input type="number" placeholder="Stock" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} className="w-full p-3 border rounded-lg mb-3" />
            <div className="flex gap-3">
              <button onClick={handleSaveProduct} className="flex-1 py-3 bg-indigo-600 text-white rounded-lg">Save</button>
              <button onClick={() => setShowProductModal(false)} className="flex-1 py-3 bg-gray-300 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard