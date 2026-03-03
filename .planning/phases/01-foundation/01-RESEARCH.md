# Phase 1: Foundation - Research

**Researched:** 2026-03-03
**Domain:** Next.js App Router scaffold, Tailwind CSS design system, shadcn/ui, React Bits, iconsax-react, environment setup
**Confidence:** MEDIUM-HIGH (key version ecosystem findings verified against multiple sources; React Bits install mechanics LOW — copy-paste model, no traditional npm package)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Next.js app scaffolded at the **repo root** (not a subdirectory)
- `create-next-app` runs in the current working directory with: `--typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- `--src-dir` in effect: source under `src/`; all app code under `src/app/`, `src/components/`, `src/lib/`, `src/styles/`
- **CLAUDE.md Section 8 takes precedence over AGENT_PLAN.md** on init flags
- Dependencies to install: `@vercel/blob react-dropzone iconsax-react` then `npx shadcn@latest init`
- React Bits: install per reactbits.dev (shadcn CLI pattern — verify package name at install time; NOT a traditional npm package)
- Do NOT install: animejs, framer-motion (replaced by React Bits per project decision)
- Design system: full Crowe palette from CLAUDE.md Section 2.2 in `tailwind.config.ts`
- shadcn/ui overrides: apply Crowe-themed `:root` variables from CLAUDE.md Section 4.2 in `globals.css`
- Page background: warm off-white `#f8f9fc` — NOT pure white, NOT dark-mode site-wide
- Hero/footer use `--crowe-indigo-dark` (`#011E41`) — dark sections, not dark theme
- Font strategy: **fallback stack only** — `Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif`
- Font CSS variables still created (display, body, mono) but pointing to fallback chain, not `.woff2` files
- `.env.local`: `BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here` (gitignored)
- `.env.example`: `BLOB_READ_WRITE_TOKEN=` (committed to repo)
- `.gitignore` must explicitly list `.env.local`
- shadcn primitives to install upfront: `button`, `input`, `card`, `badge`, `dialog`
- Code style: named exports, no `export default` for components; no `any` types; `interface` for objects, `type` for unions

### Claude's Discretion
- ESLint / Prettier config specifics
- Whether `src/app/` or `app/` (driven by `--src-dir` flag — confirmed as `src/app/`)
- Exact React Bits package name (verify at install time)
- Tailwind CSS version (pin to v3 for stability with Next.js unless v4 confirmed stable with chosen Next.js version)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js 14+ App Router project initialized with TypeScript, Tailwind CSS, and shadcn/ui | Version pinning strategy, Tailwind v3 vs v4 decision, shadcn init command |
| FOUND-02 | Dependencies installed: `react-dropzone`, `@vercel/blob`, `iconsax-react`, React Bits | React Bits install mechanics, iconsax-react SSR considerations, react-dropzone "use client" requirement |
| FOUND-03 | Crowe brand color tokens (Indigo + Amber palette) in `tailwind.config.ts` and `globals.css` | Full token set from CLAUDE.md, shadcn CSS variable format, Tailwind v3 extension pattern |
| FOUND-04 | Helvetica Now font via `next/font/local` (with fallback stack — no .woff2 available) | Fallback CSS variable pattern, font loading without actual font files |
| FOUND-05 | `.env.local` and `.env.example` present with `BLOB_READ_WRITE_TOKEN` | `.gitignore` pattern, env file placement at repo root |
</phase_requirements>

---

## Summary

This phase scaffolds a greenfield Next.js project at the repo root with a production-grade Crowe brand design system. The primary technical complexity is **version ecosystem management**: as of March 2026, `create-next-app@latest` installs Next.js 16 (not 14 or 15). Next.js 16 has significant breaking changes (async params/cookies/headers, Node 20.9+ requirement, removed AMP/next-lint). The REQUIREMENTS.md says "14+" which technically permits 15 or 16, but the phrase "Next.js 14+" was written before 16 existed. **The safest strategy is to pin to Next.js 15** using `npx create-next-app@15` which is stable, well-documented, React 19 compatible, and avoids Next.js 16's large number of breaking changes. Next.js 15 ships with Tailwind CSS v3 by default — also preferred for shadcn/ui stability.

The second complexity is React Bits: it is **not a traditional npm package**. It follows the shadcn/ui copy-paste model, installed component by component via `npx shadcn@latest add @react-bits/[Component]-TS-TW`. No `npm install react-bits` command exists. For Phase 1 (foundation only), React Bits components are not yet needed — they will be consumed in Phase 3 (Home Page) for the animated text effect. FOUND-02 requires React Bits be "importable" — meaning the CLI can be invoked and one test component can be added to prove the pattern works.

The third complexity is **Tailwind v3 vs v4 with shadcn**. The shadcn `@latest` CLI now defaults to Tailwind v4 configuration (OKLCH colors, no `tailwind.config.ts`, CSS-only config). However, the Crowe design system in CLAUDE.md is written entirely in Tailwind v3 syntax (`tailwind.config.ts` extend block, HSL variables). Use `npx shadcn@2.3.0 init` to stay on v3-compatible shadcn, which preserves the `tailwind.config.ts` pattern and HSL CSS variables from CLAUDE.md Section 4.2 verbatim.

**Primary recommendation:** Pin Next.js 15, Tailwind CSS v3, shadcn@2.3.0. Scaffold at repo root. Apply full CLAUDE.md design tokens. React Bits installed via shadcn CLI on a per-component basis — Phase 1 proof-of-pattern only.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (pin via `create-next-app@15`) | App Router framework | Stable, React 19, avoids Next.js 16 breaking changes. REQUIREMENTS "14+" satisfied. |
| React | 19.x (bundled with Next.js 15) | UI runtime | Ships with Next.js 15 |
| TypeScript | 5.x | Type safety | Required by CLAUDE.md, scaffolded by create-next-app |
| Tailwind CSS | v3.4.x (default from create-next-app@15) | Utility-first CSS | CLAUDE.md design tokens written in v3 syntax; v3 required for HSL variables + tailwind.config.ts pattern |
| shadcn/ui | 2.3.0 (pinned) | Radix UI primitives | v2.3.0 is last version before shadcn defaulted to Tailwind v4. Maintains tailwind.config.ts compatibility. |
| iconsax-react | latest (0.0.x range) | Icon library | Project spec; 1000 icons × 6 styles, tree-shakeable |
| react-dropzone | latest (14.x) | File drag-and-drop | Project spec; requires `"use client"` |
| @vercel/blob | latest | Blob storage client | Project spec; server-side only |

### Supporting (Phase 1 — installed but used later)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Bits | shadcn CLI pattern (no npm version) | Animated components | Consumed in Phase 3+ via `npx shadcn@latest add @react-bits/[Component]-TS-TW`. Phase 1: install one test component to verify pattern. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js 15 (pinned) | Next.js 16 (latest) | Next.js 16 breaks async params, removes AMP/next-lint, requires Node 20.9+. Unnecessary risk for this project. |
| Tailwind v3 | Tailwind v4 | v4 changes config format (no tailwind.config.ts), HSL → OKLCH, new CSS-only approach. Crowe design tokens in CLAUDE.md use v3 syntax exclusively. |
| shadcn@2.3.0 | shadcn@latest | Latest shadcn defaults to Tailwind v4 + OKLCH colors, breaking CLAUDE.md Section 4.2 HSL variable format. |
| fallback font stack | Helvetica Now .woff2 | Font files not available. CSS variables pointing to fallback ensure identical token structure; real fonts can be swapped in later. |

**Installation:**
```bash
# Step 1: Scaffold (at repo root, in current directory)
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2: Core dependencies
npm install @vercel/blob react-dropzone iconsax-react

# Step 3: shadcn (pinned to v3-compatible version)
npx shadcn@2.3.0 init

# Step 4: shadcn base primitives
npx shadcn@2.3.0 add button input card badge dialog

# Step 5: React Bits (proof-of-pattern — one component to verify CLI works)
npx shadcn@latest add https://reactbits.dev/registry/blur-text-TS-TW.json
# OR use the standard form:
# npx shadcn@latest add @react-bits/BlurText-TS-TW
```

**Note on React Bits registry URL:** The CLI command format may vary. Each component on reactbits.dev has a copy-ready shadcn CLI command on its page. Verify the exact command at https://reactbits.dev for the specific component before running.

---

## Architecture Patterns

### Recommended Project Structure

```
src/                          # Next.js source root (--src-dir)
├── app/
│   ├── layout.tsx            # Root layout — font vars + global styles
│   ├── page.tsx              # Home page (placeholder in Phase 1)
│   ├── globals.css           # Tailwind directives + shadcn + Crowe tokens
│   └── fonts/                # (empty in Phase 1 — reserved for .woff2 files later)
├── components/
│   └── ui/                   # shadcn-generated components live here
├── lib/
│   └── utils.ts              # shadcn cn() utility (auto-generated)
└── styles/                   # (optional: additional CSS if needed)

public/                       # Static assets (Phase 6 will add CSV/docs)
scripts/                      # Dataset generation (Phase 7)
.env.example                  # Committed template
.env.local                    # NOT committed (gitignored)
tailwind.config.ts            # Crowe palette + shadow extensions
next.config.ts                # Next.js config
tsconfig.json                 # Paths: "@/*" → "./src/*"
```

### Pattern 1: Font CSS Variables Without Font Files

**What:** Declare CSS custom properties for display, body, and mono fonts using the fallback stack. This creates the token architecture so that swapping in real `.woff2` files later is a one-file change.

**When to use:** When Helvetica Now `.woff2` files are not available (current situation) but the CSS token structure must still exist for all other phases to reference.

**Example:**
```css
/* src/app/globals.css */
:root {
  /* Font tokens — fallback stack (no .woff2 available) */
  --font-display: Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif;
  --font-body: Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

```typescript
// src/app/layout.tsx
// No localFont() call needed — CSS variables are set in globals.css
// Apply via Tailwind class or inline style on <html>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif" }}>
      <body>{children}</body>
    </html>
  );
}
```

**Note:** If/when `.woff2` files are provided, replace with:
```typescript
// src/app/layout.tsx — future upgrade path
import localFont from 'next/font/local';
const helveticaNow = localFont({
  src: [
    { path: './fonts/HelveticaNowText-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/HelveticaNowDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});
```

### Pattern 2: Tailwind v3 Color Token Extension

**What:** Extend Tailwind's color palette with the full Crowe brand namespace under `crowe` and `tint` keys, plus custom `boxShadow` and `backgroundColor` extensions.

**When to use:** Every project using the Crowe design system. Tokens defined here generate utility classes like `bg-crowe-indigo-dark`, `text-crowe-amber`, `shadow-crowe-md`.

**Example (from CLAUDE.md Section 2.2 — authoritative):**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crowe: {
          amber: {
            bright: '#FFD231',
            DEFAULT: '#F5A800',
            dark: '#D7761D',
          },
          indigo: {
            bright: '#003F9F',
            DEFAULT: '#002E62',
            dark: '#011E41',
          },
          teal: {
            bright: '#16D9BC',
            DEFAULT: '#05AB8C',
            dark: '#0C7876',
          },
          cyan: {
            light: '#8FE1FF',
            DEFAULT: '#54C0E8',
            dark: '#007DA3',
          },
          blue: {
            light: '#32A8FD',
            DEFAULT: '#0075C9',
            dark: '#0050AD',
          },
          violet: {
            bright: '#EA80FF',
            DEFAULT: '#B14FC5',
            dark: '#612080',
          },
          coral: {
            bright: '#FF526F',
            DEFAULT: '#E5376B',
            dark: '#992A5C',
          },
        },
        tint: {
          950: '#1a1d2b',
          900: '#2d3142',
          700: '#545968',
          500: '#8b90a0',
          300: '#c8cbd6',
          200: '#dfe1e8',
          100: '#eef0f4',
          50: '#f6f7fa',
        },
      },
      fontFamily: {
        display: ['Helvetica Now Display', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        body: ['Helvetica Now Text', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'crowe-sm': '0 1px 3px rgba(1,30,65,0.06), 0 1px 2px rgba(1,30,65,0.04)',
        'crowe-md': '0 4px 8px -2px rgba(1,30,65,0.06), 0 2px 4px -1px rgba(1,30,65,0.04)',
        'crowe-lg': '0 6px 16px -4px rgba(1,30,65,0.07), 0 4px 6px -2px rgba(1,30,65,0.04)',
        'crowe-xl': '0 12px 32px -8px rgba(1,30,65,0.08), 0 8px 16px -4px rgba(1,30,65,0.03)',
        'crowe-hover': '0 8px 24px -4px rgba(1,30,65,0.10), 0 4px 8px -2px rgba(1,30,65,0.04)',
        'crowe-card': '0 1px 3px rgba(1,30,65,0.04), 0 6px 16px rgba(1,30,65,0.04), 0 12px 32px rgba(1,30,65,0.02)',
        'amber-glow': '0 4px 16px rgba(245,168,0,0.20)',
      },
      backgroundColor: {
        'page': '#f8f9fc',
        'section': '#f6f7fa',
        'section-warm': '#f0f2f8',
        'section-amber': '#fff8eb',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Pattern 3: shadcn CSS Variables — Crowe Themed (Tailwind v3 / HSL Format)

**What:** Override shadcn's default color variables in `globals.css` to use the Crowe warm palette. This ensures every shadcn component (Button, Input, Card, Badge, Dialog) renders in Crowe brand colors automatically.

**When to use:** Immediately after `npx shadcn@2.3.0 init`, before adding any components.

**Example (from CLAUDE.md Section 4.2 — authoritative):**
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 225 33% 98%;              /* #f8f9fc warm off-white */
    --foreground: 228 20% 22%;              /* #2d3142 warm dark */
    --card: 225 50% 99%;                    /* #fafbfd lifted card */
    --card-foreground: 228 20% 22%;
    --popover: 0 0% 100%;
    --popover-foreground: 228 20% 22%;
    --primary: 215 98% 13%;                 /* Crowe Indigo Dark #011E41 */
    --primary-foreground: 225 33% 97%;
    --secondary: 39 100% 48%;              /* Crowe Amber #F5A800 */
    --secondary-foreground: 215 98% 13%;
    --muted: 225 20% 96%;                   /* #f0f2f8 indigo-wash */
    --muted-foreground: 228 10% 37%;        /* #545968 */
    --accent: 39 100% 48%;
    --accent-foreground: 215 98% 13%;
    --destructive: 341 79% 56%;            /* Crowe Coral */
    --destructive-foreground: 225 33% 97%;
    --border: 226 17% 89%;                  /* #dfe1e8 soft */
    --input: 226 17% 89%;
    --ring: 215 100% 19%;                  /* Crowe Indigo Core */
    --radius: 0.75rem;
  }
}
```

**Note:** If `npx shadcn@2.3.0 init` generates a different format or adds dark mode variables, the above `@layer base { :root { ... } }` block is added/merged into the generated `globals.css`. The Tailwind v3 directives (`@tailwind base;` etc.) must precede `@layer`.

### Anti-Patterns to Avoid

- **Using `create-next-app@latest` without version pin:** As of March 2026, `@latest` resolves to Next.js 16+, which has breaking async param/cookie APIs that will conflict with API route code written in Phase 8. Pin to `@15`.
- **Using `npx shadcn@latest init` with Tailwind v3:** The latest shadcn CLI detects Tailwind v4 patterns; when your project has a `tailwind.config.ts`, shadcn@latest may still upgrade CSS variables to OKLCH format, breaking the HSL tokens in CLAUDE.md Section 4.2. Pin to `shadcn@2.3.0`.
- **Importing iconsax-react in Server Components without "use client":** iconsax-react uses SVG components that require client-side rendering. Always wrap components using it in a Client Component (`"use client"` directive).
- **Using `export default` for components:** CLAUDE.md mandates named exports. `export function Button() {}` not `export default function Button() {}`.
- **Pure white page background:** Use `bg-page` (Tailwind custom) or `bg-[#f8f9fc]`, never `bg-white` for the page/body background.
- **Pure black shadows:** Use `rgba(1,30,65,0.06)` (indigo-tinted), never `rgba(0,0,0,0.1)`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UI primitives (Button, Input, Dialog) | Custom from scratch | shadcn/ui components | Radix UI accessibility, keyboard nav, ARIA attributes — massive complexity |
| Drag-and-drop file zones | Native HTML5 drag events | react-dropzone | Browser quirks, MIME type handling, file size checks, multi-file logic all handled |
| Animated text effects | Custom CSS keyframes | React Bits (BlurText, SplitText) | Tested across browsers, prefers-reduced-motion aware, integrates with React lifecycle |
| Blob uploads | Fetch to S3/presigned URL | @vercel/blob | Handles auth, chunking, CDN, URL generation — single function call |
| Icon SVGs | Hand-coded SVGs | iconsax-react | 1000+ icons, 6 styles, correct viewBox, accessible titles |
| Color token system | Arbitrary hex values in components | Tailwind utility classes from `tailwind.config.ts` | Consistency, refactorability, theming, dark mode readiness |

**Key insight:** Every item on this list has subtle edge cases (ARIA roles, MIME detection, animation cleanup, auth token handling) that would consume disproportionate time. The libraries encode months of community debugging.

---

## Common Pitfalls

### Pitfall 1: create-next-app@latest Installs Next.js 16

**What goes wrong:** Running `npx create-next-app@latest` installs Next.js 16 (current as of March 2026). Next.js 16 mandates async APIs for `cookies()`, `headers()`, `params`, and `searchParams`. Any route handler code written following Next.js 14/15 patterns will throw synchronous-access errors at runtime.

**Why it happens:** `@latest` is not version-pinned. Next.js 16 was released and became `@latest` in late 2025/early 2026.

**How to avoid:** Use `npx create-next-app@15` explicitly. REQUIREMENTS.md says "14+" — Next.js 15 satisfies this requirement and is stable.

**Warning signs:** `package.json` shows `"next": "^16.x.x"` after scaffolding.

### Pitfall 2: shadcn@latest Rewrites CSS Variables to OKLCH

**What goes wrong:** Running `npx shadcn@latest init` with a Tailwind v3 project (which has `tailwind.config.ts`) may generate OKLCH-format CSS variables in `globals.css`. The Crowe design system variables from CLAUDE.md Section 4.2 are in HSL format (`225 33% 98%`). Mixing the two formats causes shadcn components to render with wrong colors.

**Why it happens:** shadcn's latest CLI was updated to generate Tailwind v4 / OKLCH variables by default.

**How to avoid:** Use `npx shadcn@2.3.0 init` — the last stable release that generates Tailwind v3 compatible HSL variables. After init, paste in the CLAUDE.md Section 4.2 `:root` block verbatim.

**Warning signs:** `globals.css` contains `oklch(...)` values after shadcn init.

### Pitfall 3: React Bits Components Imported as SSR Components

**What goes wrong:** React Bits components (BlurText, SplitText, etc.) use browser APIs and animation lifecycle hooks. Importing them in a Server Component causes "window is not defined" or hydration errors.

**Why it happens:** Next.js App Router defaults all components to Server Components. React Bits components use `useEffect`, `useRef`, and sometimes `requestAnimationFrame` — none of which exist on the server.

**How to avoid:** Always place React Bits components in files with `"use client"` at the top, or wrap them with `next/dynamic` with `{ ssr: false }`. Phase 3 (Home Page) where they're used will follow this pattern.

**Warning signs:** Hydration mismatch errors in the browser console; "window is not defined" during `npm run build`.

### Pitfall 4: iconsax-react in Server Components

**What goes wrong:** iconsax-react renders SVG elements and uses React component props (`color`, `variant`, `size`). While it doesn't directly use browser-only APIs, it should still only be imported in Client Components to avoid unexpected server rendering issues with SVG props.

**Why it happens:** SVG rendering is generally safe in SSR, but iconsax-react is structured as a client library. Adding `optimizePackageImports` for `iconsax-react` in `next.config.ts` can improve bundle size but is not required for correctness.

**How to avoid:** Keep icon usage in Client Components or within the client subtree. For navigation and layout icons (Navbar), mark the component `"use client"`.

**Warning signs:** Build warnings about large icon imports; SSR/client mismatch on icon elements.

### Pitfall 5: Missing .gitignore Entry for .env.local

**What goes wrong:** `.env.local` containing `BLOB_READ_WRITE_TOKEN` is committed to the repository, exposing Vercel Blob credentials.

**Why it happens:** `create-next-app@15` does scaffold a `.gitignore` that includes `.env.local` by default — but if files are manually created or the `.gitignore` is edited, the entry may be removed.

**How to avoid:** Verify `.gitignore` contains `.env.local` (and `.env*.local`) before first commit. The AGENT_PLAN.md also requires `.env.example` to be committed — ensure only the example file (no real token value) is tracked.

**Warning signs:** `git status` shows `.env.local` as an untracked file eligible for staging.

### Pitfall 6: Repo Root Conflicts Between create-next-app and Existing Files

**What goes wrong:** Running `create-next-app .` in a directory that already contains files (`.planning/`, `AGENT_PLAN.md`) may prompt "Directory not empty" or silently skip file creation.

**Why it happens:** create-next-app detects existing files and may refuse to overwrite or may skip configuration files.

**How to avoid:** The `create-next-app` command will ask for confirmation before overwriting. Existing `.planning/` and `AGENT_PLAN.md` are not Next.js files and will not conflict. Accept the prompt to proceed. Do NOT delete existing files.

**Warning signs:** `create-next-app` exits with "directory not empty" error without creating any files.

---

## Code Examples

Verified patterns from official sources and CLAUDE.md:

### Environment File Setup

```bash
# .env.example (committed)
BLOB_READ_WRITE_TOKEN=

# .env.local (NOT committed — gitignored)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

```
# .gitignore (verify this line exists after create-next-app)
.env.local
.env*.local
```

### Minimal Page Using Crowe Design Tokens (Phase 1 Smoke Test)

```typescript
// src/app/page.tsx — minimal placeholder to verify design system
export default function HomePage() {
  return (
    <main className="min-h-screen bg-page flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-crowe-card p-8 max-w-md">
        <h1 className="text-3xl font-bold text-crowe-indigo-dark">
          Meridian Financial — AI Case Competition
        </h1>
        <p className="mt-4 text-tint-700">Design system active.</p>
      </div>
    </main>
  );
}
```

### Verifying iconsax-react Import (TypeScript, Client Component)

```typescript
// src/components/IconTest.tsx — verifies FOUND-02
'use client';

import { Home } from 'iconsax-react';

export function IconTest() {
  return <Home color="#011E41" variant="Bold" size={24} />;
}
```

### Verifying react-dropzone Import (Client Component)

```typescript
// src/components/DropzoneTest.tsx — verifies FOUND-02
'use client';

import { useDropzone } from 'react-dropzone';

export function DropzoneTest() {
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div {...getRootProps()} className="border-2 border-dashed border-tint-300 rounded-lg p-8">
      <input {...getInputProps()} />
      <p className="text-tint-700">Drop files here</p>
    </div>
  );
}
```

### Verifying @vercel/blob Import (Server-Side Only)

```typescript
// src/lib/blob.ts — verifies FOUND-02 (server-side)
import { put } from '@vercel/blob';

export async function uploadToBlob(filename: string, file: File): Promise<string> {
  const blob = await put(filename, file, { access: 'public' });
  return blob.url;
}
```

### Root Layout with Font Variables

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meridian Financial — AI Case Competition',
  description: 'Competition portal for the Meridian Financial AI Case Competition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif",
          background: '#f8f9fc',
        }}
      >
        {children}
      </body>
    </html>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `create-next-app@14` | `create-next-app@15` (pin — @latest now = 16) | ~Q4 2025 | Must pin version; @latest gives Next.js 16 as of March 2026 |
| shadcn HSL variables | shadcn OKLCH variables (latest) | ~early 2025 | Pin `shadcn@2.3.0` to keep HSL format compatible with CLAUDE.md tokens |
| `tailwind.config.js` | `tailwind.config.ts` (TypeScript) | Tailwind v3.3+ | Use `.ts` extension — type safety, same content |
| React Bits npm package | React Bits shadcn CLI copy-paste | Always (project design) | `npx shadcn@latest add @react-bits/[Component]-TS-TW` — no npm install |
| `npx shadcn-ui@latest` | `npx shadcn@latest` | ~2024 | Old package name deprecated; use `shadcn` not `shadcn-ui` |

**Deprecated/outdated:**
- `npx create-next-app@14`: Installs React 18 + old App Router defaults. Avoid — Next.js 15 is stable and preferred.
- `npx shadcn-ui@latest init`: Old CLI name. Use `npx shadcn@latest init` or `npx shadcn@2.3.0 init`.
- `animejs`, `framer-motion`: Explicitly excluded by project decision — replaced by React Bits.

---

## Open Questions

1. **React Bits exact CLI command per component**
   - What we know: Install pattern is `npx shadcn@latest add @react-bits/[ComponentName]-TS-TW` or a registry URL from reactbits.dev
   - What's unclear: The exact command format may vary per component; the registry URL format `https://reactbits.dev/registry/[component]-TS-TW.json` is one pattern but may not be universal
   - Recommendation: When installing each React Bits component (Phase 3+), visit reactbits.dev directly and copy the CLI command from that component's page. The Phase 1 proof-of-pattern uses BlurText.

2. **create-next-app@15 Tailwind version**
   - What we know: create-next-app@15 defaults to Tailwind v3.4.x; Next.js 15.2+ added v4 support but it is not the default
   - What's unclear: Whether the scaffolded `postcss.config.mjs` or `tailwind.config.ts` differs between Next.js 15 patch versions
   - Recommendation: Run `create-next-app@15`, inspect generated `tailwind.config.ts` before editing — confirm it uses v3 format, then apply CLAUDE.md Section 2.2 extensions.

3. **shadcn@2.3.0 init prompts**
   - What we know: shadcn init asks for TypeScript (yes), style (default), base color (slate → override to neutral), CSS variables (yes), global CSS path, tailwind config path, components alias
   - What's unclear: Exact prompts may differ in 2.3.0 vs what was documented for @latest
   - Recommendation: Accept all defaults during init, then manually overwrite the generated `:root {}` block in `globals.css` with the CLAUDE.md Section 4.2 variables verbatim.

---

## Validation Architecture

`nyquist_validation: true` in `.planning/config.json` — validation section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None required for Phase 1 — validation is done via build checks and import smoke tests |
| Config file | None — Wave 0 does not add test framework (Phase 1 is scaffold-only) |
| Quick run command | `npm run build && npm run lint && npm run typecheck` |
| Full suite command | `npm run build && npm run lint && npm run typecheck` |

**Note:** Phase 1 has no behavioral logic to unit-test. Validation is structural (files exist, imports resolve, build succeeds, design tokens render). A full testing framework (Vitest + React Testing Library) is listed in CLAUDE.md Section 4.1 but is out of scope for Phase 1 foundation. It should be added in a later phase when there is behavior to test.

### Phase Requirements → Verification Map

| Req ID | Behavior | Test Type | Automated Command | Verifiable? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | `npm run dev` starts without errors; default Next.js page loads | smoke | `npm run build` (full compile check) | Yes — build exit code 0 |
| FOUND-01 | App Router scaffolded with TypeScript | structural | `npm run typecheck` | Yes — tsc exit code 0 |
| FOUND-02 | `react-dropzone`, `@vercel/blob`, `iconsax-react` importable in TypeScript without type errors | type-check | `npm run typecheck` after adding import statements to a test file | Yes |
| FOUND-02 | React Bits component installable and importable without type errors | type-check | `npm run typecheck` after `npx shadcn@latest add @react-bits/BlurText-TS-TW` | Yes |
| FOUND-03 | Crowe color tokens available as Tailwind utility classes (`bg-crowe-indigo`) | structural | `npm run build` (Tailwind purge + compile) | Yes — build verifies class names referenced in source |
| FOUND-03 | Custom shadow utilities available (`shadow-crowe-md`, etc.) | structural | `npm run build` | Yes |
| FOUND-04 | Font fallback stack renders on page | visual | Manual: open `http://localhost:3000`, inspect element font-family | Manual only |
| FOUND-04 | Font CSS variables declared in globals.css | structural | Grep check: `grep -r "font-display" src/app/globals.css` | Yes — exit code 0 |
| FOUND-05 | `.env.example` present at project root | structural | `ls .env.example` — file exists | Yes |
| FOUND-05 | `.env.local` is gitignored | structural | `git check-ignore -v .env.local` — outputs match | Yes |

### Per-Requirement Verification Commands

```bash
# FOUND-01: Project compiles and type-checks
npm run build
npm run typecheck

# FOUND-02: Dependencies importable (after adding imports to a test file)
# Create src/lib/import-check.ts with the following content, then typecheck:
# import { useDropzone } from 'react-dropzone';
# import { put } from '@vercel/blob';
# import { Home } from 'iconsax-react';
# void useDropzone; void put; void Home;
npm run typecheck

# FOUND-03: Color tokens produce valid Tailwind classes
# Add to any .tsx file: <div className="bg-crowe-indigo-dark shadow-crowe-card text-crowe-amber" />
# Then build — Tailwind will error if class names are invalid
npm run build

# FOUND-04: Font variable declared
grep "font-display" "src/app/globals.css"
grep "Helvetica" "src/app/globals.css"

# FOUND-05: Environment files
ls .env.example
git check-ignore -v .env.local
grep "BLOB_READ_WRITE_TOKEN" .env.example
```

### Sampling Rate

- **Per task commit:** `npm run typecheck && npm run lint`
- **Per wave merge:** `npm run build` (full compile + Tailwind purge)
- **Phase gate:** All five commands in the FOUND verification table return exit code 0, plus manual font visual check

### Wave 0 Gaps

- [ ] `src/lib/import-check.ts` — import smoke test file for FOUND-02 (created during Phase 1 task execution, can be deleted after verification)
- [ ] No test framework config needed for Phase 1 — structural verification only
- [ ] `tsconfig.json` must have `"paths": { "@/*": ["./src/*"] }` — generated by create-next-app but verify after scaffold

*(If any of the above are already present post-scaffold, gap is resolved.)*

---

## Sources

### Primary (HIGH confidence)
- CLAUDE.md (parent project config) — authoritative source for Crowe design tokens, color palette, shadow system, font strategy, shadcn CSS variables, code style rules
- CONTEXT.md (.planning/phases/01-foundation/01-CONTEXT.md) — locked decisions for this phase

### Secondary (MEDIUM confidence)
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — confirmed shadcn@latest now generates OKLCH variables, validating need to pin to 2.3.0
- [shadcn Discussion #6772 — Tailwind 3](https://github.com/shadcn-ui/ui/discussions/6772) — confirms `npx shadcn@2.3.0 init` for Tailwind v3 compatibility
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — confirmed async params/cookies breaking change, Node 20.9+ requirement
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) — confirmed Next.js 16 is current @latest as of early 2026
- [React Bits GitHub](https://github.com/DavidHDev/react-bits) — confirmed shadcn CLI install pattern (`npx shadcn@latest add @react-bits/[Component]-TS-TW`), not a traditional npm package
- [react-dropzone Next.js playground](https://github.com/react-dropzone/react-dropzone-nextjs) — confirms `"use client"` requirement for App Router
- [Next.js Package Bundling Guide](https://nextjs.org/docs/app/guides/package-bundling) — `optimizePackageImports` for icon libraries

### Tertiary (LOW confidence — needs validation at install time)
- React Bits exact registry URL format per component — verify at reactbits.dev at install time
- shadcn@2.3.0 exact init prompt sequence — unverified; may differ from @latest documented flow
- iconsax-react current version — npm page inaccessible; package exists and is installable per project spec

---

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM-HIGH — version pinning strategy (Next.js 15, shadcn 2.3.0, Tailwind v3) verified via official Next.js 16 upgrade guide and shadcn Tailwind v4 docs; specific shadcn 2.3.0 behavior unverified at runtime
- Architecture: HIGH — directly from CLAUDE.md (authoritative) and CONTEXT.md (locked decisions)
- Pitfalls: HIGH — version ecosystem pitfalls verified via official Next.js/shadcn documentation; React Bits SSR pitfall is standard Next.js App Router behavior
- Validation: HIGH — all verification commands are standard npm/tsc/git commands

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days — Next.js and shadcn versions may shift; re-verify version pins before executing)
