import { NavigationMenu } from '@/components/navigation-menu'
import {
  ProfileAsideSeparator,
  ProfileContainer,
  ProfileContentContainer,
  ProfileStatsContainer,
  SearchReviewForm,
  UserProfileAside,
  UserReviewsContainer,
} from './styles'
import { PageTitle } from '@/components/page-title'

import {
  BookmarkSimple,
  BookOpen,
  Books,
  MagnifyingGlass,
  User,
  UserList,
} from '@phosphor-icons/react'
import { TextInput } from '@/components/text-input'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { ReviewedBookCardProfile } from '@/components/reviewed-book-card-profile'
import { intlFormatDistance } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@/components/avatar'

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

interface UserProfileInfoResponse {
  id: string
  name: string
  image: string
  created_at: string
  totalPagesReaded: number
  booksReviewed: number
  authorsReadedAmount: number
  mostReadedCategory: {
    category: string
    amount: number
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

  const { data: userData } = useQuery<UserProfileInfoResponse>({
    queryKey: ['user-profile-info'],
    queryFn: async () => {
      const response = await api.get('/users', {
        params: {
          user_id: userId,
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
          <UserProfileAside>
            <header>
              <Avatar src={userData?.image} size="lg" />
              <span>{userData?.name}</span>
              <small>{userData?.created_at}</small>
            </header>
            <ProfileAsideSeparator></ProfileAsideSeparator>
            <ProfileStatsContainer>
              <div>
                <BookOpen />
                <div>
                  <span>{userData?.totalPagesReaded}</span>
                  <small>Páginas lidas</small>
                </div>
              </div>

              <div>
                <Books />
                <div>
                  <span>{userData?.booksReviewed}</span>
                  <small>Livros avaliado</small>
                </div>
              </div>

              <div>
                <UserList />
                <div>
                  <span>{userData?.authorsReadedAmount}</span>
                  <small>Autores lidos</small>
                </div>
              </div>

              <div>
                <BookmarkSimple />
                <div>
                  <span>{userData?.mostReadedCategory.category}</span>
                  <small>Categoria mais lida</small>
                </div>
              </div>
            </ProfileStatsContainer>
          </UserProfileAside>
        </main>
      </ProfileContentContainer>
    </ProfileContainer>
  )
}
