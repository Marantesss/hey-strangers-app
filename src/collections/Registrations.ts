import { hasRole, isAuthenticated } from '@/access'
import { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['game', 'user'],
  },
  access: {
    read: isAuthenticated(),
    create: isAuthenticated(),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  fields: [
    // --- FIELDS
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'isMainRegistration',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'If true, the user was the one who registered for the game and made the reservation',
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
