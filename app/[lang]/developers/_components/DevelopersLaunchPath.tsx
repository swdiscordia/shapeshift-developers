import { IconArrow } from '@/app/[lang]/_icons/IconArrow'

import type { ReactNode } from 'react'

const launchSteps = [
  {
    title: 'Configure your integration',
    description: 'Choose the Widget for a fast launch or use the API for a custom experience.',
    link: 'https://widget.shapeshift.com/',
    linkLabel: 'Configure the Widget',
  },
  {
    title: 'Test the complete flow',
    description: 'Validate assets, routing, wallet connection and partner fee attribution.',
    link: 'https://api.shapeshift.com/docs',
    linkLabel: 'Read the integration docs',
  },
  {
    title: 'Ship and track revenue',
    description: 'Launch the experience and follow every attributed swap from one place.',
    link: 'https://dashboard.affiliate.shapeshift.com/',
    linkLabel: 'Partner portal',
  },
]

export function DevelopersLaunchPath(): ReactNode {
  return (
    <section className={'container pt-16 lg:pt-20'}>
      <div className={'mb-10 max-w-[720px]'}>
        <h2 className={'mb-4 text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
          {'From sandbox to production'}
        </h2>
        <p className={'text-lg leading-relaxed text-secondary'}>
          {'A clear path from your first sandbox test to a live production integration.'}
        </p>
      </div>

      <div className={'grid border-y border-white/10 md:grid-cols-3'}>
        {launchSteps.map((step) => (
          <div
            key={step.title}
            className={
              'flex min-h-[230px] flex-col border-b border-white/10 px-1 py-7 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0'
            }
          >
            <h3 className={'mb-3 text-xl font-semibold tracking-[-0.02em] text-white'}>{step.title}</h3>
            <p className={'mb-6 text-[15px] leading-relaxed text-gray-500'}>{step.description}</p>
            <a
              href={step.link}
              target={'_blank'}
              rel={'noreferrer'}
              className={'group mt-auto inline-flex items-center gap-2.5 text-sm font-medium text-white'}
            >
              {step.linkLabel}
              <span
                aria-hidden={'true'}
                className={
                  'flex size-7 shrink-0 items-center justify-center rounded-full bg-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-blueHover'
                }
              >
                <IconArrow className={'size-3.5 text-white'} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
