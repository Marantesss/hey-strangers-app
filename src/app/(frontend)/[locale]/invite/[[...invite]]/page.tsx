import { getGameById } from '@/domains/games/get-game-by-id/get-game-by-id.service'
import RegisterForGameSheet from '@/domains/registrations/register-for-game/components/RegisterForGameSheet'
import RegisterForGameProvider from '@/domains/registrations/register-for-game/providers/RegisterForGameProvider'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TypedLocale } from 'payload'
import InviteClientPage from './page.client'
import getInviteByGameAndUser from '@/domains/invites/get-invite-by-game-and-user/get-invite-by-game-and-user.service'
import { redirect } from '@/i18n/navigation'

type InvitePageProps = {
  params: Promise<{
    locale: TypedLocale
    invite: string[]
  }>
  searchParams: Promise<{
    registration?: 'success' | 'error'
  }>
}

export default async function InvitePage({ params, searchParams }: InvitePageProps) {
  const { invite: [userId, userSlug, gameId] = [], locale = 'en' } = await params
  const { registration } = await searchParams
  const t = await getTranslations('invite')

  if (!userId || !userSlug || !gameId) {
    redirect({ href: '/', locale })
  }

  const invite = await getInviteByGameAndUser(gameId, userId)
  if (!invite) {
    redirect({ href: '/', locale })
  }

  const game = await getGameById(gameId, locale)

  return (
    <main className="space-y-8 my-8">
      <RegisterForGameProvider inviterId={userId}>
        <RegisterForGameSheet />
        <h1 className="text-5xl font-bold text-center">{t('title')}</h1>
        {registration === 'success' && (
          <div className="max-w-lg mx-auto space-y-4">
            <div className="flex justify-center bg-green-100 p-4 rounded-lg">
              <p className="text-green-500">{t('success')}</p>
            </div>
          </div>
        )}
        {registration === 'error' && (
          <div className="max-w-lg mx-auto space-y-4">
            <div className="flex justify-center bg-red-100 p-4 rounded-lg">
              <p className="text-red-500">{t('error')}</p>
            </div>
          </div>
        )}
        <InviteClientPage registration={registration} gameId={game.id} />
      </RegisterForGameProvider>
    </main>
  )
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
