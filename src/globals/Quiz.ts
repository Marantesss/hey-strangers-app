import { GlobalConfig } from 'payload'

export const Quiz: GlobalConfig = {
  slug: 'quiz',
  fields: [
    {
      name: 'sports',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'dummyGameResults',
      type: 'array',
      admin: {
        description:
          'These are the results that will be shown to the user after they have answered the quiz',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'startsAt',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
            },
          },
        },
        {
          name: 'endsAt',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
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
  ],
}
