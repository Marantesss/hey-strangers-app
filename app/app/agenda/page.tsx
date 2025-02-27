import GameCard from "@/features/game/components/GameCard";
import { NextPage } from "next";

const AgendaPage: NextPage = () => {
  return (
    <main>
      <h1 className="text-5xl font-bold text-center">Book your next game</h1>

      <div>
        <div>SELECT CITY</div>
        <div>SELECT SPORT</div>
      </div>

      <div className="space-y-4">
        <GameCard />
        <GameCard />
      </div>
    </main>
  )
}

export default AgendaPage;