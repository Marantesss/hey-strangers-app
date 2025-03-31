import { Game as PayloadGame, Registration } from '@payload-types'
import { FieldModel } from '../../../fields/shared/models/Field.model'
import { RegistrationModel } from '@/domains/registrations/shared/models/Registration.model'
import { SportModel } from '@/domains/sports/shared/models/Sport.model'

export type GameModelRelations = {
  registrations: RegistrationModel[]
  sport: SportModel
  field: FieldModel
}

export class GameModel {
  readonly id: string
  readonly name: string
  readonly description: string | null
  readonly startsAt: Date
  readonly endsAt: Date
  readonly price: number
  readonly maxPlayers: number
  readonly stripeProductId: string | null

  readonly createdAt: Date
  readonly updatedAt: Date

  // Relations
  private readonly _sportId: string
  private readonly _sport?: SportModel

  private readonly _field?: FieldModel
  private readonly _fieldId: string

  private readonly _registrations?: RegistrationModel[]
  private readonly _registrationsIds?: string[]

  private static readonly ARTIFICIAL_AVAILABLE_SPOTS_LIMIT = 6

  private constructor(data: PayloadGame, relations?: GameModelRelations) {
    this.id = data.id
    this.name = data.name
    this.description = data.description ?? null
    this.startsAt = new Date(data.startsAt)
    this.endsAt = new Date(data.endsAt)
    this.price = data.price
    this.maxPlayers = data.maxPlayers
    this.stripeProductId = data.stripeProductId ?? null

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // Relations
    this._sport = data.sport instanceof Object ? SportModel.from(data.sport) : undefined
    this._sportId = data.sport instanceof Object ? data.sport.id : data.sport

    this._field = data.field instanceof Object ? FieldModel.from(data.field) : undefined
    this._fieldId = data.field instanceof Object ? data.field.id : data.field

    const isRegistrationsPresent = !!data.registrations
    const isRegistrationsExpanded =
      isRegistrationsPresent &&
      data.registrations!.length > 0 &&
      data.registrations![0] instanceof Object

    this._registrations = isRegistrationsExpanded
      ? data.registrations!.map((registration) =>
          RegistrationModel.from(registration as Registration),
        )
      : isRegistrationsPresent
        ? []
        : undefined

    this._registrationsIds = isRegistrationsExpanded
      ? this._registrations!.map((registration) => registration.id)
      : isRegistrationsPresent
        ? data.registrations!.map((registration) => registration as string)
        : undefined
  }

  // Getters for relations
  get field(): FieldModel {
    if (!this._field) {
      throw new Error('Field not found')
    }
    return this._field
  }

  get sport(): SportModel {
    if (!this._sport) {
      throw new Error('Sport not found')
    }
    return this._sport
  }

  get registrations(): RegistrationModel[] {
    if (!this._registrations) {
      throw new Error('Registrations not expanded')
    }
    return this._registrations
  }

  get durationInMinutes(): number {
    return (this.endsAt.getTime() - this.startsAt.getTime()) / (1000 * 60)
  }

  /**
   * Artificial limit of because MARKETING!!!
   */
  get availableSpots(): number {
    const actualAvailableSpots = this.maxPlayers - (this._registrationsIds?.length ?? 0)

    return actualAvailableSpots > GameModel.ARTIFICIAL_AVAILABLE_SPOTS_LIMIT
      ? GameModel.ARTIFICIAL_AVAILABLE_SPOTS_LIMIT
      : Math.max(actualAvailableSpots, 0)
  }

  get isFull(): boolean {
    return this.availableSpots === 0
  }

  public isUserRegistered(userId: string): boolean {
    return this._registrations?.some((_) => _.isUserRegistered(userId)) ?? false
  }

  // Factory method
  static from(data: PayloadGame): GameModel {
    return new GameModel(data)
  }

  public toSerializable(): PayloadGame {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      startsAt: this.startsAt.toISOString(),
      endsAt: this.endsAt.toISOString(),
      price: this.price,
      maxPlayers: this.maxPlayers,
      sport: this._sport ? this._sport.toSerializable() : this._sportId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      field: this._field ? this._field.toSerializable() : this._fieldId,
      registrations: this._registrations
        ? this._registrations.map((registration) => registration.toSerializable())
        : this._registrationsIds,
    }
  }
}
