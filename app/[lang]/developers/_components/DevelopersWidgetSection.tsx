import Image from 'next/image'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Two real screenshots of widget.shapeshift.com's own customize panel, captured by actually
// clicking its controls (preset, theme, button style, radius slider) — not mocked up. Chosen to
// contrast as much as the real options allow in two frames: dark/rounded/filled vs
// light/sharp-cornered/outline.
const comparisons = [
  {
    src: '/developers/widget-preset-blue.png',
    width: 840,
    height: 1014,
    caption: 'Blue preset · Dark theme · Filled buttons',
  },
  {
    src: '/developers/widget-preset-green.png',
    width: 840,
    height: 1018,
    caption: 'Green preset · Light theme · Outline buttons · 4px radius',
  },
] as const

const options = [
  'Freeform background, card & accent colors',
  'Inline or modal display',
  'Adjustable corner radius',
] as const

function ThemeGallery(): ReactNode {
  return (
    <div
      className={
        'rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#12141f] to-[#0a0b11] p-6 sm:p-8 lg:p-10'
      }
    >
      <div className={'grid gap-6 sm:grid-cols-2 sm:gap-8'}>
        {comparisons.map((item) => (
          <div key={item.src} className={'flex flex-col gap-3'}>
            <div className={'overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl'}>
              <Image src={item.src} alt={item.caption} width={item.width} height={item.height} className={'w-full'} />
            </div>
            <span className={'text-center text-xs text-gray-500'}>{item.caption}</span>
          </div>
        ))}
      </div>
      <div className={'mt-8 flex flex-wrap justify-center gap-2 border-t border-white/[0.06] pt-6'}>
        {options.map((option) => (
          <span
            key={option}
            className={'rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-gray-400'}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page
  return (
    <section id={'widget'} className={'container scroll-mt-28 pt-20 lg:scroll-mt-32 lg:pt-24'}>
      <div className={'mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>

      <div className={'mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end'}>
        <div>
          <h3 className={'mb-2 text-2xl font-semibold tracking-[-0.02em]'}>{'Make it feel native to your product.'}</h3>
          <p className={'max-w-[520px] text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {'Two real configurations of the same widget — same component, different brand.'}
          </p>
        </div>
        <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={widget.ctaButton} hasArrow />
      </div>

      <ThemeGallery />
    </section>
  )
}
