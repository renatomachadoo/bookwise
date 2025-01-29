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
  })

  return res.json(books)
}
