'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const SelectCityFilter: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentCity, setCurrentCity] = useState<string | null>(searchParams.get('city') ?? 'all')
  const t = useTranslations('components.select-city')

  const onSelectCity = (id: string) => {
    setCurrentCity(id)
    const params = new URLSearchParams(searchParams)
    if (id === 'all') {
      params.delete('city')
    } else {
      params.set('city', id)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <SelectCity
      value={currentCity ?? undefined}
      onValueChange={onSelectCity}
      placeholder={t('placeholder')}
      extraOptions={[{ value: 'all', label: t('all') }]}
    />
  )
}

export default () => (
  <Suspense>
    <SelectCityFilter />
  </Suspense>
)
