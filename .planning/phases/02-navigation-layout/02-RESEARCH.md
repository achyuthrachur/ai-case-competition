# Phase 2: Navigation & Layout - Research

**Researched:** 2026-03-03
**Domain:** Next.js 15 App Router navigation — persistent navbar, client-side routing, mobile responsive layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Navbar Background**
- Dark indigo brand bar — use `--crowe-indigo-dark` (#011E41) as navbar background
- Text and icons in soft white (`#f6f7fa`) — matches CLAUDE.md `--color-text-inverse`

**Active State Indicator**
- Amber underline/bottom border on the active nav link — `--crowe-amber-core` (#F5A800)
- Text color shifts to amber on active; inactive links are soft white at reduced opacity (~70%)
- Thin 2px bottom border on active link (not a filled pill — keeps navbar clean)

**Mobile Menu Behavior**
- Dropdown slidedown — menu expands vertically below the fixed navbar bar
- Full-width panel in the same dark indigo background, links stacked vertically
- Hamburger icon toggles open/closed; tapping a link closes the menu
- No overlay or drawer — simpler implementation, consistent with the fixed-bar approach

**Sticky / Position**
- Fixed to top (`position: fixed; top: 0`) — always visible while scrolling
- Page content gets `padding-top` equal to navbar height (e.g., `pt-16`) to avoid overlap

**Wordmark Treatment**
- Text only: "Meridian Financial — AI Case Competition" in soft white
- Small font size (text-sm or text-base), slightly bold — clean, not a large logo treatment
- Clickable — links to `/` (home)

**Root Layout Structure**
- Root layout adds `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` content wrapper
- Navbar itself is full-width (not constrained by container)

**Icon Style**
- Iconsax `Linear` variant for inactive links
- Iconsax `Bold` variant for active link
- Icon color inherits from link text color

**Nav Links (locked)**
- Home → Iconsax `Home`
- Instructions → Iconsax `Document`
- Rubric → Iconsax `Judge`
- Downloads → Iconsax `FolderOpen`
- Submit → Iconsax `Send`

### Claude's Discretion
- Exact transition/animation for mobile menu open/close
- Precise navbar height (likely 60–64px)
- Whether to add a subtle bottom border or shadow on the navbar for depth
- Hamburger icon choice (Iconsax `HambergerMenu` or similar)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Persistent top navbar with "Meridian Financial — AI Case Competition" wordmark (left) and nav links (right) | Root layout integration pattern; `position: fixed` + full-width; `<nav>` element with flex layout |
| NAV-02 | Nav links: Home, Instructions, Rubric, Downloads, Submit — each with an Iconsax icon (Home, Document, Judge, FolderOpen, Send) | All 5 icon names confirmed present in installed iconsax-react@0.0.8; variant prop accepts `"Linear"` / `"Bold"` |
| NAV-03 | Active tab highlighted based on current route | `usePathname()` from `next/navigation` in a `'use client'` component; exact pathname match; amber 2px border-b + text-crowe-amber |
| NAV-04 | Mobile hamburger menu collapses nav links on small screens | `useState` toggle; Tailwind `md:hidden` / `md:flex`; `HambergerMenu` / `CloseCircle` Iconsax icons; dropdown panel same bg-crowe-indigo-dark |
</phase_requirements>

---

## Summary

This phase builds a single `Navbar.tsx` client component and integrates it into `src/app/layout.tsx`. The technical domain is well-understood: Next.js 15 App Router with React 19, Tailwind CSS 3, and iconsax-react. All key decisions are locked from CONTEXT.md, reducing research scope to confirming APIs, finding the correct iconsax variant prop syntax, and establishing the exact file structure.

The stack is already installed and verified: `iconsax-react@0.0.8` is in `node_modules` and exports all 6 required icon names (`Home`, `Document`, `Judge`, `FolderOpen`, `Send`, `HambergerMenu`) as confirmed by direct inspection. `usePathname()` from `next/navigation` is the standard Next.js 15 pattern for active-route detection in client components. The `cn()` utility from `src/lib/utils.ts` is available for conditional class composition.

The phase also requires stubbing 4 empty route pages (`/instructions`, `/rubric`, `/downloads`, `/submit`) so the active state logic can be demonstrated. These are minimal `page.tsx` files — no content required in this phase.

**Primary recommendation:** Build Navbar.tsx as a single `'use client'` component using `usePathname` for active detection, Tailwind `md:hidden`/`md:flex` for responsive breakpoint, and `useState` for mobile menu toggle. Place in `src/components/layout/Navbar.tsx`. Integrate into layout.tsx with a `pt-16` spacer on the content wrapper. Create 4 stub route pages.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 15.5.12 (installed) | File-based routing, layout system | The project's framework; `layout.tsx` is the integration point |
| React | 19.1.0 (installed) | Component model, hooks (`useState`) | Project framework |
| `next/navigation` `usePathname` | Built into Next.js 15 | Returns current URL pathname for active state | Official App Router client-side routing hook |
| Tailwind CSS | 3.4.19 (installed) | Responsive utilities (`md:hidden`, `md:flex`), Crowe color tokens | Project styling system with brand tokens confirmed in tailwind.config.ts |
| iconsax-react | 0.0.8 (installed) | Iconsax icon components | Locked by REQUIREMENTS.md and CONTEXT.md; all 6 needed icons verified present |
| `cn()` from `@/lib/utils` | Built-in | Conditional class merging (clsx + tailwind-merge) | Already established pattern in the codebase |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `useState` (React) | 19.1.0 | Mobile menu open/close toggle | Client component state for hamburger toggle |
| `Link` from `next/link` | Built into Next.js 15 | Client-side navigation without full page reload | All nav links and wordmark |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `usePathname` | Manual `window.location.pathname` | `usePathname` is SSR-safe and reactive — always prefer it in App Router |
| Plain `<button>` for hamburger | shadcn `Button` component | Plain `<button>` is simpler for this use case; shadcn Button carries styling baggage that would need overriding |
| Tailwind responsive classes | CSS media queries | Tailwind utilities are already the project convention and produce less code |
| Slidedown dropdown | Drawer (sheet) | Locked decision: dropdown, not drawer — simpler, matches fixed-bar approach |

**No additional installation required.** All needed libraries are already installed.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Integrate Navbar here; add content wrapper
│   ├── page.tsx                # Home — already exists
│   ├── instructions/
│   │   └── page.tsx            # Stub: empty page so /instructions route exists
│   ├── rubric/
│   │   └── page.tsx            # Stub: empty page so /rubric route exists
│   ├── downloads/
│   │   └── page.tsx            # Stub: empty page so /downloads route exists
│   └── submit/
│       └── page.tsx            # Stub: empty page so /submit route exists
└── components/
    └── layout/
        └── Navbar.tsx          # The navbar component (new directory)
```

### Pattern 1: Client Component with `usePathname` Active Detection

**What:** The Navbar must read the current URL to highlight the active link. In Next.js App Router, this requires a `'use client'` directive because `usePathname` is a client-side hook.

**When to use:** Any time a component in the App Router needs to respond to client-side navigation state.

**Example:**

```typescript
// Source: Next.js 15 official docs — https://nextjs.org/docs/app/api-reference/functions/use-pathname
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Active detection: exact match for /, prefix match for sub-routes
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}
```

**Critical:** The `'use client'` directive must be at the top of the file. The parent `layout.tsx` can remain a Server Component — it just renders the `<Navbar />` client component as a child. This is the standard App Router pattern: Server Component layout delegates to Client Component for interactive parts.

### Pattern 2: Navbar Integration in Root Layout

**What:** `layout.tsx` adds the Navbar above `{children}` and wraps content in a constrained container.

**When to use:** Global persistent UI that appears on every route.

**Example:**

```typescript
// src/app/layout.tsx
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-page"
        style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif" }}
      >
        <Navbar />
        {/* pt-16 compensates for fixed navbar height (64px) */}
        <div className="pt-16">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

**Note on `pt-16`:** Tailwind's `pt-16` = 64px. If the navbar height is set to `h-16` (64px), this compensates exactly. If navbar is `h-15` (60px), use `pt-[60px]`. Prefer `h-16`/`pt-16` for cleaner Tailwind token alignment.

### Pattern 3: Mobile Menu with useState Toggle

**What:** A boolean state drives the mobile menu visibility. Hamburger icon swaps with Close icon.

**When to use:** Simple show/hide mobile navigation without external state management overhead.

**Example:**

```typescript
'use client';
import { useState } from 'react';
import { HambergerMenu, CloseCircle } from 'iconsax-react';

const [mobileOpen, setMobileOpen] = useState(false);

// Toggle button (md:hidden — only shows on mobile)
<button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="md:hidden p-2 text-[#f6f7fa] hover:text-crowe-amber transition-colors"
  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={mobileOpen}
>
  {mobileOpen
    ? <CloseCircle size={24} variant="Bold" />
    : <HambergerMenu size={24} variant="Bold" />
  }
</button>

// Mobile dropdown panel — below the navbar bar
{mobileOpen && (
  <div className="md:hidden bg-crowe-indigo-dark border-t border-white/10">
    {/* stacked nav links — onClick closes menu */}
  </div>
)}
```

### Pattern 4: Iconsax Icon Usage with Variant

**What:** Iconsax icons accept `variant`, `size`, and `color` props. The `variant` prop is a string enum.

**Confirmed prop API** (verified from installed package metadata):

```typescript
import { Home, Document, Judge, FolderOpen, Send, HambergerMenu } from 'iconsax-react';

// Linear (inactive state)
<Home variant="Linear" size={20} />

// Bold (active state)
<Home variant="Bold" size={20} />

// Color inherits from parent text color by using "currentColor" (default behavior)
// Or pass explicit color:
<Home variant="Bold" size={20} color="#F5A800" />
```

**Confirmed available variants** (from meta-data.json): `"Bold"`, `"Broken"`, `"Bulk"`, `"Linear"`, `"Outline"`, `"TwoTone"`

### Pattern 5: Active State with Amber 2px Bottom Border

**What:** The locked design uses `border-b-2 border-crowe-amber` + `text-crowe-amber` on the active link.

**Example:**

```typescript
// cn() toggles classes conditionally
<Link
  href={href}
  className={cn(
    // Base styles — all links
    'flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors duration-150',
    // Inactive
    'text-[#f6f7fa]/70 hover:text-[#f6f7fa] border-b-2 border-transparent',
    // Active overrides
    active && 'text-crowe-amber border-b-2 border-crowe-amber'
  )}
>
  <Icon variant={active ? 'Bold' : 'Linear'} size={18} />
  {label}
</Link>
```

**Note:** The `border-b-2` is always present on the link element (defaulting to `border-transparent`) so the layout doesn't shift when the border activates. This is the standard "stable border" pattern.

### Anti-Patterns to Avoid

- **Using `window.location.pathname`:** Not reactive to client-side navigation; breaks in SSR; always use `usePathname()` instead
- **Making the whole layout a client component:** `layout.tsx` should remain a Server Component; only `Navbar.tsx` needs `'use client'`
- **Not adding `pt-16` to content:** Fixed navbar will overlap page content without this compensation
- **Using `useRouter().pathname`:** Removed in App Router — `usePathname()` is the correct API in Next.js 13+
- **Hardcoding amber as `#F5A800` inline styles:** Use Tailwind utility `text-crowe-amber` and `border-crowe-amber` — they're already configured in tailwind.config.ts
- **Forgetting `aria-label` and `aria-expanded` on the hamburger button:** Required for accessibility (WCAG 2.1 AA per CLAUDE.md)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Active route detection | Custom `useEffect` + `window.location` listener | `usePathname()` from `next/navigation` | Reactive to client-side navigation, SSR-safe, no flickering |
| Class composition with conditions | String concatenation / template literals | `cn()` from `@/lib/utils` | Already handles Tailwind class merging + deduplication correctly |
| Nav icons | SVG hand-coded or custom icon components | `iconsax-react` named exports | 993 icons already installed, tree-shakeable, variant system built-in |
| Client-side navigation | `<a href="...">` tags | `next/link` `<Link>` | Prevents full page reload, handles prefetching, SPA behavior |

**Key insight:** Every primitive needed here is already installed and configured. This phase is pure composition — wiring together existing tools with locked design decisions.

---

## Common Pitfalls

### Pitfall 1: Navbar Appears Under Page Content on Scroll

**What goes wrong:** Fixed navbar renders but page content starts at top-0, so the first 64px of content are hidden behind the navbar when users scroll.

**Why it happens:** `position: fixed` removes the element from document flow — the remaining content acts as if the navbar doesn't exist.

**How to avoid:** Add `pt-16` (or `pt-[60px]` if using 60px height) to the content wrapper in `layout.tsx`, not to individual pages.

**Warning signs:** Hero content on home page starts behind navbar; first nav link appears above viewport on desktop.

### Pitfall 2: `usePathname` Returns `null` on Server

**What goes wrong:** TypeScript error or runtime error because `usePathname()` returns `null | string` in some Next.js versions during SSR.

**Why it happens:** The hook is client-only but may be called before hydration in edge cases.

**How to avoid:** Add `'use client'` directive to Navbar.tsx. Guard with `pathname ?? '/'` if needed. With `'use client'` properly set, Next.js ensures the component only runs on the client.

**Warning signs:** TypeScript error `Type 'null' is not assignable to type 'string'` when calling `isActive(pathname, ...)`.

### Pitfall 3: Mobile Menu Does Not Close on Link Click

**What goes wrong:** User taps a nav link on mobile, navigates to the new page, but the mobile dropdown stays open.

**Why it happens:** `useState` persists across client-side navigation in Next.js 15; the component doesn't remount on route change.

**How to avoid:** Add `onClick={() => setMobileOpen(false)}` to every nav link in the mobile menu. Alternatively, add a `useEffect` watching `pathname` to close the menu on route change:

```typescript
useEffect(() => {
  setMobileOpen(false);
}, [pathname]);
```

**Warning signs:** Mobile menu stays open after clicking a link.

### Pitfall 4: Navbar Tailwind Classes Not Found

**What goes wrong:** `bg-crowe-indigo-dark`, `text-crowe-amber`, `border-crowe-amber` produce no styles.

**Why it happens:** The Tailwind content scanner must include `Navbar.tsx`. The current config scans `./src/**/*.{ts,tsx}` — placing Navbar.tsx in `src/components/layout/Navbar.tsx` is within scope. No change to tailwind.config.ts needed.

**Warning signs:** Navbar renders but shows incorrect colors (fallback browser defaults).

### Pitfall 5: Iconsax `variant` Prop Casing Sensitivity

**What goes wrong:** Passing `variant="linear"` (lowercase) produces no icon or TypeScript error.

**Why it happens:** The iconsax-react variant prop is a string with specific casing — must be `"Linear"`, not `"linear"`.

**How to avoid:** Use the exact strings: `"Bold"`, `"Linear"`, `"Broken"`, `"Bulk"`, `"Outline"`, `"TwoTone"`. Consider a typed constant:

```typescript
type IconVariant = 'Bold' | 'Linear' | 'Broken' | 'Bulk' | 'Outline' | 'TwoTone';
```

**Warning signs:** Icon renders but appears wrong style, or TypeScript error on variant prop.

### Pitfall 6: `HambergerMenu` Typo (Confirmed Intentional)

**What goes wrong:** Developer types `HamburgerMenu` and gets "not exported" error.

**Why it happens:** The iconsax-react package has a known typo in the icon name — it is `HambergerMenu` (missing 'u'), not `HamburgerMenu`.

**How to avoid:** Import exactly as: `import { HambergerMenu } from 'iconsax-react';` — confirmed via direct package inspection on this machine.

---

## Code Examples

Verified patterns for this phase:

### Complete Navbar Component Skeleton

```typescript
// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Document,
  Judge,
  FolderOpen,
  Send,
  HambergerMenu,
  CloseCircle,
} from 'iconsax-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ variant: string; size: number; color?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/instructions', label: 'Instructions', Icon: Document },
  { href: '/rubric', label: 'Rubric', Icon: Judge },
  { href: '/downloads', label: 'Downloads', Icon: FolderOpen },
  { href: '/submit', label: 'Submit', Icon: Send },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-crowe-indigo-dark">
      {/* Inner: full-width flex row */}
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark — left */}
        <Link
          href="/"
          className="text-sm font-semibold text-[#f6f7fa] hover:text-crowe-amber transition-colors duration-150 truncate max-w-[240px] sm:max-w-none"
        >
          Meridian Financial — AI Case Competition
        </Link>

        {/* Desktop nav links — right, hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = isActive(pathname ?? '/', href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors duration-150 border-b-2',
                    active
                      ? 'text-crowe-amber border-crowe-amber'
                      : 'text-[#f6f7fa]/70 border-transparent hover:text-[#f6f7fa]'
                  )}
                >
                  <Icon variant={active ? 'Bold' : 'Linear'} size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#f6f7fa] hover:text-crowe-amber transition-colors duration-150"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen
            ? <CloseCircle variant="Bold" size={24} />
            : <HambergerMenu variant="Bold" size={24} />
          }
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-crowe-indigo-dark border-t border-white/10"
        >
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map(({ href, label, Icon }) => {
              const active = isActive(pathname ?? '/', href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-150',
                      active
                        ? 'text-crowe-amber'
                        : 'text-[#f6f7fa]/70 hover:text-[#f6f7fa]'
                    )}
                  >
                    <Icon variant={active ? 'Bold' : 'Linear'} size={20} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
```

### Updated layout.tsx

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Meridian Financial — AI Case Competition',
  description: 'Competition portal for the Meridian Financial AI Case Competition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-page"
        style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif" }}
      >
        <Navbar />
        <div className="pt-16">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

### Stub Page Template (for 4 empty routes)

```typescript
// src/app/instructions/page.tsx (repeat for /rubric, /downloads, /submit)
export default function InstructionsPage() {
  return (
    <div className="py-16">
      <h1 className="text-3xl font-bold text-crowe-indigo-dark">Instructions</h1>
      <p className="mt-4 text-tint-700">Content coming in a future phase.</p>
    </div>
  );
}
```

### Iconsax Import Verification

```typescript
// All imports confirmed available in iconsax-react@0.0.8
import {
  Home,          // ✅ confirmed
  Document,      // ✅ confirmed
  Judge,         // ✅ confirmed
  FolderOpen,    // ✅ confirmed
  Send,          // ✅ confirmed
  HambergerMenu, // ✅ confirmed (note: typo is intentional — "Hamberger" not "Hamburger")
  CloseCircle,   // ✅ confirmed — for mobile menu close state
} from 'iconsax-react';
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useRouter().pathname` (Pages Router) | `usePathname()` from `next/navigation` (App Router) | Next.js 13 | Different import, no router object needed |
| Default exports for components | Named exports | Project convention (CLAUDE.md 4.3) | All components use `export function`, not `export default function` |
| Class-based components | Functional components + hooks | React 16.8+ | All new components are functional |

**Deprecated/outdated:**
- `useRouter` from `next/router`: Pages Router only — do NOT use in App Router. Use `usePathname` from `next/navigation`
- `export default` for components: Project convention requires named exports per CLAUDE.md Section 4.3

---

## Open Questions

1. **Exact navbar height: 60px or 64px?**
   - What we know: CONTEXT.md says "likely 60–64px" (discretion area); `h-16` = 64px in Tailwind
   - What's unclear: Whether 60px (`h-[60px]`) provides better visual proportion
   - Recommendation: Use `h-16` (64px / Tailwind standard token) — `pt-16` then compensates exactly without custom values

2. **Shadow or border on navbar bottom edge?**
   - What we know: Discretion area in CONTEXT.md; CLAUDE.md prefers shadows over borders
   - What's unclear: Whether a subtle separator is needed between dark navbar and lighter content
   - Recommendation: Add `shadow-crowe-md` to the navbar — provides depth cue without a hard border line, consistent with CLAUDE.md anti-pattern guidance

3. **Mobile menu animation?**
   - What we know: Discretion area; no animation library specified for this phase
   - What's unclear: Whether to add a CSS transition or keep it instant toggle
   - Recommendation: Use a simple CSS `transition` on max-height or opacity via Tailwind `transition-all duration-200` — no Anime.js or Framer Motion needed for this simple toggle; keeps implementation minimal

---

## Validation Architecture

> nyquist_validation is `true` in .planning/config.json — validation section included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no vitest.config.*, jest.config.*, or test scripts in package.json |
| Config file | None — Wave 0 must create vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` (after Wave 0 setup) |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar renders with wordmark text | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-01 | Navbar is fixed to top (has `fixed` in className) | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-02 | All 5 nav links render with correct labels | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-02 | Iconsax icons render for each nav item | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-03 | Active link has amber class when pathname matches | unit (mock usePathname) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-04 | Mobile menu hidden by default on load | unit (render) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-04 | Mobile menu shows after hamburger click | unit (interaction) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |
| NAV-04 | Mobile menu closes after nav link click | unit (interaction) | `npx vitest run src/__tests__/Navbar.test.tsx` | ❌ Wave 0 |

**Note on NAV-03 test approach:** `usePathname` must be mocked in tests. With Vitest + React Testing Library, mock `next/navigation`:

```typescript
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/instructions'),
}));
```

### Sampling Rate

- **Per task commit:** `npx vitest run src/__tests__/Navbar.test.tsx` (single file, < 10s)
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/__tests__/Navbar.test.tsx` — covers NAV-01, NAV-02, NAV-03, NAV-04
- [ ] `vitest.config.ts` — Vitest config with jsdom environment
- [ ] `src/__tests__/setup.ts` — Testing Library setup (extend-expect)
- [ ] Framework install: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`

---

## Sources

### Primary (HIGH confidence)

- Next.js 15 official docs — `usePathname` API reference; App Router layout patterns; confirmed behavior from installed package v15.5.12
- Direct package inspection — `iconsax-react@0.0.8` node_modules: all 6 icon names confirmed via `require()` + `Object.keys()`; variant list confirmed from `meta-data.json`
- Project source files — `tailwind.config.ts`, `layout.tsx`, `globals.css`, `utils.ts` read directly from project

### Secondary (MEDIUM confidence)

- React 19 docs — `useState`, `useEffect` hooks (stable, no changes in this version affect navbar patterns)
- Tailwind CSS 3.4 docs — responsive prefix behavior (`md:hidden`, `md:flex`); confirmed v3.4.19 installed

### Tertiary (LOW confidence)

- None — all findings for this phase are HIGH or MEDIUM from direct source inspection

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in node_modules with direct inspection
- Architecture: HIGH — Next.js App Router patterns are stable and well-documented; `usePathname` is the canonical approach
- Pitfalls: HIGH — most pitfalls verified by direct package inspection (typo in HambergerMenu, variant casing) or are well-known Next.js App Router migration issues
- Test setup: MEDIUM — Vitest + React Testing Library is the project's specified stack (CLAUDE.md) but nothing is installed yet; pattern is standard

**Research date:** 2026-03-03
**Valid until:** 2026-09-03 (stable libraries — Next.js, Tailwind, iconsax version pinned in package.json)
