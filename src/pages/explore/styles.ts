import { styled } from '@/styles'

export const ExploreContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gap: '6rem',
})

export const ExploreContentContainer = styled('div', {
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
    width: '100%',
    height: '100%',

    // background: 'red',
  },
})

export const MainHeader = styled('header', {
  display: 'flex',
  gap: '$3',
  paddingTop: '$2',
  paddingRight: '$2',
})

export const BookCategory = styled('button', {
  all: 'unset',

  borderRadius: 999,
  padding: '$1 $4',

  border: '1px solid $purple100',
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        background: '$purple200',
        border: '1px solid $purple200',
        color: '$gray100',
      },
      false: {
        background: 'transparent',
        color: '$purple100',
        border: '1px solid $purple100',
      },
    },
  },

  defaultVariants: {
    active: false,
  },
})
