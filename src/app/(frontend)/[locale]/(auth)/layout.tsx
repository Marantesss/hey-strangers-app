import WordCycle from '@/components/common/WordCycle'
import { getMe } from '@/domains/users/me/me.service'
import QuizProvider from '@/domains/users/sign-up-quiz/providers/quiz.provider'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'
import { PropsWithChildren } from 'react'

import { Jost } from 'next/font/google'
import { cn } from '@/lib/utils'
import { getCachedQuiz } from '@/domains/quiz/get-quiz-data.service'

const jost = Jost({ subsets: ['latin'] })

export default async function AuthLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: TypedLocale } }>) {
  const [quiz, payload, user, t] = await Promise.all([
    getCachedQuiz(locale),
    getPayload({ config }),
    getMe(),
    getTranslations('sign-up.layout'),
  ])

  if (user) {
    return redirect({ href: '/app', locale })
  }

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
