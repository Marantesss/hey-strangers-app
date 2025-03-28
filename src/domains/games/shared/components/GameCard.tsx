'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { GameModel } from '../models/Game.model'
import RegisterForGameButton from '@/domains/registrations/register-for-game/components/RegisterForGameButton'
import { cn } from '@/lib/utils'
import useRegistrationsByGameQuery from '@/domains/registrations/get-registrations-by-game/get-registration-by-game.query'

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
  const { data: registrations } = useRegistrationsByGameQuery(simple ? undefined : game.id)

  const gameDay = game.startsAt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const gameStartTime = game.startsAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const price = game.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
  const fieldType = game.field.type.name.charAt(0).toUpperCase() + game.field.type.name.slice(1)
  const fieldFlooring =
    game.field.flooring.name.charAt(0).toUpperCase() + game.field.flooring.name.slice(1)

  return (
    <Card disabled={disabled} className={cn({ 'shadow-lg shadow-[#1BA781]': highlight })}>
      <CardHeader>
        {topPick && (
          <CardDescription className="mb-2 font-bold text-foreground">⭐ Top Pick</CardDescription>
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
            <span className="font-bold">{gameStartTime}</span>• ({game.durationInMinutes}min.)
          </div>
          <div className="text-[#454745]">
            {game.description} - {fieldFlooring}
          </div>
        </div>
        {!simple && (
          <>
            <Collapsible className="mt-4">
              <CollapsibleContent className="space-y-4 my-2">
                <div>
                  <h4 className="font-bold">Facility information</h4>
                  <ul className="text-subtle-foreground list-disc list-inside text-sm">
                    {game.field.amenities.map((amenity) => (
                      <li className="ml-2" key={amenity.id}>
                        {amenity.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Registered Players</h4>
                  <ul className="text-subtle-foreground list-disc list-inside text-sm">
                    {registrations?.map((registration) => (
                      <li className="ml-2" key={registration.id}>
                        {registration.user.privateName}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
              <CollapsibleTrigger className="text-secondary font-bold">
                More info
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
          <RegisterForGameButton gameId={game.id} />
          <Button variant="ghost" className="w-full">
            Invite friends
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default GameCard
