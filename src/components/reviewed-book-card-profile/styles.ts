import { styled } from '@/styles'

export const ReviewedBookCardProfileContainer = styled('button', {
  border: 0,
  outline: 'none',

  position: 'relative',
  width: '100%',
  padding: '1.125rem $5',
  borderRadius: 8,
  textAlign: 'start',

  background: '$gray700',

  display: 'flex',
  gap: '$5',

  '&:hover': {
    cursor: 'pointer',
    outline: '2px solid $gray600',
  },

  img: {
    objectFit: 'cover',
    borderRadius: 4,
  },

  '> div': {
    height: '100%',
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
