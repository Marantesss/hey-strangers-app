import { CityModel } from '@/domains/cities/shared/models/City.model'
import { User } from '@payload-types'

export class UserModel {
  readonly id: string
  readonly name: string | null
  readonly phoneNumber: string
  readonly email: string | null
  readonly isVerified: boolean
  readonly stripeCustomerId: string | null

  readonly createdAt: Date
  readonly updatedAt: Date

  readonly quizAnswers: User['quizAnswers']

  // Relations
  readonly cityId: string | null
  private readonly _city?: CityModel

  private constructor(data: User) {
    this.id = data.id
    this.name = data.name ?? null
    this.phoneNumber = data.phoneNumber
    this.email = data.email ?? null
    this.isVerified = data.isVerified ?? false
    this.stripeCustomerId = data.stripeCustomerId ?? null
    this.quizAnswers = data.quizAnswers

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    this._city = data.city instanceof Object ? CityModel.from(data.city) : undefined
    this.cityId = data.city instanceof Object ? data.city.id : (data.city ?? null)
  }

  get city(): CityModel {
    if (!this._city) {
      throw new Error('City not found')
    }
    return this._city
  }

  /**
   * Returns the first name and last initial of the user
   */
  get privateName(): string {
    if (!this.name) return ''

    const nameParts = this.name.split(' ')
    const firstName = nameParts[0]
    const lastInitial = nameParts[nameParts.length - 1][0]

    return `${firstName} ${lastInitial}.`
  }

  get slugifiedName(): string {
    if (!this.name) {
      throw new Error('Name is required')
    }

    return this.name.toLowerCase().replace(/\s+/g, '-')
  }

  // Factory method
  static from(data: User): UserModel {
    return new UserModel(data)
  }

  public toSerializable(): User {
    return {
      id: this.id,
      name: this.name,
      city: this.cityId,
      phoneNumber: this.phoneNumber,
      email: this.email,
      isVerified: this.isVerified,
      stripeCustomerId: this.stripeCustomerId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      quizAnswers: this.quizAnswers,
    }
  }
}
