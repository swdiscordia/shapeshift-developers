import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Real preset names and accent colors, read directly off widget.shapeshift.com's own
// "Customize Widget" panel — not invented. The widget itself also exposes freeform background,
// card, and accent color pickers plus a radius slider; these seven are just its starting points.
const presets = [
  { name: 'Blue', color: '#3861FB' },
  { name: 'Rose', color: '#F43F5E' },
  { name: 'Purple', color: '#A855F7' },
  { name: 'Cyan', color: '#06B6D4' },
  { name: 'Green', color: '#10B981' },
  { name: 'Orange', color: '#F97316' },
  { name: 'Stucco', color: '#BEA989' },
] as const

const options = [
  'Light or dark theme',
  'Inline or modal display',
  'Adjustable corner radius',
  'Filled or outline buttons',
] as const

function ThemeGallery(): ReactNode {
  return (
    <div className={'rounded-[32px] border border-white/[0.06] bg-[#0D1019] p-6 sm:p-8 lg:p-10'}>
      <div className={'flex flex-wrap justify-center gap-x-4 gap-y-6 sm:flex-nowrap sm:justify-between'}>
        {presets.map((preset) => (
          <div key={preset.name} className={'flex w-14 flex-col items-center gap-2.5'}>
            <div
              className={'size-11 rounded-2xl sm:size-14'}
              style={{ backgroundColor: preset.color, boxShadow: `0 10px 28px ${preset.color}45` }}
            />
            <span className={'text-xs text-gray-400'}>{preset.name}</span>
          </div>
        ))}
      </div>
      <div className={'mt-8 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6'}>
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
            {'Ships with seven presets, or set your own background, card, and accent colors from the dashboard.'}
          </p>
        </div>
        <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={widget.ctaButton} hasArrow />
      </div>

      <ThemeGallery />
    </section>
  )
}
