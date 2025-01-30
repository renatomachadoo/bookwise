import { NavigationMenu } from '@/components/navigation-menu'
import {
  BookCategory,
  BooksContainer,
  DrawerBookBottom,
  DrawerBookInfo,
  DrawerBookTop,
  DrawerCloseButton,
  DrawerContainer,
  ExploreContainer,
  ExploreContentContainer,
  MainHeader,
  SearchForm,
} from './styles'
import { PageTitle } from '@/components/page-title'

import {
  Binoculars,
  BookmarkSimple,
  BookOpen,
  MagnifyingGlass,
  Star,
  X,
} from '@phosphor-icons/react'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { BookCardSmall } from '@/components/book-card-small'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@/components/text-input'

import Drawer from 'react-modern-drawer'
import Image from 'next/image'
import { Skeleton } from '@/components/skeleton'

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

interface BookData {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  ratings: [
    {
      id: string
      rate: number
      description: string
      created_at: string
      book_id: string
      user_id: string
      user: {
        id: string
        name: string
        image: string
        createdAt: string
        updatedAt: string
      }
    },
  ]
  ratingsAmount: number
  categories: string[]
  avgRating: number
}

export default function Explore() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const selectedCategory = router.query.category
  const search = router.query.search
  const selectedBookId = router.query.book

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

  const { data: book } = useQuery<BookData>({
    queryKey: ['book', selectedBookId],
    queryFn: async () => {
      const response = await api.get(`/books/${selectedBookId}`)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return response.data
    },
    enabled: !!selectedBookId,
  })

  function handleSelectBook(bookId: string) {
    return router.replace({
      pathname: router.pathname,
      query: { ...router.query, book: bookId },
    })
  }

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

  const bookImageUrl = book?.cover_url.replace('public', '') || ''

  return (
    <>
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
                  <BookCardSmall
                    key={book.id}
                    bookData={book}
                    imageSize="md"
                    onClick={() => handleSelectBook(book.id)}
                  />
                )
              })}
            </BooksContainer>
          </main>
        </ExploreContentContainer>
      </ExploreContainer>
      <Drawer
        customIdSuffix="drawer"
        open={!!selectedBookId}
        onClose={() => handleSelectBook('')}
        direction="right"
        size={660}
      >
        <DrawerContainer>
          <DrawerCloseButton onClick={() => handleSelectBook('')}>
            <X />
          </DrawerCloseButton>
          <DrawerBookInfo>
            {bookImageUrl && book ? (
              <>
                <DrawerBookTop>
                  <Image
                    src={bookImageUrl}
                    width={171.65}
                    height={242}
                    alt={book?.name}
                  />
                  <div>
                    <header>
                      <h3>{book.name}</h3>
                      <span>{book.author}</span>
                    </header>
                    <div>
                      <span>
                        {Array.from({ length: 5 }).map((_, i) => {
                          if (i + 1 <= book.avgRating) {
                            return <Star key={i} weight="fill" />
                          }
                          return <Star key={i} />
                        })}
                      </span>
                      <small>
                        {book.ratingsAmount}{' '}
                        {book.ratingsAmount === 1 ? 'avaliação' : 'avaliações'}
                      </small>
                    </div>
                  </div>
                </DrawerBookTop>
                <DrawerBookBottom>
                  <div>
                    <BookmarkSimple />
                    <div>
                      <small>Categoria</small>
                      <span>{String(book.categories).replace(',', ', ')}</span>
                    </div>
                  </div>
                  <div>
                    <BookOpen />
                    <div>
                      <small>Páginas</small>
                      <span>{book.total_pages}</span>
                    </div>
                  </div>
                </DrawerBookBottom>
              </>
            ) : (
              <>
                <DrawerBookTop>
                  <Skeleton
                    width={171.65}
                    height={242}
                    style={{ borderRadius: 10 }}
                  />
                  <div>
                    <header>
                      <Skeleton width={200} height={20} />
                      <Skeleton width={180} height={15} />
                    </header>
                    <div>
                      <span>
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                      </span>
                      <small>
                        <Skeleton width={100} height={15} />
                      </small>
                    </div>
                  </div>
                </DrawerBookTop>
                <DrawerBookBottom>
                  <div>
                    <BookmarkSimple />
                    <div>
                      <small>Categoria</small>
                      <span>
                        <Skeleton width={120} height={20} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <BookOpen />
                    <div>
                      <small>Páginas</small>
                      <span>
                        <Skeleton width={50} height={20} />
                      </span>
                    </div>
                  </div>
                </DrawerBookBottom>
              </>
            )}
          </DrawerBookInfo>
        </DrawerContainer>
      </Drawer>
    </>
  )
}
