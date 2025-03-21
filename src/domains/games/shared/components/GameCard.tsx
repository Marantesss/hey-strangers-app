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
import { getRegistrationsByGameId } from '@/domains/registrations/get-registration/get-registration.service'

export interface GameCardProps {
  game: GameModel
  topPick?: boolean
  disabled?: boolean
  simple?: boolean
  hidePrice?: boolean
}

const GameCard: React.FC<GameCardProps> = async ({
  game,
  disabled = false,
  topPick = false,
  simple = false,
  hidePrice = false,
}) => {
  const registrations = await getRegistrationsByGameId(game.id)

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
  const fieldType =
    game.field.typeHumanized.charAt(0).toUpperCase() + game.field.typeHumanized.slice(1)
  const fieldFlooring =
    game.field.flooringHumanized.charAt(0).toUpperCase() + game.field.flooringHumanized.slice(1)

  return (
    <>
      <Card disabled={disabled}>
        <CardHeader>
          {topPick && (
            <CardDescription className="mb-2 font-bold text-foreground">
              ⭐ Top Pick
            </CardDescription>
          )}
          <div className="flex items-start">
            <div className="grow space-y-1">
              <CardTitle className="text-lg">
                {game.sportEmoji} {gameDay}
              </CardTitle>
              <CardDescription>{game.field.name}</CardDescription>
            </div>
            <div>
              <span className="text-lg p-2 text-[#454745] bg-[#F9F9FB] rounded-lg">
                {fieldType}
              </span>
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
                      {game.field.amenitiesHumanized.map((amenity) => (
                        <li className="ml-2" key={amenity}>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold">Registered Players</h4>
                    <ul className="text-subtle-foreground list-disc list-inside text-sm">
                      {registrations.map((registration) => (
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
      {/* <RegisterForGameForm
        game={game}
        isOpen={isRegisterFormOpen}
        onClose={() => setIsRegisterFormOpen(false)}
      /> */}
    </>
  )
}

export default GameCard
