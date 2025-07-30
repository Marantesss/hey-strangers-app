'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { CityModel } from '@/domains/cities/shared/models/City.model'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import SportCycle from '../common/SportCycle'
import { Sport as PayloadSport } from '@payload-types'

interface HeroSectionClientProps {
  description: string
  sports: PayloadSport[]
  cities: CityModel[]
  defaultCity: CityModel | null
}

export default function HeroSectionClient({
  description,
  sports,
  cities,
  defaultCity,
}: HeroSectionClientProps) {
  const t = useTranslations('home')
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState<CityModel | null>(defaultCity)

  // Update selectedCity when defaultCity changes (happens on hydration)
  useEffect(() => {
    if (defaultCity && !selectedCity) {
      setSelectedCity(defaultCity)
    }
  }, [defaultCity, selectedCity])

  const onCityChange = (city: CityModel) => {
    setSelectedCity(city)
    router.push(`/sign-up?location=${city.name}`)
  }

  const parts = description.split('<sports>')

  return (
    <>
      <p className="max-w-lg">
        {parts[0]}
        <SportCycle sports={sports} />
        {parts[1]}
      </p>
      <Select
        value={selectedCity?.id ?? defaultCity?.id}
        onValueChange={(cityId) => {
          const city = cities.find((c) => c.id === cityId)
          if (city) onCityChange(city)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('select-city.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.id} value={city.id}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
