import Image from 'next/image'
import { BookCardContainer, RatingContainer } from './styles'
import { Star } from '@phosphor-icons/react'
import { intlFormatDistance } from 'date-fns'

type LastReadedBookData = {
  id: string
  rate: number
  description: string
  created_at: string
  book_id: string
  user_id: string
  book: {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: string
  }
}

interface BookCardProps {
  bookData: LastReadedBookData
}

export function LastReadedBookCard({
  bookData: {
    rate,
    description,
    created_at,
    book: { cover_url, author, name },
  },
}: BookCardProps) {
  const bookImageUrl = cover_url.replace('public', '')
  const descriptionExceedLength = description.length > 230
  const descriptionReduced = description.substring(0, 230)

  return (
    <BookCardContainer>
      <Image width={108} height={152} src={bookImageUrl} alt={name} />
      <div>
        <header>
          <div>
            <span>
              {intlFormatDistance(created_at, new Date(), { locale: 'pt' })}
            </span>
            <RatingContainer>
              {Array.from({ length: 5 }).map((_, i) => {
                if (i + 1 <= rate) {
                  return <Star key={i} weight="fill" />
                }
                return <Star key={i} />
              })}
            </RatingContainer>
          </div>
          <span>{name}</span>
          <small>{author}</small>
        </header>
        <p>
          {descriptionExceedLength ? descriptionReduced + '...' : description}
        </p>
      </div>
    </BookCardContainer>
  )
}
