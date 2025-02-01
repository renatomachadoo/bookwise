import { styled } from '@/styles'
import 'react-modern-drawer/dist/index.css'
import * as Dialog from '@radix-ui/react-dialog'

export const ExploreContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gap: '6rem',
  position: 'relative',
})

export const ExploreContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> header': {
    padding: '$2',
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
  padding: '$2',
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

  padding: '$2',

  overflow: 'auto',
})

export const SearchForm = styled('form', {
  width: 433,
})

export const DrawerContainer = styled('div', {
  background: '$gray800',
  width: '100%',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',

  padding: '$6 3rem',
  overflow: 'auto',
})

export const DrawerCloseButton = styled('button', {
  border: 0,
  background: 'transparent',

  width: 24,
  height: 24,

  cursor: 'pointer',

  marginLeft: 'auto',
  marginBottom: '$4',

  outline: 'none',

  svg: {
    width: '100%',
    height: '100%',
    color: '$gray400',
  },

  '&:hover': {
    svg: {
      color: '$gray200',
    },
  },
})

export const DrawerBookInfo = styled('div', {
  background: '$gray700',
  padding: '$6 $8 $4',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
})

export const DrawerBookTop = styled('div', {
  display: 'flex',
  gap: '$8',

  '> img': {
    borderRadius: 10,
    objectFit: 'cover',
  },

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    header: {
      h3: {
        color: '$gray100',
        fontSize: '$lg',
        lineHeight: '$short',
        fontWeight: '$bold',
      },
      span: {
        color: '$gray300',
      },
    },

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '$1',

      span: {
        svg: {
          width: 20,
          height: 20,
        },

        display: 'flex',
        gap: '$1',
        color: '$purple100',
      },

      small: {
        fontSize: '$sm',
        color: '$gray400',
      },
    },
  },
})

export const DrawerBookBottom = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '3.5rem',
  padding: '$6 0',

  marginTop: '$10',

  borderTop: '1px solid $gray600',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',

    svg: {
      width: 24,
      height: 24,
      color: '$green100',
    },

    div: {
      display: 'flex',
      flexDirection: 'column',

      small: {
        fontSize: '$sm',
        color: '$gray300',
      },

      span: {
        lineHeight: '$short',
        fontWeight: '$bold',
        color: '$gray200',
      },
    },
  },
})

export const DrawerBookReviewsContainer = styled('div', {
  marginTop: '$10',

  '> header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '$4',

    h3: {
      color: '$gray200',
      fontSize: '$sm',
      fontWeight: '$regular',
    },
  },
})

export const DrawerBookReviews = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const DrawerBookReview = styled('div', {
  background: '$gray700',
  padding: '$6',
  borderRadius: 8,

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  header: {
    width: '100%',
    display: 'flex',
    gap: '$4',

    '> div': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',

      '> div': {
        display: 'flex',
        flexDirection: 'column',

        span: {
          color: '$gray100',
          lineHeight: '$short',
          fontWeight: '$bold',
        },

        small: {
          fontSize: '$sm',
          color: '$gray400',
          textTransform: 'capitalize',
        },
      },

      '> span': {
        display: 'flex',
        gap: '$1',
        svg: {
          width: 16,
          height: 16,
          color: '$purple100',
        },
      },
    },
  },

  p: {
    marginTop: '$5',
    color: '$gray300',
    fontSize: '$sm',
    lineHeight: '$base',
  },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  background: 'black',
  opacity: 0.5,
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
})

export const DialogContent = styled(Dialog.Content, {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  background: '$gray700',
  width: 516,
  height: 337,
  borderRadius: 12,
  padding: '3.5rem 4.5rem',
  zIndex: 1100,

  display: 'flex',
  flexDirection: 'column',
})

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',
  color: '$gray400',

  position: 'absolute',
  right: '$4',
  top: '$4',

  '&:hover': {
    color: '$gray300',
  },

  svg: {
    width: 24,
    height: 24,
  },
})

export const DialogTitle = styled(Dialog.Title, {
  color: '$gray200',
  lineHeight: '$short',
  fontWeight: '$bold',
  fontSize: '$md',

  marginTop: '$4',
  textAlign: 'center',
})

export const DialogSignInProvidersContainer = styled('div', {
  width: '100%',
  marginTop: '$10',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})
