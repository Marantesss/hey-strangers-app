'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface OTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  length?: number
  onComplete?: (value: string) => void
}

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  ({ className, length = 6, onComplete, disabled, name, ...props }, ref) => {
    const [value, setValue] = React.useState<string>('')
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
    const containerRef = React.useRef<HTMLDivElement>(null)
    const hiddenInputRef = React.useRef<HTMLInputElement>(null)

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value
      if (newValue.length > 1) {
        // Handle paste event
        const pasteValue = newValue.slice(0, length)
        const newOtpValue = pasteValue.padEnd(length, '').slice(0, length)

        setValue(newOtpValue)

        // Fill all inputs with pasted value
        for (let i = 0; i < length; i++) {
          if (inputRefs.current[i]) {
            inputRefs.current[i]!.value = newOtpValue[i] || ''
          }
        }

        // Focus on the last field or the next empty field
        const nextIndex = Math.min(pasteValue.length, length - 1)
        inputRefs.current[nextIndex]?.focus()

        // Call onComplete if the OTP is filled
        if (pasteValue.length >= length && onComplete) {
          onComplete(newOtpValue)
        }
      } else {
        // Handle single character input
        const digit = newValue.slice(-1)
        const newOtpValue = value.split('')
        newOtpValue[index] = digit
        const updatedValue = newOtpValue.join('')

        setValue(updatedValue)

        // Move focus to the next input
        if (digit && index < length - 1) {
          inputRefs.current[index + 1]?.focus()
        }

        // Call onComplete if the OTP is filled
        if (updatedValue.length === length && onComplete) {
          onComplete(updatedValue)
        }
      }
    }

    // Handle backspace key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        if (inputRefs.current[index]?.value === '') {
          // Focus on previous input when backspace is pressed on empty input
          if (index > 0) {
            inputRefs.current[index - 1]?.focus()
            // Clear the previous input value
            const newOtpValue = value.split('')
            newOtpValue[index - 1] = ''
            setValue(newOtpValue.join(''))

            if (inputRefs.current[index - 1]) {
              inputRefs.current[index - 1]!.value = ''
            }
          }
        } else {
          // Clear current input
          const newOtpValue = value.split('')
          newOtpValue[index] = ''
          setValue(newOtpValue.join(''))

          if (inputRefs.current[index]) {
            inputRefs.current[index]!.value = ''
          }
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // Handle click on container to focus on first empty input
    const handleContainerClick = () => {
      for (let i = 0; i < length; i++) {
        if (!inputRefs.current[i]?.value) {
          inputRefs.current[i]?.focus()
          break
        }
      }
    }

    // Update hidden input with the complete value
    React.useEffect(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = value
      }
    }, [value])

    return (
      <div
        ref={containerRef}
        className={cn('flex items-center gap-4 relative', className)}
        onClick={handleContainerClick}
      >
        <input
          type="hidden"
          name={name}
          value={value}
          ref={(el) => {
            if (el) {
              hiddenInputRef.current = el
            }
            if (typeof ref === 'function') {
              ref(el)
            } else if (ref) {
              ref.current = el
            }
          }}
          {...props}
        />

        {Array.from({ length }).map((_, index) => (
          <div key={index} className="relative flex-1">
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              disabled={disabled}
              className={cn(
                'flex h-14 w-full items-center justify-center rounded-sm bg-[#EFF0F3] text-center text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              )}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="one-time-code"
              aria-label={`Digite ${index + 1} de ${length}`}
            />
            {index < length - 1 && (
              <div className="absolute top-1/2 left-full -translate-y-1/2 translate-x-1/2 pointer-events-none">
                <div className="w-2 h-0.5 bg-muted-foreground opacity-70"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  },
)

OTPInput.displayName = 'OTPInput'

export default OTPInput
