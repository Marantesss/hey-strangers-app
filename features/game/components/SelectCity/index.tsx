"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

// city names must be in portuguese for filtering to work
const SELECTABLE_CITIES = [
  {
    id: 'lisboa',
    name: "Lisbon",
  },
  {
    id: 'porto',
    name: "Porto",
  },
] as const

const SelectCity: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentCity, setCurrentCity] = useState<string | null>(searchParams.get('city') ?? 'all')

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
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Cities</SelectItem>
        {SELECTABLE_CITIES.map((city) => (
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