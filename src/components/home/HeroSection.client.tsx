'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { useTranslations } from 'next-intl'

export default function HeroSectionClient() {
  const t = useTranslations('home')

  const onCitySelect = (cityId: string) => {
    console.log(cityId)
  }

  return <SelectCity onValueChange={onCitySelect} placeholder={t('select-city.placeholder')} />
}
