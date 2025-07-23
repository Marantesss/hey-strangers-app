import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { Page } from '@/payload-types'

export const getCachedPages = (locale: TypedLocale) => {
  return getCachedPagesByLocale(locale)
}

const getCachedPagesByLocale = cache(
  async (locale: TypedLocale): Promise<Page> => {
    const payload = await getPayload({ config })
    const pages = await payload.findGlobal({ slug: 'pages', locale })
    return pages
  },
  ['pages_global'],
  {
    tags: ['pages'],
  },
)
