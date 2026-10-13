# Reference: honeyblooms.org (studied 2026-10-13)

## What it actually does (from fetched source)
- A **follower creature** (butterfly / hummingbird / ghost) that trails the pointer.
  - Drawn on a `<canvas>` appended straight to `<body>` (butterfly.js).
  - **The native cursor is NEVER hidden.** The creature flies *near* the pointer,
    not glued to it, so clicks/precision are unaffected. This is the whole trick.
  - Full opt-out: respects `prefers-reduced-motion`, `navigator.connection.saveData`,
    and a `?still` URL flag. Also a `?season=` switch and a localStorage toggle.
  - On phones it follows the finger.
- A **background field** (hex/honeycomb "field") behind hero + sections:
  - `hbfield.js` reads per-section CSS variables (`--hbf-stroke`, `--hbf-glow`,
    `--hbf-honey`, `--hbf-pollen`, ...) so the field can restyle per section/season.
  - Subtle, ambient — it "breathes", it does not chase the cursor aggressively.
  - Text sits on **plates** (a `::before` at `z-index:-1` with the section bg +
    feathered box-shadow) so the field dims behind words and stays strong in the
    open space. This is how they keep contrast/legibility while a field runs behind.

## Why mine failed (the anti-patterns to avoid)
1. `cursor: none` globally + a spider that LAGS behind the true pointer → the site
   felt broken and imprecise. Never hide the native cursor for a decorative follower.
2. The web canvas was at `-z-10` under an opaque `body` bg → **invisible**. A
   background layer must be either (a) a child of `body` painted after the bg, or
   (b) explicitly above the body paint with content stacked over it.
3. The spider fought the editorial type instead of complementing it.

## The pattern to copy
- Keep the native cursor. Follower = ambient creature that trails with a soft lag
  and a little independent motion (flutter/sway), never exactly on the pointer.
- Background = a quiet reactive field, layered BEHIND content but ABOVE the body
  paint (see layout.tsx stacking: bg body bg -> bgCanvas z-0 -> main/nav z-10/50
  -> grain z-60 -> follower z-70).
- Text legibility: dim the field behind text (radial scrim or plates).
- Opt-outs: reduced-motion, Save-Data, and a `?still` flag. Off on coarse pointers
  for the follower (or finger-follow), field can stay but is lighter.
