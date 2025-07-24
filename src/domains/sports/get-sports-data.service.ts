import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { SportModel } from './shared/models/Sport.model'
import { Sport as PayloadSport } from '@payload-types'

export const getCachedSports = (locale: TypedLocale) => {
  return getCachedSportsByLocale(locale)
}

const getCachedSportsByLocale = cache(
  async (locale: TypedLocale): Promise<PayloadSport[]> => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'sports',
      locale,
      sort: 'name',
    })

    return docs.map((sport) => SportModel.from(sport).toSerializable())
  },
  ['sports_collection'],
  {
    tags: ['sports'],
  },
)
