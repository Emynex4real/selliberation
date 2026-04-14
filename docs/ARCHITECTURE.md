# Architecture — Selliberation (Main App)

## Overview

Selliberation is a **Single Page Application (SPA)** built with React + Vite. It serves three audiences on one domain:

1. **Public visitors** — Landing page, pricing, login, register
2. **Members** — User dashboard: courses, referrals, earnings, withdrawals
3. **Admins** — Admin panel: user management, commissions, withdrawals, settings

The admin panel (`/admin/*`) is also mirrored as a standalone project in `../Selliberation-Admin` for independent deployment.

---

## Folder Architecture

```
Selliberation/
├── src/
│   ├── assets/             # Static images (hero.png, etc.)
│   ├── components/
│   │   ├── Layout.tsx      # User dashboard shell (sidebar + header + <Outlet>)
│   │   └── AdminLayout.tsx # Admin panel shell
│   ├── context/
│   │   └── AuthContext.tsx # Global auth state (localStorage)
│   ├── data/
│   │   └── mockData.ts     # Seed data for dev (commissions, referrals, etc.)
│   ├── pages/
│   │   ├── Landing.tsx     # Public homepage
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── dashboard/      # Protected user pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── CourseDetail.tsx
│   │   │   ├── Referrals.tsx
│   │   │   ├── Earnings.tsx
│   │   │   ├── Withdraw.tsx
│   │   │   └── Settings.tsx
│   │   └── admin/          # Admin-only pages
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminUsers.tsx
│   │       ├── AdminCourses.tsx
│   │       ├── AdminCommissions.tsx
│   │       ├── AdminWithdrawals.tsx
│   │       └── AdminSettings.tsx
│   ├── types/
│   │   └── index.ts        # All shared TypeScript interfaces
│   ├── App.tsx             # Router + route guards
│   ├── main.tsx            # React DOM mount
│   └── index.css           # Tailwind + custom CSS
├── public/                 # favicon.svg, icons.svg
├── docs/                   # Documentation
├── CLAUDE.md               # Claude Code context
├── index.html              # HTML entry + Google Fonts
├── package.json
├── vite.config.ts
├── tsconfig.json / app / node
├── eslint.config.js
└── vercel.json
```

---

## Routing Architecture

```
/                     → Landing.tsx        (public)
/login                → Login.tsx          (public)
/register             → Register.tsx       (public)
/pricing              → Landing.tsx        (alias)

/dashboard            → Layout.tsx (ProtectedRoute)
  /dashboard          → Dashboard.tsx
  /dashboard/courses  → Courses.tsx
  /dashboard/courses/:courseSlug → CourseDetail.tsx
  /dashboard/referrals → Referrals.tsx
  /dashboard/earnings  → Earnings.tsx
  /dashboard/withdraw  → Withdraw.tsx
  /dashboard/settings  → Settings.tsx

/admin                → AdminLayout.tsx (AdminRoute)
  /admin              → AdminDashboard.tsx
  /admin/users        → AdminUsers.tsx
  /admin/courses      → AdminCourses.tsx
  /admin/commissions  → AdminCommissions.tsx
  /admin/withdrawals  → AdminWithdrawals.tsx
  /admin/settings     → AdminSettings.tsx
```

### Route Guards
- **ProtectedRoute** — redirects to `/login` if not authenticated
- **AdminRoute** — redirects to `/login` if no user, `/dashboard` if not admin role

---

## Auth & State

`AuthContext` provides:
- `user` — current User object or null
- `isAuthenticated` — boolean
- `isTrialActive` — boolean (trial && days > 0)
- `trialDaysLeft` — number
- `login()` / `register()` / `logout()` / `updateUser()`

State is persisted to `localStorage` under key `selliberation_user`.

---

## Data Flow (Current — Mock)

```
Component
  └── useState (local)
        └── mockData.ts (hardcoded arrays)
```

---

## Data Flow (Future — Backend)

```
Component
  └── useEffect → fetch('/api/...')
        └── real API (Node.js / Django / etc.)
              └── Database (PostgreSQL)
```

---

## Commission System

6-level MLM structure. When User B subscribes (₦5,000/month), commissions flow up:

```
Level 1 (direct referrer): 65% = ₦3,250
Level 2:  15% = ₦750
Level 3:   5% = ₦250
Level 4:   3% = ₦150
Level 5:   2% = ₦100
Level 6:   1% = ₦50
         ──────────────
Total:    91% = ₦4,550  (platform keeps ₦450)
```

Status flow: `pending → withdrawable → withdrawn`

Commissions become `withdrawable` after a delay (e.g., 7 days after payment confirmation).

---

## Layouts

### User Dashboard (Layout.tsx)
- Left sidebar: 264px, dark navy, stage badges, trial countdown
- Top header: 60px, white/95 glass, notifications, avatar
- Main: scrollable, max-w-7xl, light gray bg

### Admin Panel (AdminLayout.tsx)
- Left sidebar: 256px, darker navy gradient
- Top header: 60px, minimal (just title + avatar)
- Main: scrollable, max-w-7xl, same gray bg

---

## Deployment

Vercel with `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

This ensures all client-side routes work when navigating directly (deep linking).
