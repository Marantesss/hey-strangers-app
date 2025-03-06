"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Enums } from "@/utils/supabase/types"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

type SelectableSport = {
  id: Enums<'game_sport_type'>
  name: string
}

const SELECTABLE_SPORTS: SelectableSport[] = [
  {
    id: 'soccer',
    name: "Soccer",
  },
  {
    id: 'basketball',
    name: "Basketball",
  },
  {
    id: 'tennis',
    name: "Tennis",
  },
  {
    id: 'paddle',
    name: "Paddle",
  },
  {
    id: 'volleyball',
    name: "Volleyball",
  },
] as const

const SelectSport: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSport, setCurrentSport] = useState<string | null>(searchParams.get('sport') ?? 'all')

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
        <SelectItem value="all">All Sports</SelectItem>
        {SELECTABLE_SPORTS.map((sport) => (
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