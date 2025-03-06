import GameCard from "@/features/game/components/GameCard";
import { GameService } from "@/features/game/services/GameService";
import { UserService } from "@/features/user/services/UserService";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    timeFrame?: 'past' | 'future'
  }>
}

const GamesPage: NextPage<PageProps> = async ({ searchParams }) => {
  const { timeFrame = 'past'} = await searchParams;

  const supabase = await createClient();
  const user = await UserService.with(supabase).getCurrentUser();
  const games = await GameService.with(supabase).getGamesWhereUserIsRegistered(
    user.id,
    timeFrame,
    { expand: { field: true } }
  );

  const selectedStyle = 'bg-[#E3FFCD] text-primary';
  const defaultStyle = 'bg-[#F9F9FB] text-[#454745]';

  return (
    <main className="space-y-8 my-8">
      <div className="flex justify-center gap-4">
        <Link
          href="/app/games?timeFrame=past"
          className={cn(
            'px-4 py-2 rounded-lg font-semibold',
            timeFrame === 'past' ? selectedStyle : defaultStyle
          )}
        >
          Past Games
        </Link>
        <Link
          href="/app/games?timeFrame=future"
          className={cn(
            'px-4 py-2 rounded-lg font-semibold',
            timeFrame === 'future' ? selectedStyle : defaultStyle
          )}
        >
          Upcoming Games
        </Link>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {games.map((game) => (
          <GameCard simple key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}

export default GamesPage;