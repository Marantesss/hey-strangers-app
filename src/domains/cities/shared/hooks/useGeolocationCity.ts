import { useEffect, useState } from 'react'
import { CityModel } from '../models/City.model'
import useCitiesQuery from '@/domains/cities/get-cities/use-cities.query'
import { geo, getLocationFromIp } from '@/lib/geo'

const MAX_DISTANCE_KM = 20

export const useGeolocationCity = (ip?: string) => {
  const { data: cities, isLoading } = useCitiesQuery()
  const [defaultCity, setDefaultCity] = useState<CityModel | null>(null)

  useEffect(() => {
    if (!cities || isLoading) return

    // Função auxiliar para encontrar a CityModel mais próxima pelo nome
    const findMatchingCity = (cityName: string): CityModel | undefined => {
      return cities.find((city) => city.name.toLowerCase().includes(cityName.toLowerCase()))
    }

    // Função auxiliar para encontrar a CityModel mais próxima pelas coordenadas
    const findNearestCity = async (latitude: number, longitude: number) => {
      for (const city of cities) {
        const cityCoords = await geo.getCityCoordinates(city.name)
        if (cityCoords) {
          const distance = geo.calculateDistance({ latitude, longitude }, cityCoords)
          if (distance <= MAX_DISTANCE_KM) {
            return city
          }
        }
      }
      return undefined
    }

    // Primeiro tenta localização por IP
    ;(async () => {
      if (ip) {
        const loc = await getLocationFromIp(ip)
        const matchingCity = findMatchingCity(loc.city)
        if (matchingCity) {
          setDefaultCity(matchingCity)
          return
        }
      }

      // Se não encontrou cidade por IP, tenta geolocalização do browser
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const cityName = await geo.getCityFromCoordinates(latitude, longitude)
            let matchingCity = cityName ? findMatchingCity(cityName) : undefined
            if (!matchingCity) {
              matchingCity = await findNearestCity(latitude, longitude)
            }
            if (matchingCity) setDefaultCity(matchingCity)
          } catch (error) {
            console.error('Error getting city from coordinates:', error)
          }
        })
      }
    })()
  }, [cities, isLoading, ip])

  return { defaultCity }
}
