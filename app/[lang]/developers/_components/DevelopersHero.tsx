'use client'

import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { IconFox } from '@/app/[lang]/_icons/IconFox'
import { IconSettings } from '@/app/[lang]/_icons/IconSettings'

import type { ReactNode } from 'react'

// The real widget.shapeshift.com card, measured directly against the live page's own DOM
// (the .ssw-widget node) across every real state, not just the default one:
//   - disconnected: 420x507 — what effectively every fresh visitor sees
//   - a wallet already connected (extra "Receive address" row): ~571
//   - an amount entered with a live quote showing (route, fee, Swap button): ~680
// A single static crop height can't fit all three without either wasting ~170px of space in
// the default state or clipping the actual swap flow — so this isn't static. It starts at the
// COMPACT height (zero dead space for the common case), then grows once to the EXPANDED height
// the moment the visitor actually interacts with the widget, detected via the standard
// cross-origin trick of watching focus move into the iframe (window blurs and
// document.activeElement becomes the iframe element) — no content-reading required, and no
// false positives from switching browser tabs/apps, which don't hand focus to this iframe.
//
// The iframe's own `height` ATTRIBUTE is kept permanently fixed at the expanded size, never
// re-set based on state — only the OUTER wrapper's CSS height (a plain overflow-hidden clip)
// changes. Verified directly that doing it the other way round breaks real interaction: resizing
// the iframe's height attribute forces a real viewport resize inside the widget's own document,
// and if that happens on the same tick as a click (e.g. opening the wallet-connect modal), the
// modal never opens at all — this two-height split avoids ever touching the iframe's internal
// viewport after its first render.
const WIDGET_CARD_WIDTH = 420
const WIDGET_COMPACT_HEIGHT = 507
const WIDGET_EXPANDED_HEIGHT = 740
const WIDGET_CROP_TOP = 188
const WIDGET_IFRAME_HEIGHT = WIDGET_CROP_TOP + WIDGET_EXPANDED_HEIGHT

function RealWidgetEmbed(): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(1)
  const [isReady, setIsReady] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const cardHeight = isExpanded ? WIDGET_EXPANDED_HEIGHT : WIDGET_COMPACT_HEIGHT

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined
    const observer = new ResizeObserver(() => {
      const width = el.getBoundingClientRect().width
      setScale(Math.min(1, width / WIDGET_CARD_WIDTH))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The iframe's own `load` event is not reliable here: if the browser resolves it before
  // React finishes attaching the handler (e.g. an instant cache hit), the event fires and is
  // simply never seen, leaving isReady stuck false forever — the real widget underneath is
  // fine, but permanently hidden behind this non-interactive loading placeholder. A flat timer
  // started on mount guarantees the swap to the real iframe happens regardless of whether
  // `load` was actually observed.
  useEffect(() => {
    const fallback = window.setTimeout(() => setIsReady(true), 2600)
    return () => window.clearTimeout(fallback)
  }, [])

  // Focus alone isn't enough of a signal: an iframe sits in the normal tab order, so a keyboard
  // user tabbing through the page (never intending to touch the widget at all) lands on it too,
  // and would trigger the same window-blur — expanding the card to a mostly-empty 740px box for
  // someone who never asked for it (verified: 15 plain Tab presses, no click, reproduced exactly
  // that). A click that starts INSIDE the iframe never fires a pointerdown our outer page can see
  // at all (it's a separate document), so the tell isn't "did we see a pointer press" — it's "did
  // we see a keydown on OUR OWN page immediately before losing focus". Tab-driven focus transfer
  // always follows a keydown on the outer document (the previously-focused element was out here);
  // a genuine click into the iframe never does.
  useEffect(() => {
    let lastKeyDownAt = 0

    function handleKeyDown(): void {
      lastKeyDownAt = Date.now()
    }
    function handleWindowBlur(): void {
      const wasTabDriven = Date.now() - lastKeyDownAt < 100
      if (!wasTabDriven && document.activeElement === iframeRef.current) setIsExpanded(true)
    }

    window.addEventListener('keydown', handleKeyDown, true)
    window.addEventListener('blur', handleWindowBlur)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={
        'relative z-20 w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A14] shadow-[0_35px_100px_rgba(0,0,0,.62)] transition-[height] duration-300 ease-out'
      }
      style={{ height: scale * cardHeight }}
    >
      <iframe
        ref={iframeRef}
        src={'https://widget.shapeshift.com/'}
        title={'ShapeShift Widget'}
        width={WIDGET_CARD_WIDTH}
        height={WIDGET_IFRAME_HEIGHT}
        allow={'clipboard-write'}
        loading={'eager'}
        // This is meant to read as a fixed, cropped snapshot of the widget (the whole scale +
        // translateY illusion below depends on that), not a scrollable panel — without this,
        // the iframe's own document can scroll internally on wheel/touch, which both breaks
        // that illusion and can trap the page's own scroll while the cursor is over it.
        scrolling={'no'}
        className={'transition-opacity duration-300'}
        style={{
          border: 0,
          opacity: isReady ? 1 : 0,
          transform: `scale(${scale}) translateY(${-WIDGET_CROP_TOP}px)`,
          transformOrigin: 'top left',
        }}
      />
      <div
        aria-hidden={isReady}
        className={'absolute inset-0 z-10 overflow-hidden bg-[#0A0A14] transition-opacity duration-300'}
        style={{ opacity: isReady ? 0 : 1, pointerEvents: isReady ? 'none' : 'auto' }}
      >
        <div
          className={'h-[507px] w-[420px] bg-[#0A0A14]'}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          <div className={'flex h-[74px] items-center justify-between border-b border-white/10 px-5'}>
            <div className={'text-base font-semibold text-white'}>{'Swap'}</div>
            <div className={'flex items-center gap-4'}>
              <span className={'rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white'}>
                {'Connect'}
              </span>
              <IconSettings className={'size-5 text-gray-500'} />
            </div>
          </div>
          <div className={'px-4 pt-4'}>
            <div className={'h-[128px] rounded-[22px] border border-white/10 bg-[#12121C] p-4'}>
              <div className={'text-xs text-gray-500'}>{'Sell'}</div>
              <div className={'mt-3 flex items-center justify-between'}>
                <span className={'text-2xl font-semibold text-white'}>{'0'}</span>
                <span className={'flex items-center gap-3 rounded-xl bg-[#080811] px-4 py-3'}>
                  <Image src={'/widget/eth_icon.png'} alt={''} width={28} height={28} />
                  <span>
                    <strong className={'block text-sm text-white'}>{'ETH'}</strong>
                    <span className={'text-[11px] text-gray-500'}>{'Ethereum'}</span>
                  </span>
                </span>
              </div>
              <div className={'mt-2 text-xs text-gray-600'}>{'$0.00'}</div>
            </div>
            <div className={'mt-[18px] h-[128px] rounded-[22px] border border-white/10 bg-[#12121C] p-4'}>
              <div className={'text-xs text-gray-500'}>{'Buy'}</div>
              <div className={'mt-3 flex items-center justify-between'}>
                <span className={'text-2xl font-semibold text-white'}>{'0'}</span>
                <span className={'flex items-center gap-3 rounded-xl bg-[#080811] px-4 py-3'}>
                  <Image src={'/widget/usdc_icon.png'} alt={''} width={28} height={28} />
                  <span>
                    <strong className={'block text-sm text-white'}>{'USDC'}</strong>
                    <span className={'text-[11px] text-gray-500'}>{'Ethereum'}</span>
                  </span>
                </span>
              </div>
              <div className={'mt-2 text-xs text-gray-600'}>{'$0.00'}</div>
            </div>
            <button
              type={'button'}
              tabIndex={-1}
              className={'mt-4 h-[50px] w-full rounded-xl bg-blue font-semibold text-white'}
            >
              {'Connect Wallet'}
            </button>
          </div>
          <div
            className={
              'mt-4 flex h-[54px] items-center justify-center gap-1.5 border-t border-white/10 text-[11px] text-gray-600'
            }
          >
            <span>{'Powered by'}</span>
            <IconFox className={'size-3 text-blue'} />
            <span className={'font-semibold text-blue'}>{'ShapeShift'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Alpha baked directly into each stop (as an 8-digit hex) rather than appended afterwards:
// animate() interpolates colors as rgba() internally, so concatenating a literal 'aa' suffix
// onto its output produces something like 'rgba(56, 111, 249, 1)aa' — invalid CSS that the
// browser silently drops, which is why the glow previously looked frozen instead of fading.
const PALETTE = ['#386FF9aa', '#9D63ECaa', '#70E1B1aa', '#06B6D4aa']

export function DevelopersHero(): ReactNode {
  const shouldReduceMotion = useReducedMotion()
  const glowRef = useRef<HTMLDivElement>(null)
  // A single motion value smoothly tweened through the palette (closing the loop back to the
  // first color) so the glow's hue drifts continuously — the previous version snapped the
  // `background` gradient string straight from one color to the next every few seconds, which
  // a CSS `transition-colors` can't smooth (it doesn't cover the `background` shorthand), so it
  // looked like a hard cut instead of a fade.
  const glowAccent = useMotionValue(PALETTE[0])

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const controls = animate(glowAccent, [...PALETTE, PALETTE[0]], {
      duration: PALETTE.length * 3.2,
      repeat: Infinity,
      ease: 'linear',
    })

    // Pauses the color loop once the hero scrolls out of view instead of tweening forever in
    // the background for as long as the tab stays open.
    const el = glowRef.current
    const observer = el
      ? new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) controls.play()
          else controls.pause()
        })
      : null
    if (el && observer) observer.observe(el)

    return () => {
      controls.stop()
      observer?.disconnect()
    }
  }, [shouldReduceMotion, glowAccent])

  const glowBackground = useMotionTemplate`linear-gradient(135deg, ${glowAccent}, #9D63EC77 48%, #70E1B166)`

  return (
    <section className={'relative overflow-hidden pb-16 pt-5 lg:pb-20 lg:pt-4'}>
      <div className={'container relative grid min-w-0 items-center gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12'}>
        <motion.div initial={false} className={'min-w-0 lg:pt-4'}>
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
          initial={false}
          className={
            'relative mx-auto flex min-h-[560px] min-w-0 w-full max-w-[660px] items-center justify-center px-2 py-10 lg:min-h-[600px] lg:px-10 lg:py-0'
          }
        >
          <motion.div
            ref={glowRef}
            aria-hidden={'true'}
            initial={false}
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
            className={'pointer-events-none absolute inset-[7%] opacity-40 blur-[64px]'}
            style={{
              background: glowBackground,
              borderRadius: '42% 58% 61% 39% / 46% 38% 62% 54%',
            }}
          />
          <RealWidgetEmbed />
        </motion.div>
      </div>
    </section>
  )
}
