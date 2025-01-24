import { ComponentProps } from 'react'
import { Icon } from '@phosphor-icons/react'
import { ActionContainer } from './styles'

interface ButtonProps extends ComponentProps<typeof ActionContainer> {
  text: string
  icon?: Icon
  iconBefore?: boolean
  size?: 'sm' | 'md'
  variant?: 'white' | 'purple'
}

export function Action({
  text,
  icon: Icon,
  size = 'md',
  variant = 'purple',
  iconBefore = false,
  ...rest
}: ButtonProps) {
  return (
    <ActionContainer size={size} color={variant} {...rest}>
      {iconBefore && Icon && <Icon />}
      {text}
      {!iconBefore && Icon && <Icon />}
    </ActionContainer>
  )
}
