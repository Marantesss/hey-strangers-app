import { CollectionConfig } from 'payload'

export const FieldTypes: CollectionConfig = {
  slug: 'field_types',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
