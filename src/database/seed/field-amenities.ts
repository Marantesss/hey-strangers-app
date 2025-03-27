import { Payload } from 'payload'
import { FieldAmenity } from '@payload-types'
import { SeedEntry } from './types'

type FieldAmenitySeed = Omit<FieldAmenity, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedFieldAmenities = async (payload: Payload) => {
  const fieldAmenities = [
    {
      pt: { name: 'Estacionamento' },
      en: { name: 'Parking' },
    },
    {
      pt: { name: 'Casas de banho' },
      en: { name: 'Restrooms' },
    },
    {
      pt: { name: 'Vestiários' },
      en: { name: 'Changing rooms' },
    },
    {
      pt: { name: 'Chuveiros' },
      en: { name: 'Showers' },
    },
    {
      pt: { name: 'Aluguer de equipamento' },
      en: { name: 'Equipment rental' },
    },
    {
      pt: { name: 'Cacifos' },
      en: { name: 'Lockers' },
    },
    {
      pt: { name: 'Área de armazenamento' },
      en: { name: 'Storage space' },
    },
    {
      pt: { name: 'Bebedouro' },
      en: { name: 'Water fountain' },
    },
    {
      pt: { name: 'Máquinas de venda' },
      en: { name: 'Vending machines' },
    },
    {
      pt: { name: 'Café' },
      en: { name: 'Cafe' },
    },
    {
      pt: { name: 'Área de estar' },
      en: { name: 'Seating area' },
    },
    {
      pt: { name: 'Posto de primeiros socorros' },
      en: { name: 'First aid station' },
    },
    {
      pt: { name: 'Wi-Fi' },
      en: { name: 'WiFi' },
    },
    {
      pt: { name: 'Iluminação' },
      en: { name: 'Lighting' },
    },
    {
      pt: { name: 'Placar' },
      en: { name: 'Scoreboard' },
    },
  ] satisfies SeedEntry<FieldAmenitySeed>[]

  try {
    for (const fieldAmenity of fieldAmenities) {
      const createdFieldAmenity = await payload.create({
        collection: 'field_amenities',
        data: fieldAmenity.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'field_amenities',
        id: createdFieldAmenity.id,
        data: fieldAmenity.en,
        locale: 'en',
      })
    }
    console.log('✅ Field amenities seeded successfully')
  } catch (error) {
    console.error('Error seeding field amenities:', error)
  }
}
