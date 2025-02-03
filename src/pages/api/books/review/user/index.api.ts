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

  const user_id = req.query.user_id

  const userIdToSearch = (user_id && String(user_id)) || user.id

  const ratingsByThisUser = await prisma.rating.findMany({
    where: {
      user_id: userIdToSearch,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
  })

  return res.json(ratingsByThisUser)
}
