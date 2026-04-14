# Design System — Selliberation

This document covers the visual design language used across the Selliberation platform. The admin panel (`../Selliberation-Admin`) shares these exact same conventions.

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Navy | `#0D2847`, `#0F2942` | Sidebar, dark backgrounds |
| Sidebar BG | `#08192E → #050F1C` | Sidebar gradient |
| Orange | `#FF7A00`, `#F5820A` | CTAs, active states, highlights |
| Green | `#1CB957` | Success, earnings, active subscriptions |
| Page BG | `#F0F2F5` | Dashboard background |
| Page BG Light | `#F9FAFB` | Lighter variant |
| Text Primary | `#111827` | Body text |
| Text Secondary | `#6B7280` | `text-gray-500` |

### Level Colors (Referral Stages)
| Level | Text | Background |
|---|---|---|
| 1 | `#1CB957` | `#F0FDF4` |
| 2 | `#F5820A` | `#FEF3E8` |
| 3 | `#0D2847` | `#E8F0F8` |
| 4 | `#EF4444` | `#FFF0F0` |

---

## Typography

### Font Families
- **Headings:** `'Plus Jakarta Sans', sans-serif` — weights 400, 500, 600, 700, 800
- **Body/UI:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

Both loaded from Google Fonts in `index.html`.

### Applying Plus Jakarta Sans
In Tailwind CSS v4 with no config file, apply the heading font via inline style:
```tsx
<h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Title</h1>
```
Or use the global CSS rule in `index.css`:
```css
h1, h2, h3, h4, h5, h6 { font-family: 'Plus Jakarta Sans', sans-serif; }
```

---

## Layout — User Dashboard (Layout.tsx)

### Sidebar
- Width: 264px (`w-64` + 8px for border)
- Background: `linear-gradient(180deg, #0D2847 0%, #050F1C 100%)`
- Stage badges, trial countdown, referral code

### Active Nav Item
```tsx
style={({ isActive }) => isActive
  ? { background: 'rgba(28,185,87,0.15)', color: '#1CB957', borderLeft: '3px solid #1CB957' }
  : { color: 'rgba(255,255,255,0.6)' }
}
```
_(Note: user dashboard uses green; admin uses orange)_

---

## Layout — Admin Panel (AdminLayout.tsx)

### Active Nav Item
```tsx
style={({ isActive }) => isActive
  ? { background: 'rgba(245,130,10,0.15)', color: '#F5820A', borderLeft: '3px solid #F5820A' }
  : { color: 'rgba(255,255,255,0.6)' }
}
```

---

## Custom CSS Classes (index.css)

| Class | Effect |
|---|---|
| `.glass` | White glassmorphism (70% + blur) |
| `.glass-dark` | Navy glassmorphism (80% + blur) |
| `.gradient-text` | Navy → green gradient text |
| `.gradient-text-amber` | Amber → red gradient text |
| `.hero-gradient` | Landing page bg gradient |
| `.card-hover` | `translateY(-5px)` + shadow on hover |
| `.earning-bar` | Width transition for progress bars |
| `.whatsapp-btn` | Fixed WhatsApp FAB button |
| `.animate-float` | Float loop (4s) |
| `.animate-fade-up` | Fade from below (0.6s) |
| `.animate-slide-left` | Slide from left (0.6s) |
| `.animate-pulse-glow` | Green glow pulse (2s) |

---

## Component Patterns

### Cards
```tsx
<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
```

### Buttons
```tsx
// Primary (orange)
<button className="text-white px-5 py-2.5 rounded-xl font-semibold"
  style={{ background: '#F5820A', boxShadow: '0 4px 20px rgba(245,130,10,0.4)' }}>
  Action
</button>

// Secondary/Ghost
<button className="border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-gray-50">
  Cancel
</button>

// Green (success)
<button className="bg-green-500 text-white px-5 py-2.5 rounded-xl hover:bg-green-600">
  Confirm
</button>
```

### Inputs
```tsx
<input
  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
/>
```

### Status Badges
```tsx
<span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
<span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Trial</span>
<span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Expired</span>
```

---

## Spacing Tokens

| Use | Value |
|---|---|
| Page padding | `p-4 md:p-6` |
| Card padding | `p-5` or `p-6` |
| Section gap | `space-y-6` |
| Grid gap | `gap-4` or `gap-6` |
| Border radius (default) | `rounded-xl` (12px) |
| Border radius (modal) | `rounded-2xl` (16px) |
| Border radius (avatar) | `rounded-full` |

---

## Icons

All icons from **Lucide React**. Standard sizes:
- `size={14}` — tiny inline badges
- `size={16}` — table action buttons
- `size={18}` — nav icons, small buttons
- `size={20}` — headers, stat icons
- `size={24}` — feature icons, hero elements
