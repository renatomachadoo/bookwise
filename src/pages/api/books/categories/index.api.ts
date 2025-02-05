import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return res.json(categories)
}
