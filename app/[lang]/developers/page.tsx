import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersCta } from './_components/DevelopersCta'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersFaq } from './_components/DevelopersFaq'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersUseCases } from './_components/DevelopersUseCases'
import { DevelopersWhyShapeShift } from './_components/DevelopersWhyShapeShift'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div className={'overflow-hidden'}>
      <DevelopersHero />
      <DevelopersStats />
      <DevelopersPartnerLogos />
      <DevelopersWhyShapeShift />
      <DevelopersUseCases />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <div className={'pt-20 lg:pt-24'}>
        <DevelopersFaq />
      </div>
      <DevelopersCta />
    </div>
  )
}
