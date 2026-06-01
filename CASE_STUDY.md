# Case Study: Migrating GetItMart from TanStack Start to React + Vite

An engineering breakdown of migrating a full-stack ecommerce platform from an unstable, bleeding-edge beta framework to a stable, production-ready frontend architecture.

---

## 1. Project Overview

**GetItMart** is a full-stack ecommerce platform featuring a product catalog, multi-category search/filter mechanics, a persistent cart system, and an optimized mobile-first responsive layout.

| Item | Link |
|------|------|
| Frontend Live URL | [getit-mart-pi.vercel.app](https://getit-mart-pi.vercel.app/) |
| GitHub Repository | [github.com/SanaHameed2/GetitMart](https://github.com/SanaHameed2/GetitMart) |

---

## 2. The Core Challenge: Framework Instability

Initially, the project was scaffolded using **TanStack Start** to leverage server-side capabilities. However, due to the framework's experimental status, development hit a critical bottleneck.

### A. Dependency & Version Incompatibilities

| Issue | Error Message |
|-------|---------------|
| Generator Export Error | `Error: The requested module '@tanstack/router-generator' does not provide an export named 'CONSTANTS'` |

### B. Severe Peer Dependency Conflicts

| Issue | Error Message |
|-------|---------------|
| React Version Mismatch | `peer react@"0.0.0-experimental" from @vinxi/react-server-dom / Found: react@18.3.1` |

### C. CI/CD Breakage (Vercel Build Failures)

| Issue | Error Message |
|-------|---------------|
| Module Not Found | `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@tanstack/start'` |

**The Bottleneck:** Over 8+ hours were spent debugging framework-level bugs and dependency traps rather than building core functional business logic.

---

## 3. The Solution: Decoupled and Lean Architecture

To establish structural clarity and guarantee a predictable runtime environment, the architecture was refactored and migrated to a decoupled React 18 + Vite configuration.

### Technical Stack (Post-Migration)

| Layer | Technology |
|-------|------------|
| Frontend Core | React 18 (Stable) + Vite |
| Routing | React Router DOM |
| State Management | React Context API |
| Styling | Tailwind CSS |
| Backend Runtime | Node.js + Express |

### Monorepo Structure

| Folder | Purpose |
|--------|---------|
| `frontend/src/components/` | Reusable UI (Header, Footer, ProductCard, CartDrawer) |
| `frontend/src/pages/` | View layers (Home, Products, Checkout) |
| `frontend/src/contexts/` | Modular State (CartContext, DarkModeContext) |
| `frontend/src/data/` | Mock database (Static catalog array) |
| `frontend/src/styles/` | Tailwind global entry |
| `backend/src/index.js` | Express server entry point |

---

## 4. Migration Metrics and Impact Assessment

The shift from a heavy, experimental framework to a vanilla-adjacent, stable combination of React and Vite resulted in immediate performance and development gains:

| Metric | Before (TanStack Start - Beta) | After (React + Vite - Stable) | Engineering Impact |
|--------|-------------------------------|------------------------------|-------------------|
| Build Status | Failing | Passing | Fixed broken CI/CD pipelines |
| Dev Server HMR | Slow (4s+) | Fast (<1s) | Instant feedback loop |
| Dependency Tree | 700+ packages | ~150 packages | Cleaned supply-chain bloat |
| Deployment | Vercel errors | One-click | Zero configuration overhead |
| Time Allocation | 8hrs debugging | 2hrs building | Refocused on functional code |
| Stability | Highly Unstable | Production-ready | Eliminated breaking changes |

---

## 5. Key Engineering Takeaways

| Takeaway | Description |
|----------|-------------|
| Clarity over Cleverness | Over-engineering with complex, experimental frameworks introduces massive dependency bloat (700+ packages vs 150 packages) and creates unneeded technical debt. |
| Production Guardrails | For production-facing clients or core product releases, always default to stable, mature, ecosystem-tested tools. Beta frameworks risk operational time and cost. |
| The Agile Pivot | Recognizing a dead-end framework early and executing a clean structural refactoring to a trusted stack (Vite + React) saves hours of downstream maintenance. |

---

## 6. Results and Verification

| Status | Achievement |
|--------|-------------|
| Done | Fully functional ecommerce platform live at getit-mart-pi.vercel.app |
| Done | GitHub repository with clean, modular structure |
| Done | Stable development environment with hot reload (<1s) |
| Done | Deployment success rate: 100% on Vercel |

---

*"Choose stable tools for production. Your future self will thank you."*