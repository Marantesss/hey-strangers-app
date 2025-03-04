import { Database } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Game } from "../models/Game";
import { GameData } from "../dto/GameDto";
import { FieldService } from "@/features/field/services/FieldService";

type GameExpand = {
  field?: boolean;
  registrations?: boolean;
}

type GetGamesParams = {
  limit?: number;
  page?: number;
  expand?: GameExpand;
}

export class GameService {
  private constructor(
    private readonly supabase: SupabaseClient<Database, 'public'>
  ) {}

  static with(supabase: SupabaseClient<Database, 'public'>) {
    return new GameService(supabase);
  }

  async getGames({ limit = 10, page = 1, expand }: GetGamesParams = {}) {
    const offset = (page - 1) * limit;
    const selectString = ['*', expand?.registrations && 'registration(*, user(*))', expand?.field && 'field(*, field_amenity(*))']
      .filter(Boolean)
      .join(',');

    const { data, error } = await this.supabase
      .from('game')
      .select(selectString)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
      .returns<any[]>();

    if (error) {
      throw Error(error.message);
    }

    const gameDataArray = data.map(({ registration, ...game }) => {
      const { field_amenity, ...field } = game.field ?? {};

      const amenities = FieldService.prepareAmenities(field_amenity ?? []);


      return {
        ...game,
        registrations: registration ?? [],
        field: {
          ...field,
          amenities,
        },
      } as GameData;
    })

    return gameDataArray.map(Game.from);
  }
}