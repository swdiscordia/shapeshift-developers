import { Button } from '@/app/[lang]/_components/Button'
import { developerDocsUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersEconomicsSection(): ReactNode {
  const { economics } = DEVELOPERS_DICT.page

  return (
    <section id={'economics'} className={'container pt-[120px]'}>
      <div className={'rounded-[20px] border border-stroke bg-gradient-to-b from-blue/[0.07] to-secondBg to-45% p-16'}>
        <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{economics.eyebrow}</div>
        <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{economics.title}</h2>
        <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{economics.description}</p>

        <div className={'mb-10'}>
          {economics.steps.map((step) => (
            <div
              key={step.number}
              className={
                'grid grid-cols-1 gap-4 border-t border-stroke py-8 sm:grid-cols-[64px_320px_1fr] sm:items-baseline'
              }
            >
              <span className={'font-mono text-sm text-blue'}>{step.number}</span>
              <span className={'text-xl font-semibold tracking-[-0.01em]'}>{step.title}</span>
              <p className={'text-base leading-relaxed text-gray-400'}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={'flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-stroke px-7 py-5'}>
          <span className={'text-[15px] text-gray-400'}>{economics.banner.label}</span>
          <Button
            href={`${developerDocsUrl}#tag/affiliate`}
            variant={'blue'}
            title={economics.banner.ctaButton}
            hasArrow
          />
        </div>
      </div>
    </section>
  )
}
