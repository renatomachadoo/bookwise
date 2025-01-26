import Image from 'next/image'
import { BookCardContainer, RatingContainer } from './styles'
import { Star } from '@phosphor-icons/react'

type BookCardData = {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  avgRating: number
}

interface BookCardProps {
  bookData: BookCardData
}

export function BookCardSmall({
  bookData: { name, author, avgRating, cover_url },
}: BookCardProps) {
  const bookImageUrl = cover_url.replace('public', '')

  return (
    <BookCardContainer>
      <Image width={64} height={94} src={bookImageUrl} alt={name} />
      <div>
        <header>
          <span>{name}</span>
          <small>{author}</small>
        </header>
        <RatingContainer>
          {Array.from({ length: 5 }).map((_, i) => {
            if (i + 1 <= avgRating) {
              return <Star key={i} weight="fill" />
            }
            return <Star key={i} />
          })}
        </RatingContainer>
      </div>
    </BookCardContainer>
  )
}
