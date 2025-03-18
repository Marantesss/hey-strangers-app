'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { startTransition, useActionState } from 'react'
import { createOTPAction, signUpWithOTPAction } from '../actions'

const SignupForm: React.FC = () => {
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
        <h1 className="text-2xl font-medium">Enter verification code</h1>

        <input type="hidden" name="phone" value={createOTPResponse.data!.phone} />

        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input name="otp" placeholder="Enter verification code" disabled={signUpWithOTPPending} />
          <p className="text-sm text-muted-foreground">
            Enter the code we sent to {createOTPResponse.data?.phone}
          </p>
          {signUpWithOTPResponse.error?.otp && (
            <p className="text-sm text-destructive">{signUpWithOTPResponse.error.otp}</p>
          )}
          {signUpWithOTPResponse.error?.phone && (
            <p className="text-sm text-destructive">{signUpWithOTPResponse.error.phone}</p>
          )}
        </div>

        <Button disabled={signUpWithOTPPending} type="submit" className="w-full">
          {signUpWithOTPPending ? 'Verifying...' : 'Verify Code'}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={createOTPPending}
          onClick={resendOTP}
          className="w-full"
        >
          {createOTPPending ? 'Loading...' : 'Resend code'}
        </Button>
      </form>
    )
  }

  return (
    <form action={dispatchCreateOTPAction} className="space-y-6">
      <h1 className="text-2xl font-medium">Sign up</h1>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input name="phone" type="tel" placeholder="Phone Number" disabled={createOTPPending} />
        <p className="text-sm text-muted-foreground">
          We'll send you a text with a confirmation code
        </p>
        {createOTPResponse.error?.phone && (
          <p className="text-sm text-destructive">{createOTPResponse.error.phone}</p>
        )}
      </div>

      <Button disabled={createOTPPending} type="submit" className="w-full">
        {createOTPPending ? 'Sending code...' : 'Send Code'}
      </Button>
    </form>
  )
}

export default SignupForm
