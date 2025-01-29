import { NavigationMenu } from '@/components/navigation-menu'
import {
  BookCategory,
  ExploreContainer,
  ExploreContentContainer,
  MainHeader,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { Binoculars } from '@phosphor-icons/react'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

interface CategoriesData {
  id: string
  name: string
}

export default function Explore() {
  const router = useRouter()

  const { data: booksCategories } = useQuery<CategoriesData[]>({
    queryKey: ['books-categories'],
    queryFn: async () => {
      const response = await api.get('/books/categories')
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

  const selectedCategory = router.query.category

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
        </main>
      </ExploreContentContainer>
    </ExploreContainer>
  )
}
