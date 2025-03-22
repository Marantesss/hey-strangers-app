import { Game as PayloadGame, Registration } from '@payload-types'
import { FieldModel } from './Field.model'
import { RegistrationModel } from '@/domains/registrations/shared/models/Registration.model'

type GameSport = PayloadGame['sport']

export class GameModel {
  readonly id: string
  readonly name: string
  readonly description: string | null
  readonly startsAt: Date
  readonly endsAt: Date
  readonly price: number
  readonly maxPlayers: number
  readonly sport: GameSport
  readonly stripeProductId: string | null

  readonly createdAt: Date
  readonly updatedAt: Date

  // Relations
  private readonly _field?: FieldModel
  private readonly _fieldId: string

  private readonly _registrations?: RegistrationModel[]
  private readonly _registrationsIds?: string[]

  private constructor(data: PayloadGame) {
    this.id = data.id
    this.name = data.name
    this.description = data.description ?? null
    this.startsAt = new Date(data.startsAt)
    this.endsAt = new Date(data.endsAt)
    this.price = data.price
    this.maxPlayers = data.maxPlayers
    this.sport = data.sport
    this.stripeProductId = data.stripeProductId ?? null

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // Relations
    this._field = data.field instanceof Object ? FieldModel.from(data.field) : undefined
    this._fieldId = data.field instanceof Object ? data.field.id : data.field

    const isRegistrationsPresent = !!data.registrations?.docs
    const isRegistrationsExpanded =
      isRegistrationsPresent &&
      data.registrations!.docs!.length > 0 &&
      data.registrations!.docs![0] instanceof Object

    this._registrations = isRegistrationsExpanded
      ? data.registrations!.docs!.map((registration) =>
          RegistrationModel.from(registration as Registration),
        )
      : isRegistrationsPresent
        ? []
        : undefined

    this._registrationsIds = isRegistrationsExpanded
      ? this._registrations!.map((registration) => registration.id)
      : isRegistrationsPresent
        ? data.registrations!.docs!.map((registration) => registration as string)
        : undefined
  }

  // Getters for relations
  get field(): FieldModel {
    if (!this._field) {
      throw new Error('Field not found')
    }
    return this._field
  }

  get registrations(): RegistrationModel[] {
    if (!this._registrations) {
      throw new Error('Registrations not expanded')
    }
    return this._registrations
  }

  get sportEmoji(): string {
    const gameSportEmoji: Record<GameSport, string> = {
      soccer: '⚽️',
      basketball: '🏀',
      tennis: '🎾',
      padel: '🎱',
      volleyball: '🏐',
    }

    return gameSportEmoji[this.sport]
  }

  get durationInMinutes(): number {
    return (this.endsAt.getTime() - this.startsAt.getTime()) / (1000 * 60)
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
      sport: this.sport,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      field: this._field ? this._field.toSerializable() : this._fieldId,
      registrations: this._registrations
        ? {
            docs: this._registrations.map((registration) => registration.toSerializable()),
            totalDocs: this._registrations.length,
            hasNextPage: false,
          }
        : undefined,
    }
  }

  static get dummy(): GameModel[] {
    return [
      GameModel.from({
        id: '1',
        name: 'Game 1',
        description: 'Description 1',
        startsAt: '2025-03-01T08:00:00Z',
        endsAt: '2025-03-01T09:00:00Z',
        price: 100,
        maxPlayers: 10,
        sport: 'soccer',
        createdAt: '2025-03-01T08:00:00Z',
        updatedAt: '2025-03-01T08:00:00Z',
        field: {
          id: '1',
          name: 'Field 1',
          address: '123 Main St',
          type: 'indoor',
          flooring: 'artificial_turf',
          createdAt: '2025-03-01T08:00:00Z',
          updatedAt: '2025-03-01T08:00:00Z',
          sport: 'soccer',
          amenities: ['restrooms', 'showers', 'first_aid_station', 'lighting', 'scoreboard'],
        },
        // registrations: [
        //   {
        //     id: '1',
        //     createdAt: "2025-03-01T08:00:00Z",
        //     deletedAt: null,
        //     updatedAt: "2025-03-01T08:00:00Z",
        //     gameId: '1',
        //     userId: '1',
        //     user: {
        //       id: '1',
        //       name: 'John Doe',
        //       city: 'Lisbon',
        //       phoneNumber: '+351 912 345 678',
        //       createdAt: "2025-03-01T08:00:00Z",
        //       deletedAt: null,
        //       updatedAt: "2025-03-01T08:00:00Z",
        //     },
        //   },
        //   {
        //     id: '2',
        //     createdAt: "2025-03-01T08:00:00Z",
        //     deletedAt: null,
        //     updatedAt: "2025-03-01T08:00:00Z",
        //     gameId: '1',
        //     userId: '2',
        //     user: {
        //       id: '2',
        //       name: 'Jane Doe',
        //       city: 'Lisbon',
        //       phoneNumber: '+351 912 345 678',
        //       createdAt: "2025-03-01T08:00:00Z",
        //       deletedAt: null,
        //       updatedAt: "2025-03-01T08:00:00Z",
        //     },
        //   },
        // ],
      }),
      GameModel.from({
        id: '2',
        name: 'Game 2',
        description: 'Description 2',
        startsAt: '2025-03-01T09:00:00Z',
        endsAt: '2025-03-01T10:00:00Z',
        price: 100,
        maxPlayers: 10,
        sport: 'soccer',
        createdAt: '2025-03-01T08:00:00Z',
        updatedAt: '2025-03-01T08:00:00Z',
        field: {
          id: '1',
          name: 'Field 1',
          address: '123 Main St',
          type: 'indoor',
          flooring: 'artificial_turf',
          sport: 'soccer',
          createdAt: '2025-03-01T08:00:00Z',
          updatedAt: '2025-03-01T08:00:00Z',
          amenities: [
            'cafe',
            'parking',
            'wifi',
            'changing_rooms',
            'equipment_rental',
            'lockers',
            'storage_space',
            'water_fountain',
          ],
        },
      }),
    ]
  }
}
