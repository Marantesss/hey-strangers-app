import { Game } from '@payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GameModel } from '../shared/models/Game.model'

export async function getGameById(id: Game['id']) {
  const payload = await getPayload({ config })

  const game = await payload.findByID({
    collection: 'games',
    id,
  })

  return GameModel.from(game)
}
