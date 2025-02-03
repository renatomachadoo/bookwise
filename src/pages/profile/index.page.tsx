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
import { intlFormatDistance } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
  search: z.string(),
})

type SearchFormData = z.infer<typeof searchFormSchema>

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

  const { handleSubmit, register } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const userId = router.query.user_id
  const search = router.query.search

  const { data: userReviews } = useQuery<UserReviewsResponse[]>({
    queryKey: ['user-reviews', search],
    queryFn: async () => {
      const response = await api.get('/books/review/user', {
        params: {
          user_id: userId,
          search,
        },
      })
      return response.data
    },
  })

  async function handleSubmitSearch(data: SearchFormData) {
    const { search } = data

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, search },
    })
  }

  return (
    <ProfileContainer>
      <NavigationMenu />
      <ProfileContentContainer>
        <header>
          <PageTitle icon={User} title="Perfil" />
        </header>
        <main>
          <div>
            <SearchReviewForm onSubmit={handleSubmit(handleSubmitSearch)}>
              <TextInput
                placeholder="Buscar livro avaliado"
                icon={MagnifyingGlass}
                {...register('search')}
              />
            </SearchReviewForm>
            <UserReviewsContainer>
              {userReviews?.map((review) => {
                return (
                  <div key={review.id}>
                    <span>
                      {intlFormatDistance(review.created_at, new Date(), {
                        locale: 'pt',
                      })}
                    </span>
                    <ReviewedBookCardProfile data={review} />
                  </div>
                )
              })}
            </UserReviewsContainer>
          </div>
          <div>2</div>
        </main>
      </ProfileContentContainer>
    </ProfileContainer>
  )
}
