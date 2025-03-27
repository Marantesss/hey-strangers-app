import { Sport as PayloadSport } from '@payload-types'

export class SportModel {
  readonly id: string
  readonly name: string
  readonly emoji: string

  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(data: PayloadSport) {
    this.id = data.id
    this.name = data.name
    this.emoji = data.emoji
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  // Factory method
  static from(data: PayloadSport): SportModel {
    return new SportModel(data)
  }

  public toSerializable(): PayloadSport {
    return {
      id: this.id,
      emoji: this.emoji,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
