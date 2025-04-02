'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useSportsQuery from '@/domains/sports/get-sports/use-sports.query'
import { SelectProps } from '@radix-ui/react-select'

interface SelectSportProps extends SelectProps {
  placeholder?: string
  extraOptions?: {
    label: string
    value: string
  }[]
}

const SelectSport: React.FC<SelectSportProps> = ({ placeholder, extraOptions, ...selectProps }) => {
  const { data: sports } = useSportsQuery()

  return (
    <Select {...selectProps}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {extraOptions?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
        {sports?.map((sport) => (
          <SelectItem key={sport.id} value={sport.id}>
            {sport.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectSport
