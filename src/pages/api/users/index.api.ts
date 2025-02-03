import { prisma } from '@/lib/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth].api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

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

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const user = <User>session.user

  const user_id = String(req.query.id || '')

  const userIdToSearch = user_id || user.id

  const userExists = await prisma.user.findUnique({
    where: {
      id: userIdToSearch,
    },
  })

  if (!userExists) {
    return res.status(404).json({ message: 'User not found' })
  }

  const userRatings = await prisma.rating.findMany({
    where: {
      user_id: userExists.id,
    },
    include: {
      book: {
        select: {
          author: true,
          total_pages: true,
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  let pagesReadedByUser = 0
  const booksReviewedByUser = userRatings.length
  const authorsReadedByUser = [] as string[]

  const categoriesReadedByUser = [] as { category: string; amount: number }[]

  userRatings.forEach((rating) => {
    if (!authorsReadedByUser.includes(rating.book.author)) {
      authorsReadedByUser.push(rating.book.author)
    }

    pagesReadedByUser = pagesReadedByUser + rating.book.total_pages

    rating.book.categories.forEach((bookCategory) => {
      if (
        categoriesReadedByUser.some(
          (category) => category.category === bookCategory.category.name,
        )
      ) {
        const categoryExists = categoriesReadedByUser.find(
          (category) => category.category === bookCategory.category.name,
        )

        if (!categoryExists) {
          return
        }

        categoryExists.amount = categoryExists.amount + 1
      } else {
        categoriesReadedByUser.push({
          category: bookCategory.category.name,
          amount: 1,
        })
      }
    })
  })

  const mostReadedCategory = { category: '', amount: 1 }

  categoriesReadedByUser.forEach((category) => {
    if (category.amount > mostReadedCategory.amount) {
      mostReadedCategory.category = category.category
      mostReadedCategory.amount = category.amount
    }
  })

  const userToReturn = {
    id: userExists.id,
    name: userExists.name,
    image: userExists.image,
    created_at: userExists.createdAt,
    totalPagesReaded: pagesReadedByUser,
    booksReviewed: booksReviewedByUser,
    authorsReadedAmount: authorsReadedByUser.length,
    mostReadedCategory,
  }

  return res.json(userToReturn)
}
