import { GlobalConfig } from 'payload'

export const Quiz: GlobalConfig = {
  slug: 'quiz',
  fields: [
    {
      name: 'sports',
      type: 'array',
      required: true,
      admin: {
        description: 'These are the sports that will be cycled through in the quiz',
      },
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
      admin: {
        description: 'These are the questions that will be asked during the quiz',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                width: '20%',
                description: 'This key identifies the question and must be unique for each one',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                width: '40%',
                description: 'The title of the question',
              },
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              admin: {
                width: '40%',
                description: 'Shows a short note below the options',
              },
            },
          ],
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'If disabled, the option will not be shown as disabled',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    width: '67%',
                    description: 'The text that will be shown to the user',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '33%',
                    description:
                      'This is the value that will be returned if the option is selected. For each question, this value must be unique.',
                  },
                },
              ],
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
          admin: {
            description:
              "The game's name will never be shown to the user, it is only used to identify the game on the back office",
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
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
                width: '50%',
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
                width: '50%',
                date: {
                  pickerAppearance: 'timeOnly',
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
              admin: {
                width: '50%',
              },
            },
            {
              name: 'maxPlayers',
              type: 'number',
              required: true,
              min: 1,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'sport',
              type: 'relationship',
              relationTo: 'sports',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'field',
              type: 'relationship',
              relationTo: 'fields',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
