import { styled } from '@/styles'

export const ActionContainer = styled('button', {
  all: 'unset',
  padding: '$1 $2',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '$bold',

  variants: {
    size: {
      sm: {
        gap: '$2',
        fontSize: '$sm',

        svg: {
          height: 16,
          width: 16,
        },
      },
      md: {
        gap: '$3',
        fontSize: '$md',

        svg: {
          height: 20,
          width: 20,
        },
      },
    },

    color: {
      white: {
        color: '$gray200',

        '&:hover': {
          background: 'rgba(230, 232, 242, 0.04)',
        },
      },
      purple: {
        color: '$purple100',

        '&:hover': {
          background: 'rgba(131, 129, 217, 0.06)',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'purple',
  },
})
