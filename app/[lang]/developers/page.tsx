import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersEconomicsSection } from './_components/DevelopersEconomicsSection'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersStats } from './_components/DevelopersStats'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
      <DevelopersEconomicsSection />
      <div className={'pt-[120px]'}>
        <DevelopersStats />
      </div>
    </div>
  )
}
