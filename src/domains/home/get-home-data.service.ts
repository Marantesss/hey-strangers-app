import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { Home } from '@/payload-types'

export const getCachedHome = (locale: TypedLocale) => {
  return getCachedHomeByLocale(locale)
}

const getCachedHomeByLocale = cache(
  async (locale: TypedLocale): Promise<Home> => {
    const payload = await getPayload({ config })
    const home = await payload.findGlobal({ slug: 'home', locale })
    return home
  },
  ['home_global'],
  {
    tags: ['home'],
  },
)
