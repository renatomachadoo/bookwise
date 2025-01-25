import { NavigationMenu } from '@/components/navigation-menu'
import {
  HomeContainer,
  HomeContentContainer,
  LastReviewedBooksSection,
  MiddleDiv,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { ChartLineUp, CaretRight } from '@phosphor-icons/react'

import { SectionDivider } from '@/components/section-divider'
import { Action } from '@/components/action'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { BookReviewCard } from '@/components/book-review-card'

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
              {recentlyReviewedBooks &&
                recentlyReviewedBooks.map((recentlyReviewedBook) => {
                  return (
                    <BookReviewCard
                      key={recentlyReviewedBook.id}
                      recentlyReviewedBook={recentlyReviewedBook}
                    />
                  )
                })}
            </LastReviewedBooksSection>
          </MiddleDiv>
          <div>2</div>
        </main>
      </HomeContentContainer>
    </HomeContainer>
  )
}
