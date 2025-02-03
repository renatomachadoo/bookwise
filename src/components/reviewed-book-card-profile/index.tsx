import Image from 'next/image'
import { ReviewedBookCardProfileContainer, RatingContainer } from './styles'
import { Star } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

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

interface BookCardProps
  extends ComponentProps<typeof ReviewedBookCardProfileContainer> {
  bookData: BookCardData
  imageSize?: 'sm' | 'md'
}

export function ReviewedBookCardProfile({
  bookData: { name, author, avgRating, cover_url },
  imageSize = 'sm',
  ...rest
}: BookCardProps) {
  const bookImageUrl = cover_url.replace('public', '')

  return (
    <ReviewedBookCardProfileContainer {...rest}>
      {imageSize === 'sm' && (
        <Image width={64} height={94} src={bookImageUrl} alt={name} />
      )}
      {imageSize === 'md' && (
        <Image width={108} height={152} src={bookImageUrl} alt={name} />
      )}
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
    </ReviewedBookCardProfileContainer>
  )
}
