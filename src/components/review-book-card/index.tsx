import { useForm } from 'react-hook-form'
import { Avatar } from '../avatar'
import { RatingInputContainer, ReviewBookCardFormContainer } from './styles'
import { Star } from '@phosphor-icons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  description: z.string().min(1).max(450),
})

type ReviewFormData = z.infer<typeof reviewFormSchema>

interface ReviewBookCardProps {
  avatar: string
}

export function ReviewBookCard({ avatar }: ReviewBookCardProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      description: '',
    },
  })

  const rating = watch('rating')

  function handleStarClick(value: number) {
    setValue('rating', value)
  }

  async function handleSubmitReview(data: ReviewFormData) {
    console.log(data)
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
        placeholder="Deixe uma descrição"
      />

      <button type="submit">Enviar</button>
    </ReviewBookCardFormContainer>
  )
}
