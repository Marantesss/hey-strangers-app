import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { seedUsers } from './users'
import { seedFields } from './fields'
import { seedGames } from './games'
import { seedRegistrations } from './registrations'
import { seedAdmins } from './admins'
import { seedHome } from './home'
import { seedFooter } from './footer'
import { seedFieldAmenities } from './field-amenities'
import { seedFieldTypes } from './field-types'
import { seedFieldFlooring } from './field-flooring'
import { seedSports } from './sports'
import { seedQuiz } from './quiz'

const deleteAll = async (payload: Payload) => {
  await payload.delete({
    collection: 'registrations',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'games',
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

  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'field_flooring',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'field_types',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'field_amenities',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'sports',
    where: { id: { exists: true } },
  })

  // await payload.delete({
  //   collection: 'media',
  //   where: { id: { exists: true } },
  // })
}

const seed = async () => {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  await deleteAll(payload)

  // globals
  await seedHome(payload)
  await seedFooter(payload)
  await seedQuiz(payload)

  // users
  // await seedAdmins(payload)
  await seedUsers(payload)

  // "helper" data
  await seedSports(payload)
  await seedFieldTypes(payload)
  await seedFieldFlooring(payload)
  await seedFieldAmenities(payload)

  // "main" data
  await seedFields(payload)
  await seedGames(payload)
  await seedRegistrations(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error seeding database', err)
    process.exit(1)
  })
