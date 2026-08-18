import { cl } from '@/app/[lang]/_utils/cl'

import type { ReactNode } from 'react'

type TSectionEyebrowProps = {
  children: ReactNode
  variant?: 'pill' | 'text'
  dot?: 'blue' | 'mint'
  className?: string
}

const DOT_GLOW = {
  blue: 'shadow-[0_0_12px_#386FF9]',
  mint: 'shadow-[0_0_12px_#70E1B1]',
} as const

function Dot({ color }: { color: 'blue' | 'mint' }): ReactNode {
  return <span className={cl('size-2 rounded-full', color === 'mint' ? 'bg-mint' : 'bg-blue', DOT_GLOW[color])} />
}

/**
 * Small, quiet caption used in a handful of places (the hero pill, the partner-logos strip).
 * Deliberately understated — no bold color block, no wide tracking — so it reads as a caption,
 * not a decorative badge.
 */
export function SectionEyebrow({ children, variant = 'text', dot, className }: TSectionEyebrowProps): ReactNode {
  if (variant === 'pill') {
    return (
      <div className={cl('mb-6 inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-2', className)}>
        <Dot color={dot ?? 'mint'} />
        <span className={'text-[11px] font-semibold uppercase tracking-[0.14em] text-blueLight'}>{children}</span>
      </div>
    )
  }

  return (
    <div className={cl('text-sm text-gray-500', dot ? 'flex items-center gap-2' : null, className)}>
      {dot ? <Dot color={dot} /> : null}
      {children}
    </div>
  )
}
