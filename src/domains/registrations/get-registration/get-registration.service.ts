'use server'

import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { RegistrationModel } from '../shared/models/Registration.model'
import { getLocale } from 'next-intl/server'

export async function getRegistrationsByGameId(gameId: string): Promise<RegistrationModel[]> {
  const locale = await getLocale()
  const payload = await getPayload({ config })

  const query = {
    collection: 'registrations' as const,
    where: {
      game: {
        equals: gameId,
      },
    },
    depth: 1,
    locale: locale as TypedLocale,
  }

  const { docs } = await payload.find(query)

  return docs.map((registration) => RegistrationModel.from(registration))
}
