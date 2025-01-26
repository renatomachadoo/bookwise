import { NavigationMenu } from '@/components/navigation-menu'
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
import { BookCard } from '@/components/book-card'

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

export default function Home() {
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

  return (
    <HomeContainer>
      <NavigationMenu />
      <HomeContentContainer>
        <header>
          <PageTitle icon={ChartLineUp} title="Início" />
        </header>
        <main>
          <MiddleDiv>
            <SectionDivider text="Sua última leitura">
              <Action
                size="sm"
                onClick={() => console.log('ola')}
                text="Ver todas"
                icon={CaretRight}
              />
            </SectionDivider>

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
          </MiddleDiv>

          <Aside>
            <SectionDivider text="Livros populares">
              <Action
                size="sm"
                onClick={() => console.log('ola')}
                text="Ver todos"
                icon={CaretRight}
              />
            </SectionDivider>
            <PopularBooksSection>
              {popularBooks?.map((popularBook) => {
                return <BookCard key={popularBook.id} bookData={popularBook} />
              })}
            </PopularBooksSection>
          </Aside>
        </main>
      </HomeContentContainer>
    </HomeContainer>
  )
}
