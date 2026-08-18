import Image from 'next/image'

import { Button } from '@/app/[lang]/_components/Button'
import { cl } from '@/app/[lang]/_utils/cl'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Real preset names/colors and real default theme values, read directly off
// widget.shapeshift.com's own "Customize Widget" panel — not invented.
const presets = [
  { name: 'Blue', color: '#3861FB' },
  { name: 'Rose', color: '#F43F5E' },
  { name: 'Purple', color: '#A855F7' },
  { name: 'Cyan', color: '#06B6D4' },
  { name: 'Green', color: '#10B981' },
  { name: 'Orange', color: '#F97316' },
  { name: 'Stucco', color: '#BEA989' },
] as const

const themeColors = [
  { label: 'Background', hex: '#0a0a14' },
  { label: 'Card', hex: '#12121c' },
  { label: 'Accent', hex: '#3861fb' },
] as const

function ToggleRow({ label, options, active }: { label: string; options: [string, string]; active: 0 | 1 }): ReactNode {
  return (
    <div>
      <div className={'mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'}>{label}</div>
      <div className={'grid grid-cols-2 gap-2'}>
        {options.map((option, index) => (
          <div
            key={option}
            className={cl(
              'rounded-lg border py-1.5 text-center text-xs',
              index === active ? 'border-blue/50 bg-blue/10 text-white' : 'border-white/10 text-gray-500'
            )}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

// A static mockup of the real customize panel — same field names, same preset colors, same
// default theme values as widget.shapeshift.com. Not wired to the live tool (that's what "Open
// the widget sandbox" is for); this exists to show the shape of what's configurable.
function CustomizePanelMockup(): ReactNode {
  return (
    <div className={'rounded-2xl border border-white/10 bg-[#0d0f1a] p-5'}>
      <div className={'mb-5 text-sm font-semibold'}>{'Customize Widget'}</div>

      <div className={'mb-4'}>
        <div className={'mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'}>
          {'Partner code'}
        </div>
        <div className={'rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-600'}>
          {'your-partner-code'}
        </div>
      </div>

      <div className={'mb-4'}>
        <div className={'mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'}>{'Presets'}</div>
        <div className={'flex flex-wrap gap-2'}>
          {presets.map((preset, index) => (
            <div
              key={preset.name}
              className={cl(
                'size-6 rounded-md',
                index === 0 ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-[#0d0f1a]' : ''
              )}
              style={{ backgroundColor: preset.color }}
            />
          ))}
        </div>
      </div>

      <div className={'mb-4 grid grid-cols-2 gap-3'}>
        <ToggleRow label={'Theme'} options={['Light', 'Dark']} active={1} />
        <ToggleRow label={'Display'} options={['Inline', 'Modal']} active={0} />
      </div>

      <div className={'mb-4'}>
        <div className={'mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'}>{'Colors'}</div>
        <div className={'flex gap-2'}>
          {themeColors.map((color) => (
            <div
              key={color.hex}
              className={'flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/20 py-1 pl-1 pr-2'}
            >
              <span className={'size-4 shrink-0 rounded'} style={{ backgroundColor: color.hex }} />
              <span className={'font-mono text-[10px] text-gray-400'}>{color.hex}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={'mb-4'}>
        <div
          className={
            'mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500'
          }
        >
          <span>{'Border radius'}</span>
          <span className={'font-mono normal-case tracking-normal text-gray-400'}>{'16px'}</span>
        </div>
        <div className={'h-1.5 rounded-full bg-white/10'}>
          <div className={'h-full w-[70%] rounded-full bg-blue'} />
        </div>
      </div>

      <ToggleRow label={'Button style'} options={['Filled', 'Outline']} active={0} />
    </div>
  )
}

// The same swap card rendered twice — once styled dark, once styled light — with the light copy
// clipped to its right half, so the two halves read as one widget mid-theme-swap.
function SwapCardHalf({ theme }: { theme: 'dark' | 'light' }): ReactNode {
  const isDark = theme === 'dark'
  return (
    <div
      className={cl(
        'absolute inset-0 flex flex-col p-4',
        isDark ? 'bg-[#0a0a14] text-white' : 'bg-[#f3f5fb] text-[#0a0a14]'
      )}
      style={theme === 'light' ? { clipPath: 'inset(0 0 0 50%)' } : undefined}
    >
      <div className={'mb-4 flex items-center justify-between'}>
        <span className={'text-sm font-semibold'}>{'Swap'}</span>
        <span
          className={cl(
            'flex size-6 items-center justify-center rounded-full text-xs',
            isDark ? 'bg-white/10' : 'bg-black/[0.06]'
          )}
        >
          {'⚙'}
        </span>
      </div>
      <div className={cl('mb-2 rounded-xl p-3', isDark ? 'bg-white/[0.06]' : 'bg-white')}>
        <div className={cl('mb-1 text-[9px]', isDark ? 'text-gray-500' : 'text-gray-400')}>{'Sell'}</div>
        <div className={'flex items-center justify-between'}>
          <span className={'text-lg font-semibold'}>{'1.0'}</span>
          <span
            className={cl(
              'flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold',
              isDark ? 'bg-blue/15 text-blueLight' : 'bg-blue/10 text-blue'
            )}
          >
            <Image src={'/widget/eth_icon.png'} alt={''} width={12} height={12} className={'rounded-full'} />
            {'ETH'}
          </span>
        </div>
      </div>
      <div className={cl('mb-3 rounded-xl p-3', isDark ? 'bg-white/[0.06]' : 'bg-white')}>
        <div className={cl('mb-1 text-[9px]', isDark ? 'text-gray-500' : 'text-gray-400')}>{'Buy'}</div>
        <div className={'flex items-center justify-between'}>
          <span className={'text-lg font-semibold'}>{'2,618'}</span>
          <span
            className={cl(
              'flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold',
              isDark ? 'bg-blue/15 text-blueLight' : 'bg-blue/10 text-blue'
            )}
          >
            {'$ USDC'}
          </span>
        </div>
      </div>
      <div className={'mt-auto rounded-xl bg-blue py-2.5 text-center text-xs font-semibold text-white'}>
        {'Connect Wallet'}
      </div>
      <div className={cl('mt-2 text-center text-[8px]', isDark ? 'text-gray-600' : 'text-gray-400')}>
        {'Powered by ShapeShift'}
      </div>
    </div>
  )
}

function SplitPreviewFrame(): ReactNode {
  return (
    <div className={'overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0f1a]'}>
      <div className={'flex items-center justify-between border-b border-white/[0.07] px-4 py-3'}>
        <div className={'flex gap-1.5'}>
          <span className={'size-2 rounded-full bg-white/15'} />
          <span className={'size-2 rounded-full bg-white/15'} />
          <span className={'size-2 rounded-full bg-white/15'} />
        </div>
        <span className={'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-mint'}>
          <span className={'size-1.5 rounded-full bg-mint'} />
          {'Responsive preview'}
        </span>
      </div>

      <div
        className={
          'flex items-center justify-between px-8 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500'
        }
      >
        <span>{'Dark'}</span>
        <span>{'Light'}</span>
      </div>

      <div className={'flex justify-center px-6 py-8 sm:py-10'}>
        <div className={'relative h-[386px] w-full max-w-[320px] overflow-hidden rounded-2xl shadow-2xl'}>
          <SwapCardHalf theme={'dark'} />
          <SwapCardHalf theme={'light'} />
          <div className={'absolute inset-y-0 left-1/2 w-px bg-white/40'} />
          <div
            className={
              'absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue text-xs text-white shadow-[0_4px_14px_rgba(0,0,0,.4)]'
            }
          >
            {'⇔'}
          </div>
        </div>
      </div>

      <div className={'flex flex-wrap justify-center gap-2 border-t border-white/[0.07] px-5 py-4'}>
        <span className={'rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400'}>
          {'Inline / Modal'}
        </span>
        <span className={'rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400'}>
          {'Filled / Outline'}
        </span>
        <span className={'rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400'}>
          {'16px radius'}
        </span>
      </div>

      <div className={'border-t border-white/[0.07] px-5 py-4 font-mono text-[11px] leading-relaxed text-gray-400'}>
        <div>{'theme: {'}</div>
        <div className={'pl-4'}>
          {'backgroundColor: '}
          <span className={'text-blueLight'}>{'"#0a0a14"'}</span>
          {','}
        </div>
        <div className={'pl-4'}>
          {'cardColor: '}
          <span className={'text-blueLight'}>{'"#12121c"'}</span>
          {','}
        </div>
        <div className={'pl-4'}>
          {'accentColor: '}
          <span className={'text-blueLight'}>{'"#3861fb"'}</span>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  )
}

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page
  return (
    <section id={'widget'} className={'container scroll-mt-28 pt-20 lg:scroll-mt-32 lg:pt-24'}>
      <div className={'mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end'}>
        <div>
          <h2 className={'text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>{widget.title}</h2>
        </div>
        <p className={'max-w-[680px] text-lg leading-relaxed text-secondary'}>{widget.description}</p>
      </div>

      <div className={'mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end'}>
        <div>
          <h3 className={'mb-2 text-2xl font-semibold tracking-[-0.02em]'}>{'Make it feel native to your product.'}</h3>
          <p className={'max-w-[520px] text-sm leading-relaxed text-gray-400 sm:text-base'}>
            {'The widget adopts the visual language of the surrounding product.'}
          </p>
        </div>
        <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={widget.ctaButton} hasArrow />
      </div>

      <div
        className={
          'rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#12141f] to-[#0a0b11] p-6 sm:p-8 lg:p-10'
        }
      >
        <div className={'grid gap-8 lg:grid-cols-[320px_1fr] lg:items-start'}>
          <CustomizePanelMockup />
          <SplitPreviewFrame />
        </div>
      </div>
    </section>
  )
}
