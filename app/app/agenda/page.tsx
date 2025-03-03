import GameCard from "@/features/game/components/GameCard";
import SelectCity from "@/features/game/components/SelectCity";
import SelectSport from "@/features/game/components/SelectSport";
import { Game } from "@/features/game/models/Game";
import { NextPage } from "next";


const AgendaPage: NextPage = () => {
  return (
    <main className="space-y-8">
      <h1 className="text-5xl font-bold text-center">Book your next game</h1>

      <div className="max-w-xs mx-auto space-y-4">
        <SelectCity />
        <SelectSport />
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {Game.dummy.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}

export default AgendaPage;