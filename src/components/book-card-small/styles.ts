import { styled } from '@/styles'

export const BookCardContainer = styled('div', {
  position: 'relative',
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

export const AlreadyReaded = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,

  padding: '$1 $3',

  borderTopRightRadius: 8,
  borderBottomLeftRadius: 4,

  background: '$green300',

  fontSize: '$xs',
  fontWeight: '$bold',
  lineHeigh: '130%',
  color: '$green100',

  textTransform: 'uppercase',
})
