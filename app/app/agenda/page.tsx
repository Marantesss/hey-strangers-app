import GameCard from "@/features/game/components/GameCard";
import SelectCity from "@/features/game/components/SelectCity";
import SelectSport from "@/features/game/components/SelectSport";
import { GameService } from "@/features/game/services/GameService";
import { createClient } from "@/utils/supabase/server";
import { Enums } from "@/utils/supabase/types";
import { NextPage } from "next";

type AgendaPageProps = {
  searchParams: Promise<{
    city?: string;
    sport?: string;
  }>;
}

const AgendaPage: NextPage<AgendaPageProps> = async ({ searchParams }) => {
  const { city, sport } = await searchParams;
  const supabase = await createClient();
  const games = await GameService.with(supabase).getGames(
    { city, sport: sport as Enums<'game_sport_type'>, timeFrame: 'future' },
    { expand: { field: true, registrations: true } }
  );

  return (
    <main className="space-y-8 my-8">
      <h1 className="text-5xl font-bold text-center">Book your next game</h1>

      <div className="max-w-xs mx-auto space-y-4">
        <SelectCity />
        <SelectSport />
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}

export default AgendaPage;