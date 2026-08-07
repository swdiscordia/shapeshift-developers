import { LocalizedLink } from './LocalizedLink'
import { IconNext } from '../_icons/IconNext'
import { cl } from '../_utils/cl'

import type { ReactNode } from 'react'

type TButtonVariant = 'blue' | 'white'

type TButtonProps = {
  title?: string
  variant?: TButtonVariant
  className?: string
  onClick?: () => void
  href?: string
  hasArrow?: boolean
}

export function Button(props: TButtonProps): ReactNode {
  const { variant = 'blue', hasArrow = false, ...rest } = props
  return (
    <>
      {props.href ? (
        <LocalizedLink
          className={cl(
            'flex h-14 px-5 py-4 text-sm font-semibold items-center text-white justify-center rounded-xl hover:-translate-y-0.5 transition-all duration-300 gap-2',
            hasArrow ? 'justify-between min-w-[232px]' : '!min-w-[152px]',
            variant === 'blue'
              ? 'bg-blue shadow-[0_12px_32px_rgba(56,111,249,.2)] hover:bg-blueHover'
              : 'bg-white !text-[#080B10] shadow-[0_12px_32px_rgba(0,0,0,.16)] hover:bg-[#EEF2FF]',
            props.className
          )}
          href={props.href}
          target={props.href?.startsWith('http') ? '_blank' : undefined}
        >
          <span>{props.title}</span>
          {hasArrow ? <IconNext /> : null}
        </LocalizedLink>
      ) : (
        <button
          {...rest}
          className={cl(
            'flex h-14 px-5 py-4 text-sm font-semibold items-center text-white justify-center rounded-xl hover:-translate-y-0.5 transition-all duration-300 gap-2',
            props.className,
            props.href || hasArrow ? 'justify-between min-w-[232px]' : '!min-w-[152px]',
            variant === 'blue'
              ? 'bg-blue shadow-[0_12px_32px_rgba(56,111,249,.2)] hover:bg-blueHover'
              : 'bg-white !text-[#080B10] shadow-[0_12px_32px_rgba(0,0,0,.16)] hover:bg-[#EEF2FF]'
          )}
          onClick={props.onClick}
        >
          {props.title}
          {hasArrow ? <IconNext /> : null}
        </button>
      )}
    </>
  )
}
