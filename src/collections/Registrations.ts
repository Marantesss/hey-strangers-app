import { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['game', 'user'],
  },
  fields: [
    // --- FIELDS
    {
      name: 'deletedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    // --- relations and joins
    {
      name: 'game',
      type: 'relationship',
      relationTo: 'games',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
