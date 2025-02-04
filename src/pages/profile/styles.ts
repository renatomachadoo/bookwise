import { styled } from '@/styles'

export const ProfileContainer = styled('div', {
  width: '100%',
  height: '100vh',
  padding: '1.25rem',
  display: 'grid',
  gridTemplateColumns: '232px auto',
  gridTemplateRows: '1fr',
  gap: '6rem',
  overflow: 'hidden',
})

export const ProfileContentContainer = styled('div', {
  width: '100%',
  height: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  '> header': {
    padding: '$2',
    marginTop: '3.25rem',
    marginBottom: '$10',
  },

  main: {
    flexGrow: 1,
    height: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem',

    '> div': {
      paddingRight: '$2',
      overflow: 'auto',
    },
  },
})

export const SearchReviewForm = styled('form', {
  width: '100%',
})

export const UserReviewsContainer = styled('div', {
  marginTop: '$8',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    '> span': {
      color: '$gray300',
      fontSize: '$sm',
      lineHeigh: '$base',
      textTransform: 'capitalize',
    },
  },
})

export const UserProfileAside = styled('div', {
  height: 'fit-content',
  maxHeight: '100%',
  width: '100%',

  borderLeft: '1px solid $gray700',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '> span': {
      marginTop: '$5',
      color: '$gray100',
      fontSize: '$lg',
      fontWeight: '$bold',
      lineHeight: '$short',
    },

    '> small': {
      color: '$gray400',
      fontSize: '$sm',
      lineHeight: '$base',
      marginBottom: '$8',
    },
  },
})

export const ProfileAsideSeparator = styled('div', {
  margin: '$8 0',

  width: 32,
  height: 4,
  minHeight: 4,
  background: '$gradient-horizontal',
  borderRadius: 9999,
})

export const ProfileStatsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  padding: '$5',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$5',

    svg: {
      width: 32,
      height: 32,
      color: '$green100',
    },

    '> div': {
      display: 'flex',
      flexDirection: 'column',

      span: {
        color: '$gray200',
        fontSize: '$sm',
        fontWeight: '$bold',
        lineHeight: '$short',
      },

      small: {
        color: '$gray300',
        fontSize: '$sm',
        fontWeight: '$regular',
        lineHeight: '$base',
      },
    },
  },
})
