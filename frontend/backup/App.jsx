import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      console.log('Fetching from Supabase...')
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(40)
      
      if (error) {
        console.error('Error:', error)
      } else {
        console.log('Products fetched:', data.length)
        setProducts(data)
      }
      setLoading(false)
    }
    
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>GetItMart - Connected!</h1>
      {loading ? (
        <p>Loading {products.length} products...</p>
      ) : (
        <div>
          <p>Total products: {products.length}</p>
          <ul>
            {products.slice(0, 10).map(product => (
              <li key={product.id}>
                <strong>{product.name}</strong> - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App