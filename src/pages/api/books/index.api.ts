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

  const category = String(req.query.category || '')
  const search = String(req.query.search || '')

  const booksSelected = await prisma.book.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          author: {
            contains: search,
          },
        },
      ],
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

  const booksWithAvgRating = booksSelected.map((book) => {
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

  const session = await getServerSession(req, res, authOptions)

  let books = booksWithAvgRating

  if (session) {
    const user = <User>session.user
    const userReviews = await prisma.rating.groupBy({
      by: 'book_id',
      where: {
        user_id: user.id,
      },
    })

    books = books.map((book) => {
      if (userReviews.some((review) => review.book_id === book.id)) {
        return {
          ...book,
          readed: true,
        }
      }
      return book
    })

    return res.json(books)
  }

  return res.json(books)
}
