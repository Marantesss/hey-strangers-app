import { getPayload } from 'payload'
import { getUserByPhoneNumber } from '../get-user/get-user.service'
import config from '@payload-config'

const generateOTPCode = () => Math.floor(100000 + Math.random() * 900000).toString()

export async function createUserWithPhoneNumber(
  phoneNumber: string,
  quizAnswers: Record<string, string> = {},
) {
  const payload = await getPayload({ config })
  const user = await getUserByPhoneNumber(phoneNumber)

  if (user) {
    throw new Error('User already exists')
  }

  const createdUser = await payload.create({
    collection: 'users',
    data: { phoneNumber, quizAnswers },
  })

  return createdUser
}

export async function createOTPForPhoneNumber(phoneNumber: string) {
  const payload = await getPayload({ config })
  const user = await getUserByPhoneNumber(phoneNumber)

  if (!user) {
    throw new Error('User not found')
  }

  const code = generateOTPCode()

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

export async function verifyUserByPhoneNumber(phoneNumber: string) {
  const payload = await getPayload({ config })
  const user = await getUserByPhoneNumber(phoneNumber)

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
