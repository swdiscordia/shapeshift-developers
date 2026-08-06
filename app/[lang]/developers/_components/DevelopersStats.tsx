import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersStats(): ReactNode {
  const stats = Object.values(DEVELOPERS_DICT.page.stats)

  return (
    <div className={'container grid w-full grid-cols-1 gap-6 rounded-2xl bg-secondBg p-6 lg:grid-cols-3'}>
      {stats.map((stat) => (
        <div key={stat.title} className={'flex flex-col items-center px-[50px] py-6 text-center'}>
          <div className={'text-2xl font-normal leading-tight md:text-3xl lg:text-[40px] lg:leading-[48px]'}>
            {stat.value}
          </div>
          <div className={'text-lg text-gray-500 lg:text-xl'}>{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
