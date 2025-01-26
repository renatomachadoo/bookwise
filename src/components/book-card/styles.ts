import { styled } from '@/styles'

export const BookCardContainer = styled('div', {
  width: '100%',
  padding: '1.125rem $5',
  borderRadius: 8,

  background: '$gray700',

  display: 'flex',
  gap: '$5',

  img: {
    objectFit: 'cover',
    borderRadius: 4,
  },

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    header: {
      display: 'flex',
      flexDirection: 'column',

      span: {
        color: '$gray100',
        fontWeight: '$bold',
        lineHeight: '$short',
      },

      small: {
        color: '$gray400',
        fontSize: '$sm',
      },
    },
  },
})

export const RatingContainer = styled('div', {
  display: 'flex',
  gap: '$1',

  svg: {
    width: 16,
    height: 16,
    color: '$purple100',
  },
})
