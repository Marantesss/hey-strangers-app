import { Field as PayloadField } from '@payload-types'

type FieldAmenity = NonNullable<PayloadField['amenities']>[number]

const AMENITIES_HUMANIZED: Record<FieldAmenity, string> = {
  cafe: 'Café',
  parking: 'Parking',
  wifi: 'WiFi',
  changing_rooms: 'Changing Rooms',
  equipment_rental: 'Equipment Rental',
  lockers: 'Lockers',
  storage_space: 'Storage Space',
  water_fountain: 'Water Fountain',
  vending_machines: 'Vending Machines',
  seating_area: 'Seating Area',
  restrooms: 'Restrooms',
  showers: 'Showers',
  first_aid_station: 'First Aid Station',
  lighting: 'Lighting',
  scoreboard: 'Scoreboard',
}

export class FieldModel {
  readonly id: string
  readonly name: string
  readonly address: string
  readonly type: PayloadField['type']
  readonly flooring: PayloadField['flooring']
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly sport: PayloadField['sport']
  readonly amenities: NonNullable<PayloadField['amenities']>

  private constructor(data: PayloadField) {
    this.id = data.id
    this.name = data.name
    this.address = data.address
    this.type = data.type
    this.flooring = data.flooring
    this.sport = data.sport
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    this.amenities = data.amenities ?? []
  }

  // Factory method
  static from(data: PayloadField): FieldModel {
    return new FieldModel(data)
  }

  get amenitiesHumanized(): string[] {
    return this.amenities.map((amenity) => AMENITIES_HUMANIZED[amenity])
  }

  get typeHumanized(): string {
    switch (this.type) {
      case 'indoor':
        return 'indoor'
      case 'outdoor':
        return 'outdoor'
      default:
        return this.type
    }
  }

  get flooringHumanized(): string {
    switch (this.flooring) {
      case 'artificial_turf':
        return 'TURF'
      case 'natural_grass':
        return 'GRASS'
      case 'hybrid_turf':
        return 'HYBRID TURF'
      case 'clay':
        return 'CLAY'
      case 'hard_court':
        return 'HARD COURT'
      case 'concrete':
        return 'CONCRETE'
      default:
        return this.flooring
    }
  }

  get sportHumanized(): string {
    switch (this.sport) {
      case 'soccer':
        return 'soccer'
      case 'basketball':
        return 'basketball'
      case 'tennis':
        return 'tennis'
      case 'volleyball':
        return 'volleyball'
      case 'padel':
        return 'padel'
      default:
        return this.sport
    }
  }

  public toSerializable(): PayloadField {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      type: this.type,
      flooring: this.flooring,
      sport: this.sport,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      amenities: this.amenities,
    }
  }
}
