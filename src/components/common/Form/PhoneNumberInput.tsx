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

const countryCodes = [
  { code: '+351', flag: '🇵🇹', country: 'Portugal' },
  { code: '+34', flag: '🇪🇸', country: 'Spain' },
  { code: '+33', flag: '🇫🇷', country: 'France' },
  { code: '+44', flag: '🇬🇧', country: 'United Kingdom' },
  { code: '+49', flag: '🇩🇪', country: 'Germany' },
  { code: '+39', flag: '🇮🇹', country: 'Italy' },
  { code: '+31', flag: '🇳🇱', country: 'Netherlands' },
] as const

export interface PhoneNumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  ({ className, name, disabled, value = '', onChange, ...props }, ref) => {
    const [countryCode, setCountryCode] = useState('+351')
    const [phoneNumber, setPhoneNumber] = useState('')

    const _value = useMemo(
      () => (!!countryCode && !!phoneNumber ? `${countryCode}${phoneNumber}` : ''),
      [countryCode, phoneNumber],
    )

    useEffect(() => {
      // Initialize from value prop if provided
      if (value) {
        const match = value.match(/^\+(\d+)(.*)$/)
        if (match) {
          const [, code, number] = match
          setCountryCode(code)
          setPhoneNumber(number)
        }
      }
    }, [])

    const handleCountryCodeChange = useCallback(
      (code: string) => {
        setCountryCode(code)
        const newValue = `${code}${phoneNumber}`
        console.log(newValue)
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
        <Select disabled={disabled} value={countryCode} onValueChange={handleCountryCodeChange}>
          <SelectTrigger className="w-40 border-r-0 rounded-r-none rounded-l-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map(({ code, flag }) => (
              <SelectItem key={code} value={code}>
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
