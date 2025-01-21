import { NavigationMenu } from '@/components/Navigation-menu'
import { HomeContainer, HomeContentContainer } from './styles'

export default function Home() {
  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <div>2</div>
        <div>3</div>
      </HomeContentContainer>
    </HomeContainer>
  )
}
