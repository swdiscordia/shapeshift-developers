'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { AnimatedPlusMinusIcon } from '@/app/[lang]/_components/QuestionSection'
import { developerDocsUrl } from '@/app/[lang]/_utils/constants'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { ReactNode } from 'react'

// Mirrors QuestionSection's accordion exactly, but accepts a ReactNode answer instead of a
// plain string, so the chains question can end in a real button instead of a raw URL.
function FaqItem({ question, answer }: { question: string; answer: ReactNode }): ReactNode {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={'group rounded-2xl bg-secondBg hover:bg-secondHoverBg'}>
      <div className={'flex cursor-pointer items-center justify-between px-10 py-8'} onClick={() => setIsOpen(!isOpen)}>
        <div className={'text-2xl'}>{question}</div>
        <div
          className={
            'flex size-12 min-w-[48px] items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-[1.16] group-hover:bg-blueHover'
          }
        >
          <AnimatedPlusMinusIcon isOpen={isOpen} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={'overflow-hidden'}
          >
            <div className={'rounded-2xl px-10 pb-6 text-gray-500'}>{answer}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function DevelopersFaq(): ReactNode {
  const { items } = DEVELOPERS_DICT.page.faq

  return (
    <div className={'container mx-auto max-w-[900px]'}>
      <h2 className={'mb-12 text-center text-[42px] font-bold leading-[1.03] tracking-[-0.04em] sm:text-[56px]'}>
        {DEVELOPERS_DICT.page.faq.title}
      </h2>
      <div className={'flex flex-col gap-3'}>
        {items.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={
              item.question === 'Which chains are supported?' ? (
                <>
                  <p>
                    {
                      'Bitcoin, Ethereum and the major L2s (Arbitrum, Base, Optimism), Solana, Avalanche, BNB Chain, Cosmos, and more. 48+ chains today, with new routes added as the underlying aggregators support them.'
                    }
                  </p>
                  <a
                    href={`${developerDocsUrl}/v1/chains`}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    className={
                      'mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10'
                    }
                  >
                    {'View supported chains'}
                    <span aria-hidden={'true'}>{'→'}</span>
                  </a>
                </>
              ) : (
                item.answer
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
