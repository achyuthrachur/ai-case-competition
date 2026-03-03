# Phase 1: Foundation - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize the Next.js 14 project at the repo root, install all required dependencies, configure the Crowe brand design system (colors, fonts, shadows), and set up environment files. This phase produces a compiling, running skeleton that every later phase extends. No page content, no components — only scaffold and design tokens.

</domain>

<decisions>
## Implementation Decisions

### App Directory Structure
- Next.js app scaffolded at the **repo root** (not a subdirectory)
- `create-next-app` runs in the current working directory: `AI Case Competition/`
- This means `app/`, `components/`, `lib/`, `public/`, `scripts/` all live directly at the repo root alongside `.planning/` and `AGENT_PLAN.md`
- Rationale: repo root = project root; no nesting overhead; all paths simpler

### Next.js Init Command
- Use: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- `--src-dir`: source under `src/` per CLAUDE.md Section 8 (aligns with `@/*` → `./src/*`)
- `--import-alias "@/*"`: consistent with CLAUDE.md tsconfig paths
- Note: AGENT_PLAN.md shows no `--src-dir` — CLAUDE.md standard takes precedence

### Dependencies to Install
```
npm install @vercel/blob react-dropzone iconsax-react
npx shadcn@latest init
```
- React Bits: install per reactbits.dev docs (package name: `@reactbits/components` or similar — verify at install time)
- Do NOT install: animejs, framer-motion (replaced by React Bits per project decision)

### Design System: Color Tokens
- Use the full Crowe palette from CLAUDE.md Section 2.2 in `tailwind.config.ts`
- Semantic variables in `src/styles/globals.css` (or `src/app/globals.css`)
- shadcn/ui overrides: apply the Crowe-themed `:root` variables from CLAUDE.md Section 4.2
- Page background: **warm off-white** (`#f8f9fc`) — NOT pure white, NOT dark
- Hero sections/footer will use `--crowe-indigo-dark` (`#011E41`) — dark on light, not dark-mode site-wide
- No Crowe wordmarks or logos — Meridian Financial branding only

### Overall Site Theme
- **Light mode, warm and soft** — standard Crowe approach from CLAUDE.md
- Page bg: `#f8f9fc` (warm off-white); cards float on soft indigo-tinted shadows
- Dark indigo (`#011E41`) used for hero sections and footer backgrounds — not the entire page
- Amber (`#F5A800`) as CTA/highlight accent

### Font Strategy
- **Proceed with fallback stack** — assume Helvetica Now .woff2 files are NOT available
- Fallback: `font-family: Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif`
- Configure via `next/font/local` stub OR use CSS variable with fallback chain
- If fonts become available later, FOUND-04 can be revisited — the token system is already in place
- Display/body/mono font CSS variables still created (pointing to fallback stack)

### Environment Files
- `.env.local`: `BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here` (gitignored)
- `.env.example`: `BLOB_READ_WRITE_TOKEN=` (committed)
- `.gitignore` must explicitly list `.env.local`

### shadcn/ui Init
- Run `npx shadcn@latest init` with Crowe-themed config
- Install base primitives upfront: `button`, `input`, `card`, `badge`, `dialog`
- Additional components added per-phase as needed
- Use the `globals.css` shadcn override from CLAUDE.md Section 4.2 for warm Crowe palette

### Code Style (per CLAUDE.md Section 4.3)
- Named exports (no `export default` for components)
- Functional TypeScript components
- No `any` types
- `interface` for objects, `type` for unions
- File naming: PascalCase for components (`Button.tsx`), kebab-case for routes

### Claude's Discretion
- ESLint / Prettier config specifics
- Whether to use `src/app/` or `app/` (driven by `--src-dir` flag choice above)
- Exact React Bits package name (verify at install time)
- Tailwind CSS version (pin to v3 for stability with Next.js 14 unless v4 is confirmed stable)

</decisions>

<specifics>
## Specific Ideas

- CLAUDE.md Section 8 is the authoritative init sequence — follow it
- Tailwind config must extend with `crowe` color namespace and `tint` namespace per CLAUDE.md Section 2.2
- Shadow system uses indigo-tinted `rgba(1, 30, 65, 0.06)` — never pure `rgba(0,0,0,0.1)`
- All box shadows defined as Tailwind `boxShadow` extensions: `crowe-sm`, `crowe-md`, `crowe-lg`, `crowe-xl`, `crowe-hover`, `crowe-card`, `amber-glow`
- `--radius: 0.75rem` for shadcn, `10-12px` for cards per CLAUDE.md Section 2.3

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None yet — Phase 1 establishes the patterns all later phases follow

### Integration Points
- `.planning/` directory already exists at repo root — Next.js app will live alongside it
- `AGENT_PLAN.md` at repo root — stays there, not part of the Next.js app
- `src/` directory will be the Next.js source root

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-03*
