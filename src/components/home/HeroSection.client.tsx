'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { CityModel } from '@/domains/cities/shared/models/City.model'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useGeolocationCity } from '@/domains/cities/shared/hooks/useGeolocationCity'
import { useState } from 'react'
import SportCycle from '../common/SportCycle'
import { Sport as PayloadSport } from '@payload-types'

interface HeroSectionClientProps {
  ip?: string
  description: string
  sports: PayloadSport[]
}

export default function HeroSectionClient({ ip, description, sports }: HeroSectionClientProps) {
  const t = useTranslations('home')
  const router = useRouter()
  const { defaultCity } = useGeolocationCity(ip)
  const [selectedCity, setSelectedCity] = useState<CityModel | null>(defaultCity)

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
      <SelectCity
        onCityChange={onCityChange}
        placeholder={t('select-city.placeholder')}
        value={selectedCity?.id ?? defaultCity?.id}
        defaultValue={defaultCity?.id}
      />
    </>
  )
}
