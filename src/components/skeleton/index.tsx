import { ComponentProps } from 'react'
import ReactLoadingSkeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Skeleton(props: ComponentProps<typeof ReactLoadingSkeleton>) {
  return <ReactLoadingSkeleton {...props} />
}
