'use client'

import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { countryCodes } from '@/lib/phone-numbers'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useTranslations } from 'next-intl'

export interface PhoneNumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, name, disabled, value = '', defaultValue, onChange, ...props }, ref) => {
    const [open, setOpen] = useState(false)
    const [countryName, setCountryName] = useState('Portugal')
    const [phoneNumber, setPhoneNumber] = useState('')
    const t = useTranslations('components.phone-number-input')

    const country = useMemo(
      () => countryCodes.find(({ country }) => country === countryName),
      [countryName],
    )
    const _value = useMemo(
      () => (!!countryName && !!phoneNumber ? `${country?.code}${phoneNumber}` : ''),
      [countryName, phoneNumber],
    )

    useEffect(() => {
      const phoneStr = value || defaultValue
      if (!phoneStr) return

      // Find matching country code
      const matchingCode = countryCodes.find(({ code }) => phoneStr.startsWith(code))
      if (!matchingCode) return

      // Set country code and remaining digits as phone number
      setCountryName(matchingCode.country)
      setPhoneNumber(phoneStr.slice(matchingCode.code.length))
    }, [value, defaultValue])

    const handleCountryISOChange = useCallback(
      (name: string) => {
        const country = countryCodes.find(({ country }) => country === name)!
        setCountryName(country.country)
        const newValue = `${country.code}${phoneNumber}`
        onChange?.(newValue)
        setOpen(false)
      },
      [phoneNumber, onChange],
    )

    const handlePhoneNumberChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value
        setPhoneNumber(newNumber)
        const newValue = `${country?.code}${newNumber}`
        onChange?.(newValue)
      },
      [country, onChange],
    )

    return (
      <div className={cn('flex', className)}>
        <input ref={ref} type="hidden" name={name} value={_value} />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="border-r-0 rounded-r-none rounded-l-sm bg-[#EFF0F3]" asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {country?.flag} ({country?.code})
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={t('country-code.placeholder')} className="h-9" />
              <CommandList>
                <CommandEmpty>{t('country-code.no-country-found')}</CommandEmpty>
                <CommandGroup>
                  {countryCodes.map(({ flag, code, country }) => (
                    <CommandItem key={country} value={country} onSelect={handleCountryISOChange}>
                      {flag} ({code})
                      <Check
                        className={cn(
                          'ml-auto',
                          countryName === country ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* <Select disabled={disabled} value={countryCode} onValueChange={handleCountryISOChange}>
          <SelectTrigger className="w-40 border-r-0 rounded-r-none rounded-l-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map(({ iso, code, flag }) => (
              <SelectItem key={iso} value={iso}>
                {flag} ({code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="grow rounded-l-none"
          disabled={disabled}
          placeholder={t('phone-number.placeholder')}
          {...props}
        />
      </div>
    )
  },
)

PhoneNumberInput.displayName = 'PhoneNumberInput'

export default PhoneNumberInput
