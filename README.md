# 🗓️ Wall Calendar — Interactive Monthly Planner

A production-grade, fully interactive **wall calendar** React component built with Next.js, TypeScript, and Tailwind CSS. Inspired by a physical wall calendar aesthetic — spiral wire bindings, hero imagery, blue chevron dividers — translated into a responsive, touch-friendly web experience.


https://youtu.be/ZsueBL28FcA

https://github.com/user-attachments/assets/e7b9e654-83b6-49ec-b52e-c44e48c29fb3



---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Wire binding, hero landscape image, diagonal chevron divider, card shadow
- **Day Range Selector** — Click to select start → end dates with live hover preview. Clear visual states for start, end, and in-between days
- **Integrated Notes** — Per-month notes with ruled-line textarea, persisted in `localStorage`
- **Fully Responsive** — Desktop (side-by-side notes + grid), tablet, and mobile (stacked vertical) layouts down to 320px

### Stand-Out Extras
- **Page-flip animation** — CSS `perspective` + `rotateY` when navigating months
- **Holiday markers** — Blue dot indicators for US public holidays (e.g. Memorial Day, Independence Day)
- **Print stylesheet** — `@media print` CSS for ink-friendly output
- **Keyboard navigation** — `Escape` clears range; `Enter`/`Space` selects days
- **Full accessibility** — `aria-label` on all interactive elements, `role="button"` on day cells

---

## 🏗️ Architecture

```
src/components/WallCalendar/
├── index.tsx                  # Public barrel export
├── WallCalendar.tsx           # Root orchestrator — owns all state
├── WallCalendar.module.css    # Bespoke CSS (ruled lines, shadows, flip, print)
├── holidays.ts                # Static US public holidays map
├── CalendarHeader/
│   ├── CalendarHeader.tsx     # Wire binding SVG with metallic gradient
│   └── HeroImage.tsx          # next/image with gradient overlay
├── CalendarDivider/
│   └── ChevronDivider.tsx     # SVG chevron + year/month label + nav arrows
├── CalendarGrid/
│   ├── CalendarGrid.tsx       # 6-row × 7-col grid renderer
│   ├── DayCell.tsx            # Individual cell (7 visual states)
│   └── WeekdayHeader.tsx      # MON–SUN header row
├── NotesPanel/
│   ├── NotesPanel.tsx         # Ruled-lines textarea
│   └── useNotes.ts            # localStorage persistence per month
└── hooks/
    ├── useCalendar.ts         # Month navigation + day generation (Monday-first)
    └── useDateRange.ts        # useReducer-based range selection with hover
```

### Key Design Decisions

1. **State management** — `useReducer` for the range selector (handles SELECT/HOVER/CLEAR actions cleanly), `useState` for calendar navigation, and a custom `useNotes` hook wrapping `localStorage` with SSR guards.

2. **Styling approach** — Tailwind CSS for layout and utility classes combined with CSS Modules for bespoke styles that require non-utility CSS (ruled-line gradients, perspective animation, clip-paths). This avoids fighting Tailwind for complex visual effects.

3. **Date logic** — `date-fns` with `weekStartsOn: 1` for Monday-first grids. The `useCalendar` hook generates a 42-day (6×7) array ensuring consistent grid height regardless of month.

4. **Visual fidelity** — The diagonal chevron is a pure SVG with three polygon layers (shadow, accent, highlight) rather than CSS clip-path, giving precise control over the two-tone aesthetic from the reference image.

5. **Accessibility** — All interactive day cells have `role="button"`, `tabIndex`, keyboard event handlers, and descriptive `aria-label` including holiday names when applicable.

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

### Additional Dependencies

Beyond the Next.js defaults, the following packages are used:

```bash
npm install date-fns lucide-react clsx
```

| Package | Purpose |
|---------|---------|
| `date-fns` | Date arithmetic, formatting, Monday-first week generation |
| `lucide-react` | Chevron navigation icons |
| `clsx` | Conditional className composition |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| ≥ 768px (Desktop) | Notes panel fixed-width on left, date grid fills right |
| < 768px (Mobile) | Stacked vertically: Hero → Chevron → Notes → Grid |
| 320px (Min) | All elements remain aligned, no overflow |

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

The component replicates a **physical wall calendar** aesthetic while adding modern interactivity. The metallic wire binding SVG with gradient fills grounds the UI in the tangible world, while the blue chevron divider uses a multi-layered SVG polygon approach to achieve the precise two-tone diagonal from the reference image. Day cells maintain 7 distinct visual states (default, today, range-start, range-end, in-range, hover-range, overflow/weekend) using `clsx` for clean className derivation. The ruled-line notes panel uses a `repeating-linear-gradient` CSS background to emulate notebook paper, and the page-flip animation (`rotateY`) on month navigation adds a micro-interaction reinforcing the physical calendar metaphor.

---

