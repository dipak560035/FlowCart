# FlowCart

A premium lifestyle e-commerce landing page built for the Yatri Motorcycles frontend engineer selection task.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · GSAP · TanStack Query · Redux Toolkit · Recharts · Lucide React

---

## Setup

```bash
git clone https://github.com/your-username/flowcart
cd flowcart
npm install
npm run dev
# Open http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with all required sections |
| `/dashboard` | Admin dashboard with analytics (bonus) |

---

## GSAP Usage

| File | Animation |
|------|-----------|
| `Hero.tsx` | Timeline stagger on load: headline words, subtext, CTAs, image |
| `Hero.tsx` | Infinite floating yoyo on product image + price badge |
| `FeaturedProducts.tsx` | ScrollTrigger: product cards stagger reveal |
| `Categories.tsx` | ScrollTrigger: category cards stagger reveal |
| `FAQ.tsx` | Height tween + opacity on accordion expand/collapse |
| `QuickViewModal.tsx` | Spring scale-in open, scale-down close |
| `CartDrawer.tsx` | Slide-in from right with overlay fade |
| `Navbar.tsx` | Nav items stagger down on mount |

---

## TanStack Query

| Query Key | Endpoint | Usage |
|-----------|----------|-------|
| `['products', category]` | `/api/products?category=X` | Products section with loading skeletons |
| `['faqs']` | `/api/faqs` | FAQ accordion with loading skeletons |

Both routes simulate a network delay to demonstrate loading states. Stale time: 30s for products.

---

## Redux Toolkit

| Slice | Manages |
|-------|---------|
| `cartSlice` | Items, quantities, cart drawer open/close |
| `wishlistSlice` | Wishlisted products toggle |
| `quickViewSlice` | Modal open state + selected product |
| `uiSlice` | Mobile menu, active category filter |

---

## Design Decision

**Acid yellow (#e8ff47) on near-black.** Inspired by Nothing's design language but pushed further into editorial territory. The accent is used sparingly throughout so it retains visual weight — then the promo banner flips to full yellow for a deliberate visual surprise.

Typography: Syne (display, headlines) + DM Sans (body) — intentionally distinct from the typical Inter/Space Grotesk pairing.

---

## What I'd Do With More Time

1. Real product photography instead of emoji
2. localStorage cart persistence across sessions
3. Fuzzy search with Fuse.js
4. Page transition animations with GSAP and Next.js
5. Playwright E2E tests for cart flow and modal
6. Loom walkthrough video