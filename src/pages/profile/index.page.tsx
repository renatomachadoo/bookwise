import { NavigationMenu } from '@/components/Navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'

export default function Profile() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <div>profile</div>
        <div>3</div>
      </HomeContentContainer>
    </HomeContainer>
  )
}
