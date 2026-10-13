# Portfolio Plan — Hari Tiwari

Phase 1 deliverable: research, audit, architecture, and design specification. **No site built yet.** This document is the contract for Phases 2–4.

---

## 0. Repository audit findings (read this first)

The target directory `/home/hatz/Dj/ITERATION/template/portfolio` is a **separate, freshly scaffolded project** — it is *not* the Digital Store. Confirmed by:

- Portfolio has no git remote; Digital Store's remote is `github.com/h4tz/DigitalStore.git`.
- Portfolio has no `/s/[slug]` route; Digital Store does (`src/app/s/[slug]/page.tsx`).
- Portfolio has no Herbal Parlour implementation, no `clients/`, no `docs/ARCHITECTURE.md`.

**Safety: the Digital Store repo will not be modified. It was only read (read-only) to ground the Herbal Parlour case study.**

### Critical problem found: the scaffold is broken

The current `package.json` mixes incompatible majors and the CSS setup is half-migrated:

| Issue | Detail |
|---|---|
| React/Next mismatch | `next@14.2.4` requires `react@^18.2.0`, but `react@19.3.0` is installed → `npm ls` flags it **invalid** and the SWC compiler crashes on the page (`Unexpected token 'main'`). This is why the earlier dev run 500'd. |
| Tailwind half-migrated | `tailwindcss@4` + `@tailwindcss/turbopack@4` are installed, but `globals.css` uses **v3** `@tailwind base/components/utilities` directives and a v3 `tailwind.config.cjs` exists. There is **no `postcss.config`**. Net effect: Tailwind utilities are not reliably generated. |
| Stale config | `next.config.js` lost the v4 Turbopack/CSS rule during the earlier downgrade; `eslint-config-next@16.4.0` doesn't match `next@14.2.4`. |
| Node version | Default `node` is **v18.20.8**, below Next 16's `>=20.9` floor. But **nvm has v22.21.1 installed** and ready. |

### Decision: rebuild on the Digital Store's proven stack

The Digital Store is a working Next 16 + React 19 + TypeScript + Tailwind v4 + `@tailwindcss/postcss` app in this exact environment. Rather than patch the broken Next 14/React 19 hybrid, **align the portfolio to that same, already-working stack** and pin Node 22 via nvm. This is the "preserve what's proven, don't upgrade for its own sake" path — the sibling repo proves it runs here.

Target: **Next 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (`@tailwindcss/postcss`) · Node 22.21.1 (nvm).** `src/` layout, App Router, RSC by default. No animation/UI libraries — hand-rolled, matching the "avoid unnecessary dependencies" rule.

Action for Phase 2 start: wipe the broken scaffold files (`package.json` deps, `next.config.js`, `tailwind.config.cjs`, `globals.css`, `layout.tsx`, `page.tsx`) and re-initialize cleanly against Node 22. Keep the repo; replace the contents.

---

## 1. Visitor journeys (three primary, one secondary)

**A. Freelance client (founder / small business)** — highest priority.
Hero ("I build…") → Services 01 or 02 → sees matching proof (Herbal Parlour) → Contact CTA with prefilled subject → email. Shortest path to a qualified enquiry is **Services → proof → contact**, so every service row links to relevant proof and ends in a contact action.

**B. Recruiter / engineering manager.**
Lands → wants signal fast: role, stack, availability, evidence. Path: Hero (positioning + availability) → Selected Work (2–4 strongest, outcome-framed) → case study (problem / contribution / architecture / decisions / result) → Experience → Resume. Must also be reachable in ~2 scrolls; no forced conversion funnel.

**C. Potential collaborator / developer.**
Path: Work archive → filters (Backend, AI, Experiment) → repos/tech detail → GitHub / LinkedIn. Values honest "Experiment" and "In Progress" labels and architecture notes.

**D (secondary). Digital Store buyer.**
Store page → what's included → live Herbal Parlour demo → "Get a quote". Presented as *one offering among my work*, not the whole identity.

All four are served by one homepage in this order, with a predictable nav that never funnels everyone the same way.

---

## 2. Navigation

Compact, sticky, predictable. Desktop:

`Hari Tiwari` (wordmark, → home) · **Work · Services · Store · About** · `Email` (compact CTA)

Mobile: wordmark + hamburger → full-screen overlay (large links, then socials).

Resume lives in **About** and the **footer** (and is discoverable from the recruiter path), not as a top-level nav item. It links the real PDF (`docs/Hari_Anant_Tiwari_Resume_Immediate.pdf`, copied to `public/`).

Routes:
- `/` — homepage (all sections below)
- `/work` — full searchable + filterable archive
- `/work/[slug]` — project case study
- `/store` — Digital Store packaged offering
- `/about` — about / now / experience / resume
- `/contact` — contact (or the homepage `#contact` anchor; decide in Phase 3 — leaning dedicated page for a clean URL to put in emails)

---

## 3. Homepage wireframe (text)

```
[ sticky nav ]
────────────────────────────────────────────────────
HERO
  small mono label:  INDEPENDENT ENGINEER · OPEN TO WORK
  oversized H1:      I build useful digital products,
                     backend systems, integrations,
                     and AI-powered workflows.
  lead:              One-person studio. Python/Django/FastAPI
                     backends, web apps, integrations, AI workflows.
  [ Start a conversation ]  [ View selected work ]
  meta row: Noida / Delhi NCR · Remote · Immediate Joiner · GitHub · LinkedIn
────────────────────────────────────────────────────
01 / CAPABILITIES            <- the oversized numbered list (signature)
  01 Business Websites & Digital Presence        + >
  02 Web Applications & Product Builds           + >
  03 Backend APIs & Integrations                 + >
  04 AI & Workflow Automation                    + >
  05 Technical Fixes & Improvements              + >
  (active row = accent, siblings dimmed; click expands
   who-it's-for / problem / what-I-deliver / proof link / CTA)
────────────────────────────────────────────────────
02 / SELECTED WORK           <- 2–4 strong projects, editorial cards
  [ Herbal Parlour — Live ]   [ AI Content Automation — Delivered ]
  [ Tweets 3-backends — Completed ]  [ Realtimechat — In progress ]
  each: status pill, one-line outcome framing, stack tags → case study
  [ See all projects → /work ]
────────────────────────────────────────────────────
03 / DIGITAL STORE           <- packaged offering, not the whole identity
  "Websites for small businesses, productized."
  what's included (configurable) · live demo (Herbal Parlour) · pricing on request
  [ Get a quote ]
────────────────────────────────────────────────────
04 / NOW                     <- concise about + current focus
  2–3 sentences, first person (2+ yrs: frontend → full-stack → backend → AI)
  current focus: MeterPay (Java/Spring/Kafka) · LaunchForge (K8s/Terraform/OTel)
  [ More about me → /about ]
────────────────────────────────────────────────────
05 / CONTACT
  email · LinkedIn · GitHub  + one clear line
  [ hari.anant777@gmail.com ]
[ footer: wordmark · nav · socials · "Open to freelance & engineering work" · year ]
```

Experience (Palcode.ai, PyCray, Dakshit Dolphin Designer, CODTECH — all with verified dates + descriptions from the resume) lives on `/about` as a compact timeline, not homepage — keeps the homepage conversion-focused and avoids implying equal proof. Homepage "Now" links to it.

---

## 4. Proposed component structure

```
src/
  app/
    layout.tsx              metadata, fonts, Nav+Footer shell, grain overlay
    page.tsx                homepage composition (Server Component)
    globals.css             tokens (@theme), base, reduced-motion
    work/page.tsx           archive (RSC) + client <ArchiveExplorer/>
    work/[slug]/page.tsx    case study (generateStaticParams)
    store/page.tsx          Digital Store offering
    about/page.tsx          about/now/experience/resume
    contact/page.tsx        contact
    sitemap.ts, robots.ts, opengraph-image.tsx   SEO
  components/
    layout/    Nav.tsx · Footer.tsx · MobileMenu.tsx (client) · Grain.tsx
    ui/        Section.tsx · SectionLabel.tsx · Pill.tsx · Button.tsx ·
               LinkArrow.tsx · TechTags.tsx · ProjectVisual.tsx · Reveal.tsx (client)
    home/      Hero.tsx · Capabilities.tsx (client) · SelectedWork.tsx ·
               StoreTeaser.tsx · Now.tsx · ContactStrip.tsx
    work/      ArchiveExplorer.tsx (client: search+filters) · ProjectCard.tsx ·
               CaseStudy.tsx · MetaList.tsx · OutcomeBlock.tsx
  content/     projects.ts · services.ts · experience.ts · site.ts   (typed data)
  lib/         projects.ts (query helpers: getAll, getFeatured, getBySlug, search)
```

RSC by default. **Client components only where interaction requires it:** `MobileMenu`, `Capabilities` (expand/active-row), `ArchiveExplorer` (search + filter), `Reveal` (scroll entrance). Everything else stays server-rendered for speed and SEO.

---

## 5. Project data model

Typed, in `content/projects.ts` — a plain exported array so the archive grows by *adding an object*, with zero redesign. Shape:

```ts
export type ProjectStatus = "Live" | "Completed" | "In Progress" | "Experiment" | "Archived";

export interface Project {
  name: string;
  slug: string;                 // URL key: /work/[slug]
  summary: string;              // one line, outcome-framed, ≤ 160 chars
  category: string;             // "Business Websites" | "Web Apps" | "Backend & APIs" | "AI & Automation"
  status: ProjectStatus;
  role: string;                 // "Solo" | "Client work" | "Employer (high level)" ...
  contribution: string;         // what I actually did
  problem: string;              // the problem being solved
  architecture: string[];       // technical decisions, bullet-level
  outcome: string | null;       // VERIFIED result only; null ships honest empty state
  stack: string[];
  visual: string | null;        // /public path; null → typographic placeholder
  repoUrl: string | null;       // null → no link (never invent)
  demoUrl: string | null;
  caseStudyUrl: string | null;  // internal /work/[slug]
  approvedForPublic: boolean;   // gate: false → excluded everywhere
  confidential: boolean;        // true → high-level fields only, no architecture depth
  featured: boolean;            // homepage Selected Work
  date: string;                 // ISO, for sorting; null-tolerant
}
```

`lib/projects.ts` exposes `getAllProjects()` (public only), `getFeaturedProjects()`, `getProject(slug)`, `searchProjects(query, filters)`. Filtering by `category` + `status` + text over name/summary/stack.

Seeded from `docs/content-inventory.md` §2 — only entries marked Verified start with `approvedForPublic: true`. MeterPay/LaunchForge/AdvocateHub are either omitted or added with `approvedForPublic: false` / `confidential: true` until the user clears them.

---

## 6. Service interaction (signature section)

The oversized numbered list, per the screenshot + reference analysis (Aashish Thakuri's "01.Web Design 02.Web Development…" list; Sujeet Khadka's numbered sections; Carl Haradji's "01 / About 02 / Projects"):

- Full-width rows, top hairline between each. Each row: small mono index (`01`) + oversized title at `clamp(2rem, 6.5vw, 5.5rem)`, right-side `+`/arrow.
- **Rest state:** all rows `--text-mute`. **Hover/focus:** that row's number + title go `--accent`, siblings stay dimmed, arrow appears. Pure CSS on `group-hover` + `:focus-visible`.
- **Click / Enter expands** an inline detail panel (aria-expanded, button trigger): Who it's for · The problem · What I deliver · Proof (links to relevant project) · CTA ("Start a conversation →" → contact with prefilled subject).
- Keyboard: each row is a real `<button>`; arrow/tab order is natural; expanded panel is reachable.
- Mobile: same interaction, smaller type; expanded content stacks.
- No row is decorative-only; every one ends in a proof link + contact action, satisfying "service → proof → contact."

---

## 7. Contact & conversion paths

- **Primary: direct email** `hari.anant777@gmail.com` via `mailto:` with a **prefilled subject/body** (e.g. subject = the service or project the visitor came from). No contact-form backend is configured, so **no fake form** — every CTA is a working `mailto:`, LinkedIn, or GitHub link. If a real form backend (e.g. Formspree) is added later, it wires to a real endpoint or not at all.
- LinkedIn + GitHub always visible (nav CTA, contact section, footer).
- Conversion paths per journey (§1): service row → proof → contact; project → case study → contact; store → demo → quote.
- Availability signal ("Open to freelance & engineering work") in hero meta + footer so both audiences feel addressed without either feeling secondary.
- Resume: reserved slot, hidden/disabled until a verified PDF is provided.

---

## 8. Technical implementation plan

**Phase 2 — Foundation + homepage**
1. Pin Node 22 via nvm (`nvm use 22`); verify `node -v` → v22.
2. Clean re-init: Next 16 + React 19 + TS + Tailwind v4 via `@tailwindcss/postcss`; delete broken v3 `tailwind.config.cjs`, stale `next.config.js`; add `postcss.config.mjs` with `@tailwindcss/postcss`.
3. `globals.css`: `@import "tailwindcss";` + `@theme` mapping the design tokens (§design-system). Base layer, reduced-motion, grain.
4. `layout.tsx`: metadata (title/description/OG/Twitter), Nav + Footer shell, grain overlay.
5. Build `ui/` primitives, then homepage sections Hero → Capabilities → SelectedWork → StoreTeaser → Now → ContactStrip.
6. Content files seeded with verified projects.
7. Verify: `npm run dev` renders; no console errors; no horizontal overflow; reduced-motion works.

**Phase 3 — Content routes**
`/work` archive (search + filters), `/work/[slug]` case studies (`generateStaticParams`), `/store`, `/about`, `/contact`. SEO: per-route metadata, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`. Case-study copy written from verified facts only; user reviews before publish.

**Phase 4 — QA / polish / production-readiness**
Responsive polish across 320–1600; accessibility audit (keyboard, focus, contrast, aria, reduced-motion); performance (font strategy, image optimization, LCP); SEO + share previews; working links + empty states; console-error sweep; production build (`npm run build`) green. Deployment only with explicit approval (Vercel, mirroring the Digital Store) — **nothing deploys without your say-so.**

**Dependency policy:** no animation/UI/state libraries unless a concrete need appears; hand-roll motion + accordion + filters.

---

## 9. Risks & unknowns

> **Status update (Phase 1, after resume):** Your resume (`docs/Hari_Anant_Tiwari_Resume_Immediate.pdf`) resolved most content blockers. As a public job-seeking document, its content is cleared for the portfolio. Identity, all four employers + dates, education, location, the ~40% latency metric, and MeterPay/LaunchForge are now **verified** (see `content-inventory.md`).

| Risk / unknown | Status | Mitigation |
|---|---|---|
| MeterPay & LaunchForge not on disk | ✅ resolved | Kept as named In-Progress flagships (your instruction); described at resume level only, no invented endpoints/metrics |
| Employer work confidentiality | ✅ resolved | Resume is public → CODTECH / Dakshit Dolphin / PyCray / Palcode.ai publish at resume-level specificity |
| No resume PDF | ✅ resolved | Provided; copy to `public/` in Phase 3, link from `/about` + footer |
| Location / availability | ✅ resolved | Noida / Delhi NCR · Remote · Immediate Joiner → hero meta + footer |
| Verified metric | ✅ resolved | ~40% latency reduction (PyCray/Lambda) is the only verified number on the site |
| No project screenshots | ⚠️ open | Typographic placeholders (no broken images); capture in Phase 4 |
| Digital Store pricing/scope unconfirmed | ⚠️ open | Ship "pricing on request"; configurable, no invented number |
| No long-form case-study copy | ⚠️ open | Write from verified facts in Phase 3; you review |
| Node 22 required vs default 18 | ⚠️ handled | `.nvmrc` = 22; `nvm use`; Vercel runs Node 20+ natively |
| Contact form backend absent | ⚠️ handled | mailto-only v1 (email/LinkedIn/GitHub all verified); no non-functional form, ever |
| One person = many services | ⚠️ watch | Lead with provable work; label In Progress / Experiment honestly |

**Open questions that still matter (none block starting Phase 2):**
1. Digital Store package — confirmed "what's included" + any real price, or ship "pricing on request"? *(defaults to pricing-on-request)*
2. Contact — `mailto:` + LinkedIn/GitHub for v1 is the safe default; want a real form endpoint (e.g. Formspree) wired instead?
3. Homepage Selected Work — proceed with recommended 4 (Herbal Parlour, AI Content Automation, Tweets, Realtimechat), or pick different ones?

---

## 10. Summary of the proposed direction

Build the portfolio as a **clean Next 16 / React 19 / Tailwind v4 app on Node 22**, mirroring the proven stack of your separate Digital Store repo (which stays untouched). The identity is a **near-black, warm off-white, single-amber-accent editorial system** whose signature is an **oversized numbered services list** where the active row lights up and expands into who-it's-for / problem / deliverable / proof / contact. The homepage runs Hero → Capabilities → Selected Work → Digital Store → Now → Contact, with `/work` (searchable archive), `/work/[slug]` case studies, `/store`, `/about`, `/contact` behind a compact sticky nav. Projects live in a **typed data file** so the archive grows by adding an object. Content is governed by a strict verified-only rule — no invented metrics, clients, or links — with in-progress and confidential work honestly labelled. Motion is restrained and reduced-motion-safe; contact is honest `mailto:` (no fake forms). Phase 2 (foundation + homepage) begins on your approval.
