import { Payload } from 'payload'
import { Field, FieldAmenity, FieldFlooring, FieldType, Sport } from '@payload-types'
import { SeedEntry } from './types'

type FieldSeed = Omit<Field, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>

export const seedFields = async (payload: Payload) => {
  // Get all sports to reference them
  const sports = await payload.find({
    collection: 'sports',
    limit: 100,
    locale: 'en',
  })
  const sportMap = sports.docs.reduce(
    (acc, sport) => {
      acc[sport.name] = sport.id
      return acc
    },
    {} as Record<Sport['name'], Sport['id']>,
  )

  // get field types
  const fieldTypes = await payload.find({
    collection: 'field_types',
    limit: 100,
    locale: 'en',
  })
  const fieldTypeMap = fieldTypes.docs.reduce(
    (acc, fieldType) => {
      acc[fieldType.name] = fieldType.id
      return acc
    },
    {} as Record<FieldType['name'], FieldType['id']>,
  )

  // get field flooring
  const fieldFlooring = await payload.find({
    collection: 'field_flooring',
    limit: 100,
    locale: 'en',
  })
  const fieldFlooringMap = fieldFlooring.docs.reduce(
    (acc, fieldFlooring) => {
      acc[fieldFlooring.name] = fieldFlooring.id
      return acc
    },
    {} as Record<FieldFlooring['name'], FieldFlooring['id']>,
  )

  // get field amenities
  const fieldAmenities = await payload.find({
    collection: 'field_amenities',
    limit: 100,
    locale: 'en',
  })
  const fieldAmenityMap = fieldAmenities.docs.reduce(
    (acc, fieldAmenity) => {
      acc[fieldAmenity.name] = fieldAmenity.id
      return acc
    },
    {} as Record<FieldAmenity['name'], FieldAmenity['id']>,
  )
  const fields = [
    // Soccer fields
    {
      pt: {
        name: 'Campo de Futebol Parque das Nações',
        address: 'Rua do Parque das Nações 123, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Natural grass'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
        ],
      },
      en: {
        name: 'Parque das Nações Football Field',
        address: 'Rua do Parque das Nações 123, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Natural grass'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
        ],
      },
    },
    {
      pt: {
        name: 'Arena Indoor Benfica',
        address: 'Avenida Lusíada 456, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Cafe'],
        ],
      },
      en: {
        name: 'Benfica Indoor Arena',
        address: 'Avenida Lusíada 456, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Cafe'],
        ],
      },
    },
    {
      pt: {
        name: 'Complexo Desportivo do Porto',
        address: 'Rua do Dragão 789, Porto',
        type: fieldTypeMap['Hybrid'],
        flooring: fieldFlooringMap['Hybrid turf'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
        ],
      },
      en: {
        name: 'Porto Sports Complex',
        address: 'Rua do Dragão 789, Porto',
        type: fieldTypeMap['Hybrid'],
        flooring: fieldFlooringMap['Hybrid turf'],
        sport: sportMap['Soccer'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
        ],
      },
    },

    // Tennis courts
    {
      pt: {
        name: 'Clube de Ténis de Lisboa',
        address: 'Avenida da Liberdade 321, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Hard court'],
        sport: sportMap['Tennis'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Water fountain'],
        ],
      },
      en: {
        name: 'Lisbon Tennis Club',
        address: 'Avenida da Liberdade 321, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Hard court'],
        sport: sportMap['Tennis'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Water fountain'],
        ],
      },
    },

    // Padel courts
    {
      pt: {
        name: 'Padel Belém',
        address: 'Rua de Belém 987, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Padel'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Seating area'],
        ],
      },
      en: {
        name: 'Padel Belém',
        address: 'Rua de Belém 987, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Padel'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Seating area'],
        ],
      },
    },
    {
      pt: {
        name: 'Clube Padel Porto',
        address: 'Rua Santa Catarina 147, Porto',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Padel'],
      },
      en: {
        name: 'Porto Padel Club',
        address: 'Rua Santa Catarina 147, Porto',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Padel'],
      },
    },

    // Basketball courts
    {
      pt: {
        name: 'Pavilhão do Sporting',
        address: 'Rua do Sporting 258, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Wood'],
        sport: sportMap['Basketball'],
        amenities: [
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Scoreboard'],
          fieldAmenityMap['Lighting'],
        ],
      },
      en: {
        name: 'Sporting Pavilion',
        address: 'Rua do Sporting 258, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Wood'],
        sport: sportMap['Basketball'],
        amenities: [
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Scoreboard'],
          fieldAmenityMap['Lighting'],
        ],
      },
    },
    {
      pt: {
        name: 'Campo de Basquete Ribeira',
        address: 'Rua da Ribeira 369, Porto',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Concrete'],
        sport: sportMap['Basketball'],
      },
      en: {
        name: 'Ribeira Basketball Court',
        address: 'Rua da Ribeira 369, Porto',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Concrete'],
        sport: sportMap['Basketball'],
      },
    },

    // Multi-purpose facilities
    {
      pt: {
        name: 'Centro Desportivo Municipal',
        address: 'Avenida de Lisboa 741, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Polyurethane'],
        sport: sportMap['Multi-purpose'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
      en: {
        name: 'Municipal Sports Center',
        address: 'Avenida de Lisboa 741, Lisboa',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Polyurethane'],
        sport: sportMap['Multi-purpose'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
    },
    {
      pt: {
        name: 'Parque Desportivo do Porto',
        address: 'Rua do Porto 852, Porto',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Multi-purpose'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
      en: {
        name: 'Porto Sports Park',
        address: 'Rua do Porto 852, Porto',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Multi-purpose'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
    },

    // Volleyball courts
    {
      pt: {
        name: 'Arena Voleibol Cascais',
        address: 'Avenida Marginal 963, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Sand'],
        sport: sportMap['Volleyball'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
      en: {
        name: 'Cascais Volleyball Arena',
        address: 'Avenida Marginal 963, Lisboa',
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Sand'],
        sport: sportMap['Volleyball'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
    },
    {
      pt: {
        name: 'Centro de Voleibol do Porto',
        address: 'Rua dos Clérigos 159, Porto',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Wood'],
        sport: sportMap['Volleyball'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
      en: {
        name: 'Porto Volleyball Center',
        address: 'Rua dos Clérigos 159, Porto',
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Wood'],
        sport: sportMap['Volleyball'],
        amenities: [
          fieldAmenityMap['Parking'],
          fieldAmenityMap['Restrooms'],
          fieldAmenityMap['Changing rooms'],
          fieldAmenityMap['Showers'],
          fieldAmenityMap['Equipment rental'],
          fieldAmenityMap['Lockers'],
          fieldAmenityMap['Water fountain'],
          fieldAmenityMap['Cafe'],
          fieldAmenityMap['Seating area'],
          fieldAmenityMap['First aid station'],
          fieldAmenityMap['WiFi'],
          fieldAmenityMap['Lighting'],
          fieldAmenityMap['Scoreboard'],
        ],
      },
    },
  ] satisfies SeedEntry<FieldSeed>[]

  try {
    for (const field of fields) {
      const createdField = await payload.create({
        collection: 'fields',
        data: field.pt,
        locale: 'pt',
      })

      await payload.update({
        collection: 'fields',
        id: createdField.id,
        data: field.en,
        locale: 'en',
      })
    }
    console.log('✅ Fields seeded successfully')
  } catch (error) {
    console.error('Error seeding fields:', error)
  }
}
