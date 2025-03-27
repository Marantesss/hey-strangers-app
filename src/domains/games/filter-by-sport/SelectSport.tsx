'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useSportsQuery from '@/domains/sports/get-sports/use-sports.query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const SelectSport: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: sports } = useSportsQuery()
  const [currentSport, setCurrentSport] = useState<string | null>(
    searchParams.get('sport') ?? 'all',
  )

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
    <Select onValueChange={onSelectSport} value={currentSport ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select sport" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem defaultChecked value="all">
          All Sports
        </SelectItem>
        {sports?.map((sport) => (
          <SelectItem key={sport.id} value={sport.id}>
            {sport.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default () => (
  <Suspense>
    <SelectSport />
  </Suspense>
)
