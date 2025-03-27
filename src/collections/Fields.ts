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
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'field_types',
      required: true,
    },
    {
      name: 'flooring',
      type: 'relationship',
      relationTo: 'field_flooring',
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
      relationTo: 'field_amenities',
      hasMany: true,
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
