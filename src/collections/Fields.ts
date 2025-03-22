import { hasRole, isAuthenticated } from '@/access'
import { CollectionConfig } from 'payload'

const fieldTypes = ['indoor', 'outdoor', 'hybrid', 'other'] as const

const flooringTypes = [
  'natural_grass',
  'artificial_turf',
  'hybrid_turf',
  'clay',
  'hard_court',
  'rubber',
  'polyurethane',
  'wood',
  'sand',
  'concrete',
  'other',
] as const

const sportTypes = [
  'soccer',
  'padel',
  'tennis',
  'basketball',
  'volleyball',
  'multi_purpose',
  'other',
] as const

const amenityTypes = [
  'parking',
  'restrooms',
  'changing_rooms',
  'showers',
  'equipment_rental',
  'lockers',
  'storage_space',
  'water_fountain',
  'vending_machines',
  'cafe',
  'seating_area',
  'first_aid_station',
  'wifi',
  'lighting',
  'scoreboard',
] as const

export const Fields: CollectionConfig = {
  slug: 'fields',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAuthenticated(),
    create: hasRole('admins'),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  fields: [
    // --- FIELDS
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: fieldTypes.map((type) => ({
        label: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: type,
      })),
    },
    {
      name: 'flooring',
      type: 'select',
      required: true,
      options: flooringTypes.map((type) => ({
        label: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: type,
      })),
    },
    {
      name: 'sport',
      type: 'select',
      required: true,
      options: sportTypes.map((type) => ({
        label: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: type,
      })),
    },
    {
      name: 'amenities',
      type: 'select',
      hasMany: true,
      options: amenityTypes.map((type) => ({
        label: type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: type,
      })),
    },
    // --- relations and joins
    {
      name: 'games',
      type: 'join',
      collection: 'games',
      on: 'field',
      hasMany: true,
    },
  ],
}
