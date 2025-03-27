import WordCycle from '@/components/common/WordCycle'
import { getMe } from '@/domains/users/me/me.service'
import QuizProvider from '@/domains/users/sign-up-quiz/providers/quiz.provider'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { TypedLocale } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'

type AuthLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: TypedLocale }>
}

export default async function Layout({ children, params }: AuthLayoutProps) {
  const { locale } = await params
  const payload = await getPayload({ config })
  const quiz = await payload.findGlobal({ slug: 'quiz', locale })

  const user = await getMe()

  if (user) {
    return redirect('/app')
  }

  const t = await getTranslations('sign-up.layout')

  return (
    <QuizProvider quiz={quiz}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="hidden col-span-1 bg-hero md:flex flex-col items-center justify-center gap-6">
          <div className="text-6xl font-black text-center">
            <h2>
              <span>{t('play')}</span>
              <WordCycle />
            </h2>
            <h2>{t('with')}</h2>
          </div>
        </div>

        <div className="col-span-1 container">{children}</div>
      </div>
    </QuizProvider>
  )
}
