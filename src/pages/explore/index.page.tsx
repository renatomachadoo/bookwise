import { NavigationMenu } from '@/components/navigation-menu'
import {
  BookCategory,
  ExploreContainer,
  ExploreContentContainer,
  MainHeader,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { Binoculars } from '@phosphor-icons/react'

export default function Explore() {
  return (
    <ExploreContainer>
      <NavigationMenu />
      <ExploreContentContainer>
        <header>
          <PageTitle icon={Binoculars} title="Explorar" />
        </header>
        <main>
          <MainHeader>
            <BookCategory active>Tudo</BookCategory>
            <BookCategory>asd</BookCategory>
          </MainHeader>
        </main>
      </ExploreContentContainer>
    </ExploreContainer>
  )
}
