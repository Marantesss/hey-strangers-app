'use client'

import SocialIcon from '@/components/common/SocialIcon'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { GameModel } from '@/domains/games/shared/models/Game.model'
import useSession from '@/domains/users/session/use-session'
import { Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import useInviteForGameMutation from './use-invite-for-game.query'

interface InviteForGameButtonProps {
  game: GameModel
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL!
const inviteSubdomain = 'invite'

const InviteForGameButton: React.FC<InviteForGameButtonProps> = ({ game }) => {
  const { user } = useSession()
  const { isMutating, trigger } = useInviteForGameMutation()

  const isDisabled = game.isFull || !user

  const gameInviteLink = `${appUrl}/${user?.id}/${user?.slugifiedName}/${game.id}`

  const onShareWhatsAppClick = async () => {
    toast.info('Creating invite link...')
    await trigger({ id: game.id })
    window.open(`https://wa.me/?text=${encodeURIComponent(gameInviteLink)}`, '_blank')
  }

  const onCopyLinkClick = async () => {
    toast.info('Creating invite link...')
    await trigger({ id: game.id })
    navigator.clipboard.writeText(gameInviteLink)
    toast.info('Invite link copied to clipboard')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" disabled={isDisabled} className="w-full">
          Invite friends
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-6 rounded-2xl">
        <h4 className="text-xl font-bold mb-4">Invite Friends</h4>
        <div className="flex gap-2">
          <Button
            className="bg-[#D8D9E0] text-default"
            onClick={onCopyLinkClick}
            disabled={isMutating}
          >
            <LinkIcon />
            Copy link
          </Button>
          <Button disabled={isMutating} onClick={onShareWhatsAppClick}>
            <SocialIcon icon="whatsapp" />
            Share via WhatsApp
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default InviteForGameButton
