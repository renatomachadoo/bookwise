import { NavigationMenu } from '@/components/navigation-menu'
import {
  BookCategory,
  BooksContainer,
  ExploreContainer,
  ExploreContentContainer,
  MainHeader,
  SearchForm,
} from './styles'
import { PageTitle } from '@/components/page-title'

import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { BookCardSmall } from '@/components/book-card-small'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@/components/text-input'

const searchFormSchema = z.object({
  search: z.string(),
})

type SearchFormData = z.infer<typeof searchFormSchema>

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
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const router = useRouter()

  const selectedCategory = router.query.category
  const search = router.query.search

  const { data: booksCategories } = useQuery<CategoriesData[]>({
    queryKey: ['books-categories'],
    queryFn: async () => {
      const response = await api.get('/books/categories')
      return response.data
    },
  })

  const { data: books, isPending: isPendingBooksData } = useQuery<BooksData[]>({
    queryKey: ['books', selectedCategory, search],
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
    return router.replace({
      pathname: router.pathname,
      query: { ...router.query, category },
    })
  }

  function handleSubmitSearchForm(data: SearchFormData) {
    const { search } = data

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, search },
    })
  }

  return (
    <ExploreContainer>
      <NavigationMenu />
      <ExploreContentContainer>
        <header>
          <PageTitle icon={Binoculars} title="Explorar" />
          <SearchForm onSubmit={handleSubmit(handleSubmitSearchForm)}>
            <TextInput
              placeholder="Buscar livro ou autor"
              icon={MagnifyingGlass}
              {...register('search')}
              disabled={isPendingBooksData}
            />
          </SearchForm>
        </header>
        <main>
          <MainHeader>
            <BookCategory
              onClick={() => handleSelectBookCategory('')}
              active={!selectedCategory}
              disabled={isPendingBooksData}
            >
              Tudo
            </BookCategory>
            {booksCategories?.map((category) => {
              return (
                <BookCategory
                  key={category.id}
                  onClick={() => handleSelectBookCategory(category.name)}
                  active={selectedCategory === category.name}
                  disabled={isPendingBooksData}
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
