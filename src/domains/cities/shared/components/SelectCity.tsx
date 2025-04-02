'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCitiesQuery from '@/domains/cities/get-cities/use-cities.query'
import { SelectProps } from '@radix-ui/react-select'

interface SelectCityProps extends SelectProps {
  placeholder?: string
  extraOptions?: {
    label: string
    value: string
  }[]
  className?: string
}

const SelectCity: React.FC<SelectCityProps> = ({
  placeholder,
  extraOptions,
  className,
  ...selectProps
}) => {
  const { data: cities } = useCitiesQuery()

  return (
    <Select {...selectProps}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {extraOptions?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
        {cities?.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectCity
