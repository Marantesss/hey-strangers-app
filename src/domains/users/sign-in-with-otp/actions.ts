'use server'

import { z } from 'zod'
import { createOTP as _createOTP, loginWithPhoneNumber } from '@/domains/users/shared/UserService'
import { redirect } from 'next/navigation'

/**
 * ===============================
 * CREATE OTP
 * ===============================
 */
const CreateOTPSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty()
    .transform((value) => value.replace(/\s/g, '')),
})

type CreateOTPActionState = {
  data?: {
    phoneNumber?: string
  }
  success?: boolean
  error?: {
    phoneNumber?: string
  }
}

export const createOTPAction = async (
  previousState: CreateOTPActionState,
  formData: FormData,
): Promise<CreateOTPActionState> => {
  const phoneNumber = formData.get('phoneNumber') as string

  const { success, data } = CreateOTPSchema.safeParse({ phoneNumber })

  if (!success) {
    return {
      data: { phoneNumber },
      success: false,
      error: {
        phoneNumber: 'Invalid phone number',
      },
    }
  }

  try {
    const otp = await _createOTP({ phoneNumber: data.phoneNumber })

    console.log(otp)

    return {
      data: { phoneNumber: data.phoneNumber },
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: { phoneNumber: 'Failed to create OTP' },
    }
  }
}

/**
 * ===============================
 * SIGN IN WITH OTP
 * ===============================
 */
const SignInWithOTPSchema = z.object({
  phoneNumber: z.string().min(1),
  otp: z.string().min(1),
})

type SignInWithOTPActionState = {
  data?: {
    phoneNumber?: string
    otp?: string
  }
  success?: boolean
  error?: {
    phoneNumber?: string
    otp?: string
  }
}
export const signInWithOTPAction = async (
  previousState: SignInWithOTPActionState,
  formData: FormData,
): Promise<SignInWithOTPActionState> => {
  const phoneNumber = formData.get('phoneNumber') as string
  const otp = formData.get('otp') as string

  const { success, data, error } = SignInWithOTPSchema.safeParse({ phoneNumber, otp })

  if (!success) {
    return {
      data: { phoneNumber, otp },
      success: false,
      error: {
        phoneNumber: error?.flatten().fieldErrors?.phoneNumber?.[0],
        otp: error?.flatten().fieldErrors?.otp?.[0],
      },
    }
  }

  try {
    await loginWithPhoneNumber(data)
  } catch (error) {
    return {
      data: { phoneNumber, otp },
      success: false,
      error: { phoneNumber: 'Failed to sign in with OTP' },
    }
  }

  redirect('/app')
}
