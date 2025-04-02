import { City as PayloadCity } from '@payload-types'

export class CityModel {
  readonly id: string
  readonly name: string

  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(data: PayloadCity) {
    this.id = data.id
    this.name = data.name
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  // Factory method
  static from(data: PayloadCity): CityModel {
    return new CityModel(data)
  }

  public toSerializable(): PayloadCity {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
