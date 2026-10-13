# Design System — Hari Tiwari Portfolio

**Direction:** "Minimal engineering portfolio meets independent digital studio."
Near-black canvas, warm off-white editorial type, one restrained accent, oversized numbered services, thin borders, deliberate spacing, small technical labels. Intentionally designed — not a Tailwind starter.

This is the single source of truth for tokens and rules. Phase 2 implements it literally; Phase 4 audits against it.

---

## 1. Color

Dark-first. The site ships dark only. No light theme in v1 (avoids double-token maintenance and matches the reference aesthetic). Revisit only if asked.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0a0a0b` | Page background (near-black, faint blue-cool cast) |
| `--bg-raised` | `#111113` | Raised surface: cards, sticky nav on scroll |
| `--bg-sunken` | `#08080a` | Recessed: alternating section band, footer |
| `--line` | `#26262a` | Hairline borders, dividers (1px) |
| `--line-strong` | `#3a3a40` | Hover / focus border, active divider |
| `--text` | `#ecebe8` | Primary text (warm off-white) |
| `--text-dim` | `#a3a29d` | Secondary text, body in dense blocks |
| `--text-mute` | `#6f6e6a` | Tertiary: labels, meta, inactive list items |
| `--accent` | `#d9a441` | Single accent (amber/ochre). Hierarchy + CTA only |
| `--accent-dim` | `#8a6a2a` | Accent at rest for large fills / underlines |
| `--on-accent` | `#141210` | Text on accent fill |

Accent rules:
- One accent color. Never a second hue.
- Fires on: primary CTA, active/hover service row number + title, focus ring, small "live" status dot, section index numerals.
- Never as: large background fills, body text, decorative gradients.
- Contrast: `--text` on `--bg` ≈ 15:1. `--text-dim` on `--bg` ≈ 7:1. `--text-mute` on `--bg` ≈ 3.6:1 — **large text or decorative labels only, never body copy.** `--on-accent` on `--accent` ≈ 10:1.

Texture: optional single fixed grain overlay, ~2–3% opacity, CSS/SVG noise, `pointer-events: none`, disabled under reduced-transparency. Cheap, never a large image.

---

## 2. Typography

Two families. System-resident so there is no external font fetch, no FOUT, and no runtime dependency (the Geist CDN import already failed once in this environment):

- **Display/UI:** `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- **Mono (labels, indices, meta):** `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`.

Decision: no webfont in v1. A distinct display face (e.g. a licensed grotesk) can be added in Phase 4 if it materially improves the brand; the type system below is built so only the `--font-display` var changes.

Scale (fluid with `clamp`, mobile floor → desktop ceiling):

| Role | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Hero H1 | `clamp(2.75rem, 8vw, 6rem)` | 600 | -0.03em | 0.98 |
| Services row (the oversized list) | `clamp(2rem, 6.5vw, 5.5rem)` | 600 | -0.03em | 1.0 |
| Section H2 | `clamp(1.75rem, 4vw, 3rem)` | 600 | -0.02em | 1.05 |
| Card / project title H3 | `clamp(1.25rem, 2.2vw, 1.75rem)` | 600 | -0.01em | 1.15 |
| Lead paragraph | `clamp(1.05rem, 1.6vw, 1.35rem)` | 400 | 0 | 1.55 |
| Body | `1rem` (16px) | 400 | 0 | 1.65 |
| Small / meta | `0.8125rem` (13px) | 400 | 0.01em | 1.5 |
| Mono label (uppercase) | `0.6875rem` (11px) | 500 | 0.14em | 1.4 |

Rules:
- Oversized headings get tight negative tracking; small uppercase mono labels get wide positive tracking. This contrast is the core typographic signature.
- Numbers in the services list are set in the same display face at the same size as the words, not a separate decorative font.
- Max measure for reading text: **68ch**. Lead/intro: **52ch**.
- Sentence case for headings. Uppercase mono reserved for tiny labels and indices (`01 / SERVICES`, `STATUS`, stack tags).

---

## 3. Spacing & Layout width

- Base unit 4px. Rhythm leans on 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section vertical padding: `clamp(5rem, 12vh, 10rem)` desktop, `4rem` mobile.
- Container: `max-w-[88rem]` outer; text-heavy blocks `max-w-[72rem]`; prose `max-w-[68ch]`.
- Gutter: `px-5` mobile → `px-8` lg → `px-12` xl.
- Grid: 12-col mental model. Selected work = 2-col desktop / 1-col mobile. Archive = responsive card grid.

---

## 4. Borders & shape

- Default border: `1px solid var(--line)`.
- Radius: **2px** on cards/panels (near-square, technical). **999px** only on pill CTAs and status dots.
- Dividers between service rows: `1px solid var(--line)`, top edge only.
- No box-shadows. Depth comes from `--bg-raised` vs `--bg` and border contrast. If a shadow is ever needed: `0 1px 0 var(--line)` at most.

---

## 5. Interaction principles

- **Subtle, functional motion.** Motion clarifies state and hierarchy; it never decorates.
- Hover on a service row: the row's number + title move from `--text-mute` → `--accent`, siblings stay dimmed; a hairline arrow or "+" indicator fades in at the right. 150ms ease-out.
- Focus-visible: `outline: 2px solid var(--accent); outline-offset: 3px`. Never remove focus rings.
- Links: underline offset on hover (`text-decoration-thickness` 1px, `underline-offset` 4px). No color-change-only affordance.
- Buttons: primary = accent fill, `--on-accent` text, pill, hover lifts to `--accent-dim` border. Secondary = transparent, `1px var(--line)` border, hover border → `--line-strong`, text → `--text`.
- Every interactive element must be keyboard reachable and have a visible focus state.

---

## 6. Responsive breakpoints

`sm 640 / md 768 / lg 1024 / xl 1280`. Mobile-first; `lg` is the main design hinge for the oversized list and 2-col work grid.

- **Mobile:** services list drops to `clamp(1.5rem, 9vw, 2.5rem)`, stacks number above word if needed; nav collapses to a full-screen overlay; work grid 1-col; padding tightens.
- **Tablet:** list stays single-column but regains scale; work grid can go 2-col at `md`.
- **Desktop:** full oversized list, 2-col work, sticky side meta in case studies.
- No horizontal overflow at any width. Test at 320 / 375 / 768 / 1280 / 1600.

---

## 7. Motion rules

- Entrance: fade + 12px rise, `400ms cubic-bezier(0.22, 1, 0.36, 1)`, staggered 60ms per item, triggered once on scroll (IntersectionObserver). Max ~5 staggered items per group.
- Hover/state: `150ms ease-out`.
- Accordion (service detail): height + opacity, `220ms ease-out`. Only one open at a time is allowed but not required — independent toggles preferred for accessibility.
- **`prefers-reduced-motion: reduce`** → disable all entrance transforms and staggers (render at final state), keep opacity/color changes instant, kill the grain animation if any.
- No parallax, no scroll-hijack, no counters, no auto-playing anything, no page-load intro that delays content.

---

## 8. Components (visual specs)

**Section label** — mono uppercase, `0.6875rem`, tracking 0.14em, `--text-mute`, prefixed by an index (`01 / SELECTED WORK`). Sits above every section H2.

**Service row** — full-width, top hairline, `py-6`–`py-10`. Left: index (mono, small) + oversized title. Right: hover "+" / arrow. Expanded: `who it's for`, `problem`, `what I deliver`, `proof` (link), `CTA`. Number + title are the dominant visual.

**Project card** — `--bg-raised`, 1px border, 2px radius. Optional screenshot (or a flat `--bg-sunken` placeholder with the project's initial in display type). Title, one-line outcome-oriented description, mono stack tags, status pill (Live = accent dot). Whole card links to case study.

**Status pill** — mono uppercase 11px, 1px border, 999px radius. Live = accent dot. In Progress / Experiment = `--text-mute`. No color coding beyond the single accent.

**Nav** — sticky top, transparent → `--bg-raised` + bottom hairline on scroll. Left: wordmark "Hari Tiwari". Right (desktop): Work, Services, Store, About, Contact + a compact "Email" CTA. Mobile: wordmark + hamburger → full-screen overlay with the same links at large size, plus socials.

**Footer** — `--bg-sunken`, top hairline. Wordmark, quick links, email/GitHub/LinkedIn, "Open to freelance & engineering work", year.

---

## 9. Accessibility floor

Semantic landmarks (`header/nav/main/section/footer`), one H1 per page, ordered heading levels, alt text on images, aria-expanded on accordion triggers, aria-label on icon-only buttons, ≥4.5:1 contrast for body text, full keyboard operation, reduced-motion honored, 200% zoom without loss of function.
