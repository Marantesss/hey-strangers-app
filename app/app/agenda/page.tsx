import GameCard from "@/features/game/components/GameCard";
import SelectCity from "@/features/game/components/SelectCity";
import SelectSport from "@/features/game/components/SelectSport";
import { Field } from "@/features/field/models/Field";
import { Game } from "@/features/game/models/Game";
import { NextPage } from "next";

const DUMMY_GAMES = [
  Game.from({
    id: '1',
    name: 'Game 1',
    description: 'Description 1',
    start_time: "2025-03-01T08:00:00Z",
    end_time: "2025-03-01T09:00:00Z",
    price: 100,
    max_players: 10,
    sport: 'soccer',
    created_at: "2025-03-01T08:00:00Z",
    deleted_at: null,
    updated_at: "2025-03-01T08:00:00Z",
    field_id: '1',
    field: {
      id: '1',
      name: 'Field 1',
      address: '123 Main St',
      type: 'indoor',
      flooring: 'artificial_turf',
      deleted_at: null,
      created_at: "2025-03-01T08:00:00Z",
      updated_at: "2025-03-01T08:00:00Z",
      sport: 'soccer',
    },
    registrations: [
      {
        id: '1',
        full_name: 'John Doe',
        city: 'Lisbon',
        created_at: "2025-03-01T08:00:00Z",
        deleted_at: null,
        updated_at: "2025-03-01T08:00:00Z",
      },
      {
        id: '2',
        full_name: 'Jane Doe',
        city: 'Lisbon',
        created_at: "2025-03-01T08:00:00Z",
        deleted_at: null,
        updated_at: "2025-03-01T08:00:00Z",
      },
    ],
  }),
  Game.from({
    id: '2',
    name: 'Game 2',
    description: 'Description 2',
    start_time: "2025-03-01T09:00:00Z",
    end_time: "2025-03-01T10:00:00Z",
    price: 100,
    max_players: 10,
    sport: 'soccer',
    created_at: "2025-03-01T08:00:00Z",
    deleted_at: null,
    updated_at: "2025-03-01T08:00:00Z",
    field_id: '1',
    field: {
      id: '1',
      name: 'Field 1',
      address: '123 Main St',
      type: 'indoor',
      flooring: 'artificial_turf',
      sport: 'soccer',
      created_at: "2025-03-01T08:00:00Z",
      deleted_at: null,
      updated_at: "2025-03-01T08:00:00Z",
    },
  }),
]

const AgendaPage: NextPage = () => {
  return (
    <main className="space-y-8">
      <h1 className="text-5xl font-bold text-center">Book your next game</h1>

      <div className="max-w-xs mx-auto space-y-4">
        <SelectCity />
        <SelectSport />
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {DUMMY_GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  )
}

export default AgendaPage;