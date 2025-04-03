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
import { CityModel } from '../models/City.model'

interface SelectCityProps extends SelectProps {
  placeholder?: string
  extraOptions?: {
    label: string
    value: string
  }[]
  className?: string
  onCityChange?: (city: CityModel) => void
  defaultValue?: string
  value?: string
}

const SelectCity: React.FC<SelectCityProps> = ({
  placeholder,
  extraOptions,
  className,
  onValueChange,
  onCityChange,
  defaultValue,
  value,
  ...selectProps
}) => {
  const { data: cities } = useCitiesQuery()

  const _onValueChange = (value: string) => {
    const city = cities!.find((city) => city.id === value)
    if (city) {
      onCityChange?.(city)
    }
    onValueChange?.(value)
  }

  return (
    <Select
      {...selectProps}
      defaultValue={defaultValue}
      value={value}
      onValueChange={_onValueChange}
    >
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
