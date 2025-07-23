import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { Footer } from '@/payload-types'

export const getCachedFooter = (locale: TypedLocale) => {
  return getCachedFooterByLocale(locale)
}

const getCachedFooterByLocale = cache(
  async (locale: TypedLocale): Promise<Footer> => {
    const payload = await getPayload({ config })
    const footer = await payload.findGlobal({ slug: 'footer', locale })
    return footer
  },
  ['footer_global'],
  {
    tags: ['footer'],
  },
)
