import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { Quiz } from '@/payload-types'

export const getCachedQuiz = (locale: TypedLocale) => {
  return getCachedQuizByLocale(locale)
}

const getCachedQuizByLocale = cache(
  async (locale: TypedLocale): Promise<Quiz> => {
    const payload = await getPayload({ config })
    const quiz = await payload.findGlobal({ slug: 'quiz', locale })
    return quiz
  },
  ['quiz_global'],
  {
    tags: ['quiz'],
  },
)
