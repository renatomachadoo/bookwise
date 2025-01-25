import { ComponentProps } from 'react'
import { AvatarContainer, AvatarFallback } from './styles'
import * as RadixAvatar from '@radix-ui/react-avatar'

interface AvatarProps extends ComponentProps<typeof RadixAvatar.Image> {
  fallbackText?: string
  size?: 'sm' | 'md'
}

export function Avatar({ size = 'sm', fallbackText, ...rest }: AvatarProps) {
  return (
    <AvatarContainer size={size}>
      <RadixAvatar.Image {...rest} />
      {fallbackText && (
        <AvatarFallback delayMs={500}>{fallbackText}</AvatarFallback>
      )}
    </AvatarContainer>
  )
}
