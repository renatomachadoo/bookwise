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

import { SignInProviderButton } from '@/components/Sign-in-provider-button'

import googleLogo from '@/assets/google-logo.svg'
import githubLogo from '@/assets/github-logo.svg'
import visiterLogo from '@/assets/visiter-logo.svg'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  const router = useRouter()

  async function handleSignInWithGithub() {
    await signIn('github')
  }

  function handleAccessHasVisitor() {
    router.push('/')
  }

  return (
    <SignInContainer>
      <SignInBanner>
        <Image src={bannerImage} width={598} alt="Person reading" />
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
