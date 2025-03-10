import { Enums, Tables } from "@/utils/supabase/types";

type FieldRow = Tables<'field'>;

type FieldType = Enums<'field_type'>;
type FlooringType = Enums<'flooring_type'>;
type FieldSportType = Enums<'field_sport_type'>;

type FieldAmenity = Enums<'field_amenity_type'>

export type FieldData = FieldRow & {
  amenities?: FieldAmenity[]
};

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

export class Field {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly type: FieldType;
  readonly flooring: FlooringType;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly sport: FieldSportType;

  private readonly _amenities?: FieldAmenity[]

  private constructor(data: FieldData) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.type = data.type;
    this.flooring = data.flooring;
    this.sport = data.sport;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;

    this._amenities = data.amenities;
  }

  // Factory method
  static from(data: FieldData): Field {
    return new Field(data);
  }

  get amenities(): FieldAmenity[] {
    if (!this._amenities) {
      throw new Error("Amenities not expanded")
    }

    return this._amenities
  }

  get amenitiesHumanized(): string[] {
    return this.amenities.map(amenity => AMENITIES_HUMANIZED[amenity])
  }

  get typeHumanized(): string {
    switch (this.type) {
      case 'indoor':
        return 'indoor';
      case 'outdoor':
        return 'outdoor';
      default:
        return this.type;
    }
  }

  get flooringHumanized(): string {
    switch (this.flooring) {
      case 'artificial_turf':
        return 'TURF';
      case 'natural_grass':
        return 'GRASS';
      case 'hybrid_turf':
        return 'HYBRID TURF';
      case 'clay':
        return 'CLAY';
      case 'hard_court':
        return 'HARD COURT';
      case 'concrete':
        return 'CONCRETE';
      default:
        return this.flooring;
    }
  }

  get sportHumanized(): string {
    switch (this.sport) {
      case 'soccer':
        return 'soccer';
      case 'basketball':
        return 'basketball';
      case 'tennis':
        return 'tennis';
      case 'volleyball':
        return 'volleyball';
      case 'padel':
        return 'padel';
      default:
        return this.sport;
    }
  }

  public toSerializable(): FieldData {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      type: this.type,
      flooring: this.flooring,
      sport: this.sport,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt?.toISOString() ?? null,
    };
  }
}
