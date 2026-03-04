# Phase 3: Home Page - Research

**Researched:** 2026-03-04
**Domain:** Next.js 15 App Router page composition, GSAP BlurText, Iconsax React, Tailwind CSS hover tokens
**Confidence:** HIGH — all findings verified directly from project source files; no third-party lookup required

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section**
- Background: Dark indigo (`bg-crowe-indigo-dark`, #011E41) — full-width band
- Height: ~50vh (`min-h-[50vh]`)
- Alignment: `flex items-center justify-center text-center`
- Decorative element: Amber accent bar below headline — `w-16 h-1 bg-crowe-amber rounded-full mx-auto`
- Text colors: Headline `text-[#f6f7fa]`, blurb `text-[#f6f7fa]/80`

**BlurText Animation**
- `animateBy="words"`, `direction="top"`, `delay={0.25}` (seconds per word)
- Blurb fades in via CSS opacity after `onAnimationComplete` sets state (`transition-opacity duration-300`)
- Blurb starts at `opacity-0`, transitions to `opacity-100`

**Quick-Link Cards**
- Icon + title + short 1-line description per card
- Descriptions: Instructions → "Read the case brief and rules", Rubric → "See how your work will be scored", Downloads → "Get the dataset and reference files", Submit → "Upload your dashboard and memo"
- Layout: `grid-cols-4` desktop, `sm:grid-cols-2` tablet, `grid-cols-1` mobile
- Hover: `hover:-translate-y-1` + `hover:shadow-amber-glow` (existing Tailwind token)
- Icons: 48px Iconsax Bold variant in `text-crowe-indigo-dark`, no background circle
- Card: `bg-white shadow-crowe-card rounded-xl`
- Section background: `bg-page` (warm off-white)
- Icons per card: Instructions → `Document`, Rubric → `Judge`, Downloads → `FolderOpen`, Submit → `Send`

**Key Dates Section**
- Full-width amber-wash background: `bg-[#fff8eb]`
- Two entries: "Competition Opens" + "TBD", "Submission Deadline" + "TBD"
- Each entry: `Iconsax Calendar (Linear)` + label + value
- Layout: `flex gap-12 justify-center` desktop, stacked mobile
- Optional heading "Key Dates" in `text-crowe-indigo-dark`

**Page Structure (top to bottom)**
1. Hero — dark indigo, ~50vh, BlurText headline + amber bar + fading blurb
2. Cards section — `bg-page`, `py-16`, 4-across grid
3. Key dates section — `bg-[#fff8eb]`, `py-12`, 2 date entries

**Blurb text (locked):** "You've been given access to a transaction dataset from Meridian Financial. Your challenge: use AI tools to build a dashboard that surfaces anomalies, uncovers patterns, and tells a story about what's happening in these accounts."

### Claude's Discretion
- Exact padding/spacing within sections (follow CLAUDE.md 8px grid)
- Card transition duration for hover (likely `transition-all duration-200`)
- Whether to add a subtle section divider or rely on background color change between sections
- Exact font sizes for card title vs description (use Tailwind type scale from CLAUDE.md)
- Whether the section heading "Key Dates" is `text-xl` or `text-2xl`

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Full-width hero section with React Bits animated text effect on headline "Meridian Financial — AI Case Competition" | BlurText component already in project at `src/components/ui/blur-text.tsx`; uses GSAP; `onAnimationComplete` fires with no arguments (void callback) |
| HOME-02 | 1–2 sentence competition blurb below the headline | Triggered by `onAnimationComplete` state pattern; CSS `transition-opacity duration-300` sufficient; no extra library needed |
| HOME-03 | 4 quick-link cards (21st.dev style) for Instructions, Rubric, Downloads, Submit — each with an Iconsax icon | All icons already imported in Navbar.tsx (Document, Judge, FolderOpen, Send); `variant` prop is the correct iconsax-react API; all 4 stub routes confirmed present |
| HOME-04 | Key dates section with placeholder values | Calendar icon from iconsax-react; amber-wash bg via inline style or Tailwind arbitrary value |
</phase_requirements>

---

## Summary

Phase 3 replaces the 10-line stub `src/app/page.tsx` with a three-section landing page: dark-indigo hero with animated headline, warm off-white quick-link card grid, and amber-wash key dates strip. All tooling is already installed and battle-tested in earlier phases — GSAP (BlurText), iconsax-react, Tailwind custom tokens. No new dependencies are needed.

The single most important technical finding is how `onAnimationComplete` works in the existing BlurText component: it receives **no arguments** (it is called as `onAnimationComplete()` inside GSAP's `onComplete` hook). The callback is simply `() => void`. The correct pattern for showing the blurb is `useState<boolean>` initialized to `false`, set to `true` inside the callback, and consumed as a Tailwind class toggle on the blurb `<p>`.

The layout constraint that requires care is the root layout wrapper: `layout.tsx` wraps `children` in `<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`. Hero and key dates sections need to **escape** this constrained width to be full-width bands. The correct technique is a negative-margin breakout (`-mx-4 sm:-mx-6 lg:-mx-8`) applied to each full-width section, combined with their own inner `max-w-7xl mx-auto px-4` for the content inside.

**Primary recommendation:** Write the entire page as a single `'use client'` component (state needed for blurb fade), with three visually distinct `<section>` tags. Use Tailwind classes exclusively — no inline styles except the amber-wash color which has no Tailwind token (`bg-[#fff8eb]`). Wrap each quick-link card in a Next.js `<Link>` block element; this is fully valid in Next.js 13+ App Router.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| GSAP | 3.14.2 | Powers BlurText word-by-word animation | Already installed, BlurText already uses it |
| iconsax-react | 0.0.8 | Card and calendar icons | Already installed, already used in Navbar |
| next/link | (Next.js 15.5.12) | Card navigation wrappers | Already used in Navbar; App Router supports block-level Link |
| Tailwind CSS | 3.4.19 | All layout, hover tokens, color tokens | Already configured with brand tokens |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React `useState` | (React 19.1.0) | Blurb visibility toggle | Needed once for `showBlurb` boolean |
| `cn()` from `@/lib/utils` | — | Conditional class merging | Use for opacity class toggle on blurb |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS opacity toggle | Framer Motion AnimatePresence | CSS is sufficient; Framer Motion adds bundle weight for a simple fade |
| Tailwind `bg-[#fff8eb]` | `bg-section-amber` | `section-amber` is in `backgroundColor` extend but NOT `colors` — Tailwind utilities from `backgroundColor` extend are `bg-section-amber`; confirm works at build time |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Component Structure

```
src/app/page.tsx          ← single 'use client' file, three <section> tags
```

No sub-components needed. The page is self-contained and short enough for a single file. Splitting into sub-components would add indirection with no benefit for this scale.

### Pattern 1: Full-Width Section Breakout from Constrained Layout

**What:** `layout.tsx` constrains children to `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Hero and key dates need to span the full viewport width.

**When to use:** Any section that needs a colored band spanning the full browser width inside a constrained layout wrapper.

**How it works:** Apply negative margins equal to the layout padding, then add the page-wide background color to the section element. Inner content gets its own `max-w-7xl mx-auto px-4` container.

```tsx
// Source: verified from layout.tsx (px-4 sm:px-6 lg:px-8 are the layout padding values)
<section className="bg-crowe-indigo-dark -mx-4 sm:-mx-6 lg:-mx-8 min-h-[50vh] flex items-center justify-center text-center py-16">
  <div className="max-w-4xl mx-auto px-4">
    {/* hero content */}
  </div>
</section>
```

**Alternative to negative margins:** The page could add `className="overflow-x-hidden"` to the outer `<main>` — but that can cause subtle layout bugs on mobile. Negative margins are more reliable.

### Pattern 2: BlurText onAnimationComplete — Blurb Fade-In

**What:** `onAnimationComplete` in `blur-text.tsx` is typed as `() => void` and called directly as `onComplete: onAnimationComplete` inside the GSAP tween. It receives **no arguments**. Use a `useState<boolean>` toggle.

**Verified from source:** `blur-text.tsx` line 64: `onComplete: onAnimationComplete`

```tsx
// Source: verified from src/components/ui/blur-text.tsx
'use client';

import { useState } from 'react';
import { BlurText } from '@/components/ui/blur-text';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [blurbVisible, setBlurbVisible] = useState(false);

  return (
    <section className="bg-crowe-indigo-dark ...">
      <div>
        <BlurText
          text="Meridian Financial — AI Case Competition"
          animateBy="words"
          direction="top"
          delay={250}   // ← delay prop is in MILLISECONDS (divided by 1000 inside component)
          onAnimationComplete={() => setBlurbVisible(true)}
          className="text-3xl font-bold text-[#f6f7fa]"
        />
        {/* Amber accent bar */}
        <div className="w-16 h-1 bg-crowe-amber rounded-full mx-auto my-4" />
        {/* Blurb — starts invisible, fades in after animation */}
        <p
          className={cn(
            'text-[#f6f7fa]/80 text-lg max-w-2xl mx-auto transition-opacity duration-300',
            blurbVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          You&apos;ve been given access to a transaction dataset from Meridian Financial.
          Your challenge: use AI tools to build a dashboard that surfaces anomalies,
          uncovers patterns, and tells a story about what&apos;s happening in these accounts.
        </p>
      </div>
    </section>
  );
}
```

**CRITICAL: `delay` unit is milliseconds, not seconds.** The CONTEXT.md says `delay={0.25}` (seconds), but the BlurText component divides `delay` by 1000 internally (`stagger: delay / 1000`). Passing `0.25` means `0.25 / 1000 = 0.00025s` stagger — all words appear instantly. The correct value to achieve 0.25 seconds per word is `delay={250}`.

### Pattern 3: Iconsax Bold Variant via `variant` Prop

**What:** Iconsax-react uses a single `variant` prop on each icon component (not separate Bold/Linear component imports). This is confirmed by the existing Navbar.tsx implementation.

**Verified from source:** `Navbar.tsx` line 74: `<Icon variant={active ? 'Bold' : 'Linear'} size={18} />`

```tsx
// Source: verified from src/components/layout/Navbar.tsx
import { Document, Judge, FolderOpen, Send, Calendar } from 'iconsax-react';

// Bold for prominent card icons (48px)
<Document variant="Bold" size={48} className="text-crowe-indigo-dark" />

// Linear for secondary calendar icons
<Calendar variant="Linear" size={24} className="text-crowe-indigo-dark" />
```

**Note on `color` prop vs `className`:** Iconsax-react accepts both `color="..."` (string) and uses `currentColor` by default. Setting `className="text-crowe-indigo-dark"` on the icon works because iconsax renders SVG with `currentColor` — the Tailwind text color class controls the SVG fill. This matches the Navbar pattern.

### Pattern 4: Next.js `<Link>` as Block Card Wrapper

**What:** In Next.js 13+ App Router, `<Link>` renders as a `<a>` tag. It can wrap block-level content including entire card `<div>` elements. This is the standard pattern for card navigation.

**Verified from source:** `Navbar.tsx` uses `<Link>` as a block flex container. App Router documentation confirms `<Link>` renders as `<a>` natively.

```tsx
// Correct — Link wrapping a card div
import Link from 'next/link';

<Link
  href="/instructions"
  className="block group"  // 'group' enables group-hover Tailwind utilities if needed
>
  <div className="bg-white shadow-crowe-card rounded-xl p-6 hover:-translate-y-1 hover:shadow-amber-glow transition-all duration-200">
    <Document variant="Bold" size={48} className="text-crowe-indigo-dark mb-4" />
    <h3 className="text-lg font-semibold text-crowe-indigo-dark">Instructions</h3>
    <p className="text-sm text-tint-700 mt-1">Read the case brief and rules</p>
  </div>
</Link>
```

**Caveats:**
- Add `className="block"` to `<Link>` so it doesn't default to inline display (which would collapse the card height)
- Do not nest interactive elements (buttons, links) inside the `<Link>` card — a violation of HTML spec; these cards have no nested interactive content so this is fine

### Pattern 5: Amber-Glow Hover Token

**What:** The `shadow-amber-glow` Tailwind class is defined in `tailwind.config.ts` under `theme.extend.boxShadow`.

**Verified from source:** `tailwind.config.ts` line 41: `'amber-glow': '0 4px 16px rgba(245,168,0,0.20)'`

Correct Tailwind class: `hover:shadow-amber-glow`

Combined hover effect for cards:
```
hover:-translate-y-1 hover:shadow-amber-glow transition-all duration-200
```

For `transform` to work, the element must not be `display: inline`. Cards are block divs, so no issue.

### Pattern 6: Key Dates Amber-Wash Section

**What:** The amber-wash background `#fff8eb` exists in `tailwind.config.ts` under `backgroundColor` extend as `section-amber`. Use `bg-section-amber` OR the arbitrary value `bg-[#fff8eb]`.

**Verified from source:** `tailwind.config.ts` line 47: `'section-amber': '#fff8eb'` — under `backgroundColor` extend.

**Important:** `section-amber` is defined under `theme.extend.backgroundColor`, NOT `theme.extend.colors`. Tailwind v3 generates `bg-section-amber` from `backgroundColor` extensions. Use `bg-section-amber` (not `bg-crowe-section-amber`).

```tsx
<section className="bg-section-amber -mx-4 sm:-mx-6 lg:-mx-8 py-12">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-xl font-semibold text-crowe-indigo-dark text-center mb-8">
      Key Dates
    </h2>
    <div className="flex flex-col sm:flex-row gap-12 justify-center">
      {/* Date entry */}
      <div className="flex items-center gap-3">
        <Calendar variant="Linear" size={24} className="text-crowe-indigo-dark flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-crowe-indigo-dark">Competition Opens</p>
          <p className="text-sm text-tint-700">TBD</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar variant="Linear" size={24} className="text-crowe-indigo-dark flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-crowe-indigo-dark">Submission Deadline</p>
          <p className="text-sm text-tint-700">TBD</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Anti-Patterns to Avoid

- **Passing `delay={0.25}` to BlurText:** The component divides `delay` by 1000 — pass milliseconds (`delay={250}`) for 0.25s per word
- **Using `bg-crowe-indigo-dark` on the hero section without the breakout:** Layout constrains width; hero must use negative margins
- **Not adding `block` to the `<Link>` card wrapper:** Inline `<a>` won't size correctly as a card
- **Using `bg-page` for the amber-wash section:** `bg-page` is `#f8f9fc`, not amber — use `bg-section-amber` or `bg-[#fff8eb]`
- **Adding `'use client'` only to a sub-component while the parent is a Server Component:** BlurText requires `'use client'` because it uses `useRef`/`useEffect`, AND the parent `page.tsx` uses `useState` — the entire page must be `'use client'`
- **Relying on `hasAnimated` ref guard in BlurText to handle StrictMode double-invoke:** The `hasAnimated` ref (line 39 of blur-text.tsx) already guards against double-animation in React 18+ StrictMode. No workaround needed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Word-by-word blur animation | Custom CSS keyframe animation | `BlurText` component (already in project) | Already GSAP-powered, tested in Phase 1 smoke test, handles spacing with `\u00A0` between words |
| Icon system | SVG files or icon font | `iconsax-react` (already installed) | Tree-shakeable, `variant` prop switches Bold/Linear without reimporting |
| Shadow hover glow | Custom inline style on hover | `hover:shadow-amber-glow` Tailwind class | Token already defined in `tailwind.config.ts`; Tailwind handles the CSS |
| CSS class merging | Manual string concatenation | `cn()` from `@/lib/utils` | Already imported pattern; handles Tailwind conflict resolution |

---

## Common Pitfalls

### Pitfall 1: `delay` Prop Unit Confusion
**What goes wrong:** Passing `delay={0.25}` (seconds, as documented in CONTEXT.md) makes all words appear simultaneously with a 0.00025-second stagger.
**Why it happens:** BlurText accepts the prop in milliseconds and divides by 1000 internally: `stagger: delay / 1000`. The CONTEXT.md describes the visual result ("0.25 seconds per word") but the prop value must be `250`.
**How to avoid:** Use `delay={250}` — verified from `blur-text.tsx` line 62: `stagger: delay / 1000`.
**Warning signs:** All headline words appear at once with no visible stagger effect.

### Pitfall 2: Hero Section Constrained by Layout Width
**What goes wrong:** The hero section background doesn't extend to the viewport edges — it only fills the `max-w-7xl` content area.
**Why it happens:** `layout.tsx` wraps `<main>` with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. All children inherit this constraint unless they break out.
**How to avoid:** Apply `-mx-4 sm:-mx-6 lg:-mx-8` to each full-width section to counteract the layout padding.
**Warning signs:** Hero section has visible gaps on its left and right sides even on large viewports.

### Pitfall 3: `onAnimationComplete` Called Twice (StrictMode)
**What goes wrong:** In React 18+ StrictMode, effects run twice in development. The `hasAnimated` ref in BlurText prevents the GSAP tween from running twice, but `onAnimationComplete` (which becomes the GSAP `onComplete` callback) is only registered once per GSAP tween. This is safe — `setBlurbVisible(true)` called twice is idempotent.
**How to avoid:** No action needed. `setState` to the same value is a no-op in React 18+.

### Pitfall 4: `Calendar` Icon Not Exported from iconsax-react
**What goes wrong:** `Calendar` import fails at build time.
**Why it happens:** Iconsax-react 0.0.8 has a specific set of exported names. The Navbar tests mock only the icons used there. `Calendar` is not tested yet.
**How to avoid:** Verify the import: `import { Calendar } from 'iconsax-react'`. The iconsax app at https://app.iconsax.io confirms `Calendar` exists, and iconsax-react 0.0.8 includes it. However, if it fails, use `CalendarTick` or `CalendarSearch` as alternatives.
**Warning signs:** `Module '"iconsax-react"' has no exported member 'Calendar'` TypeScript error.

### Pitfall 5: Blurb `opacity-0` Causes Cumulative Layout Shift
**What goes wrong:** The blurb text occupies layout space from the initial render (opacity 0 is invisible but not `display: none`). This is actually the desired behavior — it prevents a layout jump when the blurb appears.
**How to avoid:** Do NOT use `display: none` / conditional rendering for the blurb. Keep it rendered at `opacity-0` from the start so layout is stable. This is the correct pattern per the CONTEXT.md decision.

### Pitfall 6: Test Mock for BlurText + GSAP
**What goes wrong:** Vitest tests for the home page fail because GSAP tries to manipulate DOM elements in a jsdom environment, throwing errors.
**Why it happens:** GSAP's DOM manipulation APIs are not compatible with jsdom.
**How to avoid:** Mock BlurText in tests: `vi.mock('@/components/ui/blur-text', () => ({ BlurText: ({ text, onAnimationComplete }) => <span onClick={onAnimationComplete}>{text}</span> }))`. This allows testing that the blurb appears after the animation completes by simulating a click.

---

## Code Examples

### Complete Home Page Structure

```tsx
// Source: synthesized from verified project files
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Document, Judge, FolderOpen, Send, Calendar } from 'iconsax-react';
import { BlurText } from '@/components/ui/blur-text';
import { cn } from '@/lib/utils';

const CARDS = [
  {
    href: '/instructions',
    Icon: Document,
    title: 'Instructions',
    description: 'Read the case brief and rules',
  },
  {
    href: '/rubric',
    Icon: Judge,
    title: 'Rubric',
    description: 'See how your work will be scored',
  },
  {
    href: '/downloads',
    Icon: FolderOpen,
    title: 'Downloads',
    description: 'Get the dataset and reference files',
  },
  {
    href: '/submit',
    Icon: Send,
    title: 'Submit',
    description: 'Upload your dashboard and memo',
  },
] as const;

export default function HomePage() {
  const [blurbVisible, setBlurbVisible] = useState(false);

  return (
    <>
      {/* 1. HERO — full-width dark indigo band */}
      <section className="bg-crowe-indigo-dark -mx-4 sm:-mx-6 lg:-mx-8 min-h-[50vh] flex items-center justify-center text-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <BlurText
            text="Meridian Financial — AI Case Competition"
            animateBy="words"
            direction="top"
            delay={250}
            onAnimationComplete={() => setBlurbVisible(true)}
            className="text-3xl sm:text-4xl font-bold text-[#f6f7fa] leading-tight"
          />
          <div className="w-16 h-1 bg-crowe-amber rounded-full mx-auto my-6" />
          <p
            className={cn(
              'text-[#f6f7fa]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-opacity duration-300',
              blurbVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            You&apos;ve been given access to a transaction dataset from Meridian Financial.
            Your challenge: use AI tools to build a dashboard that surfaces anomalies,
            uncovers patterns, and tells a story about what&apos;s happening in these accounts.
          </p>
        </div>
      </section>

      {/* 2. QUICK-LINK CARDS — warm off-white section */}
      <section className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map(({ href, Icon, title, description }) => (
            <Link key={href} href={href} className="block group">
              <div className="bg-white shadow-crowe-card rounded-xl p-6 h-full hover:-translate-y-1 hover:shadow-amber-glow transition-all duration-200">
                <Icon variant="Bold" size={48} className="text-crowe-indigo-dark mb-4" />
                <h3 className="text-base font-semibold text-crowe-indigo-dark">{title}</h3>
                <p className="text-sm text-tint-700 mt-1 leading-snug">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. KEY DATES — amber-wash full-width band */}
      <section className="bg-section-amber -mx-4 sm:-mx-6 lg:-mx-8 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-crowe-indigo-dark mb-8">Key Dates</h2>
          <div className="flex flex-col sm:flex-row gap-10 justify-center">
            {[
              { label: 'Competition Opens', value: 'TBD' },
              { label: 'Submission Deadline', value: 'TBD' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Calendar variant="Linear" size={24} className="text-crowe-indigo-dark flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-crowe-indigo-dark">{label}</p>
                  <p className="text-sm text-tint-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

### Test Pattern for BlurText-Dependent State

```tsx
// Source: based on established Navbar.test.tsx pattern in project
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

// Mock BlurText to expose onAnimationComplete as onClick for testability
vi.mock('@/components/ui/blur-text', () => ({
  BlurText: ({
    text,
    onAnimationComplete,
    className,
  }: {
    text: string;
    onAnimationComplete?: () => void;
    className?: string;
  }) => (
    <span data-testid="blur-text" className={className} onClick={onAnimationComplete}>
      {text}
    </span>
  ),
}));

// Mock next/link (same pattern as Navbar.test.tsx)
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

// Mock iconsax-react (same pattern as Navbar.test.tsx)
vi.mock('iconsax-react', () => ({
  Document: () => <svg data-testid="icon-document" />,
  Judge: () => <svg data-testid="icon-judge" />,
  FolderOpen: () => <svg data-testid="icon-folder" />,
  Send: () => <svg data-testid="icon-send" />,
  Calendar: () => <svg data-testid="icon-calendar" />,
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the headline text', () => {
    render(<HomePage />);
    expect(screen.getByText(/Meridian Financial/)).toBeInTheDocument();
  });

  it('blurb is hidden before animation completes', () => {
    render(<HomePage />);
    const blurb = screen.getByText(/transaction dataset/);
    expect(blurb.className).toContain('opacity-0');
  });

  it('blurb becomes visible after onAnimationComplete fires', () => {
    render(<HomePage />);
    // Simulate animation completing by clicking the mocked BlurText
    fireEvent.click(screen.getByTestId('blur-text'));
    const blurb = screen.getByText(/transaction dataset/);
    expect(blurb.className).toContain('opacity-100');
  });

  it('renders all 4 quick-link cards with correct hrefs', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /Instructions/i })).toHaveAttribute('href', '/instructions');
    expect(screen.getByRole('link', { name: /Rubric/i })).toHaveAttribute('href', '/rubric');
    expect(screen.getByRole('link', { name: /Downloads/i })).toHaveAttribute('href', '/downloads');
    expect(screen.getByRole('link', { name: /Submit/i })).toHaveAttribute('href', '/submit');
  });

  it('renders key dates section with both entries', () => {
    render(<HomePage />);
    expect(screen.getByText('Competition Opens')).toBeInTheDocument();
    expect(screen.getByText('Submission Deadline')).toBeInTheDocument();
    expect(screen.getAllByText('TBD')).toHaveLength(2);
  });
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<a href="...">` for internal navigation | `next/link` `<Link>` | Next.js 13 | Prefetching, client-side navigation |
| Separate Bold/Linear icon component imports in some libraries | Single component + `variant` prop (iconsax-react) | iconsax-react 0.0.x | One import per icon, variant toggled at runtime |
| `animejs` for BlurText | GSAP (already installed project choice) | Phase 1 decision | GSAP's `stagger` and `fromTo` provide precise control |

**Deprecated/outdated in this project:**
- Default `page.tsx` export (no `'use client'`) — the current stub works as a Server Component but the new page needs `'use client'` for `useState`

---

## Open Questions

1. **`Calendar` export name in iconsax-react 0.0.8**
   - What we know: Navbar.test.tsx mocks `HambergerMenu`, `CloseCircle`, and 5 nav icons — `Calendar` has not been imported in this project yet
   - What's unclear: Whether `Calendar` is the exact export name vs `CalendarTick`, `CalendarSearch`, etc.
   - Recommendation: Attempt `import { Calendar } from 'iconsax-react'` first; TypeScript will fail immediately at dev server start if the name is wrong. Fallback candidates: `Calendar1`, `CalendarTick`. The iconsax-react 0.0.8 package is small enough to check with `node -e "const x = require('iconsax-react'); console.log(Object.keys(x).filter(k => k.includes('Calendar')))"`.

2. **`bg-section-amber` Tailwind class generation**
   - What we know: `tailwind.config.ts` defines `section-amber` under `theme.extend.backgroundColor` (not `colors`)
   - What's unclear: Whether Tailwind v3 generates `bg-section-amber` from `backgroundColor` extensions correctly in the JIT engine when used inside negative-margin breakout elements
   - Recommendation: Use `bg-[#fff8eb]` as the primary approach (arbitrary value, guaranteed to work). Add `bg-section-amber` as a comment note for future cleanup. Verify in `npm run build` output.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + React Testing Library 16.3.2 |
| Config file | `vitest.config.ts` (project root) |
| Quick run command | `npx vitest run src/__tests__/HomePage.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Hero renders headline text via BlurText | unit | `npx vitest run src/__tests__/HomePage.test.tsx` | Wave 0 |
| HOME-02 | Blurb hidden before animation, visible after `onAnimationComplete` | unit | `npx vitest run src/__tests__/HomePage.test.tsx` | Wave 0 |
| HOME-03 | 4 cards render with correct hrefs and icons | unit | `npx vitest run src/__tests__/HomePage.test.tsx` | Wave 0 |
| HOME-04 | Key dates section renders both date entries with TBD values | unit | `npx vitest run src/__tests__/HomePage.test.tsx` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/__tests__/HomePage.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/__tests__/HomePage.test.tsx` — covers HOME-01 through HOME-04 (full test code provided in Code Examples section above)

*(No framework gaps — Vitest, React Testing Library, jsdom, and setup.ts are all in place from Phase 2)*

---

## Sources

### Primary (HIGH confidence)
- `src/components/ui/blur-text.tsx` — BlurText props interface, delay unit, onAnimationComplete signature, hasAnimated guard
- `src/components/layout/Navbar.tsx` — iconsax-react `variant` prop API, `<Link>` block pattern, established icon imports
- `tailwind.config.ts` — `shadow-amber-glow` exact value, `bg-section-amber` token location, `bg-crowe-indigo-dark` token
- `src/app/layout.tsx` — layout padding values (`px-4 sm:px-6 lg:px-8`), `max-w-7xl` constraint, `pt-16` content offset
- `package.json` — GSAP 3.14.2 confirmed installed, iconsax-react 0.0.8 confirmed, no Framer Motion
- `vitest.config.ts` + `src/__tests__/setup.ts` + `src/__tests__/Navbar.test.tsx` — established test patterns (mocking next/link, next/navigation, iconsax-react, GSAP-dependent components)
- `.planning/config.json` — `nyquist_validation: true` confirmed

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` accumulated context — confirmed iconsax typo `HambergerMenu`, confirmed `border-b-2` layout trick, confirmed NODE_TLS_REJECT_UNAUTHORIZED=0 not needed for this phase (no registry calls)
- `.planning/phases/03-home-page/03-CONTEXT.md` — all implementation decisions verified present and internally consistent

### Tertiary (LOW confidence)
- `Calendar` icon export name from iconsax-react 0.0.8 — not yet verified in this project's codebase; fallback strategy documented in Open Questions

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified from package.json and existing source files
- Architecture: HIGH — breakout pattern, BlurText callback, iconsax variant prop all verified from source
- Pitfalls: HIGH — delay unit bug is a direct code read finding; layout constraint is from layout.tsx; test mock pattern is from Navbar.test.tsx
- `Calendar` icon name: LOW — not yet used in project, needs runtime verification

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable stack — all libraries pinned in package.json)
