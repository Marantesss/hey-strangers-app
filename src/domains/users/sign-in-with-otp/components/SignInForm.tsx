'use client'

import { startTransition, useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createOTPAction, signInWithOTPAction } from '../actions'

const SignInForm: React.FC = () => {
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
        <h1 className="text-2xl font-medium">Enter verification code</h1>

        <input type="hidden" name="phoneNumber" value={createOTPResponse.data!.phoneNumber} />

        <div className="space-y-2">
          <Label htmlFor="otp">OTP</Label>
          <Input name="otp" placeholder="123456" disabled={signInWithOTPPending} />
          <p className="text-sm text-muted-foreground">
            We have sent a code for {createOTPResponse.data?.phoneNumber}
          </p>
          {signInWithOTPResponse.error?.otp && (
            <p className="text-sm text-destructive">{signInWithOTPResponse.error.otp}</p>
          )}
          {signInWithOTPResponse.error?.phoneNumber && (
            <p className="text-sm text-destructive">{signInWithOTPResponse.error.phoneNumber}</p>
          )}
        </div>

        <Button disabled={signInWithOTPPending} type="submit" className="w-full">
          {signInWithOTPPending ? 'Loading...' : 'Verify code'}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={createOTPPending}
          onClick={resendOTP}
          className="w-full mt-2"
        >
          {createOTPPending ? 'Loading...' : 'Resend code'}
        </Button>
      </form>
    )
  }

  return (
    <form action={dispatchCreateOTPAction} className="space-y-4 w-full max-w-md">
      <h1 className="text-2xl font-medium">Sign in</h1>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input name="phoneNumber" placeholder="+351 912 345 678" disabled={createOTPPending} />
        <p className="text-sm text-muted-foreground">
          We will send you a code to verify your phone number.
        </p>
        {createOTPResponse.error?.phoneNumber && (
          <p className="text-sm text-destructive">{createOTPResponse.error.phoneNumber}</p>
        )}
      </div>

      <Button disabled={createOTPPending} type="submit" className="w-full">
        {createOTPPending ? 'Loading...' : 'Send verification code'}
      </Button>
    </form>
  )
}

export default SignInForm
