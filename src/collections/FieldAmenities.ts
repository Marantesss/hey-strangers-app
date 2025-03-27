import { CollectionConfig } from 'payload'

export const FieldAmenities: CollectionConfig = {
  slug: 'field_amenities',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
