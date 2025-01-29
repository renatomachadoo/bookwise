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

  const books = await prisma.categoriesOnBooks.findMany({
    include: {
      book: true,
    },
    where: {
      book: {
        name: {
          contains: search,
        },
      },
      ...(category ? { category: { name: category } } : {}),
    },
  })

  const booksToReturn = books.map((book) => {
    return book.book
  })

  return res.json({ books: booksToReturn })
}
