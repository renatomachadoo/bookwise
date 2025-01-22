import { NavigationMenu } from '@/components/navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'
import { PageTitle } from '@/components/page-title'
import { User } from '@phosphor-icons/react'

export default function Profile() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <div>
          <header>
            <PageTitle icon={User} title="Perfil" />
          </header>
        </div>
        <div>3</div>
      </HomeContentContainer>
    </HomeContainer>
  )
}
