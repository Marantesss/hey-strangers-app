'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { CityModel } from '@/domains/cities/shared/models/City.model'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function HeroSectionClient() {
  const t = useTranslations('home')
  const router = useRouter()

  const onCityChange = (city: CityModel) => {
    router.push(`/sign-up?location=${city.name}`)
  }

  return <SelectCity onCityChange={onCityChange} placeholder={t('select-city.placeholder')} />
}
