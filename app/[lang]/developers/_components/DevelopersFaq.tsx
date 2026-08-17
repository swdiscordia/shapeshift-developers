import { QuestionSection } from '@/app/[lang]/_components/QuestionSection'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

export function DevelopersFaq(): ReactNode {
  return (
    <div className={'container mx-auto max-w-[900px]'}>
      <h2 className={'mb-12 text-center text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
        {DEVELOPERS_DICT.page.faq.title}
      </h2>
      <div className={'flex flex-col gap-3'}>
        {DEVELOPERS_DICT.page.faq.items.map((item, index) => (
          <QuestionSection key={item.question} faqSectionItem={{ id: index, ...item }} />
        ))}
      </div>
    </div>
  )
}
