# ShapeShift `/developers` Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a real `/developers` landing page in `swdiscordia/shapeshift-developers`, matching the provided mockup's content and layout but implemented with this codebase's actual conventions (Tailwind tokens, existing `Button`/`LocalizedLink`/`QuestionSection` components, the dictionary pattern), then wire the top-level "Developers" nav label to route to it.

**Architecture:** One new route `app/[lang]/developers/` (`layout.tsx` + `page.tsx` + `README.md` + `_components/*.tsx`), all copy centralized in `app/[lang]/_utils/dictionary/developers.ts`. Each section of the mockup becomes one small presentational component, added to `page.tsx` incrementally so every task ends with something visible in the browser. Nav wiring is a two-line change (`constants.tsx` href + `DesktopHeader.tsx` link wrap) done last, in isolation.

**Tech Stack:** Next.js 15 (app router, Turbopack), React 18, Tailwind CSS, framer-motion (already used by `QuestionSection`, not introduced new), bun. No unit-test framework exists in this codebase for marketing pages (confirmed during design: Croswel's own PR for the same repo tests only via `eslint` + `tsc --noEmit` + manual browser QA) — this plan follows that exact precedent instead of introducing a new one.

**Verification convention used in every task:** `bunx eslint --no-cache "<changed files>"` and `bunx tsc --noEmit --pretty false`, both run from `/Users/discostu/Project/shapeshift-developers`, plus a manual check in the browser against the dev server already running at `http://localhost:3000`. If the dev server isn't running, start it with `cd /Users/discostu/Project/shapeshift-developers && bun run dev` (background) before Task 2.

---

### Task 1: Dictionary — all copy for the new page

**Files:**
- Modify: `app/[lang]/_utils/dictionary/developers.ts`

- [ ] **Step 1: Add the `page` key with all section copy**

Replace the full file contents with:

```ts
export const DEVELOPERS_DICT = {
  expand: {
    titleLine1: 'Build with',
    titleLine2: 'ShapeShift.',
    description: 'Explore API documentation, integration guides, and reference material for crypto applications.',
    ctaButton: 'View API Docs',
  },
  page: {
    hero: {
      eyebrow: 'For dApps, chains, and wallets',
      titlePrefix: 'Add ',
      titleHighlight: 'multichain swaps',
      titleSuffix: ' to your project',
      description:
        'Embed the ShapeShift widget or build on the swap API. 48+ chains, 30,000+ assets, and a revenue share on every swap your users make.',
      ctaWidget: 'Get the widget',
      ctaApi: 'Explore the API',
    },
    partnerLogos: {
      label: 'Routing across 18 protocols',
    },
    widget: {
      eyebrow: 'The widget',
      title: 'One iframe, every chain',
      description:
        'Drop the swap widget into your site and your users can trade across chains without leaving it. You keep the session, the brand, and a cut of the fee.',
      features: [
        {
          tag: '48+ chains',
          title: 'One integration, every route',
          description: 'Bitcoin, Ethereum, Solana, Cosmos, and every major chain. Routing across 18 protocols is handled for you.',
        },
        {
          tag: 'Themeable',
          title: 'Matches your interface',
          description: 'Colors, radius, and typography set from URL params. The widget reads your theme and disappears into your product.',
        },
        {
          tag: 'Revenue share',
          title: 'Earn on every swap',
          description: 'Pass your affiliate code and a fee from every swap settles to your address, on-chain, with no invoicing.',
        },
      ],
      steps: [
        { number: '01', title: 'Get your affiliate code', description: 'Connect to the Partner Portal and register your code.' },
        {
          number: '02',
          title: 'Configure in the sandbox',
          description: 'Theme, default assets, affiliate code. The sandbox generates the embed.',
        },
        { number: '03', title: 'Paste the iframe', description: 'Swaps run and fees settle to your address.' },
      ],
      cardLabel: 'Shipping it',
      ctaButton: 'Open the widget sandbox',
    },
    api: {
      eyebrow: 'The API',
      title: 'Skip the UI and build your own',
      description:
        'The same routing engine behind the widget, exposed as a REST API. Non-custodial end to end: we return transactions, your users sign them.',
      endpoints: [
        {
          method: 'GET /v1/assets',
          title: 'List chains and assets',
          description: 'Enumerate what your users can trade, by CAIP-19 ID.',
        },
        {
          method: 'GET /v1/swap/rates',
          title: 'Fetch rates for a pair',
          description: 'One call returns a rate from every available swapper. No transaction yet.',
        },
        {
          method: 'POST /v1/swap/quote',
          title: 'Get an executable quote',
          description: 'Returns transaction data. Your user signs it in their own wallet, funds never touch us.',
        },
      ],
      ctaButton: 'View API docs',
    },
    economics: {
      eyebrow: 'Economics',
      title: 'How the revenue share works',
      description:
        'The partner dashboard is self-serve and already live. Connect, get an affiliate code, set your rate, and watch swaps come through.',
      steps: [
        {
          number: '01',
          title: 'Connect and get your code',
          description:
            'The partner dashboard is self-serve. Connect a wallet, get your affiliate code, pass it to the widget or API. Swaps start attributing to you from the first trade.',
        },
        {
          number: '02',
          title: 'Set your take rate',
          description:
            'Anywhere from 0 to 100 bps, changeable at any time in the dashboard. The fee applies to the swap amount and is added on top of the protocol fee.',
        },
        {
          number: '03',
          title: 'Watch it settle on-chain',
          description: 'Full swap history in real time. Fees settle to your address as part of each transaction, with no invoicing and no payout schedule.',
        },
      ],
      banner: { label: 'See it before you integrate.', ctaButton: 'Partner portal' },
    },
    stats: {
      chains: { value: '48+', title: 'Supported chains' },
      assets: { value: '30,000+', title: 'Tradable assets' },
      volume: { value: '$1.7B+', title: 'Lifetime swap volume' },
    },
    faq: {
      title: 'Questions partners ask',
      items: [
        {
          question: 'Which chains are supported?',
          answer:
            'Bitcoin, Ethereum and the major L2s (Arbitrum, Base, Optimism), Solana, Avalanche, BNB Chain, Cosmos, and more. 48+ chains today, with new routes added as the underlying aggregators support them. The full, current list is served by the API: https://api.shapeshift.com/v1/chains',
        },
        {
          question: 'What does it cost to integrate?',
          answer:
            'Nothing. There is no license fee or API key charge. Your affiliate fee is added on top of the protocol fee and paid directly to you.',
        },
        {
          question: 'Who holds user funds?',
          answer:
            'Swaps are non-custodial end to end. Users sign transactions from their own wallets, and funds move directly through the underlying protocols.',
        },
        {
          question: 'What support do partners get?',
          answer:
            'Support does not stop at launch. Partners get a direct channel to our integration engineers for the lifetime of the integration, on both technical and marketing questions, plus example repos and a staging affiliate ID for testing.',
        },
      ],
    },
    cta: {
      title: 'Ship multichain swaps on your project',
      description: 'One iframe or one API. Either way, you earn on every swap.',
      ctaPrimary: 'Start building',
      ctaSecondary: 'Talk with us',
    },
  },
} as const
```

- [ ] **Step 2: Typecheck**

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "app/[lang]/_utils/dictionary/developers.ts"
git commit -m "feat(developers): add page copy to the developers dictionary"
```

---

### Task 2: Route scaffold — layout, empty page, README

**Files:**
- Create: `app/[lang]/developers/layout.tsx`
- Create: `app/[lang]/developers/page.tsx`
- Create: `app/[lang]/developers/README.md`

- [ ] **Step 1: Create the layout (metadata only, matches `(resources)/wallets/layout.tsx` and `(resources)/protocols/layout.tsx`)**

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ShapeShift for Developers',
    description:
      'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API — 48+ chains, 30,000+ assets, non-custodial.',
    keywords: 'ShapeShift, Developers, Swap API, Swap Widget, SDK',
    openGraph: {
      title: 'ShapeShift for Developers',
      description: 'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API.',
      type: 'website',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ShapeShift for Developers',
      description: 'Add multichain swaps to your product. Embed the ShapeShift widget or build directly on the swap API.',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/og.png`,
        },
      ],
    },
  }
}

export default function Layout({ children }: { children: ReactNode }): ReactNode {
  return children
}
```

- [ ] **Step 2: Create a placeholder page (sections are added one per task below)**

```tsx
import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return <div />
}
```

- [ ] **Step 3: Create the README (matches the `wallets/README.md` convention)**

```markdown
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
```

- [ ] **Step 4: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/layout.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 5: Visual check — routing smoke test**

With the dev server running, open `http://localhost:3000/developers` in the browser (or `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/developers`).
Expected: HTTP 200, empty page (confirms the `[lang]` middleware rewrite and route resolve correctly before any content is added).

- [ ] **Step 6: Commit**

```bash
git add "app/[lang]/developers/layout.tsx" "app/[lang]/developers/page.tsx" "app/[lang]/developers/README.md"
git commit -m "feat(developers): scaffold the /developers route"
```

---

### Task 3: Hero section

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersHero.tsx`
- Modify: `app/[lang]/developers/page.tsx`

- [ ] **Step 1: Create the hero component**

```tsx
import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersHero(): ReactNode {
  const { hero } = DEVELOPERS_DICT.page

  return (
    <section className={'relative overflow-hidden'}>
      <div
        className={
          'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_-8%,rgba(56,111,249,0.28),transparent_65%)]'
        }
      />
      <div className={'container relative grid grid-cols-1 items-center gap-20 py-24 lg:grid-cols-[1fr_440px]'}>
        <div>
          <div className={'mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500'}>{hero.eyebrow}</div>
          <h1 className={'mb-6 text-5xl font-bold leading-[1.05] tracking-[-0.03em] lg:text-[64px]'}>
            {hero.titlePrefix}
            <span className={'bg-gradient-to-r from-[#8FB0FF] to-blue bg-clip-text text-transparent'}>
              {hero.titleHighlight}
            </span>
            {hero.titleSuffix}
          </h1>
          <p className={'mb-10 max-w-[560px] text-lg leading-relaxed text-secondary lg:text-xl'}>{hero.description}</p>
          <div className={'flex flex-wrap gap-4'}>
            <Button href={'#widget'} variant={'blue'} title={hero.ctaWidget} hasArrow />
            <Button href={'#api'} variant={'white'} title={hero.ctaApi} />
          </div>
        </div>

        <div className={'mx-auto w-full max-w-[420px] overflow-hidden rounded-[20px] bg-[#12121c]'}>
          <div className={'flex items-center justify-between border-b border-white/10 px-5 py-4'}>
            <span className={'text-base font-semibold text-white'}>{'Swap'}</span>
            <span
              className={
                'rounded-[10px] border border-white/10 bg-[#1a1a2e] px-3 py-2 text-[13px] font-medium text-white'
              }
            >
              {'Connect Wallet'}
            </span>
          </div>
          <div className={'flex flex-col gap-1 p-4'}>
            <div className={'rounded-2xl border border-white/10 bg-[#1a1a2e] p-4'}>
              <div className={'mb-2 text-[13px] font-medium text-gray-400'}>{'Sell'}</div>
              <div className={'flex items-center gap-3'}>
                <span className={'flex-1 text-[32px] font-medium text-white'}>{'1.5'}</span>
                <div className={'flex items-center gap-2 rounded-[10px] bg-[#12121c] px-3 py-2'}>
                  <span
                    className={
                      'flex size-8 items-center justify-center rounded-full bg-[#627EEA] text-sm font-semibold text-white'
                    }
                  >
                    {'Ξ'}
                  </span>
                  <div className={'flex flex-col items-start'}>
                    <span className={'text-[15px] font-semibold text-white'}>{'ETH'}</span>
                    <span className={'text-xs text-gray-400'}>{'Ethereum'}</span>
                  </div>
                </div>
              </div>
              <div className={'mt-2 text-[13px] text-gray-500'}>{'$5,241.60'}</div>
            </div>
            <div className={'rounded-2xl border border-white/10 bg-[#1a1a2e] p-4'}>
              <div className={'mb-2 text-[13px] font-medium text-gray-400'}>{'Buy'}</div>
              <div className={'flex items-center gap-3'}>
                <span className={'flex-1 text-[32px] font-medium text-white'}>{'0.07243'}</span>
                <div className={'flex items-center gap-2 rounded-[10px] bg-[#12121c] px-3 py-2'}>
                  <span
                    className={
                      'flex size-8 items-center justify-center rounded-full bg-[#F7931A] text-sm font-semibold text-white'
                    }
                  >
                    {'₿'}
                  </span>
                  <div className={'flex flex-col items-start'}>
                    <span className={'text-[15px] font-semibold text-white'}>{'BTC'}</span>
                    <span className={'text-xs text-gray-400'}>{'Bitcoin'}</span>
                  </div>
                </div>
              </div>
              <div className={'mt-2 text-[13px] text-gray-500'}>{'$5,229.14'}</div>
            </div>
          </div>
          <div className={'flex items-center justify-between px-5 pb-2 text-[13px] text-gray-500'}>
            <span>{'Est. network fee'}</span>
            <span className={'font-medium text-gray-400'}>{'$1.42'}</span>
          </div>
          <div className={'mx-4 mb-4 rounded-[14px] bg-blue py-4 text-center text-base font-semibold text-white'}>
            {'Connect Wallet'}
          </div>
          <div className={'border-t border-white/10 py-3 text-center text-xs text-gray-500'}>
            {'Powered by '}
            <span className={'font-medium text-blue'}>{'ShapeShift'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersHero } from './_components/DevelopersHero'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersHero.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Open `http://localhost:3000/developers`. Expected: hero renders with the gradient headline "Add **multichain swaps** to your project", description, two buttons ("Get the widget" solid blue, "Explore the API" outline), and the static swap-preview card on the right (1.5 ETH → 0.07243 BTC).

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersHero.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add hero section"
```

---

### Task 4: Partner logos row

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersPartnerLogos.tsx`
- Modify: `app/[lang]/developers/page.tsx`

- [ ] **Step 1: Create the component**

8 of the 18 protocols already have real logo assets in `carouselLogos` (`app/[lang]/_utils/constants.tsx`); the other 10 are rendered as text wordmarks (matching how the mockup itself renders roughly half of this row — Portals, Bebop, NEAR Intents, Cetus, SUN.io, AVNU, STON.fi, Across, deBridge, Arbitrum — as styled text, not images). No new image assets are introduced.

```tsx
import { carouselLogos } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const imageLogos = [
  { key: 'thorchain', alt: 'THORChain' },
  { key: 'chainflip', alt: 'Chainflip' },
  { key: 'cowSwap', alt: 'CoW Swap' },
  { key: 'relay', alt: 'Relay' },
  { key: 'Ox', alt: '0x' },
  { key: 'mayaProtocol', alt: 'MAYAChain' },
  { key: 'butterNetwork', alt: 'Butter Network' },
  { key: 'jupiter', alt: 'Jupiter' },
] as const

const textLogos = [
  'Portals',
  'Bebop',
  'NEAR Intents',
  'Cetus',
  'SUN.io',
  'AVNU',
  'STON.fi',
  'Across',
  'deBridge',
  'Arbitrum',
]

export function DevelopersPartnerLogos(): ReactNode {
  return (
    <section className={'border-y border-stroke px-4 py-11'}>
      <div className={'container flex flex-wrap items-center justify-between gap-8'}>
        <span className={'whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] text-gray-600'}>
          {DEVELOPERS_DICT.page.partnerLogos.label}
        </span>
        <div className={'flex flex-wrap items-center gap-x-14 gap-y-7'}>
          {imageLogos.map(({ key, alt }) => {
            const Logo = carouselLogos[key].Logo
            return (
              <div key={key} className={'opacity-75 grayscale'} aria-label={alt}>
                <Logo />
              </div>
            )
          })}
          {textLogos.map((name) => (
            <span key={name} className={'whitespace-nowrap text-lg font-semibold text-gray-400 opacity-75'}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersPartnerLogos.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: below the hero, a bordered strip reading "Routing across 18 protocols" with 8 real logos (THORChain, Chainflip, CoW Swap, Relay, 0x, MAYAChain, Butter Network, Jupiter) followed by 10 text wordmarks, all dimmed/grayscale.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersPartnerLogos.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add partner logos row"
```

---

### Task 5: Widget section

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersWidgetSection.tsx`
- Modify: `app/[lang]/developers/page.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page

  return (
    <section id={'widget'} className={'container pt-[120px]'}>
      <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{widget.eyebrow}</div>
      <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{widget.title}</h2>
      <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>

      <div className={'grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_400px]'}>
        <div>
          {widget.features.map((feature) => (
            <div
              key={feature.title}
              className={'grid grid-cols-1 gap-4 border-t border-stroke py-8 sm:grid-cols-[150px_1fr] sm:items-baseline'}
            >
              <span className={'font-mono text-xs uppercase tracking-[0.08em] text-[#7FA3FF]'}>{feature.tag}</span>
              <div className={'flex flex-col gap-2'}>
                <h3 className={'text-xl font-semibold tracking-[-0.015em]'}>{feature.title}</h3>
                <p className={'text-[15px] leading-relaxed text-gray-500'}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={'rounded-2xl border border-stroke bg-secondBg p-9'}>
          <div className={'mb-7 text-xs font-semibold uppercase tracking-[0.1em] text-gray-600'}>{widget.cardLabel}</div>
          <div className={'flex flex-col'}>
            {widget.steps.map((step, index) => (
              <div key={step.number} className={'grid grid-cols-[28px_1fr] gap-4'}>
                <div className={'flex flex-col items-center gap-1.5'}>
                  <span
                    className={
                      'flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-[#7FA3FF]'
                    }
                  >
                    {step.number}
                  </span>
                  {index < widget.steps.length - 1 && <span className={'w-px flex-1 bg-stroke'} />}
                </div>
                <div className={index < widget.steps.length - 1 ? 'flex flex-col gap-1.5 pb-7' : 'flex flex-col gap-1.5 pb-0'}>
                  <span className={'text-base font-semibold'}>{step.title}</span>
                  <p className={'text-sm leading-relaxed text-gray-500'}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            href={'https://widget.shapeshift.com/'}
            variant={'blue'}
            title={widget.ctaButton}
            hasArrow
            className={'mt-8 w-full'}
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersWidgetSection.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: "The widget" / "One iframe, every chain" section with 3 feature rows (48+ chains / Themeable / Revenue share) on the left and a "Shipping it" card with a 3-step numbered stepper (01/02/03) and a full-width "Open the widget sandbox" button on the right.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersWidgetSection.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add widget section"
```

---

### Task 6: API section (interactive)

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersApiSection.tsx`
- Modify: `app/[lang]/developers/page.tsx`

Note: the mockup renders each code line with per-token syntax-highlight color spans. This codebase has no precedent for hand-authoring colored spans for static snippets (`rehype-highlight`/`highlight.js` are wired for markdown-rendered content elsewhere, not literal JSX strings), so this component renders the code panel as plain monospace text — a deliberate, disclosed simplification versus the mockup's visual, not a gap.

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const codePanels = [
  {
    label: 'GET /v1/assets',
    lines: [
      '$ # chains',
      'curl "https://api.shapeshift.com/v1/chains"',
      '',
      '# assets, filtered by chain',
      'curl "https://api.shapeshift.com/v1/assets\\',
      '  ?chainId=eip155:1&limit=100"',
      '',
      '# response · 200',
      '{',
      '  "assets": [{',
      '    "assetId": "eip155:1/slip44:60",',
      '    "chainId": "eip155:1",',
      '    "name": "Ethereum",',
      '    "symbol": "ETH",',
      '    "precision": 18,',
      '    "icon": "https://…/eth@2x.png"',
      '  }, …],',
      '  "timestamp": 1754241000000',
      '}',
    ],
  },
  {
    label: 'GET /v1/swap/rates',
    lines: [
      '$ curl "https://api.shapeshift.com/v1/swap/rates\\',
      '  ?sellAssetId=eip155:1/slip44:60\\',
      '  &buyAssetId=bip122:00000000...93/slip44:0\\',
      '  &sellAmountCryptoBaseUnit=1000000000000000000" \\',
      '  -H "X-API-Key: YOUR_KEY"',
      '',
      '# response · 200',
      '{',
      '  "rates": [{',
      '    "swapperName": "THORChain",',
      '    "rate": "0.04829",',
      '    "buyAmountCryptoBaseUnit": "4829000",',
      '    "steps": 1,',
      '    "estimatedExecutionTimeMs": 60000,',
      '    "affiliateBps": "10"',
      '  }, …one entry per swapper…],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
  {
    label: 'POST /v1/swap/quote',
    lines: [
      '$ curl -X POST "https://api.shapeshift.com/v1/swap/quote" \\',
      '  -H "X-API-Key: YOUR_KEY" \\',
      '  -H "Content-Type: application/json" \\',
      "  -d '{",
      '    "sellAssetId": "eip155:1/slip44:60",',
      '    "buyAssetId": "bip122:00000000...93/slip44:0",',
      '    "sellAmountCryptoBaseUnit": "1000000000000000000",',
      '    "receiveAddress": "bc1qar0s...f5mdq",',
      '    "swapperName": "Relay"',
      "  }'",
      '',
      '# response · 200',
      '{',
      '  "quoteId": "0f8e2b1a-…",',
      '  "swapperName": "Relay",',
      '  "rate": "0.04829",',
      '  "affiliateBps": "10",',
      '  "steps": [{',
      '    "transactionData": {',
      '      "to": "0xdef1c0de…", "data": "0x…",',
      '      "value": "1000000000000000000"',
      '    }',
      '  }],',
      '  "expiresAt": 1754241060000',
      '}',
    ],
  },
]

export function DevelopersApiSection(): ReactNode {
  const { api } = DEVELOPERS_DICT.page
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id={'api'} className={'container pt-[120px]'}>
      <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{api.eyebrow}</div>
      <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{api.title}</h2>
      <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{api.description}</p>

      <div className={'grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.1fr]'}>
        <div>
          {api.endpoints.map((endpoint, index) => (
            <div
              key={endpoint.method}
              onClick={() => setActiveTab(index)}
              className={'grid cursor-pointer grid-cols-[44px_1fr] gap-0 border-t border-stroke py-6'}
            >
              <span className={activeTab === index ? 'font-mono text-[13px] text-[#7FA3FF]' : 'font-mono text-[13px] text-gray-600'}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={'flex flex-col gap-2'}>
                <div className={'flex flex-wrap items-center gap-3'}>
                  <span
                    className={
                      activeTab === index
                        ? 'text-lg font-semibold tracking-[-0.01em] text-white transition-colors'
                        : 'text-lg font-semibold tracking-[-0.01em] text-gray-500 transition-colors'
                    }
                  >
                    {endpoint.title}
                  </span>
                  <span className={'whitespace-nowrap rounded-md bg-blue/10 px-2.5 py-1 font-mono text-[11.5px] text-[#7FA3FF]'}>
                    {endpoint.method}
                  </span>
                </div>
                <p className={'text-[14.5px] leading-relaxed text-gray-500'}>{endpoint.description}</p>
              </div>
            </div>
          ))}
          <div className={'border-t border-stroke pt-7'}>
            <Button href={'https://api.shapeshift.com/docs'} variant={'blue'} title={api.ctaButton} hasArrow />
          </div>
        </div>

        <div className={'sticky top-[120px] overflow-hidden rounded-2xl border border-stroke bg-[#0d1117]'}>
          <div className={'flex items-center gap-3.5 border-b border-stroke px-5 py-3.5'}>
            <div className={'flex gap-1.5'}>
              <span className={'size-2.5 rounded-full bg-stroke'} />
              <span className={'size-2.5 rounded-full bg-stroke'} />
              <span className={'size-2.5 rounded-full bg-stroke'} />
            </div>
            <span className={'font-mono text-xs text-gray-500'}>{codePanels[activeTab].label}</span>
          </div>
          <pre className={'overflow-x-auto whitespace-pre p-7 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]'}>
            {codePanels[activeTab].lines.join('\n')}
          </pre>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersApiSection.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: "The API" / "Skip the UI and build your own" section with 3 clickable endpoint rows on the left and a terminal-style code panel on the right showing the `GET /v1/assets` example by default. Click each of the 3 rows and confirm the code panel content and the terminal label switch accordingly, and the active row's title turns white while the others stay gray.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersApiSection.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add interactive API section"
```

---

### Task 7: Economics section

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersEconomicsSection.tsx`
- Modify: `app/[lang]/developers/page.tsx`

The mockup's "Partner portal" CTA used a placeholder `#` href. Since the standalone partner dashboard isn't live yet, this links to the real, live affiliate-tracking section of the API docs (`https://api.shapeshift.com/docs#tag/affiliate`) instead of inventing an unverified URL.

- [ ] **Step 1: Create the component**

```tsx
import { Button } from '@/app/[lang]/_components/Button'
import { developerDocsUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersEconomicsSection(): ReactNode {
  const { economics } = DEVELOPERS_DICT.page

  return (
    <section id={'economics'} className={'container pt-[120px]'}>
      <div className={'rounded-[20px] border border-stroke bg-gradient-to-b from-blue/[0.07] to-secondBg to-45% p-16'}>
        <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{economics.eyebrow}</div>
        <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{economics.title}</h2>
        <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{economics.description}</p>

        <div className={'mb-10'}>
          {economics.steps.map((step) => (
            <div
              key={step.number}
              className={'grid grid-cols-1 gap-4 border-t border-stroke py-8 sm:grid-cols-[64px_320px_1fr] sm:items-baseline'}
            >
              <span className={'font-mono text-sm text-blue'}>{step.number}</span>
              <span className={'text-xl font-semibold tracking-[-0.01em]'}>{step.title}</span>
              <p className={'text-base leading-relaxed text-gray-400'}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={'flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-stroke px-7 py-5'}>
          <span className={'text-[15px] text-gray-400'}>{economics.banner.label}</span>
          <Button href={`${developerDocsUrl}#tag/affiliate`} variant={'blue'} title={economics.banner.ctaButton} hasArrow />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersEconomicsSection.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: a bordered, subtly gradient-tinted card titled "How the revenue share works" with 3 numbered rows (01/02/03) and a bottom banner "See it before you integrate." + a "Partner portal" button. Hover/click the button and confirm it points at `api.shapeshift.com/docs#tag/affiliate`.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersEconomicsSection.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add economics section"
```

---

### Task 8: Stats row

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersStats.tsx`
- Modify: `app/[lang]/developers/page.tsx`

This is a self-contained component that follows the same visual pattern as `(core-products)/_components/ProductStats.tsx` (3-column grid, big value over label, `bg-secondBg`) rather than importing that component directly — `_components` directories in this codebase are scoped per route group, and `developers/` is its own top-level route, so the pattern is replicated locally instead of reaching into another route group's private components.

- [ ] **Step 1: Create the component**

```tsx
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersStats(): ReactNode {
  const stats = Object.values(DEVELOPERS_DICT.page.stats)

  return (
    <div className={'container grid w-full grid-cols-1 gap-6 rounded-2xl bg-secondBg p-6 lg:grid-cols-3'}>
      {stats.map((stat) => (
        <div key={stat.title} className={'flex flex-col items-center px-[50px] py-6 text-center'}>
          <div className={'text-2xl font-normal leading-tight md:text-3xl lg:text-[40px] lg:leading-[48px]'}>
            {stat.value}
          </div>
          <div className={'text-lg text-gray-500 lg:text-xl'}>{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <div className={'pt-[120px]'}>
        <DevelopersStats />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersStats.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: a 3-column card row reading "48+ / Supported chains", "30,000+ / Tradable assets", "$1.7B+ / Lifetime swap volume".

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersStats.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add stats row"
```

---

### Task 9: FAQ accordion

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersFaq.tsx`
- Modify: `app/[lang]/developers/page.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { QuestionSection } from '@/app/[lang]/_components/QuestionSection'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersFaq(): ReactNode {
  return (
    <div className={'container mx-auto max-w-[900px]'}>
      <h2 className={'mb-12 text-center text-[44px] font-bold leading-tight tracking-[-0.02em]'}>
        {DEVELOPERS_DICT.page.faq.title}
      </h2>
      <div className={'flex flex-col gap-3'}>
        {DEVELOPERS_DICT.page.faq.items.map((item, index) => (
          <QuestionSection key={item.question} faqSectionItem={{ id: index, ...item }} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Wire it into the page**

```tsx
import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersFaq } from './_components/DevelopersFaq'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <div className={'pt-[120px]'}>
        <DevelopersStats />
      </div>
      <div className={'pt-[120px]'}>
        <DevelopersFaq />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersFaq.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

Reload `http://localhost:3000/developers`. Expected: "Questions partners ask" with 4 collapsed FAQ rows. Click each one and confirm it expands with an animated height transition and the plus icon rotates into a minus, matching the FAQ page's existing accordion behavior (`http://localhost:3000/faq` for comparison).

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersFaq.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add FAQ accordion"
```

---

### Task 10: Closing CTA band

**Files:**
- Create: `app/[lang]/developers/_components/DevelopersCta.tsx`
- Modify: `app/[lang]/developers/page.tsx`

The mockup's two closing CTAs used placeholder `#` hrefs and a photographic background image. This version drops the photo (gradient-only background, no new asset needed) and points both buttons at real, already-live destinations already used elsewhere on this site: the widget sandbox and the ShapeShift Discord (from `footerLinks.Connect` in `constants.tsx`).

- [ ] **Step 1: Create the component**

```tsx
import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersCta(): ReactNode {
  const { cta } = DEVELOPERS_DICT.page

  return (
    <section className={'container pb-20 pt-[120px]'}>
      <div className={'relative overflow-hidden rounded-[20px] border border-stroke bg-secondBg p-16 text-center'}>
        <div
          className={
            'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_120%,rgba(56,111,249,0.30),transparent_70%)]'
          }
        />
        <div className={'relative'}>
          <h2 className={'mb-4 text-5xl font-bold leading-tight tracking-[-0.02em]'}>{cta.title}</h2>
          <p className={'mb-10 text-lg text-white'}>{cta.description}</p>
          <div className={'flex flex-wrap items-center justify-center gap-3.5'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={cta.ctaPrimary} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={cta.ctaSecondary} />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the page (final assembly)**

```tsx
import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersCta } from './_components/DevelopersCta'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersFaq } from './_components/DevelopersFaq'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <div className={'pt-[120px]'}>
        <DevelopersStats />
      </div>
      <div className={'pt-[120px]'}>
        <DevelopersFaq />
      </div>
      <DevelopersCta />
    </div>
  )
}
```

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/developers/_components/DevelopersCta.tsx" "app/[lang]/developers/page.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check — full page walkthrough**

Reload `http://localhost:3000/developers` and scroll top to bottom. Expected, in order: hero → partner logos → widget section → API section (re-test tab switching) → economics → stats → FAQ (re-test expand/collapse) → closing CTA band ("Ship multichain swaps on your project" with "Start building" + "Talk with us" buttons). Confirm no layout overlap or overflow at both desktop width and a narrow (mobile) browser width.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/developers/_components/DevelopersCta.tsx" "app/[lang]/developers/page.tsx"
git commit -m "feat(developers): add closing CTA band, complete the page"
```

---

### Task 11: Nav wiring — "Developers" label routes to the new page

**Files:**
- Modify: `app/[lang]/_utils/constants.tsx`
- Modify: `app/[lang]/_components/header/DesktopHeader.tsx`

Only the desktop header is wired in this task. The mobile header renders `headerTabs` as a toggle-only button (no per-tab href usage at all today, for any tab) — matching that requires a larger structural change and is explicitly out of scope per the design doc's follow-ups.

- [ ] **Step 1: Point the "Developers" tab at the internal page**

In `app/[lang]/_utils/constants.tsx`, change:

```ts
export const headerTabs = [
  { name: 'Products', href: '/products', value: 'products' },
  { name: 'Developers', href: developerDocsUrl, value: 'developers' },
  { name: 'Resources', href: '/resources', value: 'resources' },
  { name: 'DAO', href: '/dao', value: 'dao' },
]
```

to:

```ts
export const headerTabs = [
  { name: 'Products', href: '/products', value: 'products' },
  { name: 'Developers', href: '/developers', value: 'developers' },
  { name: 'Resources', href: '/resources', value: 'resources' },
  { name: 'DAO', href: '/dao', value: 'dao' },
]
```

- [ ] **Step 2: Make the "Developers" label clickable in the desktop header**

In `app/[lang]/_components/header/DesktopHeader.tsx`, the tab render block currently is:

```tsx
            <nav className={'flex'}>
              {headerTabs.map((tab) => (
                <div
                  key={tab.name}
                  onMouseEnter={() => setCurrentTab(tab.value)}
                  className={cl(
                    'cursor-pointer p-4 text-sm font-medium transition-colors',
                    currentTab && currentTab !== tab.value ? 'text-gray-500' : 'text-white'
                  )}
                >
                  {tab.name}
                </div>
              ))}
            </nav>
```

Change the inner content so only the `developers` tab becomes a clickable link, hover-driven dropdown behavior unchanged for every tab:

```tsx
            <nav className={'flex'}>
              {headerTabs.map((tab) => (
                <div
                  key={tab.name}
                  onMouseEnter={() => setCurrentTab(tab.value)}
                  className={cl(
                    'cursor-pointer p-4 text-sm font-medium transition-colors',
                    currentTab && currentTab !== tab.value ? 'text-gray-500' : 'text-white'
                  )}
                >
                  {tab.value === 'developers' ? <LocalizedLink href={tab.href}>{tab.name}</LocalizedLink> : tab.name}
                </div>
              ))}
            </nav>
```

`LocalizedLink` is already imported in this file (used a few lines above for the logo link), so no new import is needed.

- [ ] **Step 3: Lint and typecheck**

Run: `bunx eslint --no-cache "app/[lang]/_utils/constants.tsx" "app/[lang]/_components/header/DesktopHeader.tsx"`
Expected: no errors.

Run: `bunx tsc --noEmit --pretty false`
Expected: no errors.

- [ ] **Step 4: Visual check**

With the dev server running, open `http://localhost:3000/`. Hover over "Developers" in the header — the existing dropdown (Swap Widget SDK / REST API Guide / Swap API / Supported Assets / Supported Chains / Affiliate Tracking, all pointing at `api.shapeshift.com/docs`) should still appear exactly as before. Click directly on the word "Developers" (not the dropdown) — it should navigate to `http://localhost:3000/developers` and render the new page built in Tasks 1–10. Confirm "Products", "Resources", and "DAO" are unchanged (hover-only, not clickable) — this task intentionally does not touch their behavior.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/_utils/constants.tsx" "app/[lang]/_components/header/DesktopHeader.tsx"
git commit -m "feat(developers): route the Developers nav label to /developers"
```

---

## Self-review notes (for the plan author, not a task)

- **Spec coverage:** every section in `docs/superpowers/specs/2026-08-07-developers-page-design.md`'s "Section-by-section plan" table has a task (hero → Task 3, partner logos → Task 4, widget → Task 5, API → Task 6, economics → Task 7, stats → Task 8, FAQ → Task 9, CTA → Task 10, nav → Task 11). Repo/route/README scaffolding is Task 2.
- **Deviations from the mockup, disclosed inline rather than silently dropped:** API code panel loses per-token syntax color (Task 6), CTA loses its photo background (Task 10), 3 CTA hrefs that were `#` placeholders in the mockup now point at real live URLs (Tasks 7, 10) instead of being invented or left as dead links.
- **No PR to any official ShapeShift repo** is implemented by construction — every task modifies only files inside `swdiscordia/shapeshift-developers`, and no task references pushing anywhere else.
