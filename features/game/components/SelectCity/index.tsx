"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

const SELECTABLE_CITIES = [
  {
    id: 'lisbon',
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
  const currentCity = searchParams.get('city')

  const onSelectCity = (id: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('city', id)
    router.push(`?${params.toString()}`)
  }

  return (
    <Select onValueChange={onSelectCity} value={currentCity ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        {SELECTABLE_CITIES.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectCity