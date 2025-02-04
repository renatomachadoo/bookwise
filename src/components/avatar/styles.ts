import { styled } from '@/styles'
import * as RadixAvatar from '@radix-ui/react-avatar'

export const AvatarContainer = styled(RadixAvatar.Root, {
  borderRadius: 999,
  zIndex: 5,
  position: 'relative',
  padding: 1,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&::before': {
    content: '',
    position: 'absolute',
    inset: 0,
    zIndex: '-1',
    borderRadius: 'inherit',
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
      lg: {
        width: 72,
        height: 72,
        padding: 2,
      },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
})

export const AvatarImage = styled(RadixAvatar.Image, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  objectFit: 'cover',
})

export const AvatarFallback = styled(RadixAvatar.Fallback, {
  width: '100%',
  height: '100%',
  borderRadius: 9999,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
