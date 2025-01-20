import { styled } from '@/styles'

export const SignInContainer = styled('div', {
  height: '100vh',
  width: '100%',
  padding: '$5',
  display: 'grid',
  gridTemplateColumns: '598px auto',
  gap: '$5',

  '@media(max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
})

export const SignInBanner = styled('div', {
  width: '100%',
  height: '100%',
  borderRadius: '$md',
  overflow: 'hidden',
  position: 'relative',

  '> img': {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '$md',
  },

  '@media(max-width: 1024px)': {
    display: 'none',
  },
})

export const SignInLogo = styled('div', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
})

export const SignInWelcomeContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const SignInWelcomeMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const SignInWelcomeText = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '> h1': {
    fontSize: '$2xl',
    fontWeight: '$bold',
    color: '$gray100',
    lineHeight: '$short',
  },

  '> p': {
    fontSize: '$md',
    fontWeight: '$regular',
    color: '$gray200',
    lineHeight: '$base',
  },
})

export const SignInWelcomeProviders = styled('div', {
  width: '23.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '@media(max-width: 1024px)': {
    width: 'auto',
  },
})
