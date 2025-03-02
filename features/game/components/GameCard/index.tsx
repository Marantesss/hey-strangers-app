import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "../../models/Game";
import { Button } from "@/components/ui/button";

export interface GameCardProps {
  game: Game
  topPick?: boolean
  disabled?: boolean
  simple?: boolean
}

const GameCard: React.FC<GameCardProps> = ({ 
  game,
  disabled = false,
  topPick = true,
  simple = false,
}) => {
  const gameDay = game.startTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const gameStartTime = game.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const price = game.price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
  const fieldType = game.field.typeHumanized.charAt(0).toUpperCase() + game.field.typeHumanized.slice(1);
  const fieldFlooring = game.field.flooringHumanized.charAt(0).toUpperCase() + game.field.flooringHumanized.slice(1);

  return (
    <Card disabled={disabled}>
      <CardHeader>
        { topPick && (
          <CardDescription className="mb-2 font-bold text-foreground">
            ⭐ Top Pick
          </CardDescription>
        )}
        <div className="flex items-start">
          <div className="grow space-y-1">
            <CardTitle>
              {game.sportEmoji} {gameDay}
            </CardTitle>
            <CardDescription>
              {game.field.name}
            </CardDescription>
          </div>
          <div>
            <span className="text-lg p-2 text-[#454745] bg-[#F9F9FB] rounded-lg">
              {fieldType}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-bold">{gameStartTime}</span>
          • ({game.durationInMinutes}min.)
        </div>
        <div className="text-[#454745]">
          {game.description} - {fieldFlooring}
        </div>
        {!simple && (
          <>
            <hr className="my-4"/>
            <div className="text-lg font-bold">
              {price}
            </div>
          </>
        )}
      </CardContent>
      {!simple && (
        <CardFooter className="flex-col gap-2">
          <Button className="w-full">
            Book my seat
          </Button>
          <Button variant="ghost" className="w-full">
            Invite friends
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default GameCard;