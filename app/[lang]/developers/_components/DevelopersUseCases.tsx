import Image from 'next/image'

import { Button } from '@/app/[lang]/_components/Button'
import { IconDollar } from '@/app/[lang]/_icons/IconDollar'
import { IconFox } from '@/app/[lang]/_icons/IconFox'
import { IconPercent } from '@/app/[lang]/_icons/IconPercent'
import { IconSwapCircle } from '@/app/[lang]/_icons/IconSwapCircle'

import type { ReactNode } from 'react'

// Card 1 — the point is containment: the swap lives inside the partner's own product frame,
// there's nothing to "redirect" away from because the user never leaves it.
function WalletVisual(): ReactNode {
  return (
    <div className={'grid h-36 grid-rows-[1fr_auto] items-center justify-items-center gap-2 px-5 pb-3 pt-5'}>
      <div
        className={
          'relative flex items-center justify-center rounded-2xl border border-dashed border-blue/25 px-8 py-5'
        }
      >
        <span className={'absolute -top-2.5 left-4 bg-[#161c2c] px-2 text-[10px] text-gray-500'}>{'Your product'}</span>
        <div className={'flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0D1220] px-4 py-2.5'}>
          <div className={'flex size-7 items-center justify-center rounded-full bg-blue/15 text-blueLight'}>
            <IconSwapCircle className={'size-4'} />
          </div>
          <span className={'text-xs font-semibold'}>{'ETH → BTC'}</span>
        </div>
      </div>
      <span className={'text-[10px] text-gray-500'}>{'Nothing to redirect to'}</span>
    </div>
  )
}

// Card 2 — one integration fans out to many real chains. Bitcoin/Ethereum/Solana are the real
// icon assets this repo already ships (/public/widget/); "+45" completes the real 48+ figure.
function ChainVisual(): ReactNode {
  return (
    <div className={'grid h-36 grid-rows-[1fr_auto] items-center justify-items-center gap-2 px-5 pt-5'}>
      <div className={'flex items-center gap-3'}>
        <div
          className={'flex size-11 shrink-0 items-center justify-center rounded-2xl border border-blue/20 bg-blue/10'}
        >
          <IconFox className={'size-5 text-blueLight'} />
        </div>
        <div className={'h-px w-6 bg-blue/25'} />
        <div className={'flex -space-x-2.5'}>
          <Image
            src={'/widget/btc_icon.png'}
            alt={'Bitcoin'}
            width={32}
            height={32}
            className={'rounded-full ring-2 ring-[#111522]'}
          />
          <Image
            src={'/widget/eth_icon.png'}
            alt={'Ethereum'}
            width={32}
            height={32}
            className={'rounded-full ring-2 ring-[#111522]'}
          />
          <Image
            src={'/widget/sol_icon.png'}
            alt={'Solana'}
            width={32}
            height={32}
            className={'rounded-full ring-2 ring-[#111522]'}
          />
          <div
            className={
              'flex size-8 items-center justify-center rounded-full bg-mint/15 text-[10px] font-semibold text-mint ring-2 ring-[#111522]'
            }
          >
            {'+45'}
          </div>
        </div>
      </div>
      <div className={'text-[10px] text-gray-500'}>{'One integration, every chain'}</div>
    </div>
  )
}

// Card 3 — a real causal sequence (swap happens, a fee is attributed, it settles to your
// wallet), so a 3-step flow is the right shape here, unlike cards 1 and 2. Icons and connecting
// lines sit in one grid row so they share the exact same vertical center — labels are a separate
// row below and can't pull the lines off-center.
function RevenueVisual(): ReactNode {
  const nodes = [
    { label: 'Every swap', icon: <IconSwapCircle className={'size-5'} />, final: false },
    { label: 'Your fee', icon: <IconPercent className={'size-4'} />, final: false },
    { label: 'Paid on-chain', icon: <IconDollar className={'size-4'} />, final: true },
  ] as const

  const iconCells = nodes.flatMap((node, index) => {
    const icon = (
      <div
        key={node.label}
        className={
          node.final
            ? 'flex size-11 items-center justify-center rounded-2xl border border-mint/25 bg-mint/10 text-mint'
            : 'flex size-11 items-center justify-center rounded-2xl border border-blue/20 bg-blue/10 text-blueLight'
        }
      >
        {node.icon}
      </div>
    )
    return index > 0 ? [<div key={`line-${node.label}`} className={'h-px bg-blue/25'} />, icon] : [icon]
  })

  return (
    <div className={'grid h-36 grid-rows-[1fr_auto] items-center justify-items-stretch gap-2 px-8 pt-5'}>
      <div className={'grid grid-cols-[auto_1fr_auto_1fr_auto] items-center'}>{iconCells}</div>
      <div className={'grid grid-cols-[auto_1fr_auto_1fr_auto]'}>
        <span className={'text-center text-[10px] text-gray-500'}>{nodes[0].label}</span>
        <span />
        <span className={'text-center text-[10px] text-gray-500'}>{nodes[1].label}</span>
        <span />
        <span className={'text-center text-[10px] text-gray-500'}>{nodes[2].label}</span>
      </div>
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
              <span className={'mb-5 block font-mono text-xs text-blueLight'}>{useCase.number}</span>
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
