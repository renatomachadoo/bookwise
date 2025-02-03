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
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { ReviewedBookCardProfile } from '@/components/reviewed-book-card-profile'

interface UserReviewsResponse {
  book_id: string
  created_at: string
  description: string
  id: string
  rate: number
  user_id: string
  book: {
    author: string
    cover_url: string
    created_at: string
    id: string
    name: string
    summary: string
    total_pages: number
  }
}

export default function Profile() {
  const router = useRouter()

  const userId = router.query.user_id

  const { data: userReviews } = useQuery<UserReviewsResponse[]>({
    queryKey: ['user-reviews'],
    queryFn: async () => {
      const response = await api.get('/books/review/user', {
        params: userId,
      })
      return response.data
    },
  })

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
            <UserReviewsContainer>
              {userReviews?.map((review) => {
                return <ReviewedBookCardProfile key={review.id} data={review} />
              })}
            </UserReviewsContainer>
          </div>
          <div>2</div>
        </main>
      </ProfileContentContainer>
    </ProfileContainer>
  )
}
