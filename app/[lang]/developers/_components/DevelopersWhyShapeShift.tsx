'use client'

import { motion } from 'framer-motion'

import { SectionEyebrow } from './SectionEyebrow'

import type { ReactNode } from 'react'

const principles = [
  ['Community-owned', 'Governed by the ShapeShift DAO and built in public.'],
  ['Non-custodial', 'Users sign in their wallet. ShapeShift never holds funds.'],
  ['Protocol agnostic', 'One integration keeps gaining routes as the ecosystem grows.'],
] as const

const protocolBadges = ['THORChain', 'Relay', '0x'] as const

const travelingDots = [
  {
    left: ['8.75%', '32.5%', '46.25%', '63.125%', '76.25%', '91.25%'],
    top: ['50%', '50%', '15.7%', '15.7%', '50%', '50%'],
    delay: 0,
  },
  {
    left: ['8.75%', '32.5%', '46.25%', '63.125%', '76.25%', '91.25%'],
    top: ['50%', '50%', '84.3%', '84.3%', '50%', '50%'],
    delay: 1.4,
  },
] as const

function RouterIllustration(): ReactNode {
  return (
    <div className={'relative h-[310px] overflow-hidden rounded-[30px] border border-white/[0.06] bg-[#0D111A] p-6'}>
      <div
        className={
          'pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(143,174,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(143,174,255,.08)_1px,transparent_1px)] [background-size:28px_28px]'
        }
      />
      <div className={'absolute inset-x-[7%] top-1/2 h-[140px] -translate-y-1/2'}>
        <svg aria-hidden={'true'} viewBox={'0 0 800 140'} preserveAspectRatio={'none'} className={'size-full'}>
          <defs>
            <linearGradient id={'router-rail'} x1={'0'} y1={'0'} x2={'1'} y2={'0'}>
              <stop offset={'0%'} stopColor={'#386FF9'} stopOpacity={'.28'} />
              <stop offset={'55%'} stopColor={'#386FF9'} />
              <stop offset={'100%'} stopColor={'#70E1B1'} />
            </linearGradient>
          </defs>
          {[
            'M70 70 H260 Q320 70 370 22 H505 Q565 22 610 70 H730',
            'M70 70 H730',
            'M70 70 H260 Q320 70 370 118 H505 Q565 118 610 70 H730',
          ].map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill={'none'}
              stroke={index === 1 ? 'url(#router-rail)' : 'rgba(143,174,255,.16)'}
              strokeWidth={index === 1 ? '3' : '2'}
              strokeLinecap={'round'}
              strokeDasharray={index === 1 ? '12 10' : undefined}
              animate={index === 1 ? { strokeDashoffset: [0, -44] } : undefined}
              transition={index === 1 ? { duration: 2.4, repeat: Infinity, ease: 'linear' } : undefined}
            />
          ))}
        </svg>
        {travelingDots.map((dot) => (
          <motion.div
            key={dot.delay}
            animate={{ left: [...dot.left], top: [...dot.top] }}
            transition={{ duration: 2.8, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'absolute size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_8px_#70E1B1]'
            }
          />
        ))}
      </div>

      <div
        className={
          'absolute left-[5%] top-1/2 -translate-y-1/2 rounded-[16px] border border-white/[0.08] bg-[#171D2B] px-4 py-3'
        }
      >
        <div className={'text-[9px] uppercase tracking-[0.12em] text-gray-500'}>{'Request'}</div>
        <div className={'mt-1 text-xs font-semibold'}>{'Your product'}</div>
      </div>

      <div
        className={
          'absolute left-1/2 top-1/2 -z-0 h-[210px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/[0.11] blur-[55px]'
        }
      />
      <div
        className={
          'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-blue/30 bg-[#131A2A]/95 px-5 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,.35)]'
        }
      >
        <div className={'font-mono text-[9px] uppercase tracking-[0.13em] text-blueLight'}>{'ShapeShift'}</div>
        <div className={'mt-1 text-xs font-semibold'}>{'Routing engine'}</div>
      </div>

      {[
        ['THORChain', 'top-[18%]'],
        ['Relay', 'top-1/2 -translate-y-1/2'],
        ['0x', 'bottom-[18%]'],
      ].map(([name, position]) => (
        <div
          key={name}
          className={`absolute left-[63%] z-10 rounded-full border border-white/[0.07] bg-[#161C29] px-3 py-1.5 font-mono text-[9px] text-gray-400 ${position}`}
        >
          {name}
        </div>
      ))}

      <div
        className={
          'absolute right-[5%] top-1/2 -translate-y-1/2 rounded-[16px] border border-[#70E1B1]/20 bg-[#12201D] px-4 py-3 text-right'
        }
      >
        <div className={'flex items-center justify-end gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[#70E1B1]'}>
          <span className={'size-1.5 rounded-full bg-[#70E1B1]'} />
          {'Selected'}
        </div>
        <div className={'mt-1 text-xs font-semibold'}>{'Best route'}</div>
      </div>

      <div
        className={'absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.12em] text-gray-600'}
      >
        {'18 protocols · 48+ chains · one executable route'}
      </div>
    </div>
  )
}

function RouterIllustrationMobile(): ReactNode {
  return (
    <div className={'flex flex-col items-center gap-4 rounded-[30px] border border-white/[0.06] bg-[#0D111A] p-6'}>
      <div
        className={'w-full max-w-[240px] rounded-[16px] border border-white/[0.08] bg-[#171D2B] px-4 py-3 text-center'}
      >
        <div className={'text-[9px] uppercase tracking-[0.12em] text-gray-500'}>{'Request'}</div>
        <div className={'mt-1 text-xs font-semibold'}>{'Your product'}</div>
      </div>

      <div className={'h-6 w-px bg-white/10'} />

      <div
        className={
          'w-full max-w-[240px] rounded-[16px] border border-blue/30 bg-[#131A2A] px-5 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,.35)]'
        }
      >
        <div className={'font-mono text-[9px] uppercase tracking-[0.13em] text-blueLight'}>{'ShapeShift'}</div>
        <div className={'mt-1 text-xs font-semibold'}>{'Routing engine'}</div>
      </div>

      <div className={'h-6 w-px bg-white/10'} />

      <div className={'flex flex-wrap justify-center gap-2'}>
        {protocolBadges.map((name) => (
          <div
            key={name}
            className={
              'rounded-full border border-white/[0.07] bg-[#161C29] px-3 py-1.5 font-mono text-[9px] text-gray-400'
            }
          >
            {name}
          </div>
        ))}
      </div>

      <div className={'h-6 w-px bg-white/10'} />

      <div className={'w-full max-w-[240px] rounded-[16px] border border-mint/20 bg-[#12201D] px-4 py-3 text-center'}>
        <div className={'flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-mint'}>
          <span className={'size-1.5 rounded-full bg-mint'} />
          {'Selected'}
        </div>
        <div className={'mt-1 text-xs font-semibold'}>{'Best route'}</div>
      </div>

      <div className={'mt-1 text-center text-[9px] uppercase tracking-[0.12em] text-gray-600'}>
        {'18 protocols · 48+ chains · one executable route'}
      </div>
    </div>
  )
}

export function DevelopersWhyShapeShift(): ReactNode {
  return (
    <section className={'container pt-20 lg:pt-24'}>
      <div className={'grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center'}>
        <div>
          <SectionEyebrow>{'The routing layer'}</SectionEyebrow>
          <h2 className={'mb-6 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
            {'One request in. The best route out.'}
          </h2>
          <p className={'mb-8 max-w-[600px] text-lg leading-relaxed text-secondary'}>
            {
              'ShapeShift compares liquidity across protocols and chains, then returns one executable route. Your team integrates once; the router keeps evolving.'
            }
          </p>
          <div className={'hidden lg:block'}>
            <RouterIllustration />
          </div>
          <div className={'lg:hidden'}>
            <RouterIllustrationMobile />
          </div>
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
