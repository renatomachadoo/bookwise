import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth].api'

type User = {
  id: string
  name: string
  email: string
  emailVerified: string
  image: string
  created_at: string
  updated_at: string
}

const createReviewBodySchema = z.object({
  rate: z.number().min(0).max(5),
  description: z.string().min(1).max(450),
  book_id: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  const user = <User>session.user

  const { rate, description, book_id } = createReviewBodySchema.parse(req.body)

  const bookExists = await prisma.book.findUnique({
    where: {
      id: book_id,
    },
  })

  if (!bookExists) {
    return res.status(404).json({ message: 'Book not found' })
  }

  const userAlreadyReviewed = await prisma.rating.findFirst({
    where: {
      book_id: bookExists.id,
      user_id: user.id,
    },
  })

  if (userAlreadyReviewed) {
    return res.status(409).json({ message: 'User already reviewed this book' })
  }

  await prisma.rating.create({
    data: {
      description,
      rate,
      book_id,
      user_id: user.id,
    },
  })

  return res.status(204).end()
}
