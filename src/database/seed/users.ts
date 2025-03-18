import { Payload } from 'payload'

export const seedUsers = async (payload: Payload) => {
  // Create test users
  const users = [
    {
      email: 'user1@example.com',
      password: 'password',
      name: 'John Smith',
      city: 'Porto',
      phoneNumber: '+351 912 345 678',
    },
    {
      email: 'user2@example.com',
      password: 'password',
      name: 'Sarah Jones',
      city: 'Lisboa',
      phoneNumber: '+351 912 345 679',
    },
    {
      email: 'user3@example.com',
      password: 'password',
      name: 'Mike Wilson',
      city: 'Porto',
      phoneNumber: '+351 912 345 680',
    },
    {
      email: 'user4@example.com',
      password: 'password',
      name: 'Emma Brown',
      city: 'Lisboa',
      phoneNumber: '+351 912 345 681',
    },
  ]

  try {
    for (const user of users) {
      await payload.create({
        collection: 'users',
        data: user,
      })
    }
    console.log('✅ Users seeded successfully')
  } catch (error) {
    console.error('Error seeding users:', error)
  }
}
