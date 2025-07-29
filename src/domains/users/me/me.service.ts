'use server'

import { User } from '@/payload-types'
import { headers, cookies } from 'next/headers'
import { getPayload } from 'payload'
import { jwtVerify } from 'jose'
import config from '@payload-config'
import { authLogger } from '@/lib/auth-logger'

export async function getMe(): Promise<User | null> {
  const payload = await getPayload({ config })
  const _headers = await headers()

  try {
    // Tentar o método padrão primeiro
    authLogger.debug('Tentando payload.auth() com headers originais')
    const { user: authUser } = await payload.auth({ headers: _headers })

    if (authUser?.collection === 'admins') {
      authLogger.debug('Utilizador é admin, retornando null')
      return null
    }

    if (authUser) {
      authLogger.success('payload.auth() funcionou normalmente')
      return authUser
    }

    // Se payload.auth() falhou, tentar com headers limpos
    authLogger.warning('payload.auth() falhou, tentando com headers limpos')

    const cleanHeaders = new Headers()

    // Copiar apenas os headers necessários, excluindo os problemáticos
    _headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase()

      // Excluir headers que podem causar problemas
      if (
        !lowerKey.includes('x-forwarded-proto') &&
        !lowerKey.includes('x-forwarded-host') &&
        !lowerKey.includes('x-forwarded-for')
      ) {
        cleanHeaders.set(key, value)
      }
    })

    authLogger.verbose('Headers limpos criados, excluindo x-forwarded-*')

    // Tentar novamente com headers limpos
    const { user: cleanAuthUser } = await payload.auth({ headers: cleanHeaders })

    if (cleanAuthUser?.collection === 'admins') {
      authLogger.debug('Utilizador (headers limpos) é admin, retornando null')
      return null
    }

    if (cleanAuthUser) {
      authLogger.success('payload.auth() funcionou com headers limpos')
      return cleanAuthUser
    }

    // Se ainda assim falhou, usar verificação manual do JWT
    authLogger.warning('payload.auth() ainda falhou, usando verificação manual')

    const cookieStore = await cookies()
    const authCookieName = `${payload.config.cookiePrefix}-token`
    const authCookie = cookieStore.get(authCookieName)

    if (!authCookie) {
      authLogger.error('Cookie de autenticação não encontrado')
      return null
    }

    authLogger.verbose(`Cookie encontrado: ${authCookie.name} (${authCookie.value.length} chars)`)

    // Verificar JWT manualmente
    const secretKey = new TextEncoder().encode(payload.secret)
    const { payload: jwtPayload } = await jwtVerify(authCookie.value, secretKey)

    // Verificar se o token expirou
    if ((jwtPayload.exp as number) * 1000 < Date.now()) {
      authLogger.error('JWT expirado')
      return null
    }

    // Verificar se é da coleção users
    if (jwtPayload.collection !== 'users') {
      authLogger.error(`JWT não é da coleção users: ${jwtPayload.collection}`)
      return null
    }

    // Buscar o utilizador pela ID do JWT
    const userId = jwtPayload.id as string
    authLogger.debug(`Buscando utilizador manualmente com ID: ${userId}`)

    const foundUser = await payload.findByID({
      collection: 'users',
      id: userId,
    })

    if (foundUser) {
      authLogger.success('Utilizador encontrado via verificação manual')
      return foundUser
    }

    authLogger.error('Utilizador não encontrado na base de dados')
    return null
  } catch (error) {
    authLogger.error(
      'Erro na autenticação',
      error instanceof Error ? error : new Error(String(error)),
    )
    return null
  }
}
