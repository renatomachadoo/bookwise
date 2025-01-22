import { Icon } from '@phosphor-icons/react'
import { TitleContainer } from './styles'

interface PageTitleProps {
  icon?: Icon
  title: string
}

export function PageTitle({ icon: Icon, title }: PageTitleProps) {
  return (
    <TitleContainer>
      {Icon && <Icon size={32} />}
      <h1>{title}</h1>
    </TitleContainer>
  )
}
