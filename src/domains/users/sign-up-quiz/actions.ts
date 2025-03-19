'use server'

import {
  createOTP,
  createUser,
  loginWithPhoneNumber,
  verifyUser,
} from '@/domains/users/shared/UserService'
import { OTPVerificationSchema, SignupSchema } from './schema'
import { redirect } from 'next/navigation'

/**
 * ===============================
 * CREATE OTP
 * ===============================
 */
type CreateOTPActionState = {
  data?: {
    phone?: string
  }
  success?: boolean
  error?: {
    phone?: string
  }
}

export const createOTPAction = async (
  previousState: CreateOTPActionState,
  formData: FormData,
): Promise<CreateOTPActionState> => {
  const phone = formData.get('phone') as string

  const { success, data } = SignupSchema.safeParse({ phone })

  if (!success) {
    return {
      data: { phone },
      success: false,
      error: {
        phone: 'Invalid phone number',
      },
    }
  }

  if (!previousState.success) {
    try {
      const user = await createUser({ phoneNumber: data.phone })
      console.log(user)
    } catch (error) {
      return {
        success: false,
        error: { phone: 'Phone number already in use' },
      }
    }
  }

  try {
    const otp = await createOTP({ phoneNumber: data.phone })

    console.log(otp) // In production, you would send this via SMS
  } catch (error) {
    return {
      success: false,
      error: { phone: 'Failed to create OTP' },
    }
  }

  return {
    data: { phone: data.phone },
    success: true,
  }
}

/**
 * ===============================
 * SIGN UP WITH OTP
 * ===============================
 */
type SignUpWithOTPActionState = {
  data?: {
    phone?: string
    otp?: string
  }
  success?: boolean
  error?: {
    phone?: string
    otp?: string
  }
}

export const signUpWithOTPAction = async (
  previousState: SignUpWithOTPActionState,
  formData: FormData,
): Promise<SignUpWithOTPActionState> => {
  const phone = formData.get('phone') as string
  const otp = formData.get('otp') as string

  const { success, data } = OTPVerificationSchema.safeParse({ phone, otp })

  if (!success) {
    return {
      data: { phone, otp },
      success: false,
      error: {
        phone: 'Invalid phone number',
        otp: 'Invalid OTP',
      },
    }
  }

  try {
    await verifyUser({ phoneNumber: data.phone })
    await loginWithPhoneNumber({ phoneNumber: data.phone, otp: data.otp })
  } catch (error) {
    return {
      success: false,
      error: { phone: 'Failed to create user' },
    }
  }

  redirect('/app')
}
