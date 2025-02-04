import Image from 'next/image'
import { ButtonContainer } from './styles'
import { ComponentProps } from 'react'

interface SignInProviderButtonProps extends ComponentProps<'button'> {
  image?: string
  imageAlt?: string
  text: string
}

export function SignInProviderButton({
  image,
  imageAlt,
  text,
  ...rest
}: SignInProviderButtonProps) {
  return (
    <ButtonContainer {...rest}>
      {image && (
        <Image height={32} width={32} src={image} alt={imageAlt || ''} />
      )}
      {text}
    </ButtonContainer>
  )
}
