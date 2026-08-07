'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const assets = [
  { symbol: 'ETH', name: 'Ethereum', icon: '/widget/eth_icon.png', price: 3494.4 },
  { symbol: 'USDC', name: 'Ethereum', icon: null, price: 1 },
  { symbol: 'BTC', name: 'Bitcoin', icon: '/widget/btc_icon.png', price: 72400 },
] as const

const demos = [
  { name: 'ShapeShift blue', accent: '#3861FB', sell: 0, buy: 1, radius: 18, isLight: false },
  { name: 'Partner light', accent: '#9D63EC', sell: 1, buy: 2, radius: 26, isLight: true },
  { name: 'Growth green', accent: '#4BC47F', sell: 2, buy: 0, radius: 12, isLight: false },
] as const

function AssetBadge({ index, isLight }: { index: number; isLight: boolean }): ReactNode {
  const asset = assets[index]
  return (
    <div
      className={
        isLight
          ? 'flex shrink-0 items-center gap-2 rounded-xl bg-white px-3 py-2 text-left shadow-sm'
          : 'flex shrink-0 items-center gap-2 rounded-xl bg-[#090A12] px-3 py-2 text-left'
      }
    >
      {asset.icon ? (
        <Image src={asset.icon} alt={asset.name} width={34} height={34} className={'rounded-full'} />
      ) : (
        <span className={'flex size-[34px] items-center justify-center rounded-full bg-[#2775CA] text-sm font-bold'}>
          {'$'}
        </span>
      )}
      <span>
        <span className={'block text-sm font-semibold'}>{asset.symbol}</span>
        <span className={'block text-[10px] text-gray-500'}>{asset.name}</span>
      </span>
    </div>
  )
}

function AnimatedWidgetPreview({ ctaTitle }: { ctaTitle: string }): ReactNode {
  const [demoIndex, setDemoIndex] = useState(0)
  const [amount, setAmount] = useState('1.5')
  const [isConnected, setIsConnected] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const demo = demos[demoIndex]
  const widgetBackground = demo.isLight ? '#F7F8FB' : '#0A0A14'
  const panelBackground = demo.isLight ? '#EDEFF4' : '#12121C'
  const widgetText = demo.isLight ? '#11131A' : '#FFFFFF'
  const parsedAmount = Number.parseFloat(amount) || 0
  const output = useMemo(
    () => (parsedAmount * assets[demo.sell].price * 0.998) / assets[demo.buy].price,
    [demo.buy, demo.sell, parsedAmount]
  )

  useEffect(() => {
    if (hasInteracted) return undefined
    const intervalDuration = window.matchMedia('(min-width: 1024px)').matches ? 2900 : 3800
    const interval = window.setInterval(() => setDemoIndex((index) => (index + 1) % demos.length), intervalDuration)
    return () => window.clearInterval(interval)
  }, [hasInteracted])

  const selectDemo = (index: number): void => {
    setHasInteracted(true)
    setDemoIndex(index)
  }

  return (
    <div className={'relative overflow-hidden rounded-[32px] bg-[#0D1019] px-5 py-8 sm:px-8 lg:px-12 lg:py-12'}>
      <motion.div
        animate={{ backgroundColor: demo.accent }}
        transition={{ duration: 0.7 }}
        className={
          'pointer-events-none absolute right-[8%] top-1/2 size-[420px] -translate-y-1/2 rounded-full opacity-[0.12] blur-[110px]'
        }
      />
      <div className={'relative grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14'}>
        <div>
          <div
            className={
              'mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#70E1B1]'
            }
          >
            <span className={'size-1.5 rounded-full bg-[#70E1B1] shadow-[0_0_9px_#70E1B1]'} />
            {'Live widget preview'}
          </div>
          <h3 className={'mb-4 max-w-[430px] text-[34px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[44px]'}>
            {'Your brand. The same powerful routing.'}
          </h3>
          <p className={'mb-7 max-w-[440px] text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {
              'See how the embedded swap experience adapts instantly. Open the sandbox when you are ready to configure every detail.'
            }
          </p>
          <div className={'flex flex-wrap gap-2'}>
            {demos.map((item, index) => (
              <button
                key={item.name}
                type={'button'}
                onClick={() => selectDemo(index)}
                className={
                  index === demoIndex
                    ? 'flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] text-white'
                    : 'flex items-center gap-2 rounded-full px-3 py-2 text-[11px] text-gray-500 hover:bg-white/5'
                }
              >
                <span className={'size-2 rounded-full'} style={{ backgroundColor: item.accent }} />
                {item.name}
              </button>
            ))}
          </div>
          <div className={'mt-6 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.1em] text-gray-500'}>
            <span>{`${assets[demo.sell].symbol} → ${assets[demo.buy].symbol}`}</span>
            <span>{'·'}</span>
            <span>{`${demo.radius}px radius`}</span>
            <span>{'·'}</span>
            <span>{'Non-custodial'}</span>
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

        <motion.div
          layout
          animate={{ backgroundColor: widgetBackground, color: widgetText }}
          transition={{ duration: 0.5 }}
          className={'relative mx-auto w-full max-w-[500px] p-4 shadow-[0_35px_90px_rgba(0,0,0,.5)] sm:p-5'}
          style={{ borderRadius: demo.radius + 8 }}
        >
          <div className={'mb-4 flex items-center justify-between border-b border-white/[0.08] pb-4'}>
            <span className={'font-semibold'}>{'Swap'}</span>
            <button
              type={'button'}
              onClick={() => {
                setHasInteracted(true)
                setIsConnected((value) => !value)
              }}
              className={'rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold'}
            >
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
          <AnimatePresence mode={'wait'}>
            <motion.div
              key={`${demo.sell}-${demo.buy}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <label className={'block p-4'} style={{ borderRadius: demo.radius, backgroundColor: panelBackground }}>
                <span className={'mb-3 block text-xs opacity-55'}>{'Sell'}</span>
                <span className={'flex items-center justify-between gap-3'}>
                  <input
                    aria-label={'Animated widget amount'}
                    inputMode={'decimal'}
                    value={amount}
                    onChange={(event) => {
                      setHasInteracted(true)
                      setAmount(event.target.value.replace(/[^0-9.]/g, ''))
                    }}
                    className={'min-w-0 flex-1 bg-transparent text-3xl font-medium outline-none'}
                  />
                  <AssetBadge index={demo.sell} isLight={demo.isLight} />
                </span>
                <span
                  className={'mt-2 block text-xs opacity-45'}
                >{`$${(parsedAmount * assets[demo.sell].price).toLocaleString('en-US', { maximumFractionDigits: 2 })}`}</span>
              </label>
              <div className={'relative z-10 flex h-3 justify-center'}>
                <button
                  type={'button'}
                  aria-label={'Change widget pair'}
                  onClick={() => selectDemo((demoIndex + 1) % demos.length)}
                  className={'absolute -top-[17px] flex size-10 items-center justify-center border-4 text-sm'}
                  style={{
                    borderRadius: Math.max(10, demo.radius - 4),
                    borderColor: widgetBackground,
                    backgroundColor: panelBackground,
                  }}
                >
                  {'↓'}
                </button>
              </div>
              <div className={'p-4'} style={{ borderRadius: demo.radius, backgroundColor: panelBackground }}>
                <div className={'mb-3 text-xs opacity-55'}>{'Buy'}</div>
                <div className={'flex items-center justify-between gap-3'}>
                  <span className={'min-w-0 flex-1 truncate text-3xl font-medium'}>
                    {output.toLocaleString('en-US', { maximumFractionDigits: assets[demo.buy].price === 1 ? 2 : 6 })}
                  </span>
                  <AssetBadge index={demo.buy} isLight={demo.isLight} />
                </div>
                <div
                  className={'mt-2 text-xs opacity-45'}
                >{`$${(output * assets[demo.buy].price).toLocaleString('en-US', { maximumFractionDigits: 2 })}`}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={'mt-4 flex justify-between text-xs opacity-45'}>
            <span>{'Est. network fee'}</span>
            <span>{'$1.42'}</span>
          </div>
          <motion.button
            type={'button'}
            animate={{ backgroundColor: demo.accent, borderRadius: demo.radius }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              setHasInteracted(true)
              setIsConnected(true)
            }}
            className={'mt-3 w-full py-4 text-sm font-semibold'}
          >
            {isConnected ? 'Review swap' : 'Connect Wallet'}
          </motion.button>
          <div className={'mt-4 text-center text-[10px] text-gray-600'}>
            {'Powered by '}
            <span className={'font-semibold'} style={{ color: demo.accent }}>
              {'ShapeShift'}
            </span>
          </div>
        </motion.div>
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
    <section id={'widget'} className={'container pt-20 lg:pt-24'}>
      <div className={'mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue'}>{widget.eyebrow}</div>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>
      <AnimatedWidgetPreview ctaTitle={widget.ctaButton} />
    </section>
  )
}
