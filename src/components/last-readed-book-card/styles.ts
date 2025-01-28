import { styled } from '@/styles'

export const BookCardContainer = styled('div', {
  width: '100%',
  padding: '$5 $6',
  borderRadius: 8,

  background: '$gray600',

  display: 'flex',
  gap: '$6',

  img: {
    objectFit: 'cover',
    borderRadius: 4,
  },

  '> div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    header: {
      display: 'flex',
      flexDirection: 'column',

      '> div': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '$3',
        span: {
          color: '$gray300',
          fontSize: '$sm',
          fontWeight: '$regular',
          textTransform: 'capitalize',
        },
      },

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

    p: {
      marginTop: '$6',
      color: '$gray300',
      fontSize: '$sm',
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
