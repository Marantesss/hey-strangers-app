import { City } from '@/payload-types'
import { Payload } from 'payload'

export const seedUsers = async (payload: Payload) => {
  // get cities
  const cities = await payload.find({
    collection: 'cities',
    limit: 100,
    locale: 'en',
  })
  const cityMap = cities.docs.reduce(
    (acc, city) => {
      acc[city.name] = city.id
      return acc
    },
    {} as Record<City['name'], City['id']>,
  )

  const users = [
    {
      email: 'user1@example.com',
      password: 'password',
      name: 'John Smith',
      city: cityMap['Porto'],
      phoneNumber: '+351 912 345 678',
      quizAnswers: {},
    },
    {
      email: 'user2@example.com',
      password: 'password',
      name: 'Sarah Jones',
      city: cityMap['Lisboa'],
      phoneNumber: '+351 912 345 679',
      quizAnswers: {},
    },
    {
      email: 'user3@example.com',
      password: 'password',
      name: 'Mike Wilson',
      city: cityMap['Porto'],
      phoneNumber: '+351 912 345 680',
      quizAnswers: {},
    },
    {
      email: 'user4@example.com',
      password: 'password',
      name: 'Emma Brown',
      city: cityMap['Lisboa'],
      phoneNumber: '+351 912 345 681',
      quizAnswers: {},
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
