import { Payload } from 'payload'

export const seedAdmins = async (payload: Payload) => {
  // Create test users
  const admins = [
    {
      email: 'admin@example.com',
      password: 'password',
    },
  ]

  try {
    for (const admin of admins) {
      await payload.create({
        collection: 'admins',
        data: admin,
      })
    }
    console.log('✅ Admins seeded successfully')
  } catch (error) {
    console.error('Error seeding admins:', error)
  }
}
