import { DevelopersApiSection } from './_components/DevelopersApiSection'
import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'
import { DevelopersWidgetSection } from './_components/DevelopersWidgetSection'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
      <DevelopersWidgetSection />
      <DevelopersApiSection />
    </div>
  )
}
