import { styled } from '@/styles'

export const HomeContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gridTemplateRows: '1fr',
  gap: '6rem',
  overflow: 'hidden',
})

export const HomeContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> header': {
    marginTop: '3.25rem',
    marginBottom: '$10',
  },

  main: {
    // borderRadius: 8,
    flexGrow: 1,
    height: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem',

    '> div': {
      height: '100%',
      overflow: 'auto',
    },
  },
})

export const MiddleDiv = styled('div', {
  paddingTop: '$2',
  paddingRight: '$2',

  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },
})

export const LastReviewedBooksSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const Aside = styled('div', {
  paddingTop: '$2',
  paddingRight: '$2',

  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',
  },
})

export const PopularBooksSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})
