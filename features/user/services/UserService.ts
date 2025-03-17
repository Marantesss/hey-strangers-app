import { Payload, getPayload } from 'payload'
import { User } from '@/features/user/models/User'
import config from '@payload-config'
import { headers } from 'next/headers'

export class UserService {
  private constructor(
    private readonly payload: Payload
  ) {}

  static async init() {
    const payload = await getPayload({ config })
    return new UserService(payload)
  }

  async getAuthUser() {
    const _headers = await headers()
    try {
      const { user } = await this.payload.auth({ headers: _headers })

      if (!user) {
        throw Error('User not found')
      }

      return user
    } catch (error) {
      throw Error(error instanceof Error ? error.message : 'Failed to get authenticated user')
    }
  }

  async updateProfile(data: {
    email?: string
    phoneNumber?: string
    name?: string
    city?: string
  }) {
    try {
      const authUser = await this.getAuthUser()

      // Update user in Payload
      const updatedUser = await this.payload.update({
        collection: 'users',
        id: authUser.id,
        data: {
          email: data.email,
          name: data.name,
          city: data.city,
          phoneNumber: data.phoneNumber,
        },
      })

      if (!updatedUser) {
        throw Error('Failed to update user')
      }

      // Return the updated user through our model
      return User.from(updatedUser)
    } catch (error) {
      throw Error(error instanceof Error ? error.message : 'Failed to update profile')
    }
  }
}
