'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { IconFox } from '@/app/[lang]/_icons/IconFox'
import { IconSettings } from '@/app/[lang]/_icons/IconSettings'
import { cl } from '@/app/[lang]/_utils/cl'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Real preset names and their real background/card/accent colors, read directly off
// widget.shapeshift.com's own "Customize Widget" panel (clicked through all seven, recorded
// what actually rendered) — not invented.
const presets = [
  { name: 'Blue', background: '#0a0a14', card: '#12121c', accent: '#3861fb' },
  { name: 'Rose', background: '#140a0f', card: '#1c1218', accent: '#f43f5e' },
  { name: 'Purple', background: '#0e0a14', card: '#1a1424', accent: '#a855f7' },
  { name: 'Cyan', background: '#0a1214', card: '#141d20', accent: '#06b6d4' },
  { name: 'Green', background: '#0a140e', card: '#141c18', accent: '#10b981' },
  { name: 'Orange', background: '#14100a', card: '#1c1814', accent: '#f97316' },
  { name: 'Stucco', background: '#0d1117', card: '#161b22', accent: '#bea989' },
] as const

type TPreset = (typeof presets)[number]

function LivePreview({ preset }: { preset: TPreset }): ReactNode {
  return (
    <div className={'relative flex justify-center'}>
      <div
        className={
          'pointer-events-none absolute inset-0 -z-10 rounded-full opacity-30 blur-[90px] transition-colors duration-500'
        }
        style={{ backgroundColor: preset.accent }}
      />
      <div
        className={'w-full max-w-[380px] rounded-2xl border p-5 shadow-2xl transition-colors duration-500 ease-out'}
        style={{ backgroundColor: preset.background, borderColor: `${preset.accent}40` }}
      >
        <div className={'mb-4 flex items-center justify-between'}>
          <span className={'text-base font-semibold text-white'}>{'Swap'}</span>
          <span className={'flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70'}>
            <IconSettings className={'size-4'} />
          </span>
        </div>

        <div
          className={'mb-2 rounded-xl p-3.5 transition-colors duration-500'}
          style={{ backgroundColor: preset.card }}
        >
          <div className={'mb-1 text-[10px] text-gray-500'}>{'Sell'}</div>
          <div className={'flex items-center justify-between'}>
            <span className={'text-xl font-semibold text-white'}>{'1.0'}</span>
            <span
              className={
                'flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white'
              }
            >
              <Image src={'/widget/eth_icon.png'} alt={''} width={16} height={16} className={'rounded-full'} />
              {'ETH'}
            </span>
          </div>
        </div>

        <div
          className={'mb-4 rounded-xl p-3.5 transition-colors duration-500'}
          style={{ backgroundColor: preset.card }}
        >
          <div className={'mb-1 text-[10px] text-gray-500'}>{'Buy'}</div>
          <div className={'flex items-center justify-between'}>
            <span className={'text-xl font-semibold text-white'}>{'2,618'}</span>
            <span
              className={
                'flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white'
              }
            >
              <Image src={'/widget/usdc_icon.png'} alt={''} width={16} height={16} className={'rounded-full'} />
              {'USDC'}
            </span>
          </div>
        </div>

        <button
          type={'button'}
          tabIndex={-1}
          className={'w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors duration-500'}
          style={{ backgroundColor: preset.accent }}
        >
          {'Connect Wallet'}
        </button>
        <div
          className={
            'mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-600 transition-colors duration-500'
          }
        >
          {'Powered by'}
          <span className={'flex items-center gap-1 font-semibold'} style={{ color: preset.accent }}>
            <IconFox className={'size-3'} />
            {'ShapeShift'}
          </span>
        </div>
      </div>
    </div>
  )
}

function LiveThemeSwitcher(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const preset = presets[activeIndex]

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const interval = window.setInterval(() => setActiveIndex((index) => (index + 1) % presets.length), 2600)
    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <div className={'flex flex-col items-center gap-7'}>
      <div className={'relative flex aspect-square w-full max-w-[460px] items-center justify-center'}>
        <motion.div
          aria-hidden={'true'}
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
          className={'pointer-events-none absolute inset-[3%] rounded-full opacity-90 blur-[2px]'}
          style={{
            background:
              'conic-gradient(from 15deg, #3861fb, #06b6d4, #10b981, #bea989, #f97316, #f43f5e, #a855f7, #3861fb)',
          }}
        />
        <div
          aria-hidden={'true'}
          className={
            'pointer-events-none absolute inset-[12%] rounded-full bg-[#0a0b11] shadow-[inset_0_0_70px_rgba(255,255,255,.04)]'
          }
        />
        <div
          aria-hidden={'true'}
          className={
            'pointer-events-none absolute inset-[5%] rounded-full opacity-40 blur-[42px] transition-colors duration-700'
          }
          style={{ backgroundColor: preset.accent }}
        />
        <div className={'relative z-10 w-[86%] max-w-[380px]'}>
          <LivePreview preset={preset} />
        </div>
      </div>
      <div className={'flex flex-col items-center gap-3'}>
        <div className={'flex flex-nowrap justify-center gap-2 sm:gap-3'}>
          {presets.map((item, index) => (
            <button
              key={item.name}
              type={'button'}
              onClick={() => setActiveIndex(index)}
              aria-label={`Preview the ${item.name} preset`}
              aria-pressed={index === activeIndex}
              className={cl(
                'size-7 shrink-0 rounded-lg transition-all duration-200 sm:size-9 sm:rounded-xl',
                index === activeIndex
                  ? 'scale-110 ring-2 ring-white/80 ring-offset-2 ring-offset-[#0a0b11]'
                  : 'opacity-70 hover:scale-105 hover:opacity-100'
              )}
              style={{ backgroundColor: item.accent }}
            />
          ))}
        </div>
        <span className={'font-mono text-xs text-gray-500'}>{preset.name}</span>
      </div>
    </div>
  )
}

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page
  return (
    <section id={'widget'} className={'container scroll-mt-28 pt-16 lg:scroll-mt-32 lg:pt-20'}>
      <div className={'mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>

      <div
        className={
          'rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#12141f] to-[#0a0b11] px-6 py-10 sm:px-8 sm:py-12 lg:py-14'
        }
      >
        <div className={'mx-auto mb-9 max-w-[440px] text-center'}>
          <h3 className={'mb-2 text-2xl font-semibold tracking-[-0.02em]'}>{'Make it feel native to your product.'}</h3>
          <p className={'text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {'Pick a preset. The widget updates live, right here.'}
          </p>
        </div>

        <LiveThemeSwitcher />

        <div className={'mt-10 flex justify-center'}>
          <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={widget.ctaButton} hasArrow />
        </div>
      </div>
    </section>
  )
}
