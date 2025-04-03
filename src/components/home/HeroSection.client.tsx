'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { CityModel } from '@/domains/cities/shared/models/City.model'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useGeolocationCity } from '@/domains/cities/shared/hooks/useGeolocationCity'
import { useState } from 'react'

export default function HeroSectionClient() {
  const t = useTranslations('home')
  const router = useRouter()
  const { defaultCity } = useGeolocationCity()
  const [selectedCity, setSelectedCity] = useState<CityModel | null>(defaultCity)

  const onCityChange = (city: CityModel) => {
    setSelectedCity(city)
    router.push(`/sign-up?location=${city.name}`)
  }

  return (
    <SelectCity
      onCityChange={onCityChange}
      placeholder={t('select-city.placeholder')}
      value={selectedCity?.id ?? defaultCity?.id}
      defaultValue={defaultCity?.id}
    />
  )
}
