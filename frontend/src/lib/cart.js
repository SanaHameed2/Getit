import { supabase } from './supabase'

// Save cart to database for logged-in user
export async function syncCartToDB(cartItems) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // First, delete existing cart items
  await supabase.from('cart_items').delete().eq('user_id', user.id)

  if (cartItems.length === 0) return []

  // Insert new cart items
  const cartData = cartItems.map(item => ({
    user_id: user.id,
    product_id: item.id,
    product_name: item.name,
    product_price: item.price,
    product_image: item.image_url || item.image,
    quantity: item.quantity
  }))

  const { data, error } = await supabase.from('cart_items').insert(cartData).select()
  if (error) throw error
  return data
}

// Load cart from database for logged-in user
export async function loadCartFromDB() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.id)

  if (error) throw error

  // Convert DB format to app cart format
  return data.map(item => ({
    id: item.product_id,
    name: item.product_name,
    price: item.product_price,
    image_url: item.product_image,
    image: item.product_image,
    quantity: item.quantity
  }))
}

// Merge guest cart with user cart on login
export async function mergeGuestCartWithUserCart(guestCart) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const existingItems = await loadCartFromDB() || []
  
  // Merge logic: same product = add quantities
  const mergedItems = [...existingItems]
  
  guestCart.forEach(guestItem => {
    const existingIndex = mergedItems.findIndex(item => item.id === guestItem.id)
    if (existingIndex !== -1) {
      mergedItems[existingIndex].quantity += guestItem.quantity
    } else {
      mergedItems.push(guestItem)
    }
  })

  // Save merged cart to DB
  await syncCartToDB(mergedItems)
  return mergedItems
}