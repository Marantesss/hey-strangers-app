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
    {
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
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
  ],
}
