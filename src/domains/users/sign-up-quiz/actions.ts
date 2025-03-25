'use server'

import { OTPVerificationSchema, SignupSchema } from './schema'
import { redirect } from 'next/navigation'
import {
  createOTPForPhoneNumber,
  createUserWithPhoneNumber,
  verifyUserByPhoneNumber,
} from './sign-up.service'
import { signInWithOTP } from '../sign-in-with-otp/sign-in-with-otp.service'
import { sendWhatsappOtpMessage } from '@/lib/whatsapp'

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
      const user = await createUserWithPhoneNumber(data.phone)
      console.log(user)
    } catch (error) {
      return {
        success: false,
        error: { phone: 'Phone number already in use' },
      }
    }
  }

  try {
    const otp = await createOTPForPhoneNumber(data.phone)
    await sendWhatsappOtpMessage(data.phone, otp.code)
    console.log(otp)
  } catch (error) {
    console.error(error)
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
    await verifyUserByPhoneNumber(data.phone)
    await signInWithOTP({ phoneNumber: data.phone, otp: data.otp })
  } catch (error) {
    return {
      success: false,
      error: { phone: 'Failed to create user' },
    }
  }

  redirect('/app')
}
