import {
  type RequiredDataFromCollectionSlug,
  type CollectionSlug,
  type DataFromCollectionSlug,
  type PaginatedDocs,
} from 'payload'

import { type User } from '@payload-types'

/* FIND */
export type FindResponse<T extends CollectionSlug> = PaginatedDocs<DataFromCollectionSlug<T>>

export type FindByIdResponse<T extends CollectionSlug> = DataFromCollectionSlug<T>

/* CREATE */
export type CreateBody<T extends CollectionSlug> = Omit<
  RequiredDataFromCollectionSlug<T>,
  'id' | 'createdAt' | 'updatedAt'
>
export interface CreateResponse<T extends CollectionSlug> {
  message: string
  doc: DataFromCollectionSlug<T>
}

/* UPDATE */
export type UpdateBody<T extends CollectionSlug> = Partial<CreateBody<T>>

export interface UpdateByIDResponse<T extends CollectionSlug> {
  message: string
  doc: DataFromCollectionSlug<T>
}

/* /me */
export interface MeAuthenticatedResponse {
  user: User
  collection: 'users'
  token: string
  exp: number
}

export interface MeUnauthenticatedResponse {
  user: null
  message: string
}
