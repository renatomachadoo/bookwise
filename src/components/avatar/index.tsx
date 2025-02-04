import { ComponentProps } from 'react'
import { AvatarContainer, AvatarFallback, AvatarImage } from './styles'

interface AvatarProps extends ComponentProps<typeof AvatarImage> {
  fallbackText?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ size = 'sm', fallbackText, ...rest }: AvatarProps) {
  return (
    <AvatarContainer size={size}>
      <AvatarImage {...rest} />
      {fallbackText && (
        <AvatarFallback delayMs={500}>{fallbackText}</AvatarFallback>
      )}
    </AvatarContainer>
  )
}
