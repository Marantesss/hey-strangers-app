import { hasRole, isAuthenticated } from '@/access'
import { CollectionConfig } from 'payload'

export const Invites: CollectionConfig = {
  slug: 'invites',
  access: {
    read: isAuthenticated(),
    create: isAuthenticated(),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  fields: [
    // --- FIELDS
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'game',
      type: 'relationship',
      relationTo: 'games',
      required: true,
    },
  ],
}
