import { styled } from '@/styles'

export const ReviewBookCardFormContainer = styled('form', {
  width: '100%',
  padding: '$6',

  display: 'flex',
  flexDirection: 'column',

  background: '$gray700',

  borderRadius: 8,

  '> header': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '$4',
  },

  textarea: {
    all: 'unset',

    height: '10.25rem',

    background: '$gray800',

    marginTop: '$6',
    padding: '0.875rem $5',
    borderRadius: 4,

    fontSize: '$sm',
    lineHeight: '$base',
    color: '$gray200',

    border: '1px solid $gray500',

    '&:focus': {
      border: '1px solid $green200',
    },

    '&::placeholder': {
      fontSize: '$sm',
      lineHeight: '$base',
      color: '$gray400',
    },
  },
})

export const RatingInputContainer = styled('div', {
  display: 'flex',
  gap: '$1',
  color: '$purple100',

  button: {
    all: 'unset',

    height: 'fit-content',

    display: 'flex',
    alignItems: 'center',

    cursor: 'pointer',

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray500',
    },
  },

  svg: {
    width: 24,
    height: 24,
  },
})

export const FormButtonsContainer = styled('div', {
  marginTop: '$3',

  display: 'flex',
  justifyContent: 'end',
  gap: '$2',
})

export const FormButton = styled('button', {
  all: 'unset',

  background: '$gray600',

  height: 40,
  width: 40,

  borderRadius: 4,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  svg: {
    height: 24,
    width: 24,
  },

  '&:hover:not(:disabled)': {
    background: '$gray500',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.8,
  },

  variants: {
    color: {
      purple: {
        color: '$purple100',
      },
      green: {
        color: '$green100',
      },
    },
  },

  defaultVariants: {
    color: 'purple',
  },
})
