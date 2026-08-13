'use client'

import { motion } from 'framer-motion'

import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

function WalletVisual(): ReactNode {
  return (
    <div className={'relative flex h-36 items-center justify-center overflow-hidden'}>
      <div className={'absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-blue/50 to-transparent'} />
      <div className={'relative w-[210px] rounded-[22px] border border-white/10 bg-[#0D1220] p-3 shadow-2xl'}>
        <div className={'mb-3 flex items-center justify-between'}>
          <span className={'text-[9px] font-semibold'}>{'Your wallet'}</span>
          <span className={'size-2 rounded-full bg-[#70E1B1]'} />
        </div>
        <div className={'flex items-center justify-between rounded-xl bg-blue/10 px-3 py-2'}>
          <span className={'text-[9px] text-gray-500'}>{'Swap'}</span>
          <span className={'text-[10px] font-semibold'}>{'ETH → BTC'}</span>
        </div>
        <motion.div
          animate={{ x: [0, 128, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className={'mt-3 size-2 rounded-full bg-blue shadow-[0_0_12px_#386FF9]'}
        />
      </div>
    </div>
  )
}

function ChainVisual(): ReactNode {
  return (
    <div className={'relative flex h-36 items-center justify-center'}>
      <svg aria-hidden={'true'} viewBox={'0 0 300 120'} className={'absolute inset-0 size-full'}>
        {['M52 60 H118 L155 22 H248', 'M52 60 H248', 'M52 60 H118 L155 98 H248'].map((path) => (
          <path key={path} d={path} fill={'none'} stroke={'rgba(56,111,249,.3)'} strokeWidth={'2'} />
        ))}
      </svg>
      <div
        className={'absolute left-[10%] flex size-11 items-center justify-center rounded-2xl bg-blue text-sm font-bold'}
      >
        {'API'}
      </div>
      {[
        ['₿', 'top-3'],
        ['Ξ', 'top-1/2 -translate-y-1/2'],
        ['◎', 'bottom-3'],
      ].map(([symbol, position], index) => (
        <motion.div
          key={symbol}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.8, delay: index * 0.45, repeat: Infinity }}
          className={`absolute right-[10%] flex size-11 items-center justify-center rounded-2xl border border-blue/25 bg-[#111A2B] text-lg shadow-xl ${position}`}
        >
          {symbol}
        </motion.div>
      ))}
      <motion.span
        animate={{ left: ['26%', '76%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className={'absolute top-[calc(50%-3px)] size-1.5 rounded-full bg-[#70E1B1] shadow-[0_0_10px_#70E1B1]'}
      />
    </div>
  )
}

function RevenueVisual(): ReactNode {
  return (
    <div className={'relative flex h-36 items-center justify-between px-8'}>
      {[
        ['01', 'USER'],
        ['02', 'SWAP'],
        ['03', 'WALLET'],
      ].map(([number, label], index) => (
        <div key={number} className={'relative z-10 text-center'}>
          <motion.div
            animate={
              index === 2
                ? {
                    boxShadow: [
                      '0 0 0 rgba(112,225,177,0)',
                      '0 0 24px rgba(112,225,177,.35)',
                      '0 0 0 rgba(112,225,177,0)',
                    ],
                  }
                : undefined
            }
            transition={{ duration: 2.6, repeat: Infinity }}
            className={
              index === 2
                ? 'mx-auto flex size-12 items-center justify-center rounded-2xl border border-[#70E1B1]/30 bg-[#10221C] font-mono text-xs text-[#70E1B1]'
                : 'mx-auto flex size-12 items-center justify-center rounded-2xl border border-blue/20 bg-blue/10 font-mono text-xs text-[#8FACFF]'
            }
          >
            {number}
          </motion.div>
          <div className={'mt-2 text-[8px] tracking-[0.12em] text-gray-600'}>{label}</div>
        </div>
      ))}
      <div
        className={'absolute left-[20%] right-[20%] top-[56px] h-px bg-gradient-to-r from-blue via-blue to-[#70E1B1]'}
      />
      <motion.div
        animate={{ left: ['20%', '78%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={'absolute top-[53px] size-2 rounded-full bg-[#70E1B1] shadow-[0_0_12px_#70E1B1]'}
      />
    </div>
  )
}

const useCases = [
  {
    number: '01',
    eyebrow: 'Wallets & apps',
    title: 'Keep users in your product',
    description: 'Offer native swaps without redirecting users or giving up your brand experience.',
    visual: <WalletVisual />,
  },
  {
    number: '02',
    eyebrow: 'Chains & protocols',
    title: 'Bring liquidity to your ecosystem',
    description: 'Give users a direct multichain route into your chain, token, or protocol.',
    visual: <ChainVisual />,
  },
  {
    number: '03',
    eyebrow: 'Partners',
    title: 'Turn usage into revenue',
    description: 'Set your fee, attribute every trade, and grow with transparent on-chain economics.',
    visual: <RevenueVisual />,
  },
] as const

export function DevelopersUseCases(): ReactNode {
  return (
    <section className={'container pt-20 lg:pt-24'}>
      <div className={'mb-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end'}>
        <div>
          <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue'}>
            {'Built to collaborate'}
          </div>
          <h2 className={'max-w-[760px] text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[58px]'}>
            {'Your product. Our routing. Shared growth.'}
          </h2>
        </div>
        <p className={'max-w-[500px] text-lg leading-relaxed text-secondary lg:justify-self-end'}>
          {
            'A flexible integration model for teams who want a better swap experience and a business model that scales with it.'
          }
        </p>
      </div>

      <div className={'grid gap-4 lg:grid-cols-3'}>
        {useCases.map((useCase) => (
          <article
            key={useCase.number}
            className={
              'group overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#111522] p-3 transition-transform duration-300 hover:-translate-y-1'
            }
          >
            <div className={'rounded-[24px] bg-gradient-to-b from-blue/[0.16] to-blue/[0.03]'}>{useCase.visual}</div>
            <div className={'p-5 pb-6 sm:p-6'}>
              <div className={'mb-7 flex items-center justify-between'}>
                <span className={'font-mono text-xs text-[#8FACFF]'}>{useCase.number}</span>
                <span className={'text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'}>
                  {useCase.eyebrow}
                </span>
              </div>
              <h3 className={'mb-3 text-2xl font-semibold leading-tight tracking-[-0.025em]'}>{useCase.title}</h3>
              <p className={'text-[15px] leading-relaxed text-gray-400'}>{useCase.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={'mt-7 flex justify-center'}>
        <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={'Explore a partnership'} hasArrow />
      </div>
    </section>
  )
}
