import { FieldAmenity as PayloadFieldAmenity } from '@payload-types'

export class FieldAmenityModel {
  readonly id: string
  readonly name: string

  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(data: PayloadFieldAmenity) {
    this.id = data.id
    this.name = data.name
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  // Factory method
  static from(data: PayloadFieldAmenity): FieldAmenityModel {
    return new FieldAmenityModel(data)
  }

  public toSerializable(): PayloadFieldAmenity {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
