'use client'

import SelectCity from '@/domains/cities/shared/components/SelectCity'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useGeolocationCity } from '@/domains/cities/shared/hooks/useGeolocationCity'

interface SelectCityFilterProps {
  ip?: string
}

const SelectCityFilter: React.FC<SelectCityFilterProps> = ({ ip }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('components.select-city')
  const { defaultCity } = useGeolocationCity(ip)
  const [currentCity, setCurrentCity] = useState<string | null>(
    searchParams.get('city') ?? defaultCity?.id ?? 'all',
  )

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
      defaultValue={defaultCity?.id}
    />
  )
}

export default (props: SelectCityFilterProps) => (
  <Suspense>
    <SelectCityFilter {...props} />
  </Suspense>
)
