import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(205).end
  }

  const lastReviewedBooks = await prisma.rating.findMany({
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
  })

  return res.json({ lastReviewedBooks })
}
