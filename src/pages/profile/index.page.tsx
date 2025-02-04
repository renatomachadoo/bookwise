import { NavigationMenu } from '@/components/navigation-menu-aside'
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
  CaretLeft,
  MagnifyingGlass,
  User,
  UserList,
} from '@phosphor-icons/react'
import { TextInput } from '@/components/text-input'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { ReviewedBookCardProfile } from '@/components/reviewed-book-card-profile'
import { format, intlFormatDistance } from 'date-fns'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@/components/avatar'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'
import { Action } from '@/components/action'

type User = {
  id: string
  name: string
  email: string
  emailVerified: string
  image: string
  created_at: string
  updated_at: string
}

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
  userIsAdifferentUser: boolean
}

export default function Profile({
  id,
  authorsReadedAmount,
  booksReviewed,
  created_at,
  image,
  mostReadedCategory,
  name,
  totalPagesReaded,
  userIsAdifferentUser,
}: UserProfileInfoResponse) {
  const router = useRouter()

  const { handleSubmit, register, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const userId = router.query.id
  const search = router.query.search

  const { data: userReviews } = useQuery<UserReviewsResponse[]>({
    queryKey: ['user-reviews', search, id],
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

  async function handleComeBackToProfile() {
    reset()
    await router.push('/profile')
  }

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
          {userIsAdifferentUser ? (
            <Action
              text="Voltar"
              variant="white"
              size="md"
              iconBefore
              icon={CaretLeft}
              onClick={handleComeBackToProfile}
            />
          ) : (
            <PageTitle icon={User} title="Perfil" />
          )}
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
              <Avatar src={image} size="lg" />
              <span>{name}</span>
              <small>membro desde {format(created_at, 'y')}</small>
            </header>
            <ProfileAsideSeparator></ProfileAsideSeparator>
            <ProfileStatsContainer>
              <div>
                <BookOpen />
                <div>
                  <span>{totalPagesReaded}</span>
                  <small>Páginas lidas</small>
                </div>
              </div>

              <div>
                <Books />
                <div>
                  <span>{booksReviewed}</span>
                  <small>Livros avaliados</small>
                </div>
              </div>

              <div>
                <UserList />
                <div>
                  <span>{authorsReadedAmount}</span>
                  <small>Autores lidos</small>
                </div>
              </div>

              <div>
                <BookmarkSimple />
                <div>
                  <span>{mostReadedCategory.category}</span>
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  const user = session.user as User

  const user_id = String(query?.id || '')

  const userIdToSearch = user_id || user.id

  const userExists = await prisma.user.findUnique({
    where: {
      id: userIdToSearch,
    },
  })

  if (!userExists) {
    return {
      notFound: true,
    }
  }

  const userRatings = await prisma.rating.findMany({
    where: {
      user_id: userExists.id,
    },
    include: {
      book: {
        select: {
          author: true,
          total_pages: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  let pagesReadedByUser = 0
  const booksReviewedByUser = userRatings.length
  const authorsReadedByUser = [] as string[]

  const categoriesReadedByUser = [] as { category: string; amount: number }[]

  userRatings.forEach((rating) => {
    if (!authorsReadedByUser.includes(rating.book.author)) {
      authorsReadedByUser.push(rating.book.author)
    }

    pagesReadedByUser += rating.book.total_pages

    rating.book.categories.forEach((bookCategory) => {
      const categoryExists = categoriesReadedByUser.find(
        (category) => category.category === bookCategory.category.name,
      )

      if (categoryExists) {
        categoryExists.amount += 1
      } else {
        categoriesReadedByUser.push({
          category: bookCategory.category.name,
          amount: 1,
        })
      }
    })
  })

  const mostReadedCategory = { category: '', amount: 0 }

  categoriesReadedByUser.forEach((category) => {
    if (category.amount > mostReadedCategory.amount) {
      mostReadedCategory.category = category.category
      mostReadedCategory.amount = category.amount
    }
  })

  const userIsAdifferentUser = user.id !== userExists.id

  const userToReturn = {
    id: userExists.id,
    name: userExists.name,
    image: userExists.image,
    created_at: String(userExists.createdAt),
    totalPagesReaded: pagesReadedByUser,
    booksReviewed: booksReviewedByUser,
    authorsReadedAmount: authorsReadedByUser.length,
    mostReadedCategory,
    userIsAdifferentUser,
  }

  return {
    props: userToReturn,
  }
}
