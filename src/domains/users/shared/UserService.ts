'use server'

import { cookies, headers } from 'next/headers'
import { getCookieExpiration, getFieldsToSign, getPayload, Payload } from 'payload'
import { User } from '@payload-types'
import { jwtSign } from '@/lib/jwt'
import config from '@payload-config'
import stripe from '@/lib/stripe'

export type UserWithCollection = User & { collection: 'users' }

interface LoginWithPhoneNumberArgs {
  phoneNumber: string
  otp: string
}

export async function getUserById(id: string): Promise<User> {
  const payload = await getPayload({ config })
  return await payload.findByID({
    collection: 'users',
    id,
  })
}

export async function getUserWithPhoneNumber({
  phoneNumber,
}: {
  phoneNumber: string
}): Promise<User | null> {
  const payload = await getPayload({ config })
  const {
    docs: [user],
  } = await payload.find({
    collection: 'users',
    where: {
      phoneNumber: {
        equals: phoneNumber,
      },
    },
  })

  return user ?? null
}

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getPayload({ config })
  const _headers = await headers()
  const { user } = await payload.auth({ headers: _headers })

  if (user?.collection === 'admins') {
    return null
  }

  return user
}

export async function createUser({ phoneNumber }: { phoneNumber: string }) {
  const payload = await getPayload({ config })
  const user = await getUserWithPhoneNumber({ phoneNumber })

  if (user) {
    throw new Error('User already exists')
  }

  const createdUser = await payload.create({
    collection: 'users',
    data: { phoneNumber },
  })

  return createdUser
}

export async function createOTP({ phoneNumber }: { phoneNumber: string }) {
  const payload = await getPayload({ config })
  const user = await getUserWithPhoneNumber({ phoneNumber })

  if (!user) {
    throw new Error('User not found')
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const expiration = new Date(
    Date.now() + 15 * 60 * 1000, // 15 mins in the future
  ).toISOString()

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { otp: { code, expiration } },
  })

  return { code, expiration }
}

export async function verifyUser({ phoneNumber }: { phoneNumber: string }) {
  const payload = await getPayload({ config })
  const user = await getUserWithPhoneNumber({ phoneNumber })

  if (!user) {
    throw new Error('User not found')
  }

  if (user.isVerified) {
    throw new Error('Phone number already verified')
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { isVerified: true },
  })
}

export async function loginWithPhoneNumber({ phoneNumber, otp }: LoginWithPhoneNumberArgs) {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()

  const user = await getUserWithPhoneNumber({ phoneNumber })

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

  const userWithCollection: UserWithCollection = {
    ...user,
    collection: 'users',
  }

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

export async function signOut() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const name = `${payload.config.cookiePrefix}-token`
  cookieStore.delete(name)
}

type UpdateUserData = Omit<Partial<User>, 'profilePicture'> & {
  profilePicture?: File | string
}

export async function updateUser({ id, data }: { id: string; data: UpdateUserData }) {
  const payload = await getPayload({ config })

  // Create a copy of the data object to avoid type issues
  const updateData = { ...data }

  // Handle profile picture upload if present
  if (updateData.profilePicture instanceof File) {
    const file = updateData.profilePicture
    const upload = await payload.create({
      collection: 'media',
      data: {
        alt: 'Profile picture',
      },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    // Replace the File object with the upload ID
    updateData.profilePicture = upload.id
  }

  return payload.update({ collection: 'users', id, data: updateData as Partial<User> })
}

// Payment methods
export async function deletePaymentMethod(paymentMethodId: string) {
  try {
    await stripe.paymentMethods.detach(paymentMethodId)
    return { success: true }
  } catch (error) {
    console.error('Error deleting payment method:', error)
    throw new Error('Failed to delete payment method')
  }
}

export async function updatePaymentMethod(
  paymentMethodId: string,
  card: {
    exp_month: number
    exp_year: number
    billing_details: {
      name: string
      email?: string
      phone?: string
      address?: {
        line1?: string
        city?: string
        state?: string
        postal_code?: string
        country?: string
      }
    }
  },
) {
  try {
    const updatedPaymentMethod = await stripe.paymentMethods.update(paymentMethodId, {
      card,
    })
    return updatedPaymentMethod
  } catch (error) {
    console.error('Error updating payment method:', error)
    throw new Error('Failed to update payment method')
  }
}
