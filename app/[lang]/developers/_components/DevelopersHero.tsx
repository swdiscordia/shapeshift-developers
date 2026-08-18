'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'

import { SectionEyebrow } from './SectionEyebrow'

import type { ReactNode } from 'react'

// The real widget.shapeshift.com card, measured directly against the live page: its own
// nav/title block is 188px tall, and the Swap card below it is exactly 420x507. We embed the
// real page and crop to just the card instead of hand-building a fake swap UI.
const WIDGET_CARD_WIDTH = 420
const WIDGET_CARD_HEIGHT = 507
const WIDGET_CROP_TOP = 188

function RealWidgetEmbed(): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? WIDGET_CARD_WIDTH
      setScale(Math.min(1, width / WIDGET_CARD_WIDTH))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={
        'relative z-20 w-full max-w-[420px] overflow-hidden rounded-[28px] border border-blue/30 bg-[#0A0A14] shadow-[0_35px_100px_rgba(0,0,0,.62),0_0_90px_rgba(56,111,249,.3)]'
      }
      style={{ height: WIDGET_CARD_HEIGHT * scale }}
    >
      <iframe
        src={'https://widget.shapeshift.com/'}
        title={'ShapeShift Widget'}
        width={WIDGET_CARD_WIDTH}
        height={900}
        allow={'clipboard-write'}
        style={{
          border: 0,
          transform: `scale(${scale}) translateY(${-WIDGET_CROP_TOP}px)`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

export function DevelopersHero(): ReactNode {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className={'relative overflow-hidden pb-16 pt-5 lg:pb-20 lg:pt-4'}>
      <div
        className={'pointer-events-none absolute right-[8%] top-24 size-[600px] rounded-full bg-blue/14 blur-[150px]'}
      />

      <div className={'container relative grid min-w-0 items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12'}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={'min-w-0 lg:pt-4'}
        >
          <SectionEyebrow variant={'pill'}>{'The ShapeShift Widget'}</SectionEyebrow>
          <h1
            className={
              'mb-6 max-w-full text-[46px] font-bold leading-[.98] tracking-[-0.05em] sm:text-[60px] lg:text-[68px]'
            }
          >
            {'Add multichain swaps '}
            <span className={'bg-gradient-to-r from-[#BFD0FF] to-blue bg-clip-text text-transparent'}>
              {'in minutes.'}
            </span>
          </h1>
          <p className={'mb-7 max-w-[600px] text-lg leading-relaxed text-secondary sm:text-xl'}>
            {
              'Give your users a complete, customizable swap experience across 48+ chains—without building or maintaining the routing infrastructure.'
            }
          </p>
          <div className={'mb-8 flex flex-col gap-3 sm:flex-row'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={'Try the Widget'} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={'Talk to partnerships'} />
          </div>
          <div className={'flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400'}>
            {['48+ chains', '18 routing protocols', 'Partner revenue'].map((benefit) => (
              <span key={benefit} className={'flex items-center gap-2'}>
                <span className={'size-1.5 rounded-full bg-blue'} />
                {benefit}
              </span>
            ))}
          </div>
          <a
            href={'#api'}
            className={'mt-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white'}
          >
            {'Need a custom integration? Explore the API'}
            <span aria-hidden={'true'}>{'→'}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={
            'relative mx-auto flex min-h-[560px] min-w-0 w-full max-w-[600px] items-center justify-center px-2 py-10 lg:min-h-[540px] lg:px-10 lg:py-0'
          }
        >
          <div
            className={
              'pointer-events-none absolute -inset-x-[36%] inset-y-1 bg-[radial-gradient(ellipse_at_50%_40%,rgba(56,97,251,.38),rgba(13,17,29,.7)_52%,transparent_84%)]'
            }
          />
          <div
            className={'pointer-events-none absolute -inset-x-[36%] inset-y-1 opacity-30'}
            style={{
              backgroundImage:
                'linear-gradient(rgba(91,123,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(91,123,255,.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'linear-gradient(to bottom, black, transparent 86%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 86%)',
            }}
          />
          <div className={'pointer-events-none absolute inset-[10%] rounded-full bg-blue/25 blur-[90px]'} />

          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={shouldReduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
            className={'pointer-events-none absolute inset-[7%] rounded-full border border-dashed border-blue/20'}
          >
            <span className={'absolute -right-1 top-1/2 size-2.5 rounded-full bg-mint shadow-[0_0_14px_#70E1B1]'} />
          </motion.div>
          <RealWidgetEmbed />
        </motion.div>
      </div>
    </section>
  )
}
