import { type CollectionSlug } from 'payload'
import { stringify } from 'qs'

import {
  type FindResponse,
  type UpdateByIDResponse,
  type MeUnauthenticatedResponse,
  type MeAuthenticatedResponse,
  type UpdateBody,
  type CreateResponse,
  type CreateBody,
  FindByIdResponse,
} from './types'

const API_URL = process.env.NEXT_PUBLIC_APP_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set')
}
export class ApiError extends Error {
  res: unknown

  constructor(message: string, res: unknown) {
    super(message)
    this.res = res
  }
}

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
  cookie?: string
  // TODO, we could probably type this
  query?: Record<string, any>
  cache?: RequestCache
  next?: NextFetchRequestConfig
  signal?: AbortSignal
}

// Create a separate function for getting server-side cookies that can be imported where needed
function getServerCookies() {
  if (typeof window !== 'undefined') return ''

  // Dynamic import next/headers only on server-side
  return import('next/headers').then(async ({ cookies }) => {
    try {
      const cookieStore = await cookies()
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ')
    } catch (error) {
      console.error('Failed to access cookies:', error)
      return ''
    }
  })
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    cookie,
    query,
    cache = 'no-store',
    next,
    signal,
  } = options

  // Get cookies from the request when running on server
  let cookieHeader = cookie
  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies()
  }

  const queryString = stringify(query, { addQueryPrefix: true })

  const fullUrl = `${API_URL}/${url}${queryString}`

  const isFormData = body instanceof FormData
  const finalBody = isFormData ? body : !!body ? JSON.stringify(body) : undefined

  const response = await fetch(fullUrl, {
    ...(signal ? { signal } : {}),
    method,
    headers: {
      // only set Content-Type for non-FormData requests if there is a body
      ...(!finalBody || isFormData ? {} : { 'Content-Type': 'application/json' }),
      Accept: 'application/json',
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: finalBody,
    credentials: 'include',
    cache,
    next,
  })

  const json = await response.json()

  if (!response.ok) {
    throw new ApiError('Request failed', json)
  }

  return json as T
}

const api = {
  /**
   * Payload operations
   */
  find<T extends CollectionSlug>(collection: T, options?: RequestOptions) {
    return fetchApi<FindResponse<T>>(`api/${collection}`, { ...options, method: 'GET' })
  },
  findById<T extends CollectionSlug>(collection: T, id: string, options?: RequestOptions) {
    return fetchApi<FindByIdResponse<T>>(`api/${collection}/${id}`, { ...options, method: 'GET' })
  },
  create<T extends CollectionSlug>(collection: T, data: CreateBody<T>, options?: RequestOptions) {
    return fetchApi<CreateResponse<T>>(`api/${collection}`, {
      ...options,
      method: 'POST',
      body: data,
    })
  },
  updateById<T extends CollectionSlug>(
    collection: T,
    id: string,
    data: UpdateBody<T>,
    options?: RequestOptions,
  ) {
    return fetchApi<UpdateByIDResponse<T>>(`api/${collection}/${id}`, {
      ...options,
      method: 'PATCH',
      body: data,
    })
  },
  upload<T extends CollectionSlug>(collection: T, data: FormData, options?: RequestOptions) {
    return fetchApi<CreateResponse<T>>(`api/${collection}`, {
      ...options,
      method: 'POST',
      body: data,
    })
  },
  /**
   * ====================
   * Auth methods
   * ====================
   */
  me<T extends CollectionSlug>(collection: T, options?: RequestOptions) {
    return fetchApi<MeAuthenticatedResponse | MeUnauthenticatedResponse>(`api/${collection}/me`, {
      ...options,
      method: 'GET',
    })
  },
  /**
   * ====================
   * regular HTTP methods
   * ====================
   */
  post<Response>(url: string, data?: unknown, options?: RequestOptions) {
    return fetchApi<Response>(`api/${url}`, { ...options, method: 'POST', body: data })
  },
  patch<Response>(url: string, data: unknown, options?: RequestOptions) {
    return fetchApi<Response>(`api/${url}`, { ...options, method: 'PATCH', body: data })
  },
  put<Response>(url: string, data: unknown, options?: RequestOptions) {
    return fetchApi<Response>(`api/${url}`, { ...options, method: 'PUT', body: data })
  },
  get<Response>(url: string, options?: RequestOptions) {
    return fetchApi<Response>(`api/${url}`, { ...options, method: 'GET' })
  },
}

export default api
