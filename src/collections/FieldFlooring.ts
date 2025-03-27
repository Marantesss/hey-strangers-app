import { CollectionConfig } from 'payload'

export const FieldFlooring: CollectionConfig = {
  slug: 'field_flooring',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
