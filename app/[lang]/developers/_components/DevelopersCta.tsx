import { Button } from '@/app/[lang]/_components/Button'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersCta(): ReactNode {
  const { cta } = DEVELOPERS_DICT.page

  return (
    <section className={'container pb-20 pt-[120px]'}>
      <div className={'relative overflow-hidden rounded-[20px] border border-stroke bg-secondBg p-16 text-center'}>
        <div
          className={
            'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_120%,rgba(56,111,249,0.30),transparent_70%)]'
          }
        />
        <div className={'relative'}>
          <h2 className={'mb-4 text-5xl font-bold leading-tight tracking-[-0.02em]'}>{cta.title}</h2>
          <p className={'mb-10 text-lg text-white'}>{cta.description}</p>
          <div className={'flex flex-wrap items-center justify-center gap-3.5'}>
            <Button href={'https://widget.shapeshift.com/'} variant={'blue'} title={cta.ctaPrimary} hasArrow />
            <Button href={'https://discord.gg/shapeshift'} variant={'white'} title={cta.ctaSecondary} />
          </div>
        </div>
      </div>
    </section>
  )
}
