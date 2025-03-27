import { FieldFlooring as PayloadFieldFlooring } from '@payload-types'

export class FieldFlooringModel {
  readonly id: string
  readonly name: string

  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(data: PayloadFieldFlooring) {
    this.id = data.id
    this.name = data.name
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  // Factory method
  static from(data: PayloadFieldFlooring): FieldFlooringModel {
    return new FieldFlooringModel(data)
  }

  public toSerializable(): PayloadFieldFlooring {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
