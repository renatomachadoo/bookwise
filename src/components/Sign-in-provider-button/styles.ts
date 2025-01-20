import { styled } from '@/styles'

export const ButtonContainer = styled('button', {
  all: 'unset',

  cursor: 'pointer',

  maxWidth: '100%',
  padding: '1.25rem 1.5rem',

  display: 'flex',
  alignItems: 'center',
  gap: '$6',

  background: '$gray600',
  color: '$gray200',

  fontSize: '$lg',
  fontWeight: '$bold',
  lineHeight: '$base',

  borderRadius: 8,

  img: {
    height: 32,
    width: 32,
  },

  '&:hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray500',
  },
})
