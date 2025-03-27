'use client'

import { startTransition, useActionState } from 'react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createOTPAction, signInWithOTPAction } from '../actions'
import PhoneNumberInput from '@/components/common/Form/PhoneNumberInput'

const SignInForm: React.FC = () => {
  const t = useTranslations('sign-in')

  const [createOTPResponse, dispatchCreateOTPAction, createOTPPending] = useActionState(
    createOTPAction,
    {},
  )
  const [signInWithOTPResponse, dispatchSignInWithOTPAction, signInWithOTPPending] = useActionState(
    signInWithOTPAction,
    {},
  )

  const resendOTP = () => {
    const formData = new FormData()
    formData.set('phoneNumber', createOTPResponse.data!.phoneNumber!)
    startTransition(() => {
      dispatchCreateOTPAction(formData)
    })
  }

  if (createOTPResponse.success) {
    return (
      <form action={dispatchSignInWithOTPAction} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-medium">{t('otp-form.title')}</h1>

        <input type="hidden" name="phoneNumber" value={createOTPResponse.data!.phoneNumber} />

        <div className="space-y-2">
          <Label htmlFor="otp">{t('otp-form.otp.label')}</Label>
          <Input
            name="otp"
            placeholder={t('otp-form.otp.placeholder')}
            disabled={signInWithOTPPending}
          />
          <p className="text-sm text-muted-foreground">
            {t('otp-form.otp.helper', { phone: createOTPResponse.data!.phoneNumber! })}
          </p>
          {signInWithOTPResponse.error?.otp && (
            <p className="text-sm text-destructive">
              {signInWithOTPResponse.error.otp === 'failed-to-verify' &&
                t('otp-form.otp.error.failed-to-verify')}
              {signInWithOTPResponse.error.otp === 'invalid' && t('otp-form.otp.error.invalid')}
              {signInWithOTPResponse.error.otp === 'unknown' && t('otp-form.otp.error.unknown')}
            </p>
          )}
          {signInWithOTPResponse.error?.phoneNumber && (
            <p className="text-sm text-destructive">{signInWithOTPResponse.error.phoneNumber}</p>
          )}
        </div>

        <Button disabled={signInWithOTPPending} type="submit" className="w-full">
          {t('otp-form.submit')}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={createOTPPending}
          onClick={resendOTP}
          className="w-full mt-2"
        >
          {t('otp-form.resend')}
        </Button>
      </form>
    )
  }

  return (
    <form action={dispatchCreateOTPAction} className="space-y-4 w-full max-w-md">
      <h1 className="text-2xl font-medium">{t('phone-number-form.title')}</h1>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t('phone-number-form.phone.label')}</Label>
        <PhoneNumberInput
          name="phoneNumber"
          placeholder={t('phone-number-form.phone.placeholder')}
          disabled={createOTPPending}
        />
        <p className="text-sm text-muted-foreground">{t('phone-number-form.phone.helper')}</p>
        {createOTPResponse.error?.phoneNumber && (
          <p className="text-sm text-destructive">
            {createOTPResponse.error.phoneNumber === 'failed-to-send-otp' &&
              t('phone-number-form.phone.error.failed-to-send-otp')}
            {createOTPResponse.error.phoneNumber === 'phone-number-not-registered' &&
              t('phone-number-form.phone.error.phone-number-not-registered')}
            {createOTPResponse.error.phoneNumber === 'invalid-format' &&
              t('phone-number-form.phone.error.invalid')}
            {createOTPResponse.error.phoneNumber === 'unknown' &&
              t('phone-number-form.phone.error.unknown')}
            {createOTPResponse.error.phoneNumber === 'failed-to-create-otp' &&
              t('phone-number-form.phone.error.failed-to-create-otp')}
          </p>
        )}
      </div>

      <Button disabled={createOTPPending} type="submit" className="w-full">
        {t('phone-number-form.submit')}
      </Button>
    </form>
  )
}

export default SignInForm
