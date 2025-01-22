import { styled } from '@/styles'

export const TitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  h1: {
    fontSize: '$2xl',
    lineHeight: '$short',
    color: '$gray100',
    fontWeight: '$bold',
  },

  svg: {
    color: '$green100',
  },
})
