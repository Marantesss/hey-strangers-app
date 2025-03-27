import { Payload } from 'payload'
import { FieldType } from '@payload-types'
import { SeedEntry } from './types'

type FieldTypeSeed = Omit<FieldType, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedFieldTypes = async (payload: Payload) => {
  const fieldTypes = [
    {
      pt: { name: 'Indoor' },
      en: { name: 'Indoor' },
    },
    {
      pt: { name: 'Outdoor' },
      en: { name: 'Outdoor' },
    },
    {
      pt: { name: 'Híbrido' },
      en: { name: 'Hybrid' },
    },
    {
      pt: { name: 'Outro' },
      en: { name: 'Other' },
    },
  ] satisfies SeedEntry<FieldTypeSeed>[]

  try {
    for (const fieldType of fieldTypes) {
      const createdFieldType = await payload.create({
        collection: 'field_types',
        data: fieldType.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'field_types',
        id: createdFieldType.id,
        data: fieldType.en,
        locale: 'en',
      })
    }
    console.log('✅ Field types seeded successfully')
  } catch (error) {
    console.error('Error seeding field types:', error)
  }
}
