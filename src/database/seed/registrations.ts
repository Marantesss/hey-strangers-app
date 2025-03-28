import { Payload } from 'payload'
import { Registration } from '@payload-types'

export const seedRegistrations = async (payload: Payload) => {
  // First, get all users and games to reference them
  const users = await payload.find({
    collection: 'users',
    limit: 100,
    locale: 'en',
  })

  // Create maps for easy lookup
  const userMap = users.docs.reduce(
    (acc, user) => {
      acc[user.email as string] = user.id
      return acc
    },
    {} as Record<string, string>,
  )

  const registrations = [
    // Morning Soccer Match registrations
    {
      user: userMap['user1@example.com'],
      stripePaymentIntentId: 'pi_1',
      isMainRegistration: true,
    },
    {
      user: userMap['user2@example.com'],
      stripePaymentIntentId: 'pi_2',
      isMainRegistration: true,
    },
    {
      user: userMap['user3@example.com'],
      stripePaymentIntentId: 'pi_3',
      isMainRegistration: true,
    },

    // Evening Soccer League registrations
    {
      user: userMap['user1@example.com'],
      stripePaymentIntentId: 'pi_4',
      isMainRegistration: true,
    },
    {
      user: userMap['user4@example.com'],
      stripePaymentIntentId: 'pi_5',
      isMainRegistration: true,
    },

    // Tennis Singles Match
    {
      user: userMap['user2@example.com'],
      stripePaymentIntentId: 'pi_6',
      isMainRegistration: true,
    },
    {
      user: userMap['user3@example.com'],
      stripePaymentIntentId: 'pi_7',
      isMainRegistration: true,
    },

    // Morning Padel Session
    {
      user: userMap['user1@example.com'],
      stripePaymentIntentId: 'pi_8',
      isMainRegistration: true,
    },
    {
      user: userMap['user2@example.com'],
      stripePaymentIntentId: 'pi_9',
      isMainRegistration: true,
    },
    {
      user: userMap['user3@example.com'],
      stripePaymentIntentId: 'pi_10',
      isMainRegistration: true,
    },

    // Street Basketball Tournament
    {
      user: userMap['user1@example.com'],
      stripePaymentIntentId: 'pi_11',
      isMainRegistration: true,
    },
    {
      user: userMap['user2@example.com'],
      stripePaymentIntentId: 'pi_12',
      isMainRegistration: false,
    },
    {
      user: userMap['user3@example.com'],
      stripePaymentIntentId: 'pi_13',
      isMainRegistration: true,
    },
    {
      user: userMap['user3@example.com'],
      stripePaymentIntentId: 'pi_14',
      isMainRegistration: false,
    },
  ] satisfies Omit<Registration, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[]

  try {
    for (const registration of registrations) {
      await payload.create({
        collection: 'registrations',
        data: registration,
      })
    }
    console.log('✅ Registrations seeded successfully')
  } catch (error) {
    console.error('Error seeding registrations:', error)
  }
}
