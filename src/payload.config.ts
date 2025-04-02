import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { GenerateURL } from 'node_modules/@payloadcms/plugin-seo/dist/types'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { migrations } from './database/migrations'
import localization from './i18n/localizations'

import {
  Users,
  Fields,
  FieldTypes,
  FieldFlooring,
  FieldAmenities,
  Games,
  Registrations,
  Admins,
  Media,
  Sports,
  Invites,
  Cities,
} from './collections'
import { Home, Footer, Quiz, Pages } from './globals'
import { seedHome } from './database/seed/home'
import { seedFooter } from './database/seed/footer'
import { seedQuiz } from './database/seed/quiz'
import { seedPages } from './database/seed/pages'
import { Home as HomeType, Page as PageType } from './payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isDev = process.env.NODE_ENV === 'development'

const generateURL: GenerateURL<HomeType | PageType> = ({ doc, globalSlug }) => {
  if (globalSlug === 'pages') {
    return process.env.NEXT_PUBLIC_APP_URL!
  }

  return process.env.NEXT_PUBLIC_APP_URL!
}

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Media,
    Admins,
    Users,
    Sports,
    FieldTypes,
    FieldFlooring,
    FieldAmenities,
    Fields,
    Games,
    Registrations,
    Invites,
    Cities,
  ],
  globals: [Home, Footer, Quiz, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: isDev,
    idType: 'uuid',
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'database/migrations'),
  }),
  localization,
  debug: isDev,
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
    seoPlugin({
      generateURL,
    }),
  ],
  onInit: async (payload) => {
    const home = await payload.findGlobal({ slug: 'home' })
    if (!home.createdAt) {
      await seedHome(payload)
    }

    const footer = await payload.findGlobal({ slug: 'footer' })
    if (!footer.createdAt) {
      await seedFooter(payload)
    }

    const quiz = await payload.findGlobal({ slug: 'quiz' })
    if (!quiz.createdAt) {
      await seedQuiz(payload)
    }

    const pages = await payload.findGlobal({ slug: 'pages' })
    if (!pages.createdAt) {
      await seedPages(payload)
    }
  },
})
