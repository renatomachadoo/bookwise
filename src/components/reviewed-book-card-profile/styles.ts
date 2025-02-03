import { styled } from '@/styles'

export const ReviewedBookCardProfileContainer = styled('div', {
  width: '100%',
  padding: '$6',
  borderRadius: 8,
  textAlign: 'start',

  background: '$gray700',

  '> div': {
    display: 'flex',
    gap: '$5',

    img: {
      objectFit: 'cover',
      borderRadius: 4,
    },

    '> div': {
      width: '100%',

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
  },

  p: {
    marginTop: '$6',
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
