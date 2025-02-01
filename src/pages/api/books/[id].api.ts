import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth].api'

type User = {
  id: string
  name: string
  email: string
  emailVerified: string
  image: string
  created_at: string
  updated_at: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const bookId = String(req.query.id)

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: true,
        },
      },
    },
  })

  if (!book) {
    return res.status(404).json({ message: 'Book not found!' })
  }

  const bookCategoriesRaw = await prisma.categoriesOnBooks.findMany({
    where: {
      book_id: book.id,
    },
    orderBy: {
      category: {
        name: 'asc',
      },
    },
    include: {
      category: true,
    },
  })

  const bookCategories = bookCategoriesRaw.map(
    (bookCategory) => bookCategory.category.name,
  )

  const avgRating =
    book.ratings.length > 0
      ? book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
        book.ratings.length
      : 0

  const bookToReturn = {
    ...book,
    ratingsAmount: book.ratings.length,
    categories: bookCategories,
    avgRating,
    userAlreadyReviewed: false,
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.json(bookToReturn)
  }

  const user = <User>session.user

  const userAlreadyReviewed = bookToReturn.ratings.some(
    (rating) => rating.user_id === user.id,
  )

  bookToReturn.userAlreadyReviewed = userAlreadyReviewed

  return res.json(bookToReturn)
}
