import { hasRole } from '@/access'
import { CollectionConfig } from 'payload'

export const FieldFlooring: CollectionConfig = {
  slug: 'fieldFloorings',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: hasRole('admins'),
    update: hasRole('admins'),
    delete: hasRole('admins'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
