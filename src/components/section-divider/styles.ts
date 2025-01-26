import { styled } from '@/styles'

export const SectionDividerContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  '> p': {
    color: '$gray100',
    lineHeight: '$base',
    fontSize: '$sm',
  },
})
