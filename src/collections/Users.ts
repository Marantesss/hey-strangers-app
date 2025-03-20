import {
  createStripeCustomer,
  updateStripeCustomer,
} from '@/domains/users/upsert-stripe-customer/upsert-stripe-customer.hooks'
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    disableLocalStrategy: true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    // --- FIELDS
    {
      name: 'email',
      type: 'email',
      required: false,
      unique: true,
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'otp',
      type: 'group',
      fields: [
        {
          name: 'code',
          type: 'text',
        },
        {
          name: 'expiration',
          type: 'date',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeChange: [
          // remove whitespaces
          ({ value }) => value.replace(/\s/g, ''),
        ],
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'deletedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    // --- relations and joins
    {
      name: 'registrations',
      type: 'join',
      collection: 'registrations',
      on: 'user',
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [createStripeCustomer, updateStripeCustomer],
  },
}
