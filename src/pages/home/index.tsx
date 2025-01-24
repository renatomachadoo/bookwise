import { NavigationMenu } from '@/components/navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'
import { PageTitle } from '@/components/page-title'

import { ChartLineUp, CaretRight } from '@phosphor-icons/react'

import { SectionDivider } from '@/components/section-divider'
import { Action } from '@/components/action'

export default function Home() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <header>
          <PageTitle icon={ChartLineUp} title="Início" />
        </header>
        <main>
          <div>
            <SectionDivider text="Sua última leitura">
              <Action text="Ver todas" icon={CaretRight} size="sm" />
            </SectionDivider>
          </div>
          <div>2</div>
        </main>
      </HomeContentContainer>
    </HomeContainer>
  )
}
