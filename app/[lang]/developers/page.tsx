import { DevelopersHero } from './_components/DevelopersHero'
import { DevelopersPartnerLogos } from './_components/DevelopersPartnerLogos'

import type { ReactNode } from 'react'

export default function DevelopersPage(): ReactNode {
  return (
    <div>
      <DevelopersHero />
      <DevelopersPartnerLogos />
    </div>
  )
}
