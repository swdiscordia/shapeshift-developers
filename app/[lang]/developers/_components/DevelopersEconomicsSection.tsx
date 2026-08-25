import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

const milestones = [
  {
    icon: '</>',
    label: 'Your product',
    title: 'Add your partner code',
    description: 'One parameter in the Widget or API.',
  },
  {
    icon: '⇄',
    label: 'ShapeShift',
    title: 'We route every swap',
    description: 'The trade stays attributed to your product.',
  },
  {
    icon: '$',
    label: 'Your wallet',
    title: 'Your fee settles on-chain',
    description: 'Your share arrives with the transaction.',
  },
] as const

function MilestoneMarker({ index }: { index: number }): ReactNode {
  return (
    <div
      className={
        'relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#101521]'
      }
    >
      <div className={'flex size-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white'}>
        {milestones[index].icon}
      </div>
    </div>
  )
}

function MilestoneCopy({ index }: { index: number }): ReactNode {
  const milestone = milestones[index]

  return (
    <div className={'max-w-[200px] text-center'}>
      <div className={'mb-1.5 text-xs text-gray-500'}>{milestone.label}</div>
      <h3 className={'mb-1.5 text-lg font-semibold tracking-[-0.025em]'}>{milestone.title}</h3>
      <p className={'text-xs leading-relaxed text-gray-400'}>{milestone.description}</p>
    </div>
  )
}

export function DevelopersEconomicsSection(): ReactNode {
  const { economics } = DEVELOPERS_DICT.page

  return (
    <section id={'economics'} className={'container pt-16 lg:pt-20'}>
      <div className={'mx-auto mb-10 max-w-[780px] text-center lg:mb-12'}>
        <h2 className={'mb-5 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
          {economics.title}
        </h2>
        <p className={'mx-auto max-w-[650px] text-lg leading-relaxed text-secondary'}>{economics.description}</p>
      </div>

      <div className={'relative overflow-hidden rounded-[32px] bg-[#101521] px-5 py-10 sm:px-8 lg:px-10'}>
        <div
          className={
            'pointer-events-none absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.06] blur-[120px]'
          }
        />

        <div className={'relative hidden items-start justify-between gap-6 lg:flex'}>
          <div
            className={
              'pointer-events-none absolute left-[60px] right-[60px] top-7 h-px bg-gradient-to-r from-blue via-blue to-mint opacity-40'
            }
          />
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className={'relative z-10 flex flex-1 flex-col items-center gap-5'}>
              <MilestoneMarker index={index} />
              <MilestoneCopy index={index} />
            </div>
          ))}
        </div>

        <div className={'relative flex flex-col gap-6 lg:hidden'}>
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className={'relative flex items-start gap-4'}>
              {index < milestones.length - 1 ? (
                <div className={'absolute left-7 top-14 h-6 w-px bg-gradient-to-b from-blue/40 to-mint/40'} />
              ) : null}
              <MilestoneMarker index={index} />
              <div className={'flex-1 pt-2 text-left'}>
                <div className={'mb-1 text-xs text-gray-500'}>{milestone.label}</div>
                <h3 className={'mb-1 text-base font-semibold tracking-[-0.02em]'}>{milestone.title}</h3>
                <p className={'text-xs leading-relaxed text-gray-400'}>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={
            'relative mt-10 flex flex-col gap-5 rounded-[22px] bg-[#090D14] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6'
          }
        >
          <div className={'font-semibold'}>{'One integration. Revenue from every attributed swap.'}</div>
          <div className={'shrink-0 text-left sm:text-right'}>
            <div className={'text-[10px] uppercase tracking-[0.12em] text-gray-500'}>{'Partner fee'}</div>
            <div className={'mt-1 text-2xl font-semibold text-mint'}>{'0 to 100 bps'}</div>
          </div>
        </div>
      </div>

      <div className={'mt-7 flex justify-center'}>
        <Button
          href={'https://dashboard.affiliate.shapeshift.com/'}
          variant={'blue'}
          title={'Open the partner portal'}
          hasArrow
        />
      </div>
    </section>
  )
}
