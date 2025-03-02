import { Tables } from "@/utils/supabase/types";

type FieldRow = Tables<'field'>;

type FieldType = FieldRow['type'];
type FlooringType = FieldRow['flooring'];
type FieldSportType = FieldRow['sport'];

type FieldConstructorParams = FieldRow;

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

  private constructor(data: FieldConstructorParams) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.type = data.type;
    this.flooring = data.flooring;
    this.sport = data.sport;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
  }

  // Factory method
  static from(data: FieldConstructorParams): Field {
    return new Field(data);
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
      case 'paddle':
        return 'paddle';
      default:
        return this.sport;
    }
  }

  public toSerializable(): FieldConstructorParams {
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
