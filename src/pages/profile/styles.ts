import { styled } from '@/styles'

export const ProfileContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gridTemplateRows: '1fr',
  gap: '6rem',
  overflow: 'hidden',
})

export const ProfileContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> header': {
    padding: '$2',
    marginTop: '3.25rem',
    marginBottom: '$10',
  },

  main: {
    flexGrow: 1,
    height: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem',

    '> div': {
      height: '100%',
      overflow: 'auto',
      paddingRight: '$2',
    },
  },
})

export const SearchReviewForm = styled('form', {
  width: '100%',
})

export const UserReviewsContainer = styled('div', {
  marginTop: '$8',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    '> span': {
      color: '$gray300',
      fontSize: '$sm',
      lineHeigh: '$base',
      textTransform: 'capitalize',
    },
  },
})
