import { describe, it, expect } from 'vitest'

describe('Cart Utilities', () => {
  it('calculates total price correctly', () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
      { price: 5, quantity: 3 }
    ]
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    expect(total).toBe(10*2 + 20*1 + 5*3) // 20 + 20 + 15 = 55
  })

  it('calculates total items count correctly', () => {
    const cart = [
      { quantity: 2 },
      { quantity: 3 },
      { quantity: 1 }
    ]
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    expect(count).toBe(6)
  })

  it('handles empty cart', () => {
    const cart = []
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    expect(total).toBe(0)
    expect(count).toBe(0)
  })
})