import { NavigationMenu } from '@/components/navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'
import { PageTitle } from '@/components/page-title'

import { ChartLineUp } from '@phosphor-icons/react'

export default function Home() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <div>
          <header>
            <PageTitle icon={ChartLineUp} title="Início" />
          </header>
        </div>
        <div>3</div>
      </HomeContentContainer>
    </HomeContainer>
  )
}
