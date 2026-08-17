'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'

import { SectionEyebrow } from './SectionEyebrow'

import type { ReactNode } from 'react'

const assets = {
  ETH: { name: 'Ethereum', icon: '/widget/eth_icon.png', usd: 3494.4 },
  BTC: { name: 'Bitcoin', icon: '/widget/btc_icon.png', usd: 72400 },
  USDC: { name: 'Ethereum', icon: null, usd: 1 },
} as const

type TAsset = keyof typeof assets

const assetOrder = Object.keys(assets) as TAsset[]

function AssetSelector({ asset, onClick }: { asset: TAsset; onClick: () => void }): ReactNode {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={
        'flex shrink-0 items-center gap-2.5 rounded-xl bg-[#080912] px-3 py-2 transition-colors hover:bg-[#10121D]'
      }
    >
      {assets[asset].icon ? (
        <Image src={assets[asset].icon} alt={assets[asset].name} width={32} height={32} className={'rounded-full'} />
      ) : (
        <span className={'flex size-8 items-center justify-center rounded-full bg-[#2775CA] text-sm font-bold'}>
          {'$'}
        </span>
      )}
      <div className={'text-left'}>
        <div className={'text-sm font-semibold'}>{asset}</div>
        <div className={'text-[10px] text-gray-500'}>{assets[asset].name}</div>
      </div>
      <span className={'text-xs text-gray-500'}>{'›'}</span>
    </button>
  )
}

function InteractiveSwapper(): ReactNode {
  const shouldReduceMotion = useReducedMotion()
  const [sellAsset, setSellAsset] = useState<TAsset>('ETH')
  const [buyAsset, setBuyAsset] = useState<TAsset>('USDC')
  const [amount, setAmount] = useState<string>('1.50')
  const [isConnected, setIsConnected] = useState(false)
  const [isShowingSettings, setIsShowingSettings] = useState(false)
  const parsedAmount = Number.parseFloat(amount) || 0
  const output = useMemo(
    () => ((parsedAmount * assets[sellAsset].usd) / assets[buyAsset].usd) * 0.998,
    [buyAsset, parsedAmount, sellAsset]
  )

  const cycleAsset = (current: TAsset, blocked: TAsset): TAsset => {
    const currentIndex = assetOrder.indexOf(current)
    return (
      assetOrder.find((item, index) => index > currentIndex && item !== blocked) ??
      assetOrder.find((item) => item !== blocked) ??
      current
    )
  }

  const switchAssets = (): void => {
    setSellAsset(buyAsset)
    setBuyAsset(sellAsset)
  }

  return (
    <div
      className={
        'relative z-20 w-full max-w-[480px] overflow-hidden rounded-[28px] border border-blue/30 bg-[#0A0A14] shadow-[0_35px_100px_rgba(0,0,0,.62),0_0_90px_rgba(56,111,249,.3)]'
      }
    >
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: ['-110%', '420%'] }}
        transition={
          shouldReduceMotion ? undefined : { duration: 4.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }
        }
        className={
          'pointer-events-none absolute left-0 top-0 z-30 h-px w-1/4 bg-gradient-to-r from-transparent via-mint to-transparent'
        }
      />
      <div className={'flex items-center justify-between border-b border-white/[0.08] px-5 py-5 sm:px-6'}>
        <div>
          <div className={'text-lg font-semibold'}>{'ShapeShift Widget'}</div>
          <div className={'mt-0.5 flex items-center gap-1.5 text-[10px] text-gray-500'}>
            <span className={'size-1.5 rounded-full bg-mint shadow-[0_0_7px_#70E1B1]'} />
            {'Live product demo'}
          </div>
        </div>
        <div className={'flex items-center gap-2'}>
          <button
            type={'button'}
            onClick={() => setIsConnected((value) => !value)}
            className={'rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold hover:bg-white/5'}
          >
            {isConnected ? 'Connected' : 'Connect'}
          </button>
          <button
            type={'button'}
            aria-label={'Widget settings'}
            onClick={() => setIsShowingSettings((value) => !value)}
            className={
              'flex size-11 items-center justify-center rounded-xl text-xl text-gray-400 hover:bg-white/5 hover:text-white'
            }
          >
            {'⚙'}
          </button>
        </div>
      </div>

      {isShowingSettings ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={
            'mx-5 mt-5 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#11121C] px-4 py-3 text-xs'
          }
        >
          <span className={'text-gray-400'}>{'Slippage tolerance'}</span>
          <span className={'rounded-lg bg-blue/15 px-3 py-1.5 font-semibold text-blueLight'}>{'Auto · 0.5%'}</span>
        </motion.div>
      ) : null}

      <div className={'space-y-2 p-4 sm:p-5'}>
        <label className={'block rounded-[20px] border border-white/[0.06] bg-[#151522] p-4 sm:p-5'}>
          <span className={'mb-3 block text-xs text-gray-400'}>{'Sell'}</span>
          <span className={'flex items-center justify-between gap-3'}>
            <input
              aria-label={'Swap amount'}
              inputMode={'decimal'}
              value={amount}
              onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ''))}
              className={'min-w-0 flex-1 bg-transparent text-3xl font-medium tracking-[-0.03em] outline-none'}
            />
            <AssetSelector asset={sellAsset} onClick={() => setSellAsset(cycleAsset(sellAsset, buyAsset))} />
          </span>
          <span className={'mt-3 block text-xs text-gray-500'}>
            {`$${(parsedAmount * assets[sellAsset].usd).toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
          </span>
        </label>

        <div className={'relative flex justify-center'}>
          <button
            type={'button'}
            aria-label={'Switch assets'}
            onClick={switchAssets}
            className={
              'absolute -top-5 z-10 flex size-11 items-center justify-center rounded-xl border-4 border-[#0A0A14] bg-[#151522] text-blueLight shadow-xl transition-transform hover:rotate-180'
            }
          >
            {'⇅'}
          </button>
        </div>

        <div className={'rounded-[20px] border border-white/[0.06] bg-[#151522] p-4 sm:p-5'}>
          <div className={'mb-3 text-xs text-gray-400'}>{'Buy'}</div>
          <div className={'flex items-center justify-between gap-3'}>
            <span className={'min-w-0 flex-1 truncate text-3xl font-medium tracking-[-0.03em]'}>
              {output.toLocaleString('en-US', { maximumFractionDigits: buyAsset === 'USDC' ? 2 : 6 })}
            </span>
            <AssetSelector asset={buyAsset} onClick={() => setBuyAsset(cycleAsset(buyAsset, sellAsset))} />
          </div>
          <div className={'mt-3 text-xs text-gray-500'}>
            {`$${(output * assets[buyAsset].usd).toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
          </div>
        </div>
        <div className={'flex items-center justify-between px-1 pt-2 text-xs text-gray-500'}>
          <span>{'Est. network fee'}</span>
          <span>{'$1.42'}</span>
        </div>
      </div>
      <button
        type={'button'}
        onClick={() => setIsConnected(true)}
        className={
          'mx-4 mb-4 w-[calc(100%-2rem)] rounded-2xl bg-blue py-4 text-sm font-semibold transition-colors hover:bg-blueHover sm:mx-5 sm:mb-5 sm:w-[calc(100%-2.5rem)]'
        }
      >
        {isConnected ? 'Review swap' : 'Connect Wallet'}
      </button>
      <div className={'border-t border-white/[0.08] py-4 text-center text-[11px] text-gray-600'}>
        {'Powered by '}
        <span className={'font-semibold text-blue'}>{'ShapeShift'}</span>
      </div>
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
            'relative mx-auto flex min-h-[650px] min-w-0 w-full max-w-[720px] items-center justify-center px-2 py-20 lg:min-h-[570px] lg:px-[136px] lg:py-0'
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
          <InteractiveSwapper />

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'absolute left-2 top-4 z-30 hidden w-[142px] -rotate-2 rounded-2xl border border-blue/30 bg-[#111827]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,.45),0_0_30px_rgba(56,97,251,.18)] backdrop-blur-xl sm:block sm:left-8 lg:-left-2 lg:top-[12%] lg:w-[160px] lg:p-4'
            }
          >
            <div className={'mb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500 lg:text-[10px]'}>
              {'Smart routing'}
            </div>
            <div className={'text-[11px] font-semibold text-white lg:text-xs'}>{'18 routes compared'}</div>
            <div className={'mt-2 flex items-center gap-1.5 text-[9px] text-mint lg:text-[10px]'}>
              <span className={'size-1.5 rounded-full bg-mint'} />
              {'Best price selected'}
            </div>
          </motion.div>

          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'absolute bottom-4 right-2 z-30 hidden rounded-2xl border border-mint/25 bg-[#101A18]/95 px-3.5 py-3 shadow-[0_20px_50px_rgba(0,0,0,.4),0_0_30px_rgba(112,225,177,.1)] backdrop-blur-xl sm:block sm:right-8 lg:bottom-[10%] lg:-right-2 lg:px-4'
            }
          >
            <div className={'text-[9px] uppercase tracking-[0.12em] text-gray-500 lg:text-[10px]'}>{'Integration'}</div>
            <div className={'mt-1 text-[11px] font-semibold text-white lg:text-xs'}>{'Ready to embed'}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
