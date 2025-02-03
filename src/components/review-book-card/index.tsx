import { useForm } from 'react-hook-form'
import { Avatar } from '../avatar'
import {
  FormButton,
  FormButtonsContainer,
  RatingInputContainer,
  ReviewBookCardFormContainer,
} from './styles'
import { Check, Star, X } from '@phosphor-icons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '@/lib/react-query'
import { BookData } from '@/pages/explore/index.page'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

type User = {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

const reviewFormSchema = z.object({
  rating: z.number().min(0).max(5),
  description: z.string().min(1).max(450),
})

type ReviewFormData = z.infer<typeof reviewFormSchema>

interface ReviewBookCardProps {
  avatar: string
}

export function ReviewBookCard({ avatar }: ReviewBookCardProps) {
  const { data } = useSession()
  const router = useRouter()

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ReviewFormData>({
      resolver: zodResolver(reviewFormSchema),
      defaultValues: {
        rating: 0,
        description: '',
      },
    })

  const rating = watch('rating')

  const selectedBookId = String(router.query.book)
  const user = data?.user as User | null

  function updateBookReviewsCache({ description, rating }: ReviewFormData) {
    const cached = queryClient.getQueryData<BookData>(['book', selectedBookId])
    if (cached) {
      queryClient.setQueryData<BookData>(['book', selectedBookId], {
        ...cached,
        userAlreadyReviewed: true,
        ratings: [
          {
            id: String(cached.ratings.length + 1),
            rate: rating,
            description,
            created_at: String(new Date()),
            book_id: selectedBookId,
            user_id: user?.id || '',
            user: {
              id: user?.id || '',
              name: user?.name || '',
              image: user?.image || '',
              createdAt: user?.createdAt || '',
              updatedAt: user?.updatedAt || '',
            },
          },
          ...cached.ratings,
        ],
      })
    }

    return { cached }
  }

  const { mutate: submitReviewFn, isPending } = useMutation({
    mutationFn: async ({ description, rating }: ReviewFormData) => {
      await api.post('/books/review', {
        description,
        rate: rating,
        book_id: selectedBookId,
      })
    },
    onSuccess(_, { description, rating }) {
      updateBookReviewsCache({ description, rating })
    },
  })

  function handleStarClick(value: number) {
    setValue('rating', value)
  }

  function handleResetFormClick() {
    reset()
  }

  async function handleSubmitReview(data: ReviewFormData) {
    const { description, rating } = data

    submitReviewFn({ description, rating })
  }

  return (
    <ReviewBookCardFormContainer onSubmit={handleSubmit(handleSubmitReview)}>
      <header>
        <Avatar src={avatar} size="md" />
        <RatingInputContainer>
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1

            return (
              <button
                type="button"
                key={value}
                onClick={() => handleStarClick(value)}
              >
                <Star weight={value <= rating ? 'fill' : 'regular'} />
              </button>
            )
          })}
        </RatingInputContainer>
      </header>

      <textarea
        {...register('description')}
        placeholder="Escreva a sua avaliação"
      />

      <FormButtonsContainer>
        <FormButton
          type="button"
          aria-label="Limpar campos do formulário de review do livro"
          onClick={handleResetFormClick}
        >
          <X />
        </FormButton>
        <FormButton
          color="green"
          type="submit"
          aria-label="Enviar formulário de review do livro"
          disabled={isPending}
        >
          <Check />
        </FormButton>
      </FormButtonsContainer>
    </ReviewBookCardFormContainer>
  )
}
