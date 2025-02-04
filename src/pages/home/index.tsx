import {
  Aside,
  HomeContainer,
  HomeContentContainer,
  LastReviewedBooksSection,
  MiddleDiv,
  PopularBooksSection,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { ChartLineUp, CaretRight } from '@phosphor-icons/react'

import { SectionDivider } from '@/components/section-divider'
import { Action } from '@/components/action'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { BookReviewCard } from '@/components/book-review-card'
import { BookCardSmall } from '@/components/book-card-small'
import { useSession } from 'next-auth/react'
import { LastReadedBookCard } from '@/components/last-readed-book-card'
import { NavigationMenu } from '@/components/navigation-menu-aside'
import { useRouter } from 'next/router'

type BookCardData = {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  avgRating: number
}

interface RecentlyReviewedBookData {
  id: string
  rate: number
  description: string
  created_at: string
  user: {
    id: string
    name: string
    image: string
  }
  book: {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
  }
}

interface LastReadedBookData {
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user_id: string
  book: {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: string
  }
}

export default function Home() {
  const router = useRouter()
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const { data: recentlyReviewedBooks } = useQuery<RecentlyReviewedBookData[]>({
    queryKey: ['recently-reviewed-books'],
    queryFn: async () => {
      const response = await api.get('/books/recently-reviewed-books')
      return response.data
    },
  })

  const { data: popularBooks } = useQuery<BookCardData[]>({
    queryKey: ['popular-books'],
    queryFn: async () => {
      const response = await api.get('/books/popular-books')
      return response.data
    },
  })

  const { data: lastReadedBook } = useQuery<LastReadedBookData | undefined>({
    queryKey: ['last-readed-book'],
    queryFn: async () => {
      const response = await api.get('/books/last-readed-book')
      return response.data
    },
    enabled: isAuthenticated,
  })

  async function handlePopularBookClick(bookId: string) {
    await router.push(`/explore?book=${bookId}`)
  }

  async function handleViewAllPopularBooksClick() {
    await router.push('/explore')
  }

  async function handleViewAllReviews() {
    await router.push('/profile')
  }

  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <header>
          <PageTitle icon={ChartLineUp} title="Início" />
        </header>
        <main>
          <MiddleDiv>
            {lastReadedBook && (
              <div>
                <SectionDivider text="Sua última leitura">
                  <Action
                    size="sm"
                    onClick={handleViewAllReviews}
                    text="Ver todas"
                    icon={CaretRight}
                  />
                </SectionDivider>
                <LastReadedBookCard bookData={lastReadedBook} />
              </div>
            )}
            <div>
              <SectionDivider text="Avaliações mais recentes" />
              <LastReviewedBooksSection>
                {recentlyReviewedBooks?.map((recentlyReviewedBook) => {
                  return (
                    <BookReviewCard
                      key={recentlyReviewedBook.id}
                      recentlyReviewedBook={recentlyReviewedBook}
                    />
                  )
                })}
              </LastReviewedBooksSection>
            </div>
          </MiddleDiv>

          <Aside>
            <div>
              <SectionDivider text="Livros populares">
                <Action
                  size="sm"
                  onClick={handleViewAllPopularBooksClick}
                  text="Ver todos"
                  icon={CaretRight}
                />
              </SectionDivider>
              <PopularBooksSection>
                {popularBooks?.map((popularBook) => {
                  return (
                    <BookCardSmall
                      key={popularBook.id}
                      bookData={popularBook}
                      onClick={() => handlePopularBookClick(popularBook.id)}
                    />
                  )
                })}
              </PopularBooksSection>
            </div>
          </Aside>
        </main>
      </HomeContentContainer>
    </HomeContainer>
  )
}
