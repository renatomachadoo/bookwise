import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  SignInBanner,
  SignInContainer,
  SignInLogo,
  SignInWelcomeContainer,
  SignInWelcomeMenu,
  SignInWelcomeProviders,
  SignInWelcomeText,
} from './styles'

import bannerImage from '@/assets/sign-in-banner.png'
import bookWiseLogo from '@/assets/bookwise-logo.svg'

import googleLogo from '@/assets/google-logo.svg'
import githubLogo from '@/assets/github-logo.svg'
import visiterLogo from '@/assets/visiter-logo.svg'

import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth].api'
import { GetServerSideProps } from 'next'
import { SignInProviderButton } from '@/components/button-sign-in-provider'

export default function SignIn() {
  const router = useRouter()

  async function handleSignInWithGoogle() {
    await signIn('google')
  }

  async function handleSignInWithGithub() {
    await signIn('github')
  }

  function handleAccessHasVisitor() {
    router.push('/')
  }

  return (
    <SignInContainer>
      <SignInBanner>
        <Image src={bannerImage} width={598} alt="A girl reading a book" />
        <SignInLogo>
          <Image
            src={bookWiseLogo}
            width={232}
            height={58}
            alt="BookWise Logo"
          />
        </SignInLogo>
      </SignInBanner>
      <SignInWelcomeContainer>
        <SignInWelcomeMenu>
          <SignInWelcomeText>
            <h1>Boas vindas!</h1>
            <p>Faça seu login ou acesse como visitante.</p>
          </SignInWelcomeText>
          <SignInWelcomeProviders>
            <SignInProviderButton
              image={googleLogo}
              imageAlt="Google Logo"
              text="Entrar com Google"
              onClick={handleSignInWithGoogle}
            />
            <SignInProviderButton
              image={githubLogo}
              imageAlt="Github Logo"
              text="Entrar com GitHub"
              onClick={handleSignInWithGithub}
            />
            <SignInProviderButton
              image={visiterLogo}
              imageAlt="Rocket"
              text="Acessar como visitante"
              onClick={handleAccessHasVisitor}
            />
          </SignInWelcomeProviders>
        </SignInWelcomeMenu>
      </SignInWelcomeContainer>
    </SignInContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
