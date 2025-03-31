import { hasRole, isAuthenticated } from '@/access'
import createPaymentIntentEndpoint from '@/domains/games/create-payment-intent/create-payment-intent.endpoint'
import inviteForGameEndpoint from '@/domains/games/invite-for-game/invite-for-game.endpoint'
import {
  createStripeProduct,
  deleteStripeProduct,
  updateStripeProduct,
} from '@/domains/games/sync-stripe-product/sync-stripe-product.hooks'
import { CollectionConfig } from 'payload'

export const Games: CollectionConfig = {
  slug: 'games',
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
      admin: {
        description:
          "The game's name will never be shown to the user, it is only used to identify the game on the back office",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startsAt',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'endsAt',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'maxPlayers',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'stripeProductId',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        readOnly: true,
      },
      access: {
        read: hasRole('admins'),
        update: () => false,
      },
    },
    // --- relations and joins
    {
      type: 'row',
      fields: [
        {
          name: 'sport',
          type: 'relationship',
          relationTo: 'sports',
          required: true,
        },
        {
          name: 'field',
          type: 'relationship',
          relationTo: 'fields',
          required: true,
        },
      ],
    },
    {
      name: 'registrations',
      type: 'relationship',
      relationTo: 'registrations',
      hasMany: true,
    },
  ],
  hooks: {
    beforeChange: [createStripeProduct, updateStripeProduct],
    afterDelete: [deleteStripeProduct],
  },
  endpoints: [createPaymentIntentEndpoint, inviteForGameEndpoint],
}
