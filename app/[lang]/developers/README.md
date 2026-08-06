# Developers Directory

This directory contains the `/developers` landing page: the entry point for dApps, chains, and wallets integrating ShapeShift's swap widget or REST API.

## Directory Structure

- **layout.tsx**: Metadata (title/description/OG/Twitter) for the page.
- **page.tsx**: Assembles all sections below in order.
- **_components/**: One component per page section (hero, partner logos, widget, API, economics, stats, FAQ, closing CTA).

## Features

- Hero with a static swap-preview mock and two entry points (widget vs API).
- Partner/protocol logo row.
- Widget section: feature list + "shipping it" integration stepper.
- API section: clickable endpoint list with a live-switching code sample panel (`'use client'`).
- Economics section: how the affiliate revenue share works.
- Stats row (chains / assets / lifetime volume).
- FAQ accordion (reuses `QuestionSection`).
- Closing CTA band.

## Technical Implementation

- All copy lives in `app/[lang]/_utils/dictionary/developers.ts` under `DEVELOPERS_DICT.page`.
- Reuses existing shared components (`Button`, `LocalizedLink`, `QuestionSection`) and Tailwind color tokens from `tailwind.config.ts` — no new dependencies.
- Only `DevelopersApiSection.tsx` is a client component (tab-switch state for the code panel); everything else is a server component.

## Development Guidelines

- Keep all partner/API links pointed at real, live URLs (`https://api.shapeshift.com/docs`, `https://widget.shapeshift.com/`) — never placeholder `#` hrefs.
- Match existing Tailwind color tokens (`bg-blue`, `bg-secondBg`, `border-stroke`, etc.) rather than introducing new hex values.
- This page is independent of the official `shapeshift/website-frontend` repo — no upstream PR is planned for this work.
