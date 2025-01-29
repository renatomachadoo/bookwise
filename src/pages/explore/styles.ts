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
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '3.25rem',
    marginBottom: '$10',
  },

  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

export const MainHeader = styled('header', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  paddingTop: '$2',
  paddingRight: '$2',
  marginBottom: '3rem',
})

export const BookCategory = styled('button', {
  all: 'unset',

  borderRadius: 999,
  padding: '$1 $4',

  border: '1px solid $purple100',
  cursor: 'pointer',

  '&:hover:not(:disabled)': {
    background: '$purple200',
    border: '1px solid $purple100',
    color: '$gray100',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

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

export const BooksContainer = styled('div', {
  flexGrow: 1,
  height: 1,
  width: '100%',

  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: '184px',
  gap: '$5',

  paddingRight: '$2',

  overflow: 'auto',
})

export const SearchForm = styled('form', {
  width: 433,
})
