'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import { SectionEyebrow } from './SectionEyebrow'

import type { ReactNode } from 'react'

// Measured directly against the live widget.shapeshift.com customize page: its nav/title block
// is ~220px tall, and the customize panel + live widget preview together run 960px wide and
// ~1100px tall (down through the "Copy Theme Config" button). We embed the real page — every
// preset and color input below is the actual product, not a re-implementation of it.
const STUDIO_WIDTH = 960
const STUDIO_HEIGHT = 1100
const STUDIO_CROP_TOP = 220

function LiveWidgetStudio(): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? STUDIO_WIDTH
      setScale(Math.min(1, width / STUDIO_WIDTH))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={
        'relative mx-auto w-full max-w-[960px] overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0D1019]'
      }
      style={{ height: STUDIO_HEIGHT * scale }}
    >
      <iframe
        src={'https://widget.shapeshift.com/'}
        title={'ShapeShift Widget customization'}
        width={STUDIO_WIDTH}
        height={STUDIO_HEIGHT + STUDIO_CROP_TOP}
        loading={'lazy'}
        allow={'clipboard-write'}
        style={{
          border: 0,
          transform: `scale(${scale}) translateY(${-STUDIO_CROP_TOP}px)`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page
  return (
    <section id={'widget'} className={'container scroll-mt-28 pt-20 lg:scroll-mt-32 lg:pt-24'}>
      <div className={'mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <SectionEyebrow>{widget.eyebrow}</SectionEyebrow>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>

      <div className={'mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end'}>
        <div>
          <h3 className={'mb-2 text-2xl font-semibold tracking-[-0.02em]'}>{'Make it feel native to your product.'}</h3>
          <p className={'max-w-[520px] text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {
              'This is the real widget.shapeshift.com configurator, embedded live. Pick a preset or change a color below.'
            }
          </p>
        </div>
        <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={widget.ctaButton} hasArrow />
      </div>

      <LiveWidgetStudio />
    </section>
  )
}
