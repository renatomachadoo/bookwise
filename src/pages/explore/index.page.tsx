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

interface CategoriesData {
  id: string
  name: string
}

export default function Explore() {
  const { data: booksCategories } = useQuery<CategoriesData[]>({
    queryKey: ['books-categories'],
    queryFn: async () => {
      const response = await api.get('/books/categories')
      return response.data
    },
  })

  return (
    <ExploreContainer>
      <NavigationMenu />
      <ExploreContentContainer>
        <header>
          <PageTitle icon={Binoculars} title="Explorar" />
        </header>
        <main>
          <MainHeader>
            <BookCategory>Tudo</BookCategory>
            {booksCategories?.map((category) => {
              return (
                <BookCategory key={category.id}>{category.name}</BookCategory>
              )
            })}
          </MainHeader>
        </main>
      </ExploreContentContainer>
    </ExploreContainer>
  )
}
