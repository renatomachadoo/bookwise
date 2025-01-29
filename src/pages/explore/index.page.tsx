import { NavigationMenu } from '@/components/navigation-menu'
import {
  BookCategory,
  BooksContainer,
  ExploreContainer,
  ExploreContentContainer,
  MainHeader,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { Binoculars } from '@phosphor-icons/react'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { BookCardSmall } from '@/components/book-card-small'

interface CategoriesData {
  id: string
  name: string
}

interface BooksData {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  avgRating: number
}

export default function Explore() {
  const router = useRouter()

  const selectedCategory = router.query.category
  const search = ''

  const { data: booksCategories } = useQuery<CategoriesData[]>({
    queryKey: ['books-categories'],
    queryFn: async () => {
      const response = await api.get('/books/categories')
      return response.data
    },
  })

  const { data: books } = useQuery<BooksData[]>({
    queryKey: ['books', selectedCategory],
    queryFn: async () => {
      const response = await api.get('/books', {
        params: {
          category: selectedCategory,
          search,
        },
      })
      return response.data
    },
  })

  function handleSelectBookCategory(category: string) {
    if (category) {
      return router.replace({
        pathname: router.pathname,
        query: { ...router.query, category },
      })
    }

    const { category: categoryQueryParam, ...otherQueryParams } = router.query

    if (categoryQueryParam) {
      router.replace({
        pathname: router.pathname,
        query: otherQueryParams,
      })
    }
  }

  return (
    <ExploreContainer>
      <NavigationMenu />
      <ExploreContentContainer>
        <header>
          <PageTitle icon={Binoculars} title="Explorar" />
        </header>
        <main>
          <MainHeader>
            <BookCategory
              onClick={() => handleSelectBookCategory('')}
              active={!selectedCategory}
            >
              Tudo
            </BookCategory>
            {booksCategories?.map((category) => {
              return (
                <BookCategory
                  key={category.id}
                  onClick={() => handleSelectBookCategory(category.name)}
                  active={selectedCategory === category.name}
                >
                  {category.name}
                </BookCategory>
              )
            })}
          </MainHeader>
          <BooksContainer>
            {books?.map((book) => {
              return (
                <BookCardSmall key={book.id} bookData={book} imageSize="md" />
              )
            })}
          </BooksContainer>
        </main>
      </ExploreContentContainer>
    </ExploreContainer>
  )
}
