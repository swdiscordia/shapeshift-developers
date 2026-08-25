import type { ReactNode } from 'react'

const launchSteps = [
  {
    title: 'Create your partner code',
    description: 'Register the code that attributes swaps and revenue to your product.',
    link: 'https://dashboard.affiliate.shapeshift.com/',
    linkLabel: 'Open the partner portal',
  },
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
    linkLabel: 'View the dashboard',
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
          {'A clear path from your first configuration to attributed swaps in production.'}
        </p>
      </div>

      <div className={'grid border-y border-white/10 md:grid-cols-2 xl:grid-cols-4'}>
        {launchSteps.map((step) => (
          <div
            key={step.title}
            className={
              'flex min-h-[230px] flex-col border-b border-white/10 px-1 py-7 last:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-last-child(-n+2)]:border-b-0 md:px-7 md:first:pl-0 xl:border-b-0 xl:border-r xl:last:border-r-0 xl:last:pr-0'
            }
          >
            <h3 className={'mb-3 text-xl font-semibold tracking-[-0.02em] text-white'}>{step.title}</h3>
            <p className={'mb-6 text-[15px] leading-relaxed text-gray-500'}>{step.description}</p>
            <a
              href={step.link}
              target={'_blank'}
              rel={'noreferrer'}
              className={'mt-auto inline-flex items-center gap-2 text-sm font-medium text-white hover:text-mint'}
            >
              {step.linkLabel}
              <span aria-hidden={'true'}>{'↗'}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
