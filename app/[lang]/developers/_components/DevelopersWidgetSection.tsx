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

// Each swatch renders the preset's real accent color on an actual button shape, on a small dark
// "product surface" of its own, with a color-matched glow behind it — so it reads as a preview
// of what selecting the preset does, not just a flat color chip.
function PresetCard({ preset }: { preset: { name: string; color: string } }): ReactNode {
  return (
    <div className={'group flex w-[104px] shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-1'}>
      <div
        className={
          'relative flex h-24 w-full items-end overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08090f] p-3 transition-transform duration-300 ease-out group-hover:-translate-y-1'
        }
      >
        <div
          className={
            'pointer-events-none absolute -top-6 left-1/2 size-20 -translate-x-1/2 rounded-full opacity-[0.35] blur-2xl'
          }
          style={{ backgroundColor: preset.color }}
        />
        <div
          className={'relative w-full rounded-lg py-2 text-center text-[11px] font-semibold text-white'}
          style={{ backgroundColor: preset.color, boxShadow: `0 10px 22px -6px ${preset.color}` }}
        >
          {'Connect'}
        </div>
      </div>
      <span className={'text-xs text-gray-400'}>{preset.name}</span>
    </div>
  )
}

function ThemeGallery(): ReactNode {
  return (
    <div
      className={
        'rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#12141f] to-[#0a0b11] p-6 sm:p-8 lg:p-10'
      }
    >
      <div className={'flex flex-wrap justify-center gap-4 sm:flex-nowrap sm:justify-between sm:gap-5'}>
        {presets.map((preset) => (
          <PresetCard key={preset.name} preset={preset} />
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
