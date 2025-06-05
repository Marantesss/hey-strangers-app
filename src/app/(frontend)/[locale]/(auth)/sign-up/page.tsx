import Progress from '@/domains/users/sign-up-quiz/components/Progress'
import Quiz from '@/domains/users/sign-up-quiz/components/Quiz'
import { Metadata, NextPage } from 'next'
import { TypedLocale } from 'payload'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

const SignupPage: NextPage = () => {
  return (
    <main className="relative h-full flex flex-col justify-center items-center">
      <div className="w-full absolute top-8 right-0 flex justify-start">
        <Progress />
      </div>
      <Quiz />
    </main>
  )
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params

  return {
    metadataBase: new URL(defaultUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en/sign-in',
        pt: '/pt/sign-in',
        'x-default': '/en/sign-in',
      },
    },
  }
}

export default SignupPage
