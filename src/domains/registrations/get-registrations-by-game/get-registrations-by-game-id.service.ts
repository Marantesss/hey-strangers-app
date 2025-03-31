'use server'

import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { RegistrationModel } from '../shared/models/Registration.model'
import { getLocale } from 'next-intl/server'
import { Registration } from '@/payload-types'

export async function getRegistrationsByGameId(gameId: string): Promise<RegistrationModel[]> {
  const locale = await getLocale()
  const payload = await getPayload({ config })

  const { registrations } = await payload.findByID({
    collection: 'games',
    id: gameId,
    locale: locale as TypedLocale,
    depth: 1,
  })

  return (
    registrations?.map((registration) => RegistrationModel.from(registration as Registration)) ?? []
  )
}
