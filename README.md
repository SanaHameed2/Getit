# GetItMart | Full-Stack E-Commerce Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://getit-vercel.app)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

**Live Demo:** [getit-vercel.app](https://getit-vercel.app)

GetItMart is a fully functional online shopping website. It features a modern design, a fast product catalog, an interactive shopping cart, secure user accounts, and an admin dashboard to manage orders and inventory. 

---

## 🌟 Key Features

### For Shoppers
* **Easy Browsing:** Search and filter through 40+ products by name, category, price, or rating.
* **Smart Shopping Cart:** Add items to your cart and update quantities easily. Your cart saves automatically so you don’t lose items if you refresh.
* **Wishlist:** Save your favorite items to buy later (works for both guests and logged-in users).
* **Reviews & Ratings:** Leave a 1-5 star rating and comment on products. You can also edit or delete your own reviews.
* **Dark Mode:** Switch between light and dark themes anytime.

### For Admins
* **Business Dashboard:** See total products, orders, and revenue at a glance.
* **Product Management:** Add new items, update prices, change descriptions, or delete products.
* **Order Tracking:** Update order statuses as they move from Pending to Processing, Shipped, and Delivered.

---

## 🛠️ Tools Used (Tech Stack)

* **Frontend (UI):** React 18, Vite, Tailwind CSS (for styling)
* **Backend (Database & Auth):** Supabase (PostgreSQL)
* **Testing:** Vitest (ensures the cart and filters work perfectly)
* **Hosting:** Vercel

---

## 📁 Project Structure

```text
Getit/
├── frontend/
│   ├── src/
│   │   ├── components/       # Small UI parts (Buttons, Headers, Footers)
│   │   ├── contexts/         # App logic (Cart memory, Themes, Log-in states)
│   │   ├── pages/            # Complete pages (Home, Checkout, Admin Panel)
│   │   └── utils/            # Helper tools and code tests
│   ├── .env.example          # Guide for setup keys
│   └── package.json          # List of project dependencies
└── README.md