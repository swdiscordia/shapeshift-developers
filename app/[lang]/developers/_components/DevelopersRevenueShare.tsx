import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

export function DevelopersRevenueShare(): ReactNode {
  return (
    <section className={'container pt-20 lg:pt-24'}>
      <div className={'relative overflow-hidden border-y border-white/[0.08] py-12 lg:py-16'}>
        <div
          className={
            'pointer-events-none absolute -left-32 top-1/2 size-[360px] -translate-y-1/2 rounded-full bg-blue/10 blur-[100px]'
          }
        />
        <div className={'relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center'}>
          <div>
            <div className={'mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8FACFF]'}>
              {'Partner economics'}
            </div>
            <h2 className={'mb-5 text-[40px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[54px]'}>
              {'Every swap can grow your business.'}
            </h2>
            <p className={'mb-8 max-w-[540px] text-lg leading-relaxed text-secondary'}>
              {
                'Set your partner fee once. ShapeShift attributes every trade and settles your share on-chain—without invoices or payout schedules.'
              }
            </p>
            <Button href={'#economics'} variant={'blue'} title={'See how revenue share works'} hasArrow />
          </div>

          <div className={'rounded-[28px] bg-[#111522] p-5 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-7'}>
            <div className={'mb-7 flex items-center justify-between gap-3'}>
              <div>
                <div className={'text-sm font-semibold'}>{'Partner performance'}</div>
                <div className={'text-[11px] text-gray-500'}>{'Live attribution preview'}</div>
              </div>
              <span className={'rounded-full bg-[#70E1B1]/10 px-3 py-2 text-[10px] font-semibold text-[#70E1B1]'}>
                {'ON-CHAIN'}
              </span>
            </div>
            <div className={'mb-7 grid grid-cols-2 gap-3'}>
              <div className={'rounded-2xl bg-white/[0.045] p-4'}>
                <div className={'mb-2 text-[10px] uppercase tracking-[0.1em] text-gray-500'}>{'Attributed volume'}</div>
                <div className={'text-xl font-semibold sm:text-2xl'}>{'$248,320'}</div>
              </div>
              <div className={'rounded-2xl bg-white/[0.045] p-4'}>
                <div className={'mb-2 text-[10px] uppercase tracking-[0.1em] text-gray-500'}>{'Your revenue'}</div>
                <div className={'text-xl font-semibold text-[#A9C0FF] sm:text-2xl'}>{'$620.80'}</div>
              </div>
            </div>
            <div className={'flex h-28 items-end gap-2'}>
              {[32, 45, 38, 62, 54, 78, 67, 92, 84, 108].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  style={{ height }}
                  className={index === 9 ? 'flex-1 rounded-t-md bg-blue' : 'flex-1 rounded-t-md bg-blue/25'}
                />
              ))}
            </div>
            <div className={'mt-3 flex justify-between text-[10px] text-gray-600'}>
              <span>{'30 days ago'}</span>
              <span>{'Today'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
