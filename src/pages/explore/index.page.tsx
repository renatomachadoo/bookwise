import {
  BookCategory,
  BooksContainer,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogSignInProvidersContainer,
  DialogTitle,
  DrawerBookBottom,
  DrawerBookInfo,
  DrawerBookReview,
  DrawerBookReviews,
  DrawerBookReviewsContainer,
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
import { Action } from '@/components/action'
import { signIn, useSession } from 'next-auth/react'
import { Avatar } from '@/components/avatar'
import { intlFormatDistance } from 'date-fns'

import * as Dialog from '@radix-ui/react-dialog'

import googleLogo from '@/assets/google-logo.svg'
import githubLogo from '@/assets/github-logo.svg'
import { ReviewBookCard } from '@/components/review-book-card'
import { SignInProviderButton } from '@/components/button-sign-in-provider'
import { NavigationMenu } from '@/components/navigation-menu-aside'

const searchFormSchema = z.object({
  search: z.string(),
})

type SearchFormData = z.infer<typeof searchFormSchema>

type User = {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

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
  userAlreadyReviewed: boolean
}

export interface BookData {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  ratings: {
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
  }[]

  ratingsAmount: number
  categories: string[]
  avgRating: number
  userAlreadyReviewed: boolean
}

export default function Explore() {
  const { data: loggedUserData, status } = useSession()
  const router = useRouter()

  const isAuthenticated = status === 'authenticated'

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const selectedCategory = router.query.category
  const search = router.query.search
  const selectedBookId = router.query.book

  const loggedUserImage = loggedUserData?.user?.image || ''
  const user = (loggedUserData?.user as User) || null

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

  async function handleSignInWithGoogle() {
    await signIn('google')
  }

  async function handleSignInWithGithub() {
    await signIn('github')
  }

  const bookImageUrl = book?.cover_url.replace('public', '') || ''
  const bookReviewedByUser = book?.ratings.find(
    (rating) => rating.user_id === user?.id,
  )

  return (
    <>
      <Dialog.Root>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent>
            <DialogClose>
              <X />
            </DialogClose>
            <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>
            <DialogSignInProvidersContainer>
              <SignInProviderButton
                image={googleLogo}
                imageAlt="Google Logo"
                text="Entrar com Google"
                onClick={handleSignInWithGoogle}
              />
              <SignInProviderButton
                image={githubLogo}
                imageAlt="Github Logo"
                text="Entrar com GitHub"
                onClick={handleSignInWithGithub}
              />
            </DialogSignInProvidersContainer>
          </DialogContent>
        </Dialog.Portal>

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
              <DrawerBookTop>
                {bookImageUrl && book ? (
                  <Image
                    src={bookImageUrl}
                    width={171.65}
                    height={242}
                    alt={book?.name}
                  />
                ) : (
                  <Skeleton
                    width={171.65}
                    height={242}
                    style={{ borderRadius: 10 }}
                  />
                )}
                <div>
                  <header>
                    {book ? (
                      <>
                        <h3>{book.name}</h3>
                        <span>{book.author}</span>
                      </>
                    ) : (
                      <>
                        <Skeleton width={200} height={20} />
                        <Skeleton width={180} height={15} />
                      </>
                    )}
                  </header>
                  <div>
                    <span>
                      {book ? (
                        Array.from({ length: 5 }).map((_, i) => {
                          if (i + 1 <= book.avgRating) {
                            return <Star key={i} weight="fill" />
                          }
                          return <Star key={i} />
                        })
                      ) : (
                        <>
                          {' '}
                          <Skeleton width={20} height={20} />
                          <Skeleton width={20} height={20} />
                          <Skeleton width={20} height={20} />
                          <Skeleton width={20} height={20} />
                          <Skeleton width={20} height={20} />
                        </>
                      )}
                    </span>
                    <small>
                      {book ? (
                        <>
                          {book.ratingsAmount}{' '}
                          {book.ratingsAmount === 1
                            ? 'avaliação'
                            : 'avaliações'}
                        </>
                      ) : (
                        <Skeleton width={100} height={15} />
                      )}
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
                      {book ? (
                        String(book.categories).replace(',', ', ')
                      ) : (
                        <Skeleton width={120} height={20} />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <BookOpen />
                  <div>
                    <small>Páginas</small>
                    <span>
                      {book ? (
                        book.total_pages
                      ) : (
                        <Skeleton width={50} height={20} />
                      )}
                    </span>
                  </div>
                </div>
              </DrawerBookBottom>
            </DrawerBookInfo>

            <DrawerBookReviewsContainer>
              <header>
                <h3>Avaliações</h3>
                {!isAuthenticated && (
                  <Dialog.Trigger asChild>
                    <Action text="Avaliar" />
                  </Dialog.Trigger>
                )}
              </header>
              <DrawerBookReviews>
                {isAuthenticated && book && !book.userAlreadyReviewed && (
                  <ReviewBookCard avatar={loggedUserImage} />
                )}
                {book ? (
                  <>
                    {bookReviewedByUser && (
                      <DrawerBookReview variant="light">
                        <header>
                          <Avatar
                            src={bookReviewedByUser.user.image}
                            alt={bookReviewedByUser.user.name}
                            size="md"
                          />
                          <div>
                            <div>
                              <span>{bookReviewedByUser.user.name}</span>
                              <small>
                                {intlFormatDistance(
                                  bookReviewedByUser.created_at,
                                  new Date(),
                                  { locale: 'pt' },
                                )}
                              </small>
                            </div>
                            <span>
                              {Array.from({ length: 5 }).map((_, i) => {
                                if (i + 1 <= bookReviewedByUser.rate) {
                                  return <Star key={i} weight="fill" />
                                }
                                return <Star key={i} />
                              })}
                            </span>
                          </div>
                        </header>
                        <p>{bookReviewedByUser.description}</p>
                      </DrawerBookReview>
                    )}

                    {book.ratings.map((rating) => {
                      if (rating.user_id !== user?.id) {
                        return (
                          <DrawerBookReview key={rating.id}>
                            <header>
                              <Avatar
                                src={rating.user.image}
                                alt={rating.user.name}
                                size="md"
                              />
                              <div>
                                <div>
                                  <span>{rating.user.name}</span>
                                  <small>
                                    {intlFormatDistance(
                                      rating.created_at,
                                      new Date(),
                                      { locale: 'pt' },
                                    )}
                                  </small>
                                </div>
                                <span>
                                  {Array.from({ length: 5 }).map((_, i) => {
                                    if (i + 1 <= rating.rate) {
                                      return <Star key={i} weight="fill" />
                                    }
                                    return <Star key={i} />
                                  })}
                                </span>
                              </div>
                            </header>
                            <p>{rating.description}</p>
                          </DrawerBookReview>
                        )
                      }

                      return null
                    })}
                  </>
                ) : (
                  <>
                    <Skeleton width="100%" height={180} />
                    <Skeleton width="100%" height={180} />
                  </>
                )}
              </DrawerBookReviews>
            </DrawerBookReviewsContainer>
          </DrawerContainer>
        </Drawer>
      </Dialog.Root>
    </>
  )
}
