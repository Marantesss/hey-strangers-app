import { RegistrationModel } from '@/domains/registrations/shared/models/Registration.model'
import { Registration, User } from '@payload-types'

export class UserModel {
  readonly id: string
  readonly name: string | null
  readonly city: string | null
  readonly phoneNumber: string
  readonly email: string | null
  readonly isVerified: boolean
  readonly stripeCustomerId: string | null

  readonly createdAt: Date
  readonly updatedAt: Date

  readonly quizAnswers: User['quizAnswers']

  // Relations
  private readonly _registrations?: RegistrationModel[]

  private constructor(data: User) {
    this.id = data.id
    this.name = data.name ?? null
    this.city = data.city ?? null
    this.phoneNumber = data.phoneNumber
    this.email = data.email ?? null
    this.isVerified = data.isVerified ?? false
    this.stripeCustomerId = data.stripeCustomerId ?? null
    this.quizAnswers = data.quizAnswers

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    // Relations
    const isRegistrationsExpanded =
      data.registrations?.docs &&
      data.registrations.docs.length > 0 &&
      data.registrations.docs[0] instanceof Object
    this._registrations = isRegistrationsExpanded
      ? data.registrations!.docs!.map((registration) =>
          RegistrationModel.from(registration as Registration),
        )
      : undefined
  }

  get registrations(): RegistrationModel[] {
    if (!this._registrations) {
      throw new Error('Registrations not expanded')
    }

    return this._registrations
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

  // Factory method
  static from(data: User): UserModel {
    return new UserModel(data)
  }

  public toSerializable(): User {
    return {
      id: this.id,
      name: this.name,
      city: this.city,
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
