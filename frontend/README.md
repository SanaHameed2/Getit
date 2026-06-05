\# GetItMart - Ecommerce Platform



🛒 Modern ecommerce platform built with React, Vite, Tailwind CSS, and Supabase.



\## Live Demo

🔗 \[https://getit-vercel.app](https://getit-vercel.app)



\## Features

\- 🛍️ 40+ products from Supabase database

\- 🔍 Search products by name

\- 📂 Filter by category

\- 📊 Sort by price (low/high) and rating

\- 🛒 Shopping cart with drawer (add/remove/update quantity)

\- 🌙 Full page dark mode with persistence

\- 📱 Fully responsive design

\- 💾 Cart persists in localStorage



\## Tech Stack

| Technology | Purpose |

|------------|---------|

| React 18 | Frontend framework |

| Vite | Build tool |

| Tailwind CSS | Styling |

| Supabase | Database \& Backend |

| Context API | State management |

| Vercel | Hosting |



\## Local Setup



```bash

\# Clone repository

git clone https://github.com/SanaHameed2/Getit.git

cd Getit/frontend



\# Install dependencies

npm install



\# Create .env file

echo "VITE\_SUPABASE\_URL=your\_url" > .env

echo "VITE\_SUPABASE\_ANON\_KEY=your\_key" >> .env



\# Run development server

npm run dev

