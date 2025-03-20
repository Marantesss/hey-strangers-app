import { GameModel } from '@/domains/games/shared/models/Game.model'
import { UserModel } from '@/domains/users/shared/models/User.model'
import { Registration } from '@payload-types'

export class RegistrationModel {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date

  // Relations
  private readonly _user?: UserModel
  private readonly _game?: GameModel

  private constructor(data: Registration) {
    this.id = data.id
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // Relations
    this._user = data.user instanceof Object ? UserModel.from(data.user) : undefined
    this._game = data.game instanceof Object ? GameModel.from(data.game) : undefined
  }

  get user(): UserModel {
    if (!this._user) {
      throw new Error('User not found')
    }
    return this._user
  }

  get game(): GameModel {
    if (!this._game) {
      throw new Error('Game not found')
    }
    return this._game
  }

  static from(data: Registration): RegistrationModel {
    return new RegistrationModel(data)
  }
}
