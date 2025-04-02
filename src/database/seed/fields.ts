import { Payload } from 'payload'
import { City, Field, FieldAmenity, FieldFlooring, FieldType, Sport } from '@payload-types'

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

  // get cities
  const cities = await payload.find({
    collection: 'cities',
    limit: 100,
    locale: 'en',
  })
  const cityMap = cities.docs.reduce(
    (acc, city) => {
      acc[city.name] = city.id
      return acc
    },
    {} as Record<City['name'], City['id']>,
  )

  // get field types
  const fieldTypes = await payload.find({
    collection: 'fieldTypes',
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
    collection: 'fieldFloorings',
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
    collection: 'fieldAmenities',
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
        address: 'Rua do Parque das Nações 123',
        city: cityMap['Lisbon'],
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
      en: { name: 'Parque das Nações Football Field' },
    },
    {
      pt: {
        name: 'Arena Indoor Benfica',
        address: 'Avenida Lusíada 456',
        city: cityMap['Lisbon'],
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
      en: { name: 'Benfica Indoor Arena' },
    },
    {
      pt: {
        name: 'Complexo Desportivo do Porto',
        address: 'Rua do Dragão 789',
        city: cityMap['Porto'],
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
      en: { name: 'Porto Sports Complex' },
    },

    // Tennis courts
    {
      pt: {
        name: 'Clube de Ténis de Lisboa',
        address: 'Avenida da Liberdade 321',
        city: cityMap['Lisbon'],
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
      en: { name: 'Lisbon Tennis Club' },
    },

    // Padel courts
    {
      pt: {
        name: 'Padel Belém',
        address: 'Rua de Belém 987',
        city: cityMap['Lisbon'],
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
      en: { name: 'Padel Belém' },
    },
    {
      pt: {
        name: 'Clube Padel Porto',
        address: 'Rua Santa Catarina 147',
        city: cityMap['Porto'],
        type: fieldTypeMap['Indoor'],
        flooring: fieldFlooringMap['Artificial turf'],
        sport: sportMap['Padel'],
      },
      en: { name: 'Porto Padel Club' },
    },

    // Basketball courts
    {
      pt: {
        name: 'Pavilhão do Sporting',
        address: 'Rua do Sporting 258',
        city: cityMap['Lisbon'],
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
      en: { name: 'Sporting Pavilion' },
    },
    {
      pt: {
        name: 'Campo de Basquete Ribeira',
        address: 'Rua da Ribeira 369',
        city: cityMap['Porto'],
        type: fieldTypeMap['Outdoor'],
        flooring: fieldFlooringMap['Concrete'],
        sport: sportMap['Basketball'],
      },
      en: { name: 'Ribeira Basketball Court' },
    },

    // Multi-purpose facilities
    {
      pt: {
        name: 'Centro Desportivo Municipal',
        address: 'Avenida de Lisboa 741',
        city: cityMap['Lisbon'],
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
      en: { name: 'Municipal Sports Center' },
    },
    {
      pt: {
        name: 'Parque Desportivo do Porto',
        address: 'Rua do Porto 852',
        city: cityMap['Porto'],
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
      en: { name: 'Porto Sports Park' },
    },

    // Volleyball courts
    {
      pt: {
        name: 'Arena Voleibol Cascais',
        address: 'Avenida Marginal 963',
        city: cityMap['Lisbon'],
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
      en: { name: 'Cascais Volleyball Arena' },
    },
    {
      pt: {
        name: 'Centro de Voleibol do Porto',
        address: 'Rua dos Clérigos 159',
        city: cityMap['Porto'],
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
      en: { name: 'Porto Volleyball Center' },
    },
  ]

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
