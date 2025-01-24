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
              <Action
                size="sm"
                onClick={() => console.log('ola')}
                text="Ver todas"
                icon={CaretRight}
              />
            </SectionDivider>
          </div>
          <div>2</div>
        </main>
      </HomeContentContainer>
    </HomeContainer>
  )
}
