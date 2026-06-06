import { describe, it, expect } from 'vitest'

describe('Filter Utilities', () => {
  const products = [
    { id: 1, name: 'Headphones', price: 99, category: 'Electronics' },
    { id: 2, name: 'Shoes', price: 79, category: 'Sports' },
    { id: 3, name: 'Watch', price: 199, category: 'Electronics' }
  ]

  it('filters by category', () => {
    const filtered = products.filter(p => p.category === 'Electronics')
    expect(filtered.length).toBe(2)
    expect(filtered[0].name).toBe('Headphones')
  })

  it('sorts by price ascending', () => {
    const sorted = [...products].sort((a, b) => a.price - b.price)
    expect(sorted[0].price).toBe(79)
    expect(sorted[1].price).toBe(99)
    expect(sorted[2].price).toBe(199)
  })

  it('searches by name', () => {
    const searchTerm = 'head'
    const searched = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    expect(searched.length).toBe(1)
    expect(searched[0].name).toBe('Headphones')
  })
})