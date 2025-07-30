import { unstable_cache as cache } from 'next/cache'
import { CityModel } from './shared/models/City.model'
import { getLocationFromIp } from '@/lib/geo'
import { getCachedCities } from './get-cities-data.service'
import { TypedLocale } from 'payload'

export const getCachedDefaultCity = (ip: string | undefined, locale: TypedLocale) => {
  return getCachedDefaultCityByIp(ip, locale)
}

const getCachedDefaultCityByIp = cache(
  async (ip: string | undefined, locale: TypedLocale): Promise<CityModel | null> => {
    // Buscar todas as cidades
    const cities = await getCachedCities(locale)

    if (!cities || cities.length === 0) return null

    // Função auxiliar para encontrar a CityModel mais próxima pelo nome
    const findMatchingCity = (cityName: string): CityModel | undefined => {
      return cities.find((city) => city.name.toLowerCase().includes(cityName.toLowerCase()))
    }

    // Primeiro tenta localização por IP
    if (ip) {
      try {
        const loc = await getLocationFromIp(ip)
        const matchingCity = findMatchingCity(loc.city)
        if (matchingCity) {
          return matchingCity
        }
      } catch (error) {
        console.error('Error getting location from IP:', error)
      }
    }

    // Se não encontrou cidade por IP, retorna null (o client pode tentar geolocalização)
    return null
  },
  ['default_city'],
  {
    tags: ['cities', 'geolocation'],
    revalidate: 1800, // 30 minutos - IP locations podem mudar
  },
)
