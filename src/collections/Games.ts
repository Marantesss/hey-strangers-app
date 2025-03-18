import { CollectionConfig } from 'payload'

const sportTypes = ['soccer', 'padel', 'tennis', 'basketball', 'volleyball'] as const

export const Games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
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
    {
      name: 'sport',
      type: 'select',
      required: true,
      options: sportTypes.map(type => ({
        label: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: type,
      })),
    },
    {
      name: 'field',
      type: 'relationship',
      relationTo: 'fields',
      required: true,
    },
    {
      name: 'deletedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
} 