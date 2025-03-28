'use server'

import { z } from 'zod'
import { createOTPForPhoneNumber } from '../sign-up-quiz/sign-up.service'
import { signInWithOTP } from './sign-in-with-otp.service'
import { sendWhatsappOtpMessage } from '@/lib/whatsapp'
import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'
import { getUserByPhoneNumber } from '../get-user/get-user.service'

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
    phoneNumber?:
      | 'invalid-format'
      | 'unknown'
      | 'failed-to-create-otp'
      | 'failed-to-send-otp'
      | 'phone-number-not-registered'
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
        phoneNumber: 'invalid-format',
      },
    }
  }

  const userWithPhoneNumber = await getUserByPhoneNumber(data.phoneNumber)
  if (!userWithPhoneNumber) {
    return {
      data: { phoneNumber: data.phoneNumber },
      success: false,
      error: { phoneNumber: 'phone-number-not-registered' },
    }
  }
  let otp = { code: '' }
  try {
    otp = await createOTPForPhoneNumber(data.phoneNumber)
  } catch (error) {
    console.error(error)
    return {
      data: { phoneNumber: data.phoneNumber },
      success: false,
      error: { phoneNumber: 'failed-to-create-otp' },
    }
  }

  try {
    if (process.env.NODE_ENV === 'production') {
      await sendWhatsappOtpMessage(data.phoneNumber, otp.code)
    } else {
      console.log(otp)
    }
  } catch (error) {
    console.error(error)
    return {
      data: { phoneNumber: data.phoneNumber },
      success: false,
      error: { phoneNumber: 'failed-to-send-otp' },
    }
  }

  return {
    data: { phoneNumber: data.phoneNumber },
    success: true,
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
    otp?: 'invalid' | 'failed-to-verify' | 'unknown'
  }
}

export const signInWithOTPAction = async (
  previousState: SignInWithOTPActionState,
  formData: FormData,
): Promise<SignInWithOTPActionState> => {
  const phoneNumber = formData.get('phoneNumber') as string
  const otp = formData.get('otp') as string

  const { success, data } = SignInWithOTPSchema.safeParse({ phoneNumber, otp })

  if (!success) {
    return {
      data: { phoneNumber, otp },
      success: false,
      error: {
        otp: 'invalid',
      },
    }
  }

  try {
    await signInWithOTP(data)
  } catch (error) {
    return {
      data: { phoneNumber, otp },
      success: false,
      error: { otp: 'failed-to-verify' },
    }
  }

  const locale = await getLocale()
  return redirect({ href: '/app', locale })
}
