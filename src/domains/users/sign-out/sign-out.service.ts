'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function signOut() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const name = `${payload.config.cookiePrefix}-token`
  cookieStore.delete(name)
}
