import { FieldType as PayloadFieldType } from '@payload-types'

export class FieldTypeModel {
  readonly id: string
  readonly name: string

  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(data: PayloadFieldType) {
    this.id = data.id
    this.name = data.name
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  // Factory method
  static from(data: PayloadFieldType): FieldTypeModel {
    return new FieldTypeModel(data)
  }

  public toSerializable(): PayloadFieldType {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
