'use server'

import { getPayload } from 'payload'
import { cookies, headers } from 'next/headers'
import { jwtVerify } from 'jose'
import config from '@payload-config'
import { authLogger, isAuthDebugEnabled } from '@/lib/auth-logger'

/**
 * Função específica para debuggar o payload.auth()
 */
export async function debugPayloadAuth() {
  if (!isAuthDebugEnabled()) return

  authLogger.section('DEBUG PAYLOAD AUTH ESPECÍFICO')

  const payload = await getPayload({ config })
  const _headers = await headers()
  const cookieStore = await cookies()

  // 1. Ver exatamente o que está nos headers
  const headerEntries = Object.fromEntries(_headers.entries())
  authLogger.section('1. HEADERS COMPLETOS')
  Object.entries(headerEntries).forEach(([key, value]) => {
    if (key.toLowerCase().includes('cookie') || key.toLowerCase().includes('auth')) {
      authLogger.detail(key, value)
    }
  })

  // 2. Ver cookies individualmente
  const allCookies = cookieStore.getAll()
  authLogger.section('2. TODOS OS COOKIES')
  allCookies.forEach((cookie) => {
    authLogger.detail(cookie.name, `${cookie.value.substring(0, 20)}...`)
  })

  // 3. Testar diferentes formas de passar headers para payload.auth()
  authLogger.section('3. TESTANDO DIFERENTES MÉTODOS DE AUTH')

  // Método 1: Headers diretos (atual)
  try {
    authLogger.debug('Testando: payload.auth({ headers: _headers })')
    const result1 = await payload.auth({ headers: _headers })
    authLogger.detail('✅ Sucesso', `${!!result1.user} | Collection: ${result1.user?.collection}`)
  } catch (error) {
    authLogger.detail('❌ Erro', error instanceof Error ? error.message : String(error))
  }

  // Método 2: Criar Headers object manualmente
  try {
    const authCookieName = `${payload.config.cookiePrefix}-token`
    const authCookie = cookieStore.get(authCookieName)

    if (authCookie) {
      authLogger.debug('Testando: Headers object manual')
      const manualHeaders = new Headers()
      manualHeaders.set('cookie', `${authCookie.name}=${authCookie.value}`)
      manualHeaders.set('content-type', 'application/json')
      manualHeaders.set('host', headerEntries.host || 'localhost:3000')

      const result3 = await payload.auth({ headers: manualHeaders })
      authLogger.detail('✅ Sucesso', `${!!result3.user} | Collection: ${result3.user?.collection}`)
    }
  } catch (error) {
    authLogger.detail('❌ Erro', error instanceof Error ? error.message : String(error))
  }

  // 4. Verificar se é problema de protocolo (HTTP vs HTTPS)
  authLogger.section('4. VERIFICANDO PROTOCOLO')
  authLogger.detail('Host', headerEntries.host)
  authLogger.detail('X-Forwarded-Proto', headerEntries['x-forwarded-proto'])
  authLogger.detail('X-Forwarded-Host', headerEntries['x-forwarded-host'])
  authLogger.detail('Referer', headerEntries.referer)

  // 5. Testar sem header X-Forwarded-Proto
  authLogger.section('5. TESTANDO SEM X-FORWARDED-PROTO')
  try {
    const cleanHeaders = new Headers()

    // Copiar todos os headers exceto os problemáticos
    _headers.forEach((value, key) => {
      if (!key.toLowerCase().includes('x-forwarded-proto')) {
        cleanHeaders.set(key, value)
      }
    })

    const result4 = await payload.auth({ headers: cleanHeaders })
    authLogger.detail(
      '✅ Sucesso sem X-Forwarded-Proto',
      `${!!result4.user} | Collection: ${result4.user?.collection}`,
    )
  } catch (error) {
    authLogger.detail('❌ Erro', error instanceof Error ? error.message : String(error))
  }

  authLogger.section('FIM DEBUG PAYLOAD AUTH')
}

/**
 * Função de debug para investigar problemas de autenticação
 */
export async function debugAuth() {
  if (!isAuthDebugEnabled()) return

  authLogger.section('COMPREHENSIVE AUTH DEBUG')

  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const _headers = await headers()

  // 1. Verificar configuração básica
  authLogger.section('1. CONFIGURATION')
  authLogger.detail('cookiePrefix', payload.config.cookiePrefix)
  authLogger.detail('secret length', payload.secret?.length || 0)
  authLogger.detail('NODE_ENV', process.env.NODE_ENV)
  authLogger.detail('isDev', process.env.NODE_ENV === 'development')

  // 2. Verificar coleção de users
  const usersCollection = payload.collections.users?.config
  authLogger.section('2. USERS COLLECTION CONFIG')
  authLogger.detail('auth enabled', !!usersCollection?.auth)
  authLogger.detail('auth strategy disabled', usersCollection?.auth?.disableLocalStrategy)
  authLogger.detail('token expiration', usersCollection?.auth?.tokenExpiration)
  authLogger.detail('cookie domain', usersCollection?.auth?.cookies?.domain)
  authLogger.detail('cookie secure', usersCollection?.auth?.cookies?.secure)
  authLogger.detail('cookie sameSite', usersCollection?.auth?.cookies?.sameSite)

  // 3. Verificar cookies
  const authCookieName = `${payload.config.cookiePrefix}-token`
  const authCookie = cookieStore.get(authCookieName)

  authLogger.section('3. COOKIES')
  authLogger.detail('Expected cookie name', authCookieName)
  authLogger.detail('Auth cookie exists', !!authCookie)

  if (authCookie) {
    authLogger.detail('Auth cookie value length', authCookie.value.length)
    authLogger.detail('Cookie name', authCookie.name)
    authLogger.detail('Cookie value preview', authCookie.value.substring(0, 20) + '...')

    // 4. Tentar verificar JWT manualmente
    authLogger.section('4. JWT VERIFICATION')
    try {
      const secretKey = new TextEncoder().encode(payload.secret)
      const { payload: jwtPayload } = await jwtVerify(authCookie.value, secretKey)
      authLogger.detail('JWT valid', true)
      authLogger.detail('JWT collection', jwtPayload.collection)
      authLogger.detail('JWT id', jwtPayload.id)
      authLogger.detail('JWT exp', new Date((jwtPayload.exp as number) * 1000))
      authLogger.detail('JWT expired', (jwtPayload.exp as number) * 1000 < Date.now())
    } catch (jwtError) {
      authLogger.detail(
        'JWT verification failed',
        jwtError instanceof Error ? jwtError.message : String(jwtError),
      )
    }
  }

  // 5. Verificar headers
  authLogger.section('5. HEADERS')
  const headerEntries = Object.fromEntries(_headers.entries())
  authLogger.detail('Cookie header present', !!headerEntries['cookie'])
  authLogger.detail(
    'Cookie header contains auth',
    headerEntries['cookie']?.includes(authCookieName) || false,
  )
  authLogger.detail('User-Agent', headerEntries['user-agent']?.substring(0, 50) + '...')
  authLogger.detail('Host', headerEntries['host'])
  authLogger.detail('X-Forwarded-Proto', headerEntries['x-forwarded-proto'])

  // 6. Testar payload.auth()
  authLogger.section('6. PAYLOAD AUTH TEST')
  try {
    const authResult = await payload.auth({ headers: _headers })
    authLogger.detail('Auth successful', !!authResult.user)
    authLogger.detail('User collection', authResult.user?.collection)
    authLogger.detail('User ID', authResult.user?.id)
  } catch (authError) {
    authLogger.detail(
      'Auth error',
      authError instanceof Error ? authError.message : String(authError),
    )
    if (authError instanceof Error && authError.stack) {
      authLogger.detail('Auth error stack', authError.stack.split('\n')[0])
    }
  }

  authLogger.section('END DEBUG')

  // Chamar o debug específico do payload.auth()
  await debugPayloadAuth()
}

/**
 * Função para verificar se um token JWT específico é válido
 */
export async function verifyTokenManually(token: string) {
  const payload = await getPayload({ config })

  try {
    const secretKey = new TextEncoder().encode(payload.secret)
    const { payload: jwtPayload } = await jwtVerify(token, secretKey)

    return {
      valid: true,
      payload: jwtPayload,
      expired: (jwtPayload.exp as number) * 1000 < Date.now(),
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
