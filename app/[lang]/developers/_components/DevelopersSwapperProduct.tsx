import { Button } from '@/app/[lang]/_components/Button'

import type { ReactNode } from 'react'

function WidgetPreview(): ReactNode {
  return (
    <div
      className={'relative h-[190px] overflow-hidden rounded-[24px] bg-gradient-to-br from-blue/25 to-[#171B29] p-5'}
    >
      <div className={'absolute -right-12 -top-12 size-36 rounded-full border border-blue/30'} />
      <div
        className={'absolute left-5 top-5 w-[74%] rounded-2xl border border-white/10 bg-[#111522]/90 p-4 shadow-2xl'}
      >
        <div className={'mb-3 flex items-center justify-between text-[10px] text-gray-500'}>
          <span>{'Swap widget'}</span>
          <span className={'size-2 rounded-full bg-[#70E1B1]'} />
        </div>
        <div className={'mb-2 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2'}>
          <span className={'text-lg'}>{'1.5'}</span>
          <span className={'text-xs font-semibold'}>{'ETH'}</span>
        </div>
        <div className={'flex items-center justify-between rounded-xl bg-white/5 px-3 py-2'}>
          <span className={'text-lg'}>{'0.0724'}</span>
          <span className={'text-xs font-semibold'}>{'BTC'}</span>
        </div>
      </div>
      <div
        className={
          'absolute bottom-5 right-5 rounded-xl border border-white/10 bg-[#1B2133] px-4 py-3 text-xs shadow-xl'
        }
      >
        {'Your brand, your theme'}
      </div>
    </div>
  )
}

function ApiPreview(): ReactNode {
  return (
    <div
      className={'relative h-[190px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#151B2A] to-blue/15 p-5'}
    >
      <div className={'absolute -bottom-16 -left-12 size-44 rounded-full border border-blue/25'} />
      <div
        className={
          'relative rounded-2xl border border-white/10 bg-[#0C111C]/90 p-5 font-mono text-[11px] leading-[1.7] shadow-2xl'
        }
      >
        <div className={'mb-3 flex items-center gap-2 text-gray-600'}>
          <span className={'size-2 rounded-full bg-white/10'} />
          <span className={'size-2 rounded-full bg-white/10'} />
          <span className={'size-2 rounded-full bg-white/10'} />
          <span className={'ml-2'}>{'/v1/swap/quote'}</span>
        </div>
        <div className={'text-[#8FACFF]'}>{'POST {'}</div>
        <div className={'pl-4 text-gray-400'}>{'sell: "ETH", buy: "BTC"'}</div>
        <div className={'text-[#8FACFF]'}>{'}'}</div>
        <div className={'mt-2 inline-flex rounded-md bg-[#70E1B1]/10 px-2 py-1 text-[#70E1B1]'}>
          {'200 · quote ready'}
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    number: '01',
    label: 'Launch in minutes',
    name: 'Widget',
    description: 'A complete swap experience that adapts to your product. Configure it, paste one embed, and go live.',
    meta: ['No UI to build', 'Themeable', 'Always up to date'],
    href: 'https://widget.shapeshift.com/',
    cta: 'Configure the Widget',
    preview: <WidgetPreview />,
  },
  {
    number: '02',
    label: 'Own every pixel',
    name: 'API',
    description:
      'The routing engine without the interface. Build your ideal journey while ShapeShift handles the routes.',
    meta: ['REST endpoints', 'Custom experience', 'Executable quotes'],
    href: 'https://api.shapeshift.com/docs',
    cta: 'Explore the API',
    preview: <ApiPreview />,
  },
] as const

export function DevelopersSwapperProduct(): ReactNode {
  return (
    <section id={'swapper'} className={'container pt-20 lg:pt-24'}>
      <div className={'mb-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <div className={'mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue'}>{'Widget or API'}</div>
          <h2 className={'text-[42px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[58px]'}>
            {'Choose how you want to build.'}
          </h2>
        </div>
        <p className={'max-w-[600px] text-lg leading-relaxed text-secondary lg:justify-self-end'}>
          {
            'Start with a ready-made experience or compose your own. Both products use the same multichain routing and partner economics.'
          }
        </p>
      </div>

      <div className={'grid gap-5 lg:grid-cols-2'}>
        {products.map((product) => (
          <article
            key={product.name}
            className={
              'group overflow-hidden rounded-[36px] border border-white/10 bg-[#111522] p-3 transition-transform duration-300 hover:-translate-y-1'
            }
          >
            {product.preview}
            <div className={'p-5 sm:p-7'}>
              <div className={'mb-6 flex items-center justify-between'}>
                <span className={'font-mono text-xs text-[#8FACFF]'}>{product.number}</span>
                <span
                  className={
                    'rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-gray-400'
                  }
                >
                  {product.label}
                </span>
              </div>
              <h3 className={'mb-3 text-4xl font-semibold tracking-[-0.04em]'}>{product.name}</h3>
              <p className={'mb-6 max-w-[520px] text-[15px] leading-relaxed text-gray-400'}>{product.description}</p>
              <div className={'mb-7 flex flex-wrap gap-2'}>
                {product.meta.map((item) => (
                  <span key={item} className={'rounded-full bg-white/[0.045] px-3 py-2 text-xs text-gray-400'}>
                    {'✓ '}
                    {item}
                  </span>
                ))}
              </div>
              <Button
                href={product.href}
                variant={product.name === 'Widget' ? 'blue' : 'white'}
                title={product.cta}
                hasArrow
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
