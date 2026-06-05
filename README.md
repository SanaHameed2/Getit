# GetItMart | Full-Stack E-Commerce Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://getit-vercel.app)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

**Live Demo:**[ [https://getit-vercel.app](https://getit-vercel.app)](https://getit-mart-nbs3oxdrs-sanahameed2s-projects.vercel.app/

Production-grade e-commerce platform with 40+ products, cart system, dark mode, and Supabase backend.

---

## Features

- 40+ products from Supabase database
- Search, filter by category, sort by price/rating
- Shopping cart with drawer (add/remove/update quantity)
- Full-page dark mode with localStorage persistence
- Fully responsive (mobile, tablet, desktop)
- Cart persists in localStorage

## Tech Stack

- React 18 + Vite + Tailwind CSS
- Supabase (PostgreSQL)
- Context API for state management
- Vercel deployment

## Quick Start

```bash
git clone https://github.com/SanaHameed2/Getit.git
cd Getit/frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` in `frontend/`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Project Structure

```
Getit/
├── frontend/
│   ├── src/
│   │   ├── components/cart/CartDrawer.jsx
│   │   ├── components/layout/Header.jsx, Footer.jsx
│   │   ├── components/product/ProductCard.jsx
│   │   ├── contexts/CartContext.jsx
│   │   ├── lib/supabase.js
│   │   ├── pages/Home.jsx
│   │   └── App.jsx
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js
├── backend/
└── README.md
```

## Deployment

```bash
cd frontend
npm run build
npx vercel --prod
```

## Author

**Sana Hameed**
- GitHub: [SanaHameed2](https://github.com/SanaHameed2)
- Portfolio: https://sana-portfolio-weld.vercel.app/
## License

MIT
