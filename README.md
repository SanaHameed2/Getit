# GetItMart | Full-Stack E-Commerce Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://getit-vercel.app)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Testing-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

**Live Demo:** https://getit-puce.vercel.app/

GetItMart is a fully functional online shopping website with modern design, product catalog, shopping cart, user accounts, and admin dashboard.

---

## 🌟 Key Features

| **For Shoppers** | **For Admins** |
|:---|:---|
| Browse & Search 40+ products | Dashboard with stats |
| Filter by category, price, rating | Product management (CRUD) |
| Add to cart with quantity update | Order tracking (status update) |
| Wishlist (guest & logged-in) | View revenue & top products |
| Reviews & Ratings (1-5 stars) | Search & filter products |
| Dark mode toggle | - |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Testing:** Vitest
- **Hosting:** Vercel

---

## 📁 Project Structure

```text
Getit/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # UI components (Cart, Product, Auth)
│   │   ├── contexts/       # Cart, Auth, Wishlist, Theme
│   │   ├── pages/          # Home, Checkout, Admin, Wishlist
│   │   └── utils/          # Helpers & tests
│   ├── .env                # Environment variables
│   └── package.json
├── backend/                # Express server (Stripe)
│   └── src/
├── vercel.json             # Monorepo config
└── README.md
