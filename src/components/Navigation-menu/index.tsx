import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import {
  BlurBottomLeft,
  BlurMiddle,
  BlurTopLeft,
  BlurTopRight,
  LoginButton,
  LogoutButton,
  NavigationItem,
  NavigationItemsContainer,
  NavigationMenuContainer,
} from './styles'

import { Binoculars, ChartLineUp, SignIn, User } from '@phosphor-icons/react'

import bookWiseLogo from '@/assets/bookwise-logo.svg'
import { Avatar } from '@/components/avatar'
import { getNameInitials } from '@/utils/get-name-initials'

export function NavigationMenu() {
  const { data, status } = useSession()
  const router = useRouter()

  const isAuthenticated = status === 'authenticated'

  async function handleSignIn() {
    router.push('/sign-in')
  }

  async function handleSignOut() {
    await signOut({
      callbackUrl: '/',
    })
  }

  const pathname = router.pathname
  const usernameInitials = data?.user?.name && getNameInitials(data.user.name)

  return (
    <NavigationMenuContainer>
      <BlurTopLeft />
      <BlurTopRight />
      <BlurMiddle />
      <BlurBottomLeft />

      <Image width={128} height={32} src={bookWiseLogo} alt="BookWise logo" />

      <NavigationItemsContainer>
        <NavigationItem active={pathname === '/'}>
          <Link href="/">
            <ChartLineUp />
            Início
          </Link>
        </NavigationItem>

        <NavigationItem active={pathname === '/explore'}>
          <Link href="/explore">
            <Binoculars />
            Explorar
          </Link>
        </NavigationItem>

        {isAuthenticated && (
          <NavigationItem active={pathname === '/profile'}>
            <Link href="/profile">
              <User />
              Perfil
            </Link>
          </NavigationItem>
        )}
      </NavigationItemsContainer>

      {isAuthenticated ? (
        <LogoutButton onClick={handleSignOut}>
          <Avatar
            src={data?.user?.image || ''}
            alt={data?.user?.name || ''}
            fallbackText={usernameInitials || ''}
          />
          {data?.user?.name} <SignIn />
        </LogoutButton>
      ) : (
        <LoginButton onClick={handleSignIn}>
          Fazer login <SignIn />
        </LoginButton>
      )}
    </NavigationMenuContainer>
  )
}
