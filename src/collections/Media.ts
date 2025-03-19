import type { CollectionConfig } from 'payload'
import { randomBytes } from 'crypto'

const HASH_LENGTH = 8

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  hooks: {
    beforeOperation: [
      // hash the filename before creating the media
      async ({ operation, req }) => {
        if (!(operation === 'create' || operation === 'update')) return

        if (!req.file) throw new Error('Request file is required')

        // create random hash to concatenate to filename
        const hash = randomBytes(HASH_LENGTH).toString('hex')

        // update filename with hash before the extension
        // ie. filename: 'test.png' -> 'test.hash.png'
        const filenameParts = req.file.name.split('.')
        const extension = filenameParts.pop()
        const filenameWithoutExtension = filenameParts.join('.')
        req.file.name = `${filenameWithoutExtension}.${hash}.${extension}`
      },
    ],
  },
}
