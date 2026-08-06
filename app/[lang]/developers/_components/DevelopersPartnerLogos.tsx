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
