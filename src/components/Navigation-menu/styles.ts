import { styled } from '@/styles'

export const NavigationMenuContainer = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',

  background: '$gray700',
  overflow: 'hidden',
  borderRadius: 12,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '> img': {
    marginTop: '$10',
  },
})

export const NavigationItemsContainer = styled('ul', {
  width: 110,
  marginTop: '4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const NavigationItem = styled('li', {
  listStyle: 'none',
  zIndex: 5,

  a: {
    all: 'unset',

    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    gap: '$3',

    fontSize: '$4',
    lineHeight: '$base',

    color: '$gray400',

    cursor: 'pointer',

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray500',
    },

    '> svg': {
      height: 24,
      width: 24,
      fontWeight: '$regular',
    },
  },

  variants: {
    active: {
      true: {
        a: {
          color: '$gray100',
          fontWeight: 'bold',

          '&::before': {
            content: '',
            display: 'block',
            background: '$gradient-vertical',

            borderRadius: 9999,

            position: 'absolute',
            left: '-1rem',

            height: 24,
            width: 4,
          },
        },
      },
      false: {
        a: {
          color: '$gray400',
        },
      },
    },
  },

  defaultVariants: {
    active: false,
  },
})

export const LoginButton = styled('button', {
  all: 'unset',
  zIndex: 5,

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  fontSize: '$md',
  fontWeight: '$bold',
  color: '$gray200',

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray500',
  },

  '> svg': {
    width: 20,
    height: 20,
    color: '$green100',
  },

  margin: 'auto 0 $6',
})

export const LogoutButton = styled('button', {
  all: 'unset',
  zIndex: 5,

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$gray200',

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray500',
  },

  '> svg': {
    width: 20,
    height: 20,
    color: '#F75A68',
  },

  margin: 'auto 0 $6',
  padding: '0 1rem',
})

export const BlurTopLeft = styled('div', {
  position: 'absolute',
  width: 220,
  height: 220,

  top: '-110px',
  left: '-110px',

  borderRadius: 9999,
  opacity: '0.5',
  background: '$green200',
  filter: 'blur(94.65499877929688px)',
})

export const BlurTopRight = styled('div', {
  position: 'absolute',
  width: 220,
  height: 220,

  top: '-110px',
  right: '-110px',

  borderRadius: 9999,
  opacity: '0.8',
  background: '$purple200',
  filter: 'blur(94.65499877929688px)',
})

export const BlurMiddle = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 295,
  height: 295,

  borderRadius: 9999,
  opacity: '0.8',
  background: '$purple200',
  filter: 'blur(226.65499877929688px)',

  transform: 'translateY(-50%)',
})

export const BlurBottomLeft = styled('div', {
  position: 'absolute',
  width: 295,
  height: 295,

  bottom: '-110px',
  left: '-110px',

  borderRadius: 9999,
  opacity: '0.8',
  background: '$green200',
  filter: 'blur(262.4049987792969px)',
})
