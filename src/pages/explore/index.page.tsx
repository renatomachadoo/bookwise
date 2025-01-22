import { NavigationMenu } from '@/components/navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'
import { PageTitle } from '@/components/page-title'
import { Binoculars } from '@phosphor-icons/react'

export default function Explore() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <div>
          <header>
            <PageTitle icon={Binoculars} title="Explorar" />
          </header>
        </div>
        <div>3</div>
      </HomeContentContainer>
    </HomeContainer>
  )
}
