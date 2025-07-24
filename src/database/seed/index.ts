import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { seedUsers } from './users'
import { seedFields } from './fields'
import { seedGames } from './games'
import { seedRegistrations } from './registrations'
import { seedHome } from './home'
import { seedFooter } from './footer'
import { seedFieldAmenities } from './field-amenities'
import { seedFieldTypes } from './field-types'
import { seedFieldFlooring } from './field-flooring'
import { seedSports } from './sports'
import { seedQuiz } from './quiz'
import { seedAdmins } from './admins'
import { seedPages } from './pages'
import { seedCities } from './cities'

const deleteAll = async (payload: Payload) => {
  await payload.updateGlobal({
    slug: 'quiz',
    data: {
      dummyGameResults: null,
    },
  })

  await payload.delete({
    collection: 'games',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'registrations',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'fields',
    where: { id: { exists: true } },
  })

  // await payload.delete({
  //   collection: 'admins',
  //   where: { id: { exists: true } },
  // })

  const deletedUsers = await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
    depth: 0,
  })

  for (const user of deletedUsers.docs) {
    await payload.delete({
      collection: 'media',
      where: { id: { equals: user.profilePicture } },
    })
  }

  await payload.delete({
    collection: 'fieldFloorings',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'fieldTypes',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'fieldAmenities',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'sports',
    where: { id: { exists: true } },
    depth: 0,
  })

  await payload.delete({
    collection: 'cities',
    where: { id: { exists: true } },
    depth: 0,
  })
}

export const seedGlobals = async (payload: Payload) => {
  await seedHome(payload)
  await seedFooter(payload)
  await seedQuiz(payload)
  await seedPages(payload)
}

const seed = async () => {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  await deleteAll(payload)
  console.log('Deleted all data')

  // "helper" data
  await seedSports(payload)
  await seedCities(payload)
  await seedFieldTypes(payload)
  await seedFieldFlooring(payload)
  await seedFieldAmenities(payload)

  // users
  await seedAdmins(payload)
  await seedUsers(payload)

  // "main" data
  await seedFields(payload)
  await seedRegistrations(payload)
  await seedGames(payload)

  // globals
  await seedGlobals(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error seeding database', JSON.stringify(err, null, 2))
    process.exit(1)
  })
