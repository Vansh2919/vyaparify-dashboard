# Vyaparify Merchant Dashboard

Modern, fully functional merchant management dashboard for small businesses.

## Features

### Screens (all working)
- **Login** — Demo auth (any valid email + 6+ char password)
- **Dashboard** — Stats, sales chart, top products widget, recent orders, quick actions, notifications
- **Products** — Listing, search, category filters, add, edit, delete
- **Orders** — Full list with status filters and search
- **Customers** — Customer directory with spend & order history
- **Enquiries** — Lead inbox with mark replied / close actions
- **Settings** — Store profile, visibility toggle, completion widget
- **Mobile responsive** — Collapsible sidebar, stacked layouts

### Design
- Unique shopping-bag logo mark
- Warm coral accent + premium dark sidebar
- Layered shadows, hover lifts, gradient buttons
- Snitch/Myntra-inspired badges & modern typography (Space Grotesk + Inter)
- Loading skeletons, empty states, error states with retry

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173).

## Demo login

- Email: any valid email (e.g. `merchant@store.com`)
- Password: any 6+ characters

## Tech

- React 18 + Vite
- React Router v6
- Custom CSS design system (tokens, no framework lock-in)
- SVG icons + custom sales chart
