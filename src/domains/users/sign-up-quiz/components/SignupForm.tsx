'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { startTransition, useActionState } from 'react'
import { createOTPAction, signUpWithOTPAction } from '../actions'
import { useTranslations } from 'next-intl'
import { useQuiz } from '../hooks/quiz.hook'
import PhoneNumberInput from '@/components/common/Form/PhoneNumberInput'

const SignupForm: React.FC = () => {
  const { answers } = useQuiz()
  const t = useTranslations('sign-up')

  const [createOTPResponse, dispatchCreateOTPAction, createOTPPending] = useActionState(
    createOTPAction,
    {},
  )
  const [signUpWithOTPResponse, dispatchSignUpWithOTPAction, signUpWithOTPPending] = useActionState(
    signUpWithOTPAction,
    {},
  )

  const resendOTP = () => {
    const formData = new FormData()
    formData.set('phone', createOTPResponse.data!.phone!)
    startTransition(() => {
      dispatchCreateOTPAction(formData)
    })
  }

  if (createOTPResponse.success) {
    return (
      <form action={dispatchSignUpWithOTPAction} className="space-y-6">
        <h1 className="text-2xl font-medium">{t('otp-form.title')}</h1>

        <input type="hidden" name="phone" value={createOTPResponse.data!.phone} />

        <div className="space-y-2">
          <Label htmlFor="otp">{t('otp-form.otp.label')}</Label>
          <Input
            name="otp"
            placeholder={t('otp-form.otp.placeholder')}
            disabled={signUpWithOTPPending}
          />
          <p className="text-sm text-muted-foreground">
            {t('otp-form.otp.helper', { phone: createOTPResponse.data!.phone! })}
          </p>
          <p className="text-sm text-destructive">
            {signUpWithOTPResponse.error?.otp === 'failed-to-verify' &&
              t('otp-form.otp.error.failed-to-verify')}
            {signUpWithOTPResponse.error?.otp === 'invalid' && t('otp-form.otp.error.invalid')}
            {signUpWithOTPResponse.error?.otp === 'unknown' && t('otp-form.otp.error.unknown')}
          </p>
          {signUpWithOTPResponse.error?.phone && (
            <p className="text-sm text-destructive">{signUpWithOTPResponse.error.phone}</p>
          )}
        </div>

        <Button disabled={signUpWithOTPPending} type="submit" className="w-full">
          {t('otp-form.submit')}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={createOTPPending}
          onClick={resendOTP}
          className="w-full"
        >
          {t('otp-form.resend')}
        </Button>
      </form>
    )
  }

  return (
    <form action={dispatchCreateOTPAction} className="space-y-6">
      <h1 className="text-2xl font-medium">{t('phone-number-form.title')}</h1>

      <input type="hidden" name="quizAnswers" value={JSON.stringify(answers)} />

      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone-number-form.phone.label')}</Label>
        <PhoneNumberInput name="phone" placeholder="Phone Number" disabled={createOTPPending} />
        <p className="text-sm text-muted-foreground">{t('phone-number-form.phone.helper')}</p>
        {createOTPResponse.error?.phone && (
          <p className="text-sm text-destructive">
            {createOTPResponse.error.phone === 'already-in-use' &&
              t('phone-number-form.phone.error.already-registered')}
            {createOTPResponse.error.phone === 'invalid-format' &&
              t('phone-number-form.phone.error.invalid')}
            {createOTPResponse.error.phone === 'unknown' &&
              t('phone-number-form.phone.error.unknown')}
            {createOTPResponse.error.phone === 'failed-to-create-otp' &&
              t('phone-number-form.phone.error.failed-to-create-otp')}
            {createOTPResponse.error.phone === 'failed-to-create-user' &&
              t('phone-number-form.phone.error.failed-to-create-user')}
          </p>
        )}
      </div>

      <Button disabled={createOTPPending} type="submit" className="w-full">
        {t('phone-number-form.submit')}
      </Button>
    </form>
  )
}

export default SignupForm
