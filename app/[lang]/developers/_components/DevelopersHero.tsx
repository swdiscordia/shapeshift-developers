'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'

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
        'relative z-20 w-full max-w-[480px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0A0A14] shadow-[0_35px_100px_rgba(0,0,0,.58),0_0_80px_rgba(56,111,249,.12)]'
      }
    >
      <div className={'flex items-center justify-between border-b border-white/[0.08] px-5 py-5 sm:px-6'}>
        <div className={'text-lg font-semibold'}>{'Swap'}</div>
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
              'flex size-10 items-center justify-center rounded-xl text-xl text-gray-400 hover:bg-white/5 hover:text-white'
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
          <span className={'rounded-lg bg-blue/15 px-3 py-1.5 font-semibold text-[#9CB5FF]'}>{'Auto · 0.5%'}</span>
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
              'absolute -top-5 z-10 flex size-10 items-center justify-center rounded-xl border-4 border-[#0A0A14] bg-[#151522] text-[#A9C0FF] shadow-xl transition-transform hover:rotate-180'
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
  return (
    <section className={'relative overflow-hidden pb-16 pt-5 lg:pb-20 lg:pt-4'}>
      <div
        className={'pointer-events-none absolute right-[8%] top-24 size-[600px] rounded-full bg-blue/14 blur-[150px]'}
      />

      <div className={'container relative grid items-start gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-12'}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={'lg:pt-8'}
        >
          <div
            className={
              'mb-6 inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B5C8FF]'
            }
          >
            <span className={'size-2 rounded-full bg-[#70E1B1] shadow-[0_0_12px_#70E1B1]'} />
            {'ShapeShift Widget + API'}
          </div>
          <h1 className={'mb-7 text-[50px] font-bold leading-[.98] tracking-[-0.05em] sm:text-[64px] lg:text-[76px]'}>
            {'Multichain swaps, '}
            <span className={'bg-gradient-to-r from-[#BFD0FF] to-blue bg-clip-text text-transparent'}>
              {'ready to ship.'}
            </span>
          </h1>
          <p className={'mb-9 max-w-[620px] text-lg leading-relaxed text-secondary sm:text-xl'}>
            {
              'Embed the Widget in minutes or build your own experience with the API. ShapeShift handles routing and maintenance—you own the experience and the revenue.'
            }
          </p>
          <div className={'mb-8 flex flex-col gap-3 sm:flex-row'}>
            <Button href={'#widget'} variant={'blue'} title={'Explore the Widget'} hasArrow />
            <Button href={'#api'} variant={'white'} title={'Explore the API'} />
          </div>
          <div className={'flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400'}>
            {['48+ chains', 'Non-custodial', 'Revenue share'].map((benefit) => (
              <span key={benefit} className={'flex items-center gap-2'}>
                <span className={'size-1.5 rounded-full bg-blue'} />
                {benefit}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={
            'relative mx-auto flex min-h-[720px] w-full max-w-[720px] items-center justify-center px-2 py-20 lg:min-h-[610px] lg:px-[136px] lg:py-0'
          }
        >
          <div className={'pointer-events-none absolute inset-[10%] rounded-full bg-blue/16 blur-[80px]'} />
          <InteractiveSwapper />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'absolute left-2 top-3 z-30 w-[142px] -rotate-2 rounded-2xl border border-white/10 bg-[#111827] p-3.5 shadow-2xl sm:left-8 lg:left-0 lg:top-[14%] lg:w-[150px] lg:p-4'
            }
          >
            <div className={'mb-2 font-mono text-[11px] text-gray-400'}>{'POST /swap/quote'}</div>
            <div className={'font-mono text-xs font-semibold text-[#70E1B1]'}>{'200 · route ready'}</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'absolute bottom-3 right-2 z-30 w-[142px] rotate-2 rounded-2xl border border-white/10 bg-[#111827] p-3.5 shadow-2xl sm:right-8 lg:bottom-[14%] lg:right-0 lg:w-[150px] lg:p-4'
            }
          >
            <div className={'mb-1 text-[11px] uppercase tracking-[0.12em] text-gray-400'}>{'Partner earnings'}</div>
            <div className={'text-xl font-semibold text-[#A9C0FF]'}>{'+ 25 bps'}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
