# ShapeShift `/developers` page — design

## Context

ShapeShift's marketing site (`shapeshift/website-frontend`, Next.js app router) has no dedicated developer landing page. A colleague (Croswel2) opened an upstream PR (`shapeshift/website-frontend#99`, still OPEN, not merged) that adds a "Developers" nav dropdown linking straight out to the existing live API reference at `https://api.shapeshift.com/docs` (a Scalar-rendered OpenAPI doc, already solid — not being rebuilt here). That PR was merged locally into a fork (`swdiscordia/website-frontend`, branch `feat/developers-page`) as groundwork, but never pushed.

A full visual mockup for an actual `/developers` landing page was provided as a Claude Design export (`~/Downloads/ShapeShift Developers.html`, a `.dc.html`-style bundle). It was decoded (gzip+base64 payload inside the `__bundler/template` script tag) to extract the literal HTML/CSS/copy — this is the source of truth for content, copy, and layout. See decoded reference at `/tmp/template_decoded.html` (regenerate from the Downloads file if needed — it's not committed anywhere).

## Goals

- Ship a real `/developers` page matching the provided mockup's structure and copy, implemented using ShapeShift's actual website-frontend stack and coding conventions — not the mockup's raw inline styles.
- Build it in a new, independent repo (`swdiscordia/shapeshift-developers`) seeded from the current `website-frontend` code, so work happens without touching the upstream repo or coordinating on timing with Croswel's open PR.
- Wire the top-level "Developers" nav label to route to this new internal page (click navigates in; hover still shows Croswel's existing quick-link dropdown).

## Non-goals

- Not rebuilding or replacing the live API reference at `api.shapeshift.com/docs`.
- **No PR, ever, against `shapeshift/website-frontend` or any other official ShapeShift-org repo, as part of this project.** `swdiscordia/shapeshift-developers` is a fully independent repo, not staged for upstream contribution. Croswel's PR #99 is background context for why the nav dropdown already exists — it is not something this project feeds into or coordinates with.
- Not adding per-locale dictionary files — this codebase handles non-English rendering via the Weglot widget at runtime, English-only dictionary entries are correct.

## Repo setup

- New repo: `swdiscordia/shapeshift-developers`, private, personal account.
- Seed: a fresh git history (not a fork of `shapeshift/website-frontend`) initialized from the current contents of `~/Project/ShapeShift/website-frontend` on branch `feat/developers-page` (confirmed at parity with `upstream/develop`/`upstream/main` tip `5d258a1`, plus Croswel's nav-entrypoint commits merged locally). No `upstream`/shapeshift-org remote — this repo is intentionally decoupled.
- Untracked logo PNGs/SVGs currently sitting in the `website-frontend` working tree (`public/fox-icon.png`, `public/logo-text.png`, `public/shapeshift-logo*.png/svg`) carry over as part of the snapshot.

## Page structure & routing

New route: `app/[lang]/developers/` following the existing convention seen in `wallets/`, `protocols/`, `chains/`:
```
app/[lang]/developers/
  layout.tsx        # generateMetadata() (title/description/OG/twitter), pass-through
  page.tsx           # server component assembling the sections below
  README.md          # Directory Structure / Features / Content Structure / Technical Implementation / UI Components / Development Guidelines
  _components/
    DevelopersHero.tsx
    DevelopersPartnerLogos.tsx
    DevelopersWidgetSection.tsx
    DevelopersApiSection.tsx
    DevelopersEconomicsSection.tsx
    DevelopersStats.tsx
    DevelopersFaq.tsx
    DevelopersCta.tsx
```
`app/[lang]/_utils/dictionary/developers.ts` (already has the `expand` key from Croswel's PR) gets a new top-level key, e.g. `DEVELOPERS_DICT.page.*`, holding all copy for these sections — same nested-object-of-strings/`as const` shape as `RESOURCES_DICT`/`PRODUCTS_DICT`.

## Section-by-section plan (mockup → implementation)

| Mockup section | Component | Reuses | New |
|---|---|---|---|
| Hero ("Add multichain swaps to your project" + mini swap-widget preview) | `DevelopersHero.tsx` | `Button` (blue/white variants), Tailwind color tokens (`bg-blue`, gradient text via `bg-clip-text`) | Static mini swap-preview markup (non-functional visual, matches mockup's mock UI) |
| Partner logos row ("Routing across 18 protocols") | `DevelopersPartnerLogos.tsx` | Existing protocol logo assets if already present in the site's asset library (check `(resources)/protocols` assets first before adding new ones) | Marquee/wrap layout if no precedent exists |
| Widget section (3 feature rows + "Shipping it" stepper) | `DevelopersWidgetSection.tsx` | `Button`, feature-row layout modeled on `ProtocolFeatures.tsx` conventions | Numbered 01/02/03 stepper — no existing precedent, net-new small component |
| API section (3 clickable endpoints + live code panel) | `DevelopersApiSection.tsx` | `'use client'` local `useState` for active tab, same shape as `QuestionSection.tsx`'s per-item local state | Interactive code-tab panel (curl + JSON response swapping per tab) — net-new |
| Economics section (revenue share steps + CTA) | `DevelopersEconomicsSection.tsx` | Same numbered-row pattern as widget section, `Button` | — |
| Stats (48+ / 30,000+ / $1.7B+) | `DevelopersStats.tsx` | `ProductStats.tsx` pattern (`grid grid-cols-1 lg:grid-cols-3`, `bg-secondBg`, big value over label) | — |
| FAQ accordion | `DevelopersFaq.tsx` | `QuestionSection.tsx` pattern verbatim (framer-motion `AnimatePresence`, local `isOpen` state, `AnimatedPlusMinusIcon`) | — |
| Footer CTA band | `DevelopersCta.tsx` | `Button` (blue + white variants), existing background-image inline-style pattern (`ProtocolFeatures.tsx`/`ProtocolEasier.tsx` precedent for `style={{ backgroundImage: ... }}`) | — |

All components: Tailwind `className`-driven, matching color tokens from `tailwind.config.ts` (`bg-blue`, `bg-secondBg`, `bg-stroke`, etc.), no inline `style` except where the codebase already accepts it (background-images, computed values). No `data-screen-label`-style attributes — that's mockup-only tooling, not a site convention.

## Nav integration

In `app/[lang]/_components/header/DesktopHeader.tsx` (and the mobile equivalent), the "Developers" label currently only toggles `DevelopersExpand` on click (`sc-camel-on-click` in the mockup mirrors the real `onClick={toggleDevMenu}` already in place). Change: give the "Developers" nav item an `href` to `/developers` (via `LocalizedLink`, matching how other top-level tabs like "Products" behave) so a click navigates to the new internal page, while hover/focus still reveals Croswel's existing dropdown for quick deep-links to the external API doc sections. This only touches nav wiring in the new repo's copy — never pushed upstream as part of this work.

## Assets

- ShapeShift logo: already present as untracked PNG/SVG in the working tree (carries over with the snapshot).
- Partner/protocol logos (THORChain, Chainflip, CoW Swap, Relay, 0x, MAYAChain, Butter Network, Jupiter, Portals, Bebop, NEAR Intents, Cetus, SUN.io, AVNU, STON.fi, Across, deBridge, Arbitrum): check `(resources)/protocols` page assets first — several of these are almost certainly already in the site's asset library since they're listed there. Only source new files for ones genuinely missing.
- Hero background image + footer CTA background + QR code: extractable from the mockup bundle's manifest (gzip+base64 blobs keyed by UUID in `__bundler/manifest`) if no equivalent brand asset already exists; otherwise substitute the closest existing brand asset rather than introducing a new one-off image.

## Testing

- `pnpm lint` / `bunx eslint` and `tsc --noEmit` (matching Croswel's PR testing notes) before any commit.
- Manual QA in browser at the dev server: desktop + mobile nav, `/developers` page render, FAQ accordion expand/collapse, API section tab switching, all CTAs resolve to the right href (internal vs `api.shapeshift.com/docs`).
- No automated test suite precedent found for marketing pages in this codebase — matching existing practice, not introducing one.

## Follow-ups (explicitly out of scope for this pass)

- Mobile header nav wiring — same `href` change applies there but not detailed section-by-section above; confirm during implementation by reading `MobileHeader.tsx` alongside `DesktopHeader.tsx`.
