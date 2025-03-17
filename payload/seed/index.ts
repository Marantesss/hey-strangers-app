import { Payload, getPayload } from 'payload'
import { seedUsers } from './users'
import { seedFields } from './fields'
import { seedGames } from './games'
import { seedRegistrations } from './registrations'
import config from '../payload.config'

const deleteAll = async (payload: Payload) => {
  await payload.delete({
    collection: 'games',
    where: { id: { exists: true } }
  })

  await payload.delete({
    collection: 'fields',
    where: { id: { exists: true } }
  })

  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } }
  })

  await payload.delete({
    collection: 'registrations',
    where: { id: { exists: true } }
  })
}

const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })
  
  try {
    await deleteAll(payload)

    await seedUsers(payload)
    await seedFields(payload)
    await seedGames(payload)
    await seedRegistrations(payload)
    
    console.log('✨ Seeding completed successfully!')
  } catch (error) {
    console.error('Error during seeding:', error)
  }
}

seed()
  .then(() => {
    console.log('✨ Seeding completed successfully!')
  })
