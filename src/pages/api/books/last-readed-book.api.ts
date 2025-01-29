import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth].api'
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

  const lastReadedBook = await prisma.rating.findFirst({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
    where: {
      user_id: user.id,
    },
  })

  return res.json(lastReadedBook)
}
