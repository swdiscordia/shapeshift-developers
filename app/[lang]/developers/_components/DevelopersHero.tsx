'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

// The real widget.shapeshift.com card, measured directly against the live page: its own
// nav/title block is 188px tall, and the Swap card is 420x507 empty/disconnected, growing to
// ~580px once a wallet is connected (balance lines, a receive-address row) — WIDGET_CARD_HEIGHT
// has headroom for that so real connected-state content doesn't get cropped off.
//
// The iframe's own `height` attribute matters beyond sizing: the widget's wallet-connect modal
// is `position: fixed` sized to the iframe's OWN internal viewport, not to the cropped window we
// display. An oversized iframe height (e.g. a big flat safety margin) makes that modal render
// far below our visible crop, appearing cut off when a user actually connects. Keeping the
// iframe's height equal to exactly what we crop to (WIDGET_CROP_TOP + WIDGET_CARD_HEIGHT) keeps
// the modal's centered content inside the visible window — verified directly against the live
// widget with a real wallet-connect click.
const WIDGET_CARD_WIDTH = 420
const WIDGET_CARD_HEIGHT = 590
const WIDGET_CROP_TOP = 188
const WIDGET_IFRAME_HEIGHT = WIDGET_CROP_TOP + WIDGET_CARD_HEIGHT

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
        height={WIDGET_IFRAME_HEIGHT}
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
  const palette = ['#386FF9', '#9D63EC', '#70E1B1', '#06B6D4']
  const [paletteIndex, setPaletteIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const interval = window.setInterval(() => setPaletteIndex((index) => (index + 1) % palette.length), 3200)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion, palette.length])

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
              'Give your users a complete, customizable swap experience across 48+ chains. ShapeShift handles the routing infrastructure.'
            }
          </p>
          <div className={'mb-8 flex flex-col gap-3 sm:flex-row'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={'Try the Widget'} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={'Talk with us'} />
          </div>
          <div className={'flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400'}>
            {['48+ chains', '18 routing protocols'].map((benefit, index) => (
              <span key={benefit} className={'flex items-center'}>
                {index > 0 ? <span className={'mr-5 text-gray-700'}>{'/'}</span> : null}
                {benefit}
              </span>
            ))}
          </div>
          <div className={'mt-7 border-y border-white/10 py-4'}>
            <div className={'flex flex-wrap items-baseline gap-x-3 gap-y-1'}>
              <strong className={'text-lg font-semibold text-white'}>{'Earn on every attributed swap'}</strong>
              <span className={'text-base font-semibold text-mint'}>{'Set 0 to 100 bps'}</span>
            </div>
            <p className={'mt-1 text-sm text-gray-400'}>{'Your partner fee settles directly on-chain.'}</p>
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
            'relative mx-auto flex min-h-[560px] min-w-0 w-full max-w-[660px] items-center justify-center px-2 py-10 lg:min-h-[600px] lg:px-10 lg:py-0'
          }
        >
          <div
            className={
              'pointer-events-none absolute -inset-x-[42%] inset-y-[-8%] rounded-full opacity-70 blur-[70px] transition-colors duration-1000'
            }
            style={{
              background: `radial-gradient(circle, ${palette[paletteIndex]}55 0%, transparent 68%)`,
            }}
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
          <motion.div
            aria-hidden={'true'}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    borderRadius: [
                      '42% 58% 61% 39% / 46% 38% 62% 54%',
                      '58% 42% 38% 62% / 39% 61% 42% 58%',
                      '42% 58% 61% 39% / 46% 38% 62% 54%',
                    ],
                    rotate: [0, 8, 0],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className={'pointer-events-none absolute inset-[3%] opacity-45 blur-[34px] transition-colors duration-1000'}
            style={{
              background: `conic-gradient(from 130deg, ${palette[paletteIndex]}cc, #9D63EC88, #70E1B188, ${palette[paletteIndex]}cc)`,
            }}
          />

          <div className={'pointer-events-none absolute inset-[7%] rounded-full border border-white/[0.06]'} />

          <motion.div
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
            className={'pointer-events-none absolute inset-[2%] rounded-full'}
          >
            {palette.map((color, index) => (
              <span
                key={color}
                className={'absolute size-3 rounded-full blur-[1px]'}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 24px ${color}`,
                  left: `${50 + Math.cos((index / palette.length) * Math.PI * 2) * 49}%`,
                  top: `${50 + Math.sin((index / palette.length) * Math.PI * 2) * 49}%`,
                }}
              />
            ))}
          </motion.div>
          <RealWidgetEmbed />
        </motion.div>
      </div>
    </section>
  )
}
