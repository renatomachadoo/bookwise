import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'

import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { SkeletonTheme } from 'react-loading-skeleton'

const nunito = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
})

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <main className={nunito.className}>
            <Component {...pageProps} />
          </main>
        </SkeletonTheme>
      </SessionProvider>
    </QueryClientProvider>
  )
}
