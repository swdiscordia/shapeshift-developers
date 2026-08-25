'use client'

import { Carousel } from '@/app/[lang]/_components/Carousel'
import { carouselLogos } from '@/app/[lang]/_utils/constants'

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
    </div>
  )
}

export function DevelopersPartnerLogos(): ReactNode {
  return (
    <section className={'mt-14 overflow-hidden border-y border-white/[0.07] py-7 lg:mt-16'}>
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
