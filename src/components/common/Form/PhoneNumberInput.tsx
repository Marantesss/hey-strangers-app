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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { countryCodes } from '@/lib/phone-numbers'

export interface PhoneNumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, name, disabled, value = '', defaultValue, onChange, ...props }, ref) => {
    const [countryCode, setCountryCode] = useState('PT')
    const [phoneNumber, setPhoneNumber] = useState('')

    const _value = useMemo(
      () => (!!countryCode && !!phoneNumber ? `${countryCode}${phoneNumber}` : ''),
      [countryCode, phoneNumber],
    )

    useEffect(() => {
      const phoneStr = value || defaultValue
      if (!phoneStr) return

      // Find matching country code
      const matchingCode = countryCodes.find(({ code }) => phoneStr.startsWith(code))
      if (!matchingCode) return

      // Set country code and remaining digits as phone number
      setCountryCode(matchingCode.code)
      setPhoneNumber(phoneStr.slice(matchingCode.code.length))
    }, [value, defaultValue])

    const handleCountryISOChange = useCallback(
      (iso: string) => {
        const country = countryCodes.find(({ iso: _iso }) => _iso === iso)!
        setCountryCode(country.iso)
        const newValue = `${country.code}${phoneNumber}`
        onChange?.(newValue)
      },
      [phoneNumber, onChange],
    )

    const handlePhoneNumberChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value
        setPhoneNumber(newNumber)
        const newValue = `${countryCode}${newNumber}`
        console.log(newValue)
        onChange?.(newValue)
      },
      [countryCode, onChange],
    )

    return (
      <div className={cn('flex', className)}>
        <input ref={ref} type="hidden" name={name} value={_value} />
        <Select disabled={disabled} value={countryCode} onValueChange={handleCountryISOChange}>
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
        </Select>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="grow rounded-l-none"
          disabled={disabled}
          {...props}
        />
      </div>
    )
  },
)

PhoneNumberInput.displayName = 'PhoneNumberInput'

export default PhoneNumberInput
