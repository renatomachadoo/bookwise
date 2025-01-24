import { Icon } from '@phosphor-icons/react'
import { ActionContainer } from './styles'

interface ButtonProps {
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
}: ButtonProps) {
  return (
    <ActionContainer size={size} color={variant}>
      {iconBefore && Icon && <Icon />}
      {text}
      {!iconBefore && Icon && <Icon />}
    </ActionContainer>
  )
}
