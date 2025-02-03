import { NavigationMenu } from '@/components/navigation-menu'
import {
  ProfileContainer,
  ProfileContentContainer,
  SearchReviewForm,
  UserReviewsContainer,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { MagnifyingGlass, User } from '@phosphor-icons/react'
import { TextInput } from '@/components/text-input'

export default function Profile() {
  return (
    <ProfileContainer>
      <NavigationMenu />
      <ProfileContentContainer>
        <header>
          <PageTitle icon={User} title="Perfil" />
        </header>
        <main>
          <div>
            <SearchReviewForm>
              <TextInput
                placeholder="Buscar livro avaliado"
                icon={MagnifyingGlass}
              />
            </SearchReviewForm>
            <UserReviewsContainer></UserReviewsContainer>
          </div>
          <div>2</div>
        </main>
      </ProfileContentContainer>
    </ProfileContainer>
  )
}
