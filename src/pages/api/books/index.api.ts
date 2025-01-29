import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const category = String(req.query.category || '')
  const search = String(req.query.search || '')

  const books = await prisma.book.findMany({
    where: {
      name: {
        contains: search,
      },
      ...(category
        ? {
            categories: {
              some: { category: { name: category } },
            },
          }
        : {}),
    },
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  const booksWithAvgRating = books.map((book) => {
    const avgRating =
      book.ratings.length > 0
        ? book.ratings.reduce((sum, rating) => sum + rating.rate, 0) /
          book.ratings.length
        : 0

    return {
      id: book.id,
      name: book.name,
      author: book.author,
      summary: book.summary,
      cover_url: book.cover_url,
      total_pages: book.total_pages,
      created_at: book.created_at,
      avgRating,
    }
  })

  return res.json(booksWithAvgRating)
}
