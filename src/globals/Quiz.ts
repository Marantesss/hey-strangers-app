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
  ],
}
