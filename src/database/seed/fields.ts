import { Payload } from 'payload'
import { Field } from '@payload-types'

export const seedFields = async (payload: Payload) => {
  const fields = [
    // Soccer fields
    {
      name: 'Campo de Futebol Parque das Nações',
      address: 'Rua do Parque das Nações 123, Lisboa',
      type: 'outdoor',
      flooring: 'natural_grass',
      sport: 'soccer',
      amenities: ['parking', 'restrooms', 'changing_rooms', 'lighting'],
    },
    {
      name: 'Arena Indoor Benfica',
      address: 'Avenida Lusíada 456, Lisboa',
      type: 'indoor',
      flooring: 'artificial_turf',
      sport: 'soccer',
      amenities: ['parking', 'restrooms', 'changing_rooms', 'showers', 'lockers', 'cafe'],
    },
    {
      name: 'Complexo Desportivo do Porto',
      address: 'Rua do Dragão 789, Porto',
      type: 'hybrid',
      flooring: 'hybrid_turf',
      sport: 'soccer',
    },

    // Tennis courts
    {
      name: 'Clube de Ténis de Lisboa',
      address: 'Avenida da Liberdade 321, Lisboa',
      type: 'outdoor',
      flooring: 'hard_court',
      sport: 'tennis',
      amenities: ['parking', 'restrooms', 'equipment_rental', 'water_fountain'],
    },
    {
      name: 'Centro de Ténis do Porto',
      address: 'Rua da Boavista 654, Porto',
      type: 'indoor',
      flooring: 'hard_court',
      sport: 'tennis',
    },

    // Paddle courts
    {
      name: 'Padel Belém',
      address: 'Rua de Belém 987, Lisboa',
      type: 'outdoor',
      flooring: 'artificial_turf',
      sport: 'padel',
      amenities: ['parking', 'restrooms', 'changing_rooms', 'lighting', 'seating_area'],
    },
    {
      name: 'Clube Padel Porto',
      address: 'Rua Santa Catarina 147, Porto',
      type: 'indoor',
      flooring: 'artificial_turf',
      sport: 'padel',
    },

    // Basketball courts
    {
      name: 'Pavilhão do Sporting',
      address: 'Rua do Sporting 258, Lisboa',
      type: 'indoor',
      flooring: 'wood',
      sport: 'basketball',
      amenities: ['restrooms', 'water_fountain', 'scoreboard', 'lighting'],
    },
    {
      name: 'Campo de Basquete Ribeira',
      address: 'Rua da Ribeira 369, Porto',
      type: 'outdoor',
      flooring: 'concrete',
      sport: 'basketball',
    },

    // Multi-purpose facilities
    {
      name: 'Centro Desportivo Municipal',
      address: 'Avenida de Lisboa 741, Lisboa',
      type: 'indoor',
      flooring: 'polyurethane',
      sport: 'multi_purpose',
      amenities: [
        'parking',
        'restrooms',
        'changing_rooms',
        'showers',
        'equipment_rental',
        'lockers',
        'water_fountain',
        'cafe',
        'seating_area',
        'first_aid_station',
        'wifi',
        'lighting',
        'scoreboard',
      ],
    },
    {
      name: 'Parque Desportivo do Porto',
      address: 'Rua do Porto 852, Porto',
      type: 'outdoor',
      flooring: 'artificial_turf',
      sport: 'multi_purpose',
      amenities: [
        'parking',
        'restrooms',
        'changing_rooms',
        'showers',
        'equipment_rental',
        'lockers',
        'water_fountain',
        'cafe',
        'seating_area',
        'first_aid_station',
        'wifi',
        'lighting',
        'scoreboard',
      ],
    },

    // Volleyball courts
    {
      name: 'Arena Voleibol Cascais',
      address: 'Avenida Marginal 963, Lisboa',
      type: 'outdoor',
      flooring: 'sand',
      sport: 'volleyball',
      amenities: [
        'parking',
        'restrooms',
        'changing_rooms',
        'showers',
        'equipment_rental',
        'lockers',
        'water_fountain',
        'cafe',
        'seating_area',
        'first_aid_station',
        'wifi',
        'lighting',
        'scoreboard',
      ],
    },
    {
      name: 'Centro de Voleibol do Porto',
      address: 'Rua dos Clérigos 159, Porto',
      type: 'indoor',
      flooring: 'wood',
      sport: 'volleyball',
      amenities: [
        'parking',
        'restrooms',
        'changing_rooms',
        'showers',
        'equipment_rental',
        'lockers',
        'water_fountain',
        'cafe',
        'seating_area',
        'first_aid_station',
        'wifi',
        'lighting',
        'scoreboard',
      ],
    },
  ] satisfies Omit<Field, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[]

  try {
    for (const field of fields) {
      await payload.create({
        collection: 'fields',
        data: field,
      })
    }
    console.log('✅ Fields seeded successfully')
  } catch (error) {
    console.error('Error seeding fields:', error)
  }
}
