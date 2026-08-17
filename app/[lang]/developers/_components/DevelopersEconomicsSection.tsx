'use client'

import { motion } from 'framer-motion'

import { Button } from '@/app/[lang]/_components/Button'
import { developerDocsUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import { SectionEyebrow } from './SectionEyebrow'

import type { ReactNode } from 'react'

const milestones = [
  {
    number: '01',
    icon: '</>',
    label: 'YOUR PRODUCT',
    title: 'Add your partner code',
    description: 'One parameter in the Widget or API.',
  },
  {
    number: '02',
    icon: '⇄',
    label: 'SHAPESHIFT ROUTING',
    title: 'We route every swap',
    description: 'The trade stays attributed to your product.',
  },
  {
    number: '03',
    icon: '$',
    label: 'YOUR WALLET',
    title: 'Your fee settles on-chain',
    description: 'Your share arrives with the transaction.',
  },
] as const

const desktopPositions = [
  { left: '10%', top: '23%' },
  { left: '50%', top: '68%' },
  { left: '90%', top: '23%' },
] as const

function MilestoneMarker({ index }: { index: number }): ReactNode {
  return (
    <div
      className={
        'relative flex size-16 items-center justify-center rounded-full bg-[#101521] shadow-[0_0_0_7px_rgba(56,111,249,.18),0_0_35px_rgba(56,111,249,.3)]'
      }
    >
      <div className={'flex size-12 items-center justify-center rounded-full bg-blue text-sm font-bold text-white'}>
        {milestones[index].icon}
      </div>
      <span
        className={
          'absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-mint font-mono text-[9px] font-bold text-[#07110C]'
        }
      >
        {milestones[index].number}
      </span>
    </div>
  )
}

function MilestoneCopy({ index }: { index: number }): ReactNode {
  const milestone = milestones[index]

  return (
    <div className={'w-[210px] max-w-full text-center'}>
      <div className={'mb-2 text-[9px] font-semibold tracking-[0.14em] text-blueLight'}>{milestone.label}</div>
      <h3 className={'mb-2 text-lg font-semibold tracking-[-0.025em]'}>{milestone.title}</h3>
      <p className={'text-xs leading-relaxed text-gray-400'}>{milestone.description}</p>
    </div>
  )
}

export function DevelopersEconomicsSection(): ReactNode {
  const { economics } = DEVELOPERS_DICT.page

  return (
    <section id={'economics'} className={'container pt-20 lg:pt-24'}>
      <div className={'mx-auto mb-10 max-w-[780px] text-center lg:mb-12'}>
        <SectionEyebrow>{economics.eyebrow}</SectionEyebrow>
        <h2 className={'mb-5 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
          {economics.title}
        </h2>
        <p className={'mx-auto max-w-[650px] text-lg leading-relaxed text-secondary'}>{economics.description}</p>
      </div>

      <div className={'relative overflow-hidden rounded-[32px] bg-[#101521] px-5 py-8 sm:px-8 lg:px-10'}>
        <div
          className={
            'pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:32px_32px]'
          }
        />
        <div
          className={
            'pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.08] blur-[110px]'
          }
        />
        <div className={'relative flex justify-center border-b border-white/[0.07] pb-5'}>
          <span className={'flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-mint'}>
            <span className={'size-1.5 rounded-full bg-mint shadow-[0_0_10px_#70E1B1]'} />
            {'Automatic · transparent · on-chain'}
          </span>
        </div>

        <div className={'relative hidden h-[470px] lg:block'}>
          <svg
            aria-hidden={'true'}
            viewBox={'0 0 1400 430'}
            preserveAspectRatio={'none'}
            className={'absolute inset-x-0 top-4 h-[420px] w-full overflow-visible'}
          >
            <defs>
              <linearGradient id={'economics-route'} x1={'0'} y1={'0'} x2={'1'} y2={'0'}>
                <stop offset={'0%'} stopColor={'#386FF9'} />
                <stop offset={'48%'} stopColor={'#70E1B1'} />
                <stop offset={'100%'} stopColor={'#386FF9'} />
              </linearGradient>
            </defs>
            <path
              d={'M140 90 H360 L520 292 H880 L1040 90 H1260'}
              fill={'none'}
              stroke={'rgba(255,255,255,.08)'}
              strokeWidth={'12'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
            />
            <motion.path
              d={'M140 90 H360 L520 292 H880 L1040 90 H1260'}
              fill={'none'}
              stroke={'url(#economics-route)'}
              strokeWidth={'4'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              strokeDasharray={'16 14'}
              animate={{ strokeDashoffset: [0, -60] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </svg>

          {milestones.map((milestone, index) => {
            const position = desktopPositions[index]
            return (
              <div
                key={milestone.number}
                className={'absolute -translate-x-1/2 -translate-y-1/2'}
                style={{ left: position.left, top: position.top }}
              >
                <MilestoneMarker index={index} />
                <div
                  className={
                    index !== 1
                      ? 'absolute left-1/2 top-[86px] -translate-x-1/2'
                      : 'absolute bottom-[86px] left-1/2 -translate-x-1/2'
                  }
                >
                  <MilestoneCopy index={index} />
                </div>
              </div>
            )
          })}
        </div>

        <div className={'relative mt-8 space-y-0 lg:hidden'}>
          <svg
            aria-hidden={'true'}
            viewBox={'0 0 120 600'}
            preserveAspectRatio={'none'}
            className={'absolute bottom-10 left-0 top-10 h-[calc(100%-5rem)] w-[92px]'}
          >
            <path
              d={'M42 0 V120 L74 170 V430 L42 480 V600'}
              fill={'none'}
              stroke={'rgba(255,255,255,.08)'}
              strokeWidth={'14'}
              strokeLinecap={'round'}
            />
            <motion.path
              d={'M42 0 V120 L74 170 V430 L42 480 V600'}
              fill={'none'}
              stroke={'url(#economics-route)'}
              strokeWidth={'5'}
              strokeLinecap={'round'}
              strokeDasharray={'18 15'}
              animate={{ strokeDashoffset: [0, -66] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          {milestones.map((milestone, index) => (
            <div key={milestone.number} className={'relative flex min-h-[170px] items-center gap-5'}>
              <div className={'relative z-10 shrink-0'}>
                <MilestoneMarker index={index} />
              </div>
              <div className={'flex min-w-0 flex-1 justify-center rounded-[20px] bg-[#171D2B] px-5 py-6'}>
                <MilestoneCopy index={index} />
              </div>
            </div>
          ))}
        </div>

        <div
          className={
            'relative flex flex-col gap-5 rounded-[22px] bg-[#090D14] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6'
          }
        >
          <div>
            <div className={'font-semibold'}>{'One integration. Revenue from every attributed swap.'}</div>
            <div className={'mt-1 text-sm text-gray-500'}>{'Real-time history · No invoices · No payout schedule'}</div>
          </div>
          <div className={'shrink-0 text-left sm:text-right'}>
            <div className={'text-[10px] uppercase tracking-[0.12em] text-gray-500'}>{'Partner fee'}</div>
            <div className={'mt-1 text-2xl font-semibold text-mint'}>{'0–100 bps'}</div>
          </div>
        </div>
      </div>

      <div className={'mt-7 flex justify-center'}>
        <Button
          href={`${developerDocsUrl}#tag/affiliate`}
          variant={'blue'}
          title={'Open the partner portal'}
          hasArrow
        />
      </div>
    </section>
  )
}
