import { hasRole, isAuthenticated } from '@/access'
import { CollectionConfig } from 'payload'

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
      localized: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    // --- relations and joins
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      required: true,
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'fieldTypes',
      required: true,
    },
    {
      name: 'flooring',
      type: 'relationship',
      relationTo: 'fieldFloorings',
      required: true,
    },
    {
      name: 'sport',
      type: 'relationship',
      relationTo: 'sports',
      required: true,
    },
    {
      name: 'amenities',
      type: 'relationship',
      relationTo: 'fieldAmenities',
      hasMany: true,
    },
    {
      name: 'games',
      type: 'join',
      collection: 'games',
      on: 'field',
      hasMany: true,
    },
  ],
}
