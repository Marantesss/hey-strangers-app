import { useEffect, useState } from 'react'
import { CityModel } from '../models/City.model'
import useCitiesQuery from '@/domains/cities/get-cities/use-cities.query'
import { geo } from '@/geo'

const MAX_DISTANCE_KM = 20

export const useGeolocationCity = () => {
  const { data: cities, isLoading } = useCitiesQuery()
  const [defaultCity, setDefaultCity] = useState<CityModel | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation is not supported')
      return
    }

    if (!cities || isLoading) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const cityName = await geo.getCityFromCoordinates(latitude, longitude)

          if (!cityName) {
            console.warn('No city name found')
            return
          }

          // First try to find an exact match
          let matchingCity = cities.find((city) =>
            city.name.toLowerCase().includes(cityName.toLowerCase()),
          )

          if (matchingCity) {
            setDefaultCity(matchingCity)
            return
          }

          // If no exact match, check if user is within 20km of any city
          for (const city of cities) {
            const cityCoords = await geo.getCityCoordinates(city.name)

            if (cityCoords) {
              const distance = geo.calculateDistance({ latitude, longitude }, cityCoords)

              if (distance <= MAX_DISTANCE_KM) {
                matchingCity = city
                break
              }
            }
          }
        } catch (error) {
          console.error('Error getting city from coordinates:', error)
        }
      },
      (error) => {
        console.error('Error getting location:', error)
      },
    )
  }, [cities, isLoading])

  return { defaultCity }
}
