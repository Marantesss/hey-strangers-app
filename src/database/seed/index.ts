import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { seedUsers } from './users'
import { seedFields } from './fields'
import { seedGames } from './games'
import { seedRegistrations } from './registrations'
import { seedAdmins } from './admins'
import { seedHome } from './home'

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

  await payload.delete({
    collection: 'admins',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
  })

  // await payload.delete({
  //   collection: 'media',
  //   where: { id: { exists: true } },
  // })
}

const seed = async () => {
  const payload = await getPayload({ config })

  await deleteAll(payload)

  await seedHome(payload)

  await seedAdmins(payload)
  await seedUsers(payload)
  await seedFields(payload)
  await seedGames(payload)
  await seedRegistrations(payload)

  console.log('Seeding database...')
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
