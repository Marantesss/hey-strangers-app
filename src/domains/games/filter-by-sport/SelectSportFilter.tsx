'use client'

import SelectSport from '@/domains/sports/shared/components/SelectSport'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const SelectSportFilter: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSport, setCurrentSport] = useState<string | null>(
    searchParams.get('sport') ?? 'all',
  )
  const t = useTranslations('components.select-sport')

  const onSelectSport = (id: string) => {
    setCurrentSport(id)
    const params = new URLSearchParams(searchParams)
    if (id === 'all') {
      params.delete('sport')
    } else {
      params.set('sport', id)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <SelectSport
      value={currentSport ?? undefined}
      onValueChange={onSelectSport}
      placeholder={t('placeholder')}
      extraOptions={[{ value: 'all', label: t('all') }]}
    />
  )
}

export default () => (
  <Suspense>
    <SelectSportFilter />
  </Suspense>
)
