'use client'

import { Carousel } from '@/app/[lang]/_components/Carousel'
import { carouselLogos } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import { SectionEyebrow } from './SectionEyebrow'

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

function ProtocolRow(): ReactNode {
  return (
    <div className={'flex shrink-0 items-center gap-14 pr-14'}>
      {imageLogos.map(({ key, alt }) => {
        const Logo = carouselLogos[key].Logo
        return (
          <div
            key={key}
            className={'flex h-10 shrink-0 items-center brightness-0 invert transition-opacity hover:opacity-75'}
            aria-label={alt}
          >
            <Logo />
          </div>
        )
      })}
      <span
        className={
          'shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400'
        }
      >
        {'+10 routing integrations'}
      </span>
    </div>
  )
}

export function DevelopersPartnerLogos(): ReactNode {
  return (
    <section className={'mt-20 overflow-hidden border-y border-white/[0.07] py-8 lg:mt-24'}>
      <div className={'container mb-6'}>
        <SectionEyebrow dot={'blue'}>{DEVELOPERS_DICT.page.partnerLogos.label}</SectionEyebrow>
      </div>
      <div
        className={
          'relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'
        }
      >
        <Carousel speed={52}>
          <ProtocolRow />
        </Carousel>
      </div>
    </section>
  )
}
