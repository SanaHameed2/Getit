# GetItMart | Full-Stack E-Commerce Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://getit-vercel.app)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

**Live Demo:** [https://getit-vercel.app](https://getit-vercel.app)

Production-grade ecommerce platform with 40+ products, cart system, dark mode, authentication, wishlist, reviews, admin panel, and Supabase backend.

---

## Features

### 🛍️ User Features
- 40+ products from Supabase database
- Search products by name
- Filter by category
- Sort by price (low/high) and rating
- Product details page with quantity selector
- Add to cart with drawer
- Update quantity, remove items
- Cart persists in localStorage
- Full-page dark mode with localStorage persistence
- Fully responsive (mobile, tablet, desktop)

### 🔐 Authentication
- Sign up with email and password
- Email confirmation
- Login / Logout
- Profile page with name update
- Cart sync across devices after login

### ❤️ Wishlist
- Add products to wishlist
- Remove from wishlist
- Wishlist page with add to cart option
- Guest wishlist (localStorage) and user wishlist (database)

### ⭐ Reviews & Ratings
- Write product reviews with star ratings (1-5)
- Edit and delete own reviews
- View all customer reviews
- Average rating displayed on product cards
- Review count shown on home page

### 👑 Admin Panel
- Dashboard with stats (products, orders, revenue)
- Product management (view, add, edit, delete)
- Search and filter products by category
- Order management with status update
- Order details view
- Top selling products report

### 📦 Order Management
- Checkout page with shipping form
- Order placement with database save
- Order success confirmation page
- Order history page for users
- Order status tracking

### 🧪 Testing
- Unit tests with Vitest
- 8+ tests for cart, filter, and helper utilities
- Test coverage report

---

## Tech Stack

```yaml
Frontend:
  Framework: React 18
  Build Tool: Vite
  Styling: Tailwind CSS
  State Management: Context API
  Routing: React Router DOM
  Icons: Lucide React
  Testing: Vitest + React Testing Library

Backend:
  Database: Supabase (PostgreSQL)
  Auth: Supabase Auth
  Storage: Supabase Storage

Deployment:
  Hosting: Vercel
  CDN: Vercel Edge Network
  SSL: Automatic