'use server'

import { User } from '@/payload-types'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getMe(): Promise<User | null> {
  const payload = await getPayload({ config })
  const _headers = await headers()
  const { user } = await payload.auth({ headers: _headers })

  if (user?.collection === 'admins') {
    return null
  }

  return user
}
