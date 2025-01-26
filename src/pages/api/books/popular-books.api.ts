import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(205).end()
  }

  const booksWithRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
    orderBy: {
      _avg: {
        rate: 'desc',
      },
    },
    take: 4,
  })

  const topBooksWithRatings = booksWithRatings.map((rating) => ({
    bookId: rating.book_id,
    avgRating: rating._avg.rate || 0,
  }))

  const popularBooks = await prisma.book.findMany({
    where: {
      id: {
        in: topBooksWithRatings.map((book) => book.bookId),
      },
    },
  })

  const booksWithRatingsIncluded = popularBooks.map((book) => {
    const ratingInfo = topBooksWithRatings.find(
      (rating) => rating.bookId === book.id,
    )
    return {
      ...book,
      avgRating: ratingInfo?.avgRating || 0,
    }
  })

  return res.json(booksWithRatingsIncluded)
}
