import { Payload } from 'payload'
import { FieldFlooring } from '@payload-types'
import { SeedEntry } from './types'

type FieldFlooringSeed = Omit<FieldFlooring, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedFieldFlooring = async (payload: Payload) => {
  const fieldFlooring = [
    {
      pt: { name: 'Relva natural' },
      en: { name: 'Natural grass' },
    },
    {
      pt: { name: 'Relva artificial' },
      en: { name: 'Artificial turf' },
    },
    {
      pt: { name: 'Relva híbrida' },
      en: { name: 'Hybrid turf' },
    },
    {
      pt: { name: 'Barro' },
      en: { name: 'Clay' },
    },
    {
      pt: { name: 'Piso duro' },
      en: { name: 'Hard court' },
    },
    {
      pt: { name: 'Borracha' },
      en: { name: 'Rubber' },
    },
    {
      pt: { name: 'Poliuretano' },
      en: { name: 'Polyurethane' },
    },
    {
      pt: { name: 'Madeira' },
      en: { name: 'Wood' },
    },
    {
      pt: { name: 'Areia' },
      en: { name: 'Sand' },
    },
    {
      pt: { name: 'Betão' },
      en: { name: 'Concrete' },
    },
    {
      pt: { name: 'Outro' },
      en: { name: 'Other' },
    },
  ] satisfies SeedEntry<FieldFlooringSeed>[]

  try {
    for (const flooring of fieldFlooring) {
      const createdFieldFlooring = await payload.create({
        collection: 'fieldFloorings',
        data: flooring.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'fieldFloorings',
        id: createdFieldFlooring.id,
        data: flooring.en,
        locale: 'en',
      })
    }
    console.log('✅ Field flooring seeded successfully')
  } catch (error) {
    console.error('Error seeding field flooring:', error)
  }
}
