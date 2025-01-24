import { NavigationMenu } from '@/components/navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'
import { PageTitle } from '@/components/page-title'

import { Binoculars } from '@phosphor-icons/react'

export default function Explore() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <header>
          <PageTitle icon={Binoculars} title="Explorar" />
        </header>
      </HomeContentContainer>
    </HomeContainer>
  )
}
