import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

function WalletVisual(): ReactNode {
  return (
    <div className={'flex h-28 items-center justify-center'}>
      <div className={'relative h-20 w-32 rounded-[22px] border border-blue/25 bg-blue/10'}>
        <div className={'absolute left-5 top-5 h-2 w-14 rounded-full bg-white/15'} />
        <div className={'absolute bottom-4 left-5 h-2 w-8 rounded-full bg-blue/60'} />
        <div
          className={
            'absolute -right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-2xl bg-blue shadow-xl'
          }
        >
          {'↔'}
        </div>
      </div>
    </div>
  )
}

function ChainVisual(): ReactNode {
  return (
    <div className={'relative flex h-28 items-center justify-center gap-7'}>
      {['₿', 'Ξ', '◎'].map((symbol, index) => (
        <div
          key={symbol}
          className={`flex size-14 items-center justify-center rounded-2xl border border-blue/20 text-xl shadow-xl ${
            index === 1 ? 'bg-blue/20' : 'bg-blue/10'
          }`}
        >
          {symbol}
        </div>
      ))}
      <div className={'absolute left-[31%] top-1/2 h-px w-[38%] bg-gradient-to-r from-blue via-[#70E1B1] to-blue'} />
    </div>
  )
}

function RevenueVisual(): ReactNode {
  return (
    <div className={'flex h-28 items-end justify-center gap-2 pb-2'}>
      {[38, 54, 44, 72, 92].map((height, index) => (
        <div
          key={height}
          style={{ height }}
          className={`w-7 rounded-t-lg ${index === 4 ? 'bg-blue shadow-[0_0_24px_rgba(56,111,249,.35)]' : 'bg-blue/20'}`}
        />
      ))}
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
