import { getPayload } from 'payload'
import config from '@payload-config'
import { User } from '@/payload-types'

export async function getUserById(id: string): Promise<User> {
  const payload = await getPayload({ config })
  return await payload.findByID({
    collection: 'users',
    id,
  })
}

export async function getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
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
