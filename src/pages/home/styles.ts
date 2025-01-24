import { styled } from '@/styles'

export const HomeContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gap: '6rem',
})

export const HomeContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> header': {
    marginTop: '3.25rem',
    marginBottom: '$10',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '4rem',
  },
})
