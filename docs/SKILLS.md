# Skills & Capabilities — Selliberation

This document describes how to approach common development tasks in this project.

---

## Adding a New Dashboard Page

1. Create `src/pages/dashboard/PageName.tsx`
2. Import and add route in `App.tsx`:
   ```tsx
   import PageName from './pages/dashboard/PageName';
   // ...
   <Route path="page-name" element={<PageName />} />
   ```
3. Add nav link in `Layout.tsx` `NAV_ITEMS` array
4. Use this page template:
   ```tsx
   export default function PageName() {
     return (
       <div className="space-y-6">
         <div>
           <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
           <p className="text-gray-500">Subtitle</p>
         </div>
       </div>
     );
   }
   ```

---

## Adding a New Admin Page

1. Create `src/pages/admin/AdminPageName.tsx`
2. Import and add route inside the `/admin` block in `App.tsx`
3. Add to `NAV_ITEMS` in `AdminLayout.tsx`
4. Mirror the same change in `../Selliberation-Admin/src/pages/`

---

## Using Brand Colors

Always use inline styles for brand-specific colors. Tailwind's built-in `orange-500` ≠ `#F5820A`:

```tsx
// ✅
<button style={{ background: '#F5820A' }}>CTA</button>
<span style={{ color: '#1CB957' }}>₦3,250</span>

// ❌ Not our brand colors
<button className="bg-orange-500">CTA</button>
```

---

## Handling Auth State

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isTrialActive, trialDaysLeft } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return <div>Hello {user?.name}</div>;
}
```

---

## Adding Mock Data

Add to `src/data/mockData.ts`. Keep mock data clearly marked — it will be replaced by real API calls.

---

## TypeScript Types

All shared types are in `src/types/index.ts`:
- `User` — platform users
- `Course`, `Module`, `SubModule`, `Video` — content hierarchy
- `Commission` — referral commission record
- `Withdrawal` — payout request
- `ReferralNode` — tree structure for referral visualization

To add a new type:
```tsx
// src/types/index.ts
export interface NewType {
  id: string;
  // ...
}
```

---

## Trial System

The trial system is computed from:
```tsx
const trialEnds = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
const trialDaysLeft = Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
const isTrialActive = user?.subscriptionStatus === 'trial' && trialDaysLeft > 0;
```

The sidebar shows a countdown timer. Trial users can access free course modules only.

---

## Deploying

```bash
npm run build    # Creates dist/
```

Push to GitHub → Vercel auto-deploys. `vercel.json` handles SPA routing.
