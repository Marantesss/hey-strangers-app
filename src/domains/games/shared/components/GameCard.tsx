'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { GameModel } from '../models/Game.model'
import RegisterForGameButton from '@/domains/registrations/register-for-game/components/RegisterForGameButton'
import { cn } from '@/lib/utils'
import InviteForGameButton from '../../invite-for-game/InviteForGameButton'
import { useFormatter, useTranslations } from 'next-intl'

export interface GameCardProps {
  game: GameModel
  topPick?: boolean
  disabled?: boolean
  simple?: boolean
  hidePrice?: boolean
  highlight?: boolean
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  disabled = false,
  topPick = false,
  simple = false,
  hidePrice = false,
  highlight = false,
}) => {
  const t = useTranslations('components.game-card')
  const format = useFormatter()

  const gameDay = format.dateTime(game.startsAt, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const gameStartTime = format.dateTime(game.startsAt, {
    hour: '2-digit',
    minute: '2-digit',
  })
  const price = format.number(game.price, {
    style: 'currency',
    currency: 'EUR',
  })

  const fieldType = game.field.type.name.charAt(0).toUpperCase() + game.field.type.name.slice(1)
  const fieldFlooring =
    game.field.flooring.name.charAt(0).toUpperCase() + game.field.flooring.name.slice(1)

  const registeredPlayers = !simple
    ? game.registrations.reduce<{ name: string; count: number }[]>((acc, registration) => {
        const existingUser = acc.find((entry) => entry.name === registration.user.privateName)
        if (existingUser) {
          existingUser.count += 1
          return acc
        }

        return [
          ...acc,
          {
            name: registration.user.privateName,
            count: 1,
          },
        ]
      }, [])
    : []

  return (
    <Card disabled={disabled} className={cn({ 'shadow-lg shadow-[#1BA781]': highlight })}>
      <CardHeader>
        {topPick && (
          <CardDescription className="mb-2 font-bold text-foreground">
            {t('top-pick')}
          </CardDescription>
        )}
        <div className="flex items-start">
          <div className="grow space-y-1">
            <CardTitle className="text-lg">
              {game.sport.emoji} {gameDay}
            </CardTitle>
            <CardDescription>{game.field.name}</CardDescription>
          </div>
          <div>
            <span className="text-lg p-2 text-[#454745] bg-[#F9F9FB] rounded-lg">{fieldType}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div>
            <span className="font-bold">{gameStartTime}</span> • ({game.durationInMinutes}min.)
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#454745]">
              {game.description} - {fieldFlooring}
            </span>
            <span className="block text-secondary bg-[#FFF5F0] p-1 font-medium rounded-lg">
              {!game.isFull && (
                <>
                  {t('only-spots-left-prefix')}{' '}
                  <span className="font-bold">{game.availableSpots}</span>{' '}
                  {t('only-spots-left-suffix')}
                </>
              )}
            </span>
          </div>
        </div>
        {!simple && (
          <>
            <Collapsible className="mt-4">
              <CollapsibleContent className="space-y-4 my-2">
                <div>
                  <h4 className="font-bold">{t('facility-information')}</h4>
                  <ul className="text-subtle-foreground list-disc list-inside text-sm">
                    {game.field.amenities.map((amenity) => (
                      <li className="ml-2" key={amenity.id}>
                        {amenity.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">{t('registered-players')}</h4>
                  <ul className="text-subtle-foreground list-disc list-inside text-sm">
                    {registeredPlayers.map(({ name, count }) => (
                      <li className="ml-2" key={name}>
                        {count > 1 ? `${name} + ${count - 1} friends` : name}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
              <CollapsibleTrigger className="text-secondary font-bold">
                {t('more-info')}
              </CollapsibleTrigger>
            </Collapsible>
          </>
        )}
        {!hidePrice && (
          <>
            <hr />
            <div className="text-lg font-bold">{price}</div>
          </>
        )}
      </CardContent>
      {!simple && (
        <CardFooter className="flex-col gap-2">
          <RegisterForGameButton game={game} />
          <InviteForGameButton game={game} />
        </CardFooter>
      )}
    </Card>
  )
}

export default GameCard
