import { getTranslations } from 'next-intl/server'
import { unstable_cache as cache } from 'next/cache'

export const getCachedTranslations = (namespace: string) => {
  return getCachedTranslationsByNamespace(namespace)
}

const getCachedTranslationsByNamespace = cache(
  async (namespace: string) => {
    return await getTranslations(namespace as any)
  },
  ['translations'],
  {
    tags: ['translations'],
    revalidate: 86400, // 24 horas - translations mudam raramente
  },
)
