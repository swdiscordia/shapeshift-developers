'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const presets = [
  {
    name: 'ShapeShift',
    accent: '#3861FB',
    surface: '#111522',
    canvas: '#080B11',
    radius: 18,
    isLight: false,
  },
  {
    name: 'Partner light',
    accent: '#9D63EC',
    surface: '#FFFFFF',
    canvas: '#F0F2F7',
    radius: 26,
    isLight: true,
  },
  {
    name: 'Growth',
    accent: '#4BC47F',
    surface: '#101A18',
    canvas: '#07100E',
    radius: 12,
    isLight: false,
  },
] as const

function ThemeStudio({ ctaTitle }: { ctaTitle: string }): ReactNode {
  const [activePreset, setActivePreset] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const preset = presets[activePreset]

  useEffect(() => {
    if (hasInteracted) return undefined
    const intervalDuration = window.matchMedia('(min-width: 1024px)').matches ? 2900 : 3800
    const interval = window.setInterval(
      () => setActivePreset((currentPreset) => (currentPreset + 1) % presets.length),
      intervalDuration
    )
    return () => window.clearInterval(interval)
  }, [hasInteracted])

  const selectPreset = (index: number): void => {
    setHasInteracted(true)
    setActivePreset(index)
  }

  return (
    <div
      className={'relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0D1019] p-5 sm:p-8 lg:p-10'}
    >
      <motion.div
        animate={{ backgroundColor: preset.accent }}
        transition={{ duration: 0.6 }}
        className={
          'pointer-events-none absolute right-[12%] top-[45%] size-[400px] rounded-full opacity-[0.1] blur-[110px]'
        }
      />

      <div className={'relative grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:items-center lg:gap-12'}>
        <div>
          <div
            className={
              'mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#70E1B1]'
            }
          >
            <span className={'size-1.5 rounded-full bg-[#70E1B1] shadow-[0_0_9px_#70E1B1]'} />
            {'Live theme studio'}
          </div>
          <h3 className={'mb-4 max-w-[440px] text-[34px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[44px]'}>
            {'Make it feel native to your product.'}
          </h3>
          <p className={'mb-7 max-w-[420px] text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {'Preview how the Widget inherits your brand in real time—without changing the routing underneath.'}
          </p>

          <div className={'mb-7 flex flex-wrap gap-2'}>
            {presets.map((item, index) => (
              <button
                key={item.name}
                type={'button'}
                onClick={() => selectPreset(index)}
                className={
                  index === activePreset
                    ? 'flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-xs font-medium text-white ring-1 ring-white/25'
                    : 'flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-white'
                }
              >
                <span className={'size-2 rounded-full'} style={{ backgroundColor: item.accent }} />
                {item.name}
              </button>
            ))}
          </div>

          <div className={'grid max-w-[420px] grid-cols-3 gap-2'}>
            {[
              ['ACCENT', preset.accent],
              ['RADIUS', `${preset.radius}px`],
              ['DISPLAY', 'INLINE'],
            ].map(([label, value]) => (
              <div key={label} className={'rounded-xl border border-white/[0.07] bg-white/[0.025] p-3'}>
                <div className={'mb-1 text-[9px] font-semibold tracking-[0.12em] text-gray-500'}>{label}</div>
                <div className={'truncate font-mono text-xs text-gray-200'}>{value}</div>
              </div>
            ))}
          </div>

          <div className={'mt-7 hidden lg:block'}>
            <Button
              href={'https://widget.shapeshift.com/'}
              variant={'blue'}
              title={ctaTitle}
              hasArrow
              className={'relative w-full max-w-[290px] !min-w-0 !justify-center [&_svg]:absolute [&_svg]:right-5'}
            />
          </div>
        </div>

        <div
          className={
            'overflow-hidden rounded-[26px] border border-white/[0.1] bg-[#080B11] shadow-[0_30px_80px_rgba(0,0,0,.4)]'
          }
        >
          <div className={'flex items-center gap-2 border-b border-white/[0.07] px-4 py-3 sm:px-5'}>
            <span className={'size-2 rounded-full bg-white/15'} />
            <span className={'size-2 rounded-full bg-white/10'} />
            <span className={'size-2 rounded-full bg-white/10'} />
            <span className={'ml-3 font-mono text-[10px] text-gray-400'}>{'your-product.com/swap'}</span>
            <span className={'ml-auto flex items-center gap-1.5 text-[10px] font-medium text-[#70E1B1]'}>
              <span className={'size-1.5 rounded-full bg-[#70E1B1]'} />
              {'LIVE'}
            </span>
          </div>

          <div className={'relative min-h-[350px] overflow-hidden p-5 sm:p-7'}>
            <div className={'mb-5 flex items-center justify-between'}>
              <div className={'flex items-center gap-3'}>
                <div
                  className={
                    'grid size-8 place-items-center rounded-xl bg-white/[0.07] text-[11px] font-bold text-white'
                  }
                >
                  {'P'}
                </div>
                <div>
                  <div className={'text-xs font-semibold text-white'}>{'Partner product'}</div>
                  <div className={'text-[10px] text-gray-400'}>{'Swap embedded natively'}</div>
                </div>
              </div>
              <div className={'hidden items-center gap-4 text-[10px] text-gray-400 sm:flex'}>
                <span>{'Portfolio'}</span>
                <span className={'font-medium text-white'}>{'Swap'}</span>
                <span>{'Activity'}</span>
              </div>
            </div>

            <div className={'relative flex items-center justify-center'}>
              <motion.div
                animate={{ backgroundColor: preset.accent }}
                transition={{ duration: 0.55 }}
                className={'absolute inset-x-[12%] bottom-0 top-[18%] rounded-full opacity-10 blur-[70px]'}
              />
              <AnimatePresence mode={'wait'}>
                <motion.div
                  key={preset.name}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={
                    'relative w-full max-w-[390px] border border-black/[0.06] p-4 shadow-[0_24px_65px_rgba(0,0,0,.3)] sm:p-5'
                  }
                  style={{
                    backgroundColor: preset.surface,
                    borderRadius: preset.radius + 6,
                    color: preset.isLight ? '#10131A' : '#FFFFFF',
                  }}
                >
                  <div className={'mb-4 flex items-center justify-between'}>
                    <div>
                      <span className={'block text-sm font-semibold'}>{'Swap'}</span>
                      <span className={'text-[9px] opacity-40'}>{'Best route, one integration'}</span>
                    </div>
                    <span
                      className={'rounded-full px-2.5 py-1 text-[9px] font-medium'}
                      style={{
                        backgroundColor: preset.isLight ? '#EEF0F5' : preset.canvas,
                        color: preset.isLight ? '#5C6270' : '#A7ADBA',
                      }}
                    >
                      {'Embedded'}
                    </span>
                  </div>
                  <div className={'relative space-y-2'}>
                    {['You pay', 'You receive'].map((label, index) => (
                      <div
                        key={label}
                        className={'flex items-center justify-between px-4 py-4'}
                        style={{
                          backgroundColor: preset.isLight ? '#F0F2F7' : preset.canvas,
                          borderRadius: preset.radius,
                        }}
                      >
                        <span>
                          <span className={'block text-[10px] opacity-60'}>{label}</span>
                          <span className={'mt-1 block text-lg font-semibold'}>{index === 0 ? '1.50' : '0.07225'}</span>
                        </span>
                        <span
                          className={'flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold'}
                          style={{ backgroundColor: preset.surface }}
                        >
                          <img
                            src={index === 0 ? '/widget/eth_icon.png' : '/widget/btc_icon.png'}
                            alt={''}
                            className={'size-6'}
                          />
                          <span>
                            <span className={'block'}>{index === 0 ? 'ETH' : 'BTC'}</span>
                            <span className={'block text-[8px] font-normal opacity-40'}>
                              {index === 0 ? 'Ethereum' : 'Bitcoin'}
                            </span>
                          </span>
                        </span>
                      </div>
                    ))}
                    <motion.div
                      animate={{ rotate: [0, 180, 180, 360] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        times: [0, 0.42, 0.58, 1],
                      }}
                      className={
                        'absolute left-1/2 top-1/2 z-10 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border text-xs shadow-lg'
                      }
                      style={{
                        backgroundColor: preset.surface,
                        borderColor: `${preset.accent}55`,
                      }}
                    >
                      {'↕'}
                    </motion.div>
                  </div>
                  <div className={'mt-3 flex items-center justify-between text-[10px] opacity-60'}>
                    <span>{'Route ready'}</span>
                    <span>{'Est. network fee $1.42'}</span>
                  </div>
                  <div
                    className={'mt-3 py-3 text-center text-xs font-semibold text-white'}
                    style={{
                      backgroundColor: preset.accent,
                      borderRadius: preset.radius,
                    }}
                  >
                    {'Preview swap'}
                  </div>
                  <div className={'mt-3 text-center text-[9px] opacity-50'}>{'Routing powered by ShapeShift'}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className={'relative mt-7 flex justify-center lg:hidden'}>
        <Button
          href={'https://widget.shapeshift.com/'}
          variant={'blue'}
          title={ctaTitle}
          hasArrow
          className={'relative w-full max-w-[290px] !min-w-0 !justify-center [&_svg]:absolute [&_svg]:right-5'}
        />
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
          <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue'}>{widget.eyebrow}</div>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>
      <ThemeStudio ctaTitle={widget.ctaButton} />
    </section>
  )
}
