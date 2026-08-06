import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page

  return (
    <section id={'widget'} className={'container pt-[120px]'}>
      <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-blue'}>{widget.eyebrow}</div>
      <h2 className={'mb-4 text-[44px] font-bold leading-tight tracking-[-0.02em]'}>{widget.title}</h2>
      <p className={'mb-14 max-w-[640px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>

      <div className={'grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_400px]'}>
        <div>
          {widget.features.map((feature) => (
            <div
              key={feature.title}
              className={
                'grid grid-cols-1 gap-4 border-t border-stroke py-8 sm:grid-cols-[150px_1fr] sm:items-baseline'
              }
            >
              <span className={'font-mono text-xs uppercase tracking-[0.08em] text-[#7FA3FF]'}>{feature.tag}</span>
              <div className={'flex flex-col gap-2'}>
                <h3 className={'text-xl font-semibold tracking-[-0.015em]'}>{feature.title}</h3>
                <p className={'text-[15px] leading-relaxed text-gray-500'}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={'rounded-2xl border border-stroke bg-secondBg p-9'}>
          <div className={'mb-7 text-xs font-semibold uppercase tracking-[0.1em] text-gray-600'}>
            {widget.cardLabel}
          </div>
          <div className={'flex flex-col'}>
            {widget.steps.map((step, index) => (
              <div key={step.number} className={'grid grid-cols-[28px_1fr] gap-4'}>
                <div className={'flex flex-col items-center gap-1.5'}>
                  <span
                    className={
                      'flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-[#7FA3FF]'
                    }
                  >
                    {step.number}
                  </span>
                  {index < widget.steps.length - 1 && <span className={'w-px flex-1 bg-stroke'} />}
                </div>
                <div
                  className={
                    index < widget.steps.length - 1 ? 'flex flex-col gap-1.5 pb-7' : 'flex flex-col gap-1.5 pb-0'
                  }
                >
                  <span className={'text-base font-semibold'}>{step.title}</span>
                  <p className={'text-sm leading-relaxed text-gray-500'}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            href={'https://widget.shapeshift.com/'}
            variant={'blue'}
            title={widget.ctaButton}
            hasArrow
            className={'mt-8 w-full'}
          />
        </div>
      </div>
    </section>
  )
}
