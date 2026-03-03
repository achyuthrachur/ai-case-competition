# AI Case Competition Portal

## What This Is

A Next.js 14 web application serving as the full portal for an internal AI case competition branded as "Meridian Financial." Participants use the site to read the case brief, review the grading rubric, download a synthetic transaction dataset, and submit their deliverables (an HTML dashboard + findings memo). The site is deployed to Vercel with real file upload support via Vercel Blob storage.

## Core Value

Participants can find everything they need — instructions, dataset, rubric — and submit their work in one place without friction.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Navbar with links to all 5 pages, active tab highlighting, Iconsax icons, mobile hamburger collapse
- [ ] Home page: animated hero (React Bits), quick-link cards (21st.dev), key dates section
- [ ] Instructions page: case brief rendered as long-form content with clear section headings
- [ ] Rubric page: scored breakdown with card/table layout and grading notes callout
- [ ] Downloads page: 3 styled download cards (dataset, data dictionary, setup guide)
- [ ] Submit page: drag-and-drop form with react-dropzone, loading state, confirmation screen, error handling
- [ ] `POST /api/submit` route: validates inputs, uploads files to Vercel Blob, returns JSON response
- [ ] Synthetic dataset: ~50,000–100,000 transaction records with 5 anomaly types (~10% flagged)
- [ ] Static public files: `transactions.csv`, `data_dictionary.md`, `setup_guide.md`
- [ ] `.env.example` and `README.md`
- [ ] Deployed to Vercel; all pages functional end-to-end

### Out of Scope

- Crowe logos or wordmarks — Meridian Financial fictional brand only
- Authentication / login — no access control needed
- Admin dashboard for viewing submissions — out of scope for v1
- Mobile app — web-only
- Real financial data — synthetic only

## Context

- Project initiated for an internal competition event; participants are likely employees or students
- The AGENT_PLAN.md contains full page-by-page specs, component structure, dataset column spec, and API logic — treat it as the authoritative implementation reference
- Design system: Crowe Indigo + Amber color palette (from CLAUDE.md) applied under Meridian Financial branding — no Crowe wordmarks or logos
- Animation/UI libraries: React Bits (animated components) + 21st.dev (hero, cards, buttons) + Iconsax (`iconsax-react`) for icons — per AGENT_PLAN.md, NOT Anime.js/Framer Motion
- The dataset must be large enough to support meaningful analysis: 50k–100k rows with realistic distribution of anomaly types
- Font: Helvetica Now (licensed, self-hosted) per CLAUDE.md; fallback to Arial/Helvetica Neue if not available

## Constraints

- **Tech Stack**: Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui (base primitives only), react-dropzone, @vercel/blob — per AGENT_PLAN.md
- **File Size Limits**: HTML submission max 10 MB; memo max 25 MB — enforced in API route
- **Dataset Size**: 50,000–100,000 rows generated via Node.js script (`scripts/generate-dataset.js`)
- **Deployment**: Vercel; requires `BLOB_READ_WRITE_TOKEN` environment variable
- **No server required for participants**: their deliverable (HTML dashboard) must be openable in any browser without a server
- **Code style**: Named exports, functional TypeScript components, no `any`, per CLAUDE.md Section 4.3
- **Branding**: Meridian Financial fictional brand; Crowe color tokens used but no Crowe identity elements

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Bits + 21st.dev over Anime.js/Framer Motion | Project spec explicitly calls for these libraries for a polished, non-generic look | — Pending |
| Crowe Indigo + Amber palette despite Meridian branding | Follow CLAUDE.md color standards; warm indigo/navy still fits "financial" aesthetic | — Pending |
| Dataset size: 50k–100k rows | User explicitly requested larger dataset for richer analysis opportunity | — Pending |
| Vercel Blob for file storage | Integrated with Vercel deployment; no separate storage service needed | — Pending |
| Single-page HTML deliverable for participants | No server/deploy requirement lowers barrier to entry for competition | — Pending |

---
*Last updated: 2026-03-03 after initialization*
