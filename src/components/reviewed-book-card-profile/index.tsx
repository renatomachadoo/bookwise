import Image from 'next/image'
import { ReviewedBookCardProfileContainer, RatingContainer } from './styles'
import { Star } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

type Book = {
  author: string
  cover_url: string
  created_at: string
  id: string
  name: string
  summary: string
  total_pages: number
}

interface Data {
  book_id: string
  created_at: string
  description: string
  id: string
  rate: number
  user_id: string
  book: Book
}

interface BookCardProps
  extends ComponentProps<typeof ReviewedBookCardProfileContainer> {
  data: Data
}

export function ReviewedBookCardProfile({
  data: {
    rate,
    description,
    book: { name, author, cover_url },
  },
  ...rest
}: BookCardProps) {
  const bookImageUrl = cover_url.replace('public', '')

  return (
    <ReviewedBookCardProfileContainer {...rest}>
      <div>
        <Image width={98} height={134} src={bookImageUrl} alt={name} />
        <div>
          <header>
            <span>{name}</span>
            <small>{author}</small>
          </header>
          <RatingContainer>
            {Array.from({ length: 5 }).map((_, i) => {
              if (i + 1 <= rate) {
                return <Star key={i} weight="fill" />
              }
              return <Star key={i} />
            })}
          </RatingContainer>
        </div>
      </div>
      <p>{description}</p>
    </ReviewedBookCardProfileContainer>
  )
}
