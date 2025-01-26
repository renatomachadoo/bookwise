import { styled } from '@/styles'
import * as RadixAvatar from '@radix-ui/react-avatar'

export const AvatarContainer = styled(RadixAvatar.Root, {
  borderRadius: 9999,
  zIndex: 5,
  border: 1,

  position: 'relative',

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
  },

  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: '-1',
    borderRadius: 'inherit',
    margin: '-1px',
    background: '$gradient-vertical',
  },

  variants: {
    size: {
      sm: {
        width: 32,
        height: 32,
      },
      md: {
        width: 40,
        height: 40,
      },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
})

export const AvatarFallback = styled(RadixAvatar.Fallback, {
  width: '100%',
  height: '100%',
  borderRadius: 9999,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
