import { ReactNode } from 'react'
import { SectionDividerContainer } from './styles'

interface SectionDividerProps {
  children?: ReactNode
  text: string
}

export function SectionDivider({ text, children }: SectionDividerProps) {
  return (
    <SectionDividerContainer>
      <p>{text}</p>
      {children && children}
    </SectionDividerContainer>
  )
}
