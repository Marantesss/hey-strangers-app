import { getPayload, TypedLocale } from 'payload'
import config from '@/payload.config'
import { unstable_cache as cache } from 'next/cache'
import { CityModel } from './shared/models/City.model'

export const getCachedCities = (locale: TypedLocale) => {
  return getCachedCitiesByLocale(locale)
}

const getCachedCitiesByLocale = cache(
  async (locale: TypedLocale): Promise<CityModel[]> => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'cities',
      locale,
      sort: 'name',
    })

    return docs.map((city) => CityModel.from(city))
  },
  ['cities_collection'],
  {
    tags: ['cities'],
    revalidate: 3600, // 1 hora - cities mudam pouco frequentemente
  },
)
