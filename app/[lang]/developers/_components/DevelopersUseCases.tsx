import Image from 'next/image'

import { Button } from '@/app/[lang]/_components/Button'
import { IconChains } from '@/app/[lang]/_icons/IconChains'
import { IconCheckCircle } from '@/app/[lang]/_icons/IconCheckCircle'
import { IconDapp } from '@/app/[lang]/_icons/IconDapp'
import { IconDollar } from '@/app/[lang]/_icons/IconDollar'
import { IconTrade } from '@/app/[lang]/_icons/IconTrade'
import { IconWallet } from '@/app/[lang]/_icons/IconWallet'
import { cl } from '@/app/[lang]/_utils/cl'

import type { ReactNode } from 'react'

type TFlowNode = {
  label: string
  icon: ReactNode
  final?: boolean
}

function FlowRow({ nodes }: { nodes: TFlowNode[] }): ReactNode {
  return (
    <div className={'flex h-36 items-center justify-center gap-2'}>
      {nodes.map((node, index) => (
        <div key={node.label} className={'flex items-center'}>
          {index > 0 ? <div className={'h-px w-6 bg-blue/25 sm:w-10'} /> : null}
          <div className={'flex flex-col items-center gap-2'}>
            <div
              className={cl(
                'flex size-11 items-center justify-center rounded-2xl border',
                node.final ? 'border-mint/25 bg-mint/10' : 'border-blue/20 bg-blue/10'
              )}
            >
              {node.icon}
            </div>
            <span className={'whitespace-nowrap text-[10px] text-gray-500'}>{node.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function WalletVisual(): ReactNode {
  return (
    <FlowRow
      nodes={[
        { label: 'Your product', icon: <IconDapp className={'size-5'} /> },
        { label: 'Swap', icon: <IconTrade className={'size-5'} /> },
        { label: 'No redirect', icon: <IconCheckCircle className={'size-5'} />, final: true },
      ]}
    />
  )
}

function ChainVisual(): ReactNode {
  return (
    <FlowRow
      nodes={[
        { label: 'Your chain', icon: <IconChains className={'size-5'} /> },
        { label: 'ShapeShift', icon: <IconTrade className={'size-5'} /> },
        {
          label: '48+ chains',
          final: true,
          icon: (
            <div className={'flex -space-x-1.5'}>
              <Image
                src={'/widget/btc_icon.png'}
                alt={''}
                width={16}
                height={16}
                className={'rounded-full ring-2 ring-[#111522]'}
              />
              <Image
                src={'/widget/eth_icon.png'}
                alt={''}
                width={16}
                height={16}
                className={'rounded-full ring-2 ring-[#111522]'}
              />
              <Image
                src={'/widget/sol_icon.png'}
                alt={''}
                width={16}
                height={16}
                className={'rounded-full ring-2 ring-[#111522]'}
              />
            </div>
          ),
        },
      ]}
    />
  )
}

function RevenueVisual(): ReactNode {
  return (
    <FlowRow
      nodes={[
        { label: 'User', icon: <IconWallet className={'size-5'} /> },
        { label: 'Swap', icon: <IconTrade className={'size-5'} /> },
        { label: 'Your wallet', icon: <IconDollar className={'size-5'} />, final: true },
      ]}
    />
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
              <div className={'mb-7 flex items-center justify-between'}>
                <span className={'font-mono text-xs text-blueLight'}>{useCase.number}</span>
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
