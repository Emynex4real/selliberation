# CLAUDE.md — Selliberation (Main App)

This file gives Claude Code full context for working in this repository.

## Project Overview

**Selliberation** is a Nigerian affiliate/referral e-commerce platform where users pay a monthly subscription (₦5,000/month), access online courses, and earn commissions by referring others through a multi-level structure (up to 6 levels).

**Companion project:** `../Selliberation-Admin` — a separate standalone admin dashboard built with the same stack. They share no code directly but maintain identical styling and conventions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build tool | Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin — no tailwind.config.js) |
| Icons | Lucide React |
| State | React Context API (no Redux) |
| Fonts | Plus Jakarta Sans (headings), Inter (body) — loaded from Google Fonts |
| Deployment | Vercel (`vercel.json` with SPA rewrite) |

---

## Project Structure

```
src/
├── assets/          # Static images
├── components/
│   ├── Layout.tsx       # User dashboard shell (sidebar + header + <Outlet>)
│   └── AdminLayout.tsx  # Admin panel shell
├── context/
│   └── AuthContext.tsx  # Global auth state via localStorage
├── data/
│   └── mockData.ts      # Mock commissions, referrals, earnings (dev only)
├── pages/
│   ├── Landing.tsx      # Public homepage
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── dashboard/       # Protected user pages
│   │   ├── Dashboard.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── Referrals.tsx
│   │   ├── Earnings.tsx
│   │   ├── Withdraw.tsx
│   │   └── Settings.tsx
│   └── admin/           # Admin-only pages (also in Selliberation-Admin)
│       ├── AdminDashboard.tsx
│       ├── AdminUsers.tsx
│       ├── AdminCourses.tsx
│       ├── AdminCommissions.tsx
│       ├── AdminWithdrawals.tsx
│       └── AdminSettings.tsx
├── types/
│   └── index.ts         # User, Course, Module, Commission, Withdrawal, etc.
├── App.tsx              # Router + route guards
├── main.tsx
└── index.css            # Tailwind import + custom animations + design tokens
```

---

## Routing Architecture

- **Public:** `/`, `/login`, `/register`, `/pricing`
- **Protected (ProtectedRoute):** `/dashboard/*` — requires `isAuthenticated`
- **Admin (AdminRoute):** `/admin/*` — requires `user.role === 'admin'`
- Route guards are in `App.tsx` as `ProtectedRoute` and `AdminRoute` wrappers.

---

## Auth System

`AuthContext` stores a `User` object in `localStorage` under key `selliberation_user`.

**Mock login behavior:**
- Any email with `role='admin'` → creates admin user
- Default role is `'student'` with a 7-day trial

**User roles:** `'student'` | `'affiliate'` | `'admin'`
**Subscription statuses:** `'trial'` | `'premium'` | `'expired'`

---

## Design System

### Brand Colors
```
Navy (primary bg):   #0D2847, #0F2942
Orange (accent/CTA): #FF7A00, #F5820A
Green (success):     #1CB957
Gray (page bg):      #F0F2F5
```

### Key Patterns
- Sidebar: dark navy gradient `#08192E → #050F1C`, 264px wide, fixed
- Active nav item: `rgba(245,130,10,0.15)` bg + `#F5820A` text + left border
- Cards: `bg-white`, `rounded-xl`, `shadow-sm`, `border border-gray-100`
- Buttons (primary): `#F5820A` background, white text, `rounded-xl`
- Focus rings: `focus:ring-amber-500`
- Fonts: `fontFamily: "'Plus Jakarta Sans', sans-serif"` on headings via inline style

### Custom CSS Classes (index.css)
- `.glass` / `.glass-dark` — glassmorphism
- `.gradient-text` / `.gradient-text-amber` — gradient text fill
- `.card-hover` — translateY(-5px) on hover
- `.animate-float`, `.animate-fade-up`, `.animate-slide-left`, `.animate-pulse-glow`
- `.hero-gradient` — landing page background

---

## Commission Structure

| Level | Rate |
|---|---|
| Level 1 (direct) | 65% → ₦3,250 |
| Level 2 | 15% → ₦750 |
| Level 3 | 5% → ₦250 |
| Level 4 | 3% → ₦150 |
| Level 5 | 2% → ₦100 |
| Level 6 | 1% → ₦50 |

Subscription price: **₦5,000/month**

---

## Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (Vite)
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

---

## Key Conventions

1. **Inline styles for brand colors** — Tailwind doesn't know our custom colors, so use `style={{ color: '#F5820A' }}` for precise brand values alongside Tailwind utility classes.
2. **No Tailwind config file** — Tailwind CSS v4 uses the `@tailwindcss/vite` plugin directly; config is not needed for basic usage.
3. **TypeScript strict mode** — All types in `src/types/index.ts`. Avoid `any`.
4. **Context API only** — No Redux. Keep global state minimal.
5. **Mock data during dev** — `src/data/mockData.ts` provides seed data. Replace with real API calls when backend is ready.
6. **Lucide icons** — Use Lucide React for all iconography. Standard sizes: 16, 18, 20, 24px.
7. **Plus Jakarta Sans via inline style** — Always set `fontFamily: "'Plus Jakarta Sans', sans-serif"` on headings `h1`/`h2` that need the brand font, as Tailwind v4 doesn't have it configured.

---

## Relationship with Selliberation-Admin

The `Selliberation-Admin` project (`../Selliberation-Admin`) is a **standalone** Vite app with:
- Identical stack and styling conventions
- Routes start at `/` (not `/admin`)
- Admin-only auth context (no student/user pages)
- Intended to be deployed separately

When adding features to admin pages in this project, mirror the same changes in `Selliberation-Admin` for consistency.

---

## TODO / Future Backend Integration

- [ ] Replace `AuthContext` mock login with real API (JWT)
- [ ] Replace `mockData.ts` with API calls
- [ ] Add Paystack webhook handler
- [ ] Real course video hosting (YouTube embeds or Cloudflare Stream)
- [ ] Email notification system
