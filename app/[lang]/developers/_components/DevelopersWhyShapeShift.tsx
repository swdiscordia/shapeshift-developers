import { ShapeshiftLogo } from '@/app/[lang]/_icons/ShapeshiftLogo'

import type { ReactNode } from 'react'

const principles = [
  ['Community-owned', 'Governed by the ShapeShift DAO and built in public.'],
  ['Non-custodial', 'Users sign in their wallet. ShapeShift never holds funds.'],
  ['Protocol agnostic', 'One integration keeps gaining routes as the ecosystem grows.'],
] as const

function RouterIllustration(): ReactNode {
  return (
    <div className={'rounded-[30px] border border-white/[0.06] bg-[#0D111A] p-6 sm:p-8'}>
      <div className={'relative flex flex-col items-stretch gap-0 sm:flex-row sm:items-center sm:gap-0'}>
        <div
          className={
            'pointer-events-none absolute left-1/2 top-1/2 hidden size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.08] blur-[70px] sm:block'
          }
        />

        <div className={'relative z-10 rounded-[16px] border border-white/[0.08] bg-[#171D2B] px-4 py-3 sm:flex-1'}>
          <div className={'text-xs text-gray-500'}>{'Request'}</div>
          <div className={'mt-1 text-xs font-semibold'}>{'Your product'}</div>
        </div>

        <div
          className={
            'my-3 h-6 w-px bg-gradient-to-b from-blue to-blue/40 sm:my-0 sm:h-px sm:w-auto sm:flex-1 sm:bg-gradient-to-r'
          }
        />

        <div
          className={
            'relative z-10 shrink-0 rounded-[16px] border border-blue/30 bg-[#131A2A] px-5 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,.35)] sm:mx-2'
          }
        >
          <ShapeshiftLogo className={'mx-auto h-3 w-auto text-blueLight sm:mx-0'} />
          <div className={'mt-1.5 text-xs font-semibold'}>{'Routing engine'}</div>
        </div>

        <div
          className={
            'my-3 h-6 w-px bg-gradient-to-b from-blue/40 to-mint sm:my-0 sm:h-px sm:w-auto sm:flex-1 sm:bg-gradient-to-r'
          }
        />

        <div
          className={
            'relative z-10 rounded-[16px] border border-mint/20 bg-[#12201D] px-4 py-3 sm:flex-1 sm:text-right'
          }
        >
          <div className={'flex items-center gap-1.5 text-xs text-mint sm:justify-end'}>
            <span className={'size-1.5 rounded-full bg-mint'} />
            {'Selected'}
          </div>
          <div className={'mt-1 text-xs font-semibold'}>{'Best route'}</div>
        </div>
      </div>
    </div>
  )
}

export function DevelopersWhyShapeShift(): ReactNode {
  return (
    <section className={'container pt-20 lg:pt-24'}>
      <div className={'grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center'}>
        <div>
          <h2 className={'mb-6 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
            {'One request in. The best route out.'}
          </h2>
          <p className={'mb-8 max-w-[600px] text-lg leading-relaxed text-secondary'}>
            {
              'ShapeShift compares liquidity across protocols and chains, then returns one executable route. Your team integrates once; the router keeps evolving.'
            }
          </p>
          <RouterIllustration />
        </div>

        <div className={'border-y border-white/[0.08]'}>
          {principles.map(([title, description], index) => (
            <div
              key={title}
              className={'grid grid-cols-[46px_1fr] gap-5 border-b border-white/[0.08] py-7 last:border-b-0'}
            >
              <span className={'font-mono text-xs text-blueLight'}>{`0${index + 1}`}</span>
              <div>
                <h3 className={'mb-2 text-xl font-semibold tracking-[-0.02em]'}>{title}</h3>
                <p className={'text-[15px] leading-relaxed text-gray-400'}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
