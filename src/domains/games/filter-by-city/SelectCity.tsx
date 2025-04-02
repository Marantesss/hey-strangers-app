'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCitiesQuery from '@/domains/cities/get-cities/use-cities.query'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const SelectCity: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: cities } = useCitiesQuery()

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
    <Select onValueChange={onSelectCity} value={currentCity ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultChecked value="all">
          {t('all')}
        </SelectItem>
        {cities?.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default () => (
  <Suspense>
    <SelectCity />
  </Suspense>
)
