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
      access: {
        read: hasRole('admins'),
        update: () => false,
      },
      admin: {
        readOnly: true,
      },
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
    {
      name: 'isGuest',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If true, then the paying user was a guest and was invited by another user',
      },
    },
    // --- relations and joins
    {
      name: 'game',
      type: 'join',
      collection: 'games',
      on: 'registrations',
      hasMany: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
  ],
}
