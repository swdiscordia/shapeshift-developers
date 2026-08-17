# Developers Directory

This directory contains the `/developers` landing page: the entry point for dApps, chains, and wallets integrating ShapeShift's swap widget or REST API.

## Directory Structure

- **layout.tsx**: Metadata (title/description/OG/Twitter) for the page.
- **page.tsx**: Assembles all sections below in order.
- **_components/**: One component per page section, plus `SectionEyebrow.tsx` (the shared label above every H2).

## Page sections, in order

1. **Hero** — interactive swap-preview mock, primary CTAs (Try the Widget / Talk to partnerships).
2. **Stats** — chains / assets / lifetime volume.
3. **Partner logos** — scrolling row of protocols ShapeShift routes across.
4. **Why ShapeShift** — the routing pitch: compare protocols, return one best route.
5. **Use cases** — three audiences (wallets & apps, chains & protocols, partners) and what each gets.
6. **Widget** — feature list + live theme studio preview.
7. **API** — clickable endpoint list with a live-switching code sample panel (`'use client'`).
8. **Economics** — how the affiliate revenue share works, step by step.
9. **FAQ** — accordion (reuses `QuestionSection`).
10. **Closing CTA** band.

## Technical Implementation

- All copy lives in `app/[lang]/_utils/dictionary/developers.ts` under `DEVELOPERS_DICT.page`, **except** WhyShapeShift and UseCases, which hardcode their copy directly in JSX (illustration-heavy sections where copy and visuals are tightly coupled).
- Reuses existing shared components (`Button`, `LocalizedLink`, `QuestionSection`, `SectionEyebrow`) and Tailwind color tokens from `tailwind.config.ts` — no new dependencies.
- Only `DevelopersApiSection.tsx` and `DevelopersWidgetSection.tsx` are client components (interactive state); everything else is a server component.

## Development Guidelines

- Keep all partner/API links pointed at real, live URLs (`https://api.shapeshift.com/docs`, `https://widget.shapeshift.com/`) — never placeholder `#` hrefs.
- Match existing Tailwind color tokens (`bg-blue`, `bg-blueLight`, `bg-mint`, `bg-secondBg`, `border-stroke`, etc.) rather than introducing new hex values.
- Use `SectionEyebrow` for the small uppercase label above section headings instead of hand-rolling a new variant.
- This page is independent of the official `shapeshift/website-frontend` repo — no upstream PR is planned for this work.
