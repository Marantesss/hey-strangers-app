'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { RegistrationModel } from '../shared/models/Registration.model'

export async function getRegistrationsByGameId(gameId: string): Promise<RegistrationModel[]> {
  const payload = await getPayload({ config })

  const query = {
    collection: 'registrations' as const,
    where: {
      game: {
        equals: gameId,
      },
    },
    depth: 1,
  }

  const { docs } = await payload.find(query)

  return docs.map((registration) => RegistrationModel.from(registration))
}
