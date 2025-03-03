"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Enums } from "@/utils/supabase/types"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

type SelectableSport = {
  id: Enums<'field_sport_type'>
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
  {
    id: 'multi_purpose',
    name: "Multi-Purpose",
  },
] as const

const SelectSport: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSport = searchParams.get('sport')

  const onSelectSport = (id: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sport', id)
    router.push(`?${params.toString()}`)
  }

  return (
    <Select onValueChange={onSelectSport} value={currentSport ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select sport" />
      </SelectTrigger>
      <SelectContent>
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