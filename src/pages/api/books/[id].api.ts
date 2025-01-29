import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

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
  }

  return res.json({ bookToReturn })
}
