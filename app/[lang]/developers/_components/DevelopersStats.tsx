import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersStats(): ReactNode {
  const stats = Object.values(DEVELOPERS_DICT.page.stats)

  return (
    <div className={'container grid w-full grid-cols-1 border-y border-white/10 sm:grid-cols-3'}>
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={
            'flex flex-col items-center border-b border-white/10 px-4 py-7 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0'
          }
        >
          <div className={'text-3xl font-semibold leading-tight text-white lg:text-[46px] lg:leading-[54px]'}>
            {stat.value}
          </div>
          <div className={'mt-1 text-sm uppercase tracking-[0.08em] text-gray-500'}>{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
