'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { AnimateChangeInHeight } from '@/app/[lang]/_components/AnimatedHeight'
import { Button } from '@/app/[lang]/_components/Button'
import { LocalizedLink } from '@/app/[lang]/_components/LocalizedLink'
import { Notification } from '@/app/[lang]/_components/Notification'
import { IconPlanet } from '@/app/[lang]/_icons/IconPlanet'
import { ShapeshiftLogo } from '@/app/[lang]/_icons/ShapeshiftLogo'
import { cl } from '@/app/[lang]/_utils/cl'
import { dAppUrl, headerTabs } from '@/app/[lang]/_utils/constants'

import { containerAnimation } from './animations'
import { DAOExpand } from './DaoExpand'
import { DevelopersExpand } from './DevelopersExpand'
import { LanguageExpand } from './LanguageExpand'
import { ProductsExpand } from './ProductsExpand'
import { ResourcesExpand } from './ResourcesExpand'

import type { ReactNode } from 'react'

type TDesktopHeaderProps = {
  className?: string
  switchLanguageAction: (symbol: string) => void
  currentLanguage: string
}

/**
 * Desktop header component with hover menu expansions
 */
export function DesktopHeader({ className, switchLanguageAction, currentLanguage }: TDesktopHeaderProps): ReactNode {
  const pathname = usePathname()
  const variant = pathname === '/' ? 'transparent' : 'default'
  const [currentTab, setCurrentTab] = useState<string>('')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const updateHeader = (): void => setIsScrolled(window.scrollY > 48)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  /**
   * Map of tab content components keyed by tab value
   */
  const tabContent: Record<string, ReactNode> = useMemo(
    () => ({
      products: <ProductsExpand setCurrentTab={setCurrentTab} />,
      developers: <DevelopersExpand setCurrentTab={setCurrentTab} />,
      resources: <ResourcesExpand setCurrentTab={setCurrentTab} />,
      dao: <DAOExpand setCurrentTab={setCurrentTab} />,
      language: <LanguageExpand switchLanguageAction={switchLanguageAction} currentLanguage={currentLanguage} />,
      empty: null,
    }),
    [switchLanguageAction, currentLanguage]
  )

  /**
   * Determine background style based on variant and active tab
   */
  const getVariant = (): string => {
    if (currentTab) return 'bg-[#111522]/95 shadow-2xl'
    if (isScrolled) return 'bg-[#151B2A]/72 shadow-[0_16px_45px_rgba(0,0,0,.22)]'
    if (variant === 'transparent') {
      return 'bg-transparent'
    }
    return 'bg-[#0B0F17]/72'
  }

  return (
    <div className={'sticky top-0 z-50 hidden rounded-2xl lg:block'}>
      <Notification />
      <div onMouseLeave={() => setCurrentTab('')} className={'roudnded-2xl relative mt-3 w-full bg-transparent'}>
        <div
          className={cl(
            'flex flex-col border border-transparent items-center transition-all backdrop-blur-2xl duration-300 justify-between px-6 py-3',
            currentTab ? 'rounded-t-lg' : 'rounded-lg',
            getVariant(),
            className
          )}
        >
          <div className={'flex w-full items-center justify-between'}>
            <LocalizedLink href={'/'} className={'flex items-center'} onMouseEnter={() => setCurrentTab('')}>
              <ShapeshiftLogo />
            </LocalizedLink>

            <nav className={'flex'}>
              {headerTabs.map((tab) => (
                <div
                  key={tab.name}
                  onMouseEnter={() => setCurrentTab(tab.value)}
                  className={cl(
                    'cursor-pointer p-4 text-[12px] font-semibold uppercase tracking-[0.09em] transition-colors',
                    currentTab && currentTab !== tab.value ? 'text-gray-500' : 'text-white'
                  )}
                >
                  {tab.value === 'developers' ? <LocalizedLink href={tab.href}>{tab.name}</LocalizedLink> : tab.name}
                </div>
              ))}
            </nav>

            <div className={'flex gap-2'}>
              <button
                onMouseEnter={() => setCurrentTab('language')}
                className={
                  'group flex aspect-square h-14 items-center justify-center rounded-[20px] border border-white/5'
                }
              >
                <IconPlanet className={'opacity-50 transition-opacity group-hover:opacity-100'} />
              </button>
              <Button
                variant={'blue'}
                title={'Launch App'}
                href={dAppUrl}
                className={'text-[12px] !font-semibold uppercase tracking-[0.09em]'}
              />
            </div>
          </div>
        </div>
        <motion.div
          className={cl(
            'absolute top-full bg-bg',
            'rounded-b-lg border-x border-b border-white/5',
            'flex justify-center w-full',
            tabContent[currentTab] ? 'opacity-1' : '!opacity-0'
          )}
          initial={containerAnimation.initial}
          animate={containerAnimation.animate(true)}
          exit={containerAnimation.exit}
          transition={containerAnimation.transition}
        >
          <div className={'bg-headerBg'}>
            <AnimateChangeInHeight>
              {Object.entries(tabContent).map(([key, content]) => (
                <div key={key} className={currentTab === key ? 'block' : 'hidden'}>
                  {content}
                </div>
              ))}
            </AnimateChangeInHeight>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
