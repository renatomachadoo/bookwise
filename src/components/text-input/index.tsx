import { ComponentProps } from 'react'
import { Input, TextInputContainer } from './styles'
import { Icon } from '@phosphor-icons/react'

interface TextInputProps extends ComponentProps<typeof Input> {
  icon?: Icon
}

export function TextInput({ icon: Icon, ...rest }: TextInputProps) {
  return (
    <TextInputContainer>
      <Input type="text" {...rest} />
      {Icon && <Icon />}
    </TextInputContainer>
  )
}
