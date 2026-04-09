# 🗓️ Wall Calendar — Interactive Monthly Planner

A production-grade, fully interactive **wall calendar** React component built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Inspired by a physical wall calendar aesthetic — spiral wire bindings, hero imagery, blue chevron dividers — translated into a responsive, touch-friendly web experience with smooth animations.


https://youtu.be/ZsueBL28FcA

https://github.com/user-attachments/assets/e7b9e654-83b6-49ec-b52e-c44e48c29fb3


## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Wire binding SVG, hero landscape image, diagonal chevron divider, card shadow
- **Day Range Selector** — Click to select start → end dates with live hover preview. 7 distinct visual states (default, today, range-start, range-end, in-range, hover-preview, overflow)
- **Integrated Notes** — Per-month notes with ruled-line textarea, persisted in `localStorage`
- **Fully Responsive** — Desktop (side-by-side notes + grid), tablet, and mobile (stacked vertical with collapsible notes) layouts down to 320px

### Animations (Framer Motion)
- **Mount animation** — Calendar fades in + slides up on initial load
- **Month transitions** — Direction-aware horizontal slide via `AnimatePresence` (slides left going forward, right going back)
- **Day cell micro-interactions** — Spring-based hover scale-up (1.08×) and tap scale-down (0.92×)
- **Navigation buttons** — Spring hover/tap animations on chevron arrows
- **Month label transition** — Vertical slide-out/slide-in on month change with `AnimatePresence mode="wait"`
- **Status bar** — Animated height reveal/hide when selecting dates
- **Notes accordion (mobile)** — Smooth height + opacity expand/collapse with chevron icon rotation
- **Holiday dots** — Spring-in animation with stagger delay
- **Clear button** — Scale + tint on hover/tap

### Stand-Out Extras
- **Holiday markers** — Blue dot indicators for 15 US public holidays (Memorial Day, Independence Day, etc.)
- **Print stylesheet** — `@media print` CSS for ink-friendly output
- **Keyboard navigation** — `Escape` clears range; `Enter`/`Space` selects days
- **Full accessibility** — `aria-label` on all interactive elements, `role="button"` on day cells, `aria-expanded` on mobile notes toggle

---

## 🏗️ Architecture

```
src/components/WallCalendar/
├── index.tsx                  # Public barrel export
├── WallCalendar.tsx           # Root orchestrator — state, AnimatePresence
├── WallCalendar.module.css    # CSS Modules (ruled lines, card, layout, print)
├── holidays.ts                # Static US public holidays map
├── CalendarHeader/
│   ├── CalendarHeader.tsx     # Wire binding SVG with metallic gradient
│   └── HeroImage.tsx          # next/image with gradient overlay + fade-in
├── CalendarDivider/
│   └── ChevronDivider.tsx     # SVG chevron + fixed-width label + nav arrows
├── CalendarGrid/
│   ├── CalendarGrid.tsx       # 6-row × 7-col grid renderer
│   ├── DayCell.tsx            # Individual cell (7 visual states, spring hover/tap)
│   └── WeekdayHeader.tsx      # MON–SUN header row
├── NotesPanel/
│   ├── NotesPanel.tsx         # Ruled-lines textarea + mobile accordion
│   └── useNotes.ts            # localStorage persistence (SSR-guarded)
└── hooks/
    ├── useCalendar.ts         # Month navigation + 42-day grid generation
    └── useDateRange.ts        # useReducer-based range selection with hover
```

### Key Design Decisions

1. **Framer Motion** — Used for all animations instead of raw CSS transitions. Provides spring physics, `AnimatePresence` for mount/unmount animations, and `whileHover`/`whileTap` for micro-interactions.

2. **Fixed-width month label** — The chevron divider uses a fixed-width container (`w-[110px]` / `w-[130px]` / `w-[140px]` responsive) with centered text, so navigation arrows stay symmetrically positioned regardless of month name length (e.g. "MAY" vs "SEPTEMBER").

3. **State management** — `useReducer` for the range selector (handles SELECT/HOVER/CLEAR actions), `useState` for calendar navigation, and a custom `useNotes` hook wrapping `localStorage` with SSR guards.

4. **Styling approach** — Tailwind CSS for layout and utilities combined with CSS Modules for bespoke styles (ruled-line gradients, responsive layout breakpoints, print). This avoids fighting Tailwind for complex visual effects.

5. **Date logic** — `date-fns` with `weekStartsOn: 1` for Monday-first grids. The `useCalendar` hook generates a 42-day (6×7) array using `addDays()` to ensure consistent grid height regardless of month.

6. **Mobile notes accordion** — Separate desktop (always visible) and mobile (toggleable) textareas to avoid layout flicker, with `AnimatePresence` for smooth height transitions.

7. **Accessibility** — All interactive day cells have `role="button"`, `tabIndex`, keyboard event handlers, and descriptive `aria-label` including holiday names.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone <your-repo-url>
cd wall-calendar

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Dependencies

Beyond the Next.js defaults, the following packages are used:

```bash
npm install date-fns lucide-react clsx framer-motion
```

| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | ^4.1.0 | Date arithmetic, formatting, Monday-first week generation |
| `framer-motion` | ^12.38.0 | Animations — mount transitions, `AnimatePresence`, spring physics |
| `lucide-react` | ^1.7.0 | Chevron navigation icons, ChevronDown for mobile notes toggle |
| `clsx` | ^2.1.1 | Conditional className composition |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout | Notes Behavior |
|------------|--------|----------------|
| ≥ 768px (Desktop) | Side-by-side: notes panel (left) + date grid (right) | Always visible |
| < 768px (Mobile) | Stacked: Hero → Chevron → Notes → Grid | Collapsible accordion with animated toggle |
| 320px (Min) | All elements remain aligned, no overflow | Collapsed by default |

### Mobile-Specific Optimizations
- **Collapsible notes panel** — Hidden by default, expand with animated ChevronDown toggle
- **Taller touch targets** — Day cells are `h-10`/`h-11` on mobile (vs `h-10` on desktop)
- **Reduced hero height** — `h-44` on mobile vs `h-72` on desktop
- **Smaller chevron divider** — `h-14` on mobile vs `h-20` on desktop
- **CSS Module media queries** — Explicit `@media` breakpoints for layout, borders, and padding

---

## 🧪 Usage

```tsx
import { WallCalendar } from '@/components/WallCalendar';

export default function Page() {
  return (
    <WallCalendar
      accentColor="#1A7CC4"
      clearRangeOnMonthChange={false}
      onRangeChange={(start, end) => console.log('Range:', start, end)}
      onNotesChange={(notes, year, month) => console.log('Notes:', notes)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialDate` | `Date` | `new Date()` | Initial month to display |
| `heroSrc` | `string` | Unsplash landscape | Override hero image URL |
| `accentColor` | `string` | `'#1A7CC4'` | Accent colour hex |
| `onRangeChange` | `(start, end) => void` | — | Callback when range is committed |
| `onNotesChange` | `(notes, year, month) => void` | — | Callback when notes change |
| `clearRangeOnMonthChange` | `boolean` | `false` | Clear selection on month nav |
| `locale` | `string` | `'en-US'` | Locale for date formatting |

---

## 🎨 Design Rationale

The component replicates a **physical wall calendar** while adding modern interactivity. The metallic wire binding SVG with gradient fills grounds the UI in the tangible world. The blue chevron divider uses a multi-layered SVG polygon approach (shadow, accent, highlight) to achieve a precise two-tone diagonal. Day cells maintain 7 distinct visual states using `clsx` for clean className derivation, enhanced with Framer Motion spring physics for tactile hover/tap feedback. The ruled-line notes panel uses a `repeating-linear-gradient` CSS background to emulate notebook paper. Month navigation uses `AnimatePresence` with direction-aware slide variants for a natural page-turning feel, replacing the original CSS `rotateY` approach with physics-based motion.

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.2.2 | App Router, `next/image`, `next/font` |
| React | 19.2.4 | UI framework |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| Framer Motion | ^12.38.0 | Animations and transitions |
| date-fns | ^4.1.0 | Date logic |
| lucide-react | ^1.7.0 | Icons |
| clsx | ^2.1.1 | Class composition |

---
