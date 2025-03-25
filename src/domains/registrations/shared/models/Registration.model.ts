import { GameModel } from '@/domains/games/shared/models/Game.model'
import { UserModel } from '@/domains/users/shared/models/User.model'
import { Registration } from '@payload-types'

export class RegistrationModel {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly stripePaymentIntentId: string
  readonly isMainRegistration: boolean

  // Relations
  private readonly _userId: string
  private readonly _user?: UserModel
  private readonly _gameId: string
  private readonly _game?: GameModel

  private constructor(data: Registration) {
    this.id = data.id
    this.stripePaymentIntentId = data.stripePaymentIntentId
    this.isMainRegistration = !!data.isMainRegistration

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // Relations
    this._user = data.user instanceof Object ? UserModel.from(data.user) : undefined
    this._userId = data.user instanceof Object ? data.user.id : data.user

    this._game = data.game instanceof Object ? GameModel.from(data.game) : undefined
    this._gameId = data.game instanceof Object ? data.game.id : data.game
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

  public toSerializable(): Registration {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      user: this._user?.toSerializable() ?? this._userId,
      game: this._game?.toSerializable() ?? this._gameId,
      stripePaymentIntentId: this.stripePaymentIntentId,
    }
  }
}
