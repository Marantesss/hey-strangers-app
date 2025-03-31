import { Game } from '@payload-types'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { GameModel } from '../shared/models/Game.model'

export async function getGameById(id: Game['id'], locale?: TypedLocale) {
  const payload = await getPayload({ config })

  const game = await payload.findByID({
    collection: 'games',
    id,
    locale,
  })

  return GameModel.from(game)
}
