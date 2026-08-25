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
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)

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

  useEffect(() => {
    const timeout = window.setTimeout(() => setHasTimedOut(true), 8000)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={
        'relative z-20 w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A14] shadow-[0_35px_100px_rgba(0,0,0,.62)]'
      }
      style={{ height: WIDGET_CARD_HEIGHT * scale }}
    >
      <iframe
        src={'https://widget.shapeshift.com/'}
        title={'ShapeShift Widget'}
        width={WIDGET_CARD_WIDTH}
        height={WIDGET_IFRAME_HEIGHT}
        allow={'clipboard-write'}
        onLoad={() => setIsLoaded(true)}
        style={{
          border: 0,
          transform: `scale(${scale}) translateY(${-WIDGET_CROP_TOP}px)`,
          transformOrigin: 'top left',
        }}
      />
      {!isLoaded ? (
        <div className={'absolute inset-0 z-10 flex items-center justify-center bg-[#0A0A14] px-8 text-center'}>
          <div>
            <span
              className={'mx-auto mb-4 block size-2 animate-pulse rounded-full bg-mint shadow-[0_0_18px_#70E1B1]'}
            />
            <p className={'text-sm font-medium text-white'}>
              {hasTimedOut ? 'The live Widget is taking longer than expected.' : 'Loading the live Widget'}
            </p>
            {hasTimedOut ? (
              <a
                href={'https://widget.shapeshift.com/'}
                target={'_blank'}
                rel={'noreferrer'}
                className={'mt-3 inline-flex text-sm text-blueLight hover:text-white'}
              >
                {'Open the Widget directly →'}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
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
            className={'mt-5 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white'}
          >
            {'Need more control? Build with the API'}
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
                    x: ['-3%', '4%', '-3%'],
                    y: ['2%', '-3%', '2%'],
                    scale: [0.96, 1.06, 0.96],
                  }
            }
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className={'pointer-events-none absolute inset-[7%] opacity-40 blur-[64px] transition-colors duration-1000'}
            style={{
              background: `linear-gradient(135deg, ${palette[paletteIndex]}aa, #9D63EC77 48%, #70E1B166)`,
            }}
          />
          <RealWidgetEmbed />
        </motion.div>
      </div>
    </section>
  )
}
