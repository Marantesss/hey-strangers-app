'use server'

import { OTPVerificationSchema, SignupSchema } from './schema'
import {
  createOTPForPhoneNumber,
  createUserWithPhoneNumber,
  verifyUserByPhoneNumber,
} from './sign-up.service'
import { signInWithOTP } from '../sign-in-with-otp/sign-in-with-otp.service'
import { sendWhatsappOtpMessage } from '@/lib/whatsapp'
import { getUserByPhoneNumber } from '../get-user/get-user.service'
import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'
/**
 * ===============================
 * CREATE OTP
 * ===============================
 */
type CreateOTPActionState = {
  data?: {
    name?: string
    email?: string
    phone?: string
    quizAnswers?: string | Record<string, string>
  }
  success?: boolean
  error?: {
    phone?:
      | 'invalid-format'
      | 'already-in-use'
      | 'unknown'
      | 'failed-to-create-otp'
      | 'failed-to-create-user'
  }
}

export const createOTPAction = async (
  previousState: CreateOTPActionState,
  formData: FormData,
): Promise<CreateOTPActionState> => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const quizAnswers = formData.get('quizAnswers') as string

  const { success, data } = SignupSchema.safeParse({ name, email, phone, quizAnswers })

  if (!success) {
    return {
      data: { name, email, phone, quizAnswers },
      success: false,
      error: {
        phone: 'invalid-format',
      },
    }
  }

  const userWithPhoneNumber = await getUserByPhoneNumber(data.phone)
  if (userWithPhoneNumber) {
    return {
      success: false,
      error: { phone: 'already-in-use' },
    }
  }

  if (!previousState.success) {
    try {
      const user = await createUserWithPhoneNumber(
        data.name,
        data.email,
        data.phone,
        data.quizAnswers,
      )
      console.log(user)
    } catch (error) {
      return {
        success: false,
        error: { phone: 'failed-to-create-user' },
      }
    }
  }

  try {
    const otp = await createOTPForPhoneNumber(data.phone)
    if (process.env.NODE_ENV === 'production') {
      // await sendWhatsappOtpMessage(data.phone, otp.code)
    } else {
      console.log(otp)
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: { phone: 'failed-to-create-otp' },
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
    otp?: 'invalid' | 'failed-to-verify' | 'unknown'
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
        phone: 'invalid',
        otp: 'invalid',
      },
    }
  }

  try {
    await verifyUserByPhoneNumber(data.phone)
    await signInWithOTP({ phoneNumber: data.phone, otp: data.otp })
  } catch (error) {
    return {
      success: false,
      error: { phone: 'failed-to-verify' },
    }
  }

  const locale = await getLocale()
  return redirect({ href: '/app', locale })
}
