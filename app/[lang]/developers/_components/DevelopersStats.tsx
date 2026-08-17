import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersStats(): ReactNode {
  const stats = Object.values(DEVELOPERS_DICT.page.stats)

  return (
    <div
      className={
        'container grid w-full grid-cols-1 overflow-hidden rounded-[22px] border border-white/10 bg-secondBg/80 p-2 backdrop-blur-xl sm:grid-cols-3'
      }
    >
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={
            'flex flex-col items-center rounded-2xl px-4 py-7 text-center transition-colors hover:bg-white/[0.035]'
          }
        >
          <div
            className={
              'bg-gradient-to-b from-white to-blueLight bg-clip-text text-3xl font-semibold leading-tight text-transparent lg:text-[46px] lg:leading-[54px]'
            }
          >
            {stat.value}
          </div>
          <div className={'mt-1 text-sm uppercase tracking-[0.08em] text-gray-500'}>{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
