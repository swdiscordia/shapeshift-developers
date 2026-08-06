import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersHero(): ReactNode {
  const { hero } = DEVELOPERS_DICT.page

  return (
    <section className={'relative overflow-hidden'}>
      <div
        className={
          'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_-8%,rgba(56,111,249,0.28),transparent_65%)]'
        }
      />
      <div className={'container relative grid grid-cols-1 items-center gap-20 py-24 lg:grid-cols-[1fr_440px]'}>
        <div>
          <div className={'mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500'}>{hero.eyebrow}</div>
          <h1 className={'mb-6 text-5xl font-bold leading-[1.05] tracking-[-0.03em] lg:text-[64px]'}>
            {hero.titlePrefix}
            <span className={'bg-gradient-to-r from-[#8FB0FF] to-blue bg-clip-text text-transparent'}>
              {hero.titleHighlight}
            </span>
            {hero.titleSuffix}
          </h1>
          <p className={'mb-10 max-w-[560px] text-lg leading-relaxed text-secondary lg:text-xl'}>{hero.description}</p>
          <div className={'flex flex-wrap gap-4'}>
            <Button href={'#widget'} variant={'blue'} title={hero.ctaWidget} hasArrow />
            <Button href={'#api'} variant={'white'} title={hero.ctaApi} />
          </div>
        </div>

        <div className={'mx-auto w-full max-w-[420px] overflow-hidden rounded-[20px] bg-[#12121c]'}>
          <div className={'flex items-center justify-between border-b border-white/10 px-5 py-4'}>
            <span className={'text-base font-semibold text-white'}>{'Swap'}</span>
            <span
              className={
                'rounded-[10px] border border-white/10 bg-[#1a1a2e] px-3 py-2 text-[13px] font-medium text-white'
              }
            >
              {'Connect Wallet'}
            </span>
          </div>
          <div className={'flex flex-col gap-1 p-4'}>
            <div className={'rounded-2xl border border-white/10 bg-[#1a1a2e] p-4'}>
              <div className={'mb-2 text-[13px] font-medium text-gray-400'}>{'Sell'}</div>
              <div className={'flex items-center gap-3'}>
                <span className={'flex-1 text-[32px] font-medium text-white'}>{'1.5'}</span>
                <div className={'flex items-center gap-2 rounded-[10px] bg-[#12121c] px-3 py-2'}>
                  <span
                    className={
                      'flex size-8 items-center justify-center rounded-full bg-[#627EEA] text-sm font-semibold text-white'
                    }
                  >
                    {'Ξ'}
                  </span>
                  <div className={'flex flex-col items-start'}>
                    <span className={'text-[15px] font-semibold text-white'}>{'ETH'}</span>
                    <span className={'text-xs text-gray-400'}>{'Ethereum'}</span>
                  </div>
                </div>
              </div>
              <div className={'mt-2 text-[13px] text-gray-500'}>{'$5,241.60'}</div>
            </div>
            <div className={'rounded-2xl border border-white/10 bg-[#1a1a2e] p-4'}>
              <div className={'mb-2 text-[13px] font-medium text-gray-400'}>{'Buy'}</div>
              <div className={'flex items-center gap-3'}>
                <span className={'flex-1 text-[32px] font-medium text-white'}>{'0.07243'}</span>
                <div className={'flex items-center gap-2 rounded-[10px] bg-[#12121c] px-3 py-2'}>
                  <span
                    className={
                      'flex size-8 items-center justify-center rounded-full bg-[#F7931A] text-sm font-semibold text-white'
                    }
                  >
                    {'₿'}
                  </span>
                  <div className={'flex flex-col items-start'}>
                    <span className={'text-[15px] font-semibold text-white'}>{'BTC'}</span>
                    <span className={'text-xs text-gray-400'}>{'Bitcoin'}</span>
                  </div>
                </div>
              </div>
              <div className={'mt-2 text-[13px] text-gray-500'}>{'$5,229.14'}</div>
            </div>
          </div>
          <div className={'flex items-center justify-between px-5 pb-2 text-[13px] text-gray-500'}>
            <span>{'Est. network fee'}</span>
            <span className={'font-medium text-gray-400'}>{'$1.42'}</span>
          </div>
          <div className={'mx-4 mb-4 rounded-[14px] bg-blue py-4 text-center text-base font-semibold text-white'}>
            {'Connect Wallet'}
          </div>
          <div className={'border-t border-white/10 py-3 text-center text-xs text-gray-500'}>
            {'Powered by '}
            <span className={'font-medium text-blue'}>{'ShapeShift'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
