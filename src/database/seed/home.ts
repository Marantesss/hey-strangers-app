import { Payload } from 'payload'

export const seedHome = async (payload: Payload) => {
  try {
    await payload.updateGlobal({
      slug: 'home',
      data: {
        hero: {
          title: 'Home',
          description: 'Home description',
        },
      },
    })
    console.log('✅ Home seeded successfully')
  } catch (error) {
    console.error('Error seeding home:', error)
  }
}
