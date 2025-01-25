import { styled } from '@/styles'

export const BookReviewCardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
  background: '$gray700',

  padding: '$6',
  borderRadius: 8,

  '> header': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '$4',
  },

  '> header > div': {
    display: 'flex',
    gap: '$4',
  },
})

export const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  span: {
    color: '$gray100',
  },

  small: {
    color: '$gray400',
    fontSize: '$sm',
    textTransform: 'capitalize',
  },
})

export const RatingContainer = styled('div', {
  justifySelf: 'end',

  svg: {
    width: 16,
    height: 16,
    color: '$purple100',
  },
})

export const BookContainer = styled('div', {
  width: '100%',

  display: 'flex',
  gap: '$5',

  '> img': {
    objectFit: 'cover',
  },

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$5',

    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '$1',

      span: {
        lineHeight: '$short',
        fontWeight: '$bold',
        color: '$gray100',
      },

      small: {
        fontSize: '$sm',
        color: '$gray400',
      },
    },

    p: {
      color: '$gray300',
      fontSize: '$sm',
    },
  },
})

export const ViewMoreButton = styled('button', {
  all: 'unset',
  color: '$purple100',
  fontWeight: '$bold',
  fontSize: '$sm',
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
})
