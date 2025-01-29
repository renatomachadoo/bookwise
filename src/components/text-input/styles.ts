import { styled } from '@/styles'

export const TextInputContainer = styled('label', {
  background: '$gray800',

  padding: '0.875rem $5',

  borderRadius: 4,
  border: '1px solid $gray500',

  display: 'flex',
  gap: '$2',
  alignItems: 'center',
  cursor: 'text',

  svg: {
    color: '$gray500',
    height: 20,
    width: 20,
  },
})

export const Input = styled('input', {
  all: 'unset',

  height: 20,
  width: '100%',

  fontSize: '$sm',
  color: '$gray100',

  '&:focus': {
    boxShadow: 'none',
  },

  '&::placeholder': {
    fontSize: '$sm',
    color: '$gray400',
  },
})
