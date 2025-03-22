'use server'

import { cookies } from 'next/headers'
import { getCookieExpiration, getFieldsToSign, getPayload } from 'payload'
import config from '@payload-config'
import { getUserByPhoneNumber } from '../get-user/get-user.service'
import { User } from '@/payload-types'
import { jwtSign } from '@/lib/jwt'

type UserWithCollection = User & { collection: 'users' }

interface LoginWithPhoneNumberArgs {
  phoneNumber: string
  otp: string
}

export async function signInWithOTP({ phoneNumber, otp }: LoginWithPhoneNumberArgs) {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()

  const user = await getUserByPhoneNumber(phoneNumber)

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.otp) {
    throw new Error('OTP not set')
  }

  if (user.otp.code !== otp) {
    throw new Error('OTP is invalid')
  }

  const now = new Date()
  const otpExpiration = user.otp?.expiration ? new Date(user.otp.expiration) : null

  if (otpExpiration && otpExpiration < now) {
    throw new Error('OTP is expired')
  }

  const userWithCollection = {
    ...user,
    collection: 'users',
  } satisfies UserWithCollection

  const collectionConfig = payload.collections[userWithCollection.collection].config

  if (!collectionConfig.auth) {
    throw new Error('Collection is not used for authentication')
  }

  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: user.email ?? `${user.phoneNumber}@hey-strangers.com`,
    user: userWithCollection,
  })

  const { token } = await jwtSign({
    fieldsToSign,
    secret: payload.secret,
    tokenExpiration: collectionConfig.auth.tokenExpiration,
  })

  const name = `${payload.config.cookiePrefix}-token`
  const expires = getCookieExpiration({
    seconds: collectionConfig.auth.tokenExpiration,
  })

  cookieStore.set({
    name,
    value: token,
    expires,
    httpOnly: true,
    domain: collectionConfig.auth.cookies.domain ?? undefined,
    secure: collectionConfig.auth.cookies.secure,
  })

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { otp: { code: null, expiration: null } },
  })
}
