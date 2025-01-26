import { getNameInitials } from '@/utils/get-name-initials'
import { Avatar } from '@/components/avatar'
import {
  BookContainer,
  BookReviewCardContainer,
  InfoContainer,
  RatingContainer,
  ViewMoreButton,
} from './styles'
import { Star } from '@phosphor-icons/react'

import { intlFormatDistance } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'

interface BookReviewCardProps {
  recentlyReviewedBook: {
    id: string
    rate: number
    description: string
    created_at: string
    user: {
      id: string
      name: string
      image: string
    }
    book: {
      id: string
      name: string
      author: string
      summary: string
      cover_url: string
      total_pages: number
    }
  }
}

export function BookReviewCard({
  recentlyReviewedBook: { rate, description, created_at, user, book },
}: BookReviewCardProps) {
  const [viewMore, setViewMore] = useState(false)
  const maxLength = 230
  const usernameInitials = getNameInitials(user.name)
  const bookImage = book.cover_url.replace('public', '')
  const descriptionOfBookLength = description.length
  const descriptionOfBookExceedLength = descriptionOfBookLength > maxLength
  const bookDescription = viewMore
    ? description.substring(0, 999)
    : description.substring(0, maxLength)

  function handleViewMore() {
    setViewMore(true)
  }

  return (
    <BookReviewCardContainer>
      <header>
        <div>
          <Avatar
            size="md"
            src={user.image}
            alt={user.name}
            fallbackText={usernameInitials}
          />
          <InfoContainer>
            <span>{user.name}</span>
            <small>
              {intlFormatDistance(created_at, new Date(), { locale: 'pt' })}
            </small>
          </InfoContainer>
        </div>
        <RatingContainer>
          {Array.from({ length: 5 }).map((_, i) => {
            if (i + 1 <= rate) {
              return <Star key={i} weight="fill" />
            }
            return <Star key={i} />
          })}
        </RatingContainer>
      </header>
      <BookContainer>
        <Image width={108} height={152} src={bookImage} alt={book.name} />
        <div>
          <header>
            <span>{book.name}</span>
            <small>{book.author}</small>
          </header>
          <p>
            {bookDescription}
            {descriptionOfBookExceedLength && !viewMore && (
              <>
                <span>... </span>
                <ViewMoreButton onClick={handleViewMore}>
                  ver mais
                </ViewMoreButton>
              </>
            )}
          </p>
        </div>
      </BookContainer>
    </BookReviewCardContainer>
  )
}
