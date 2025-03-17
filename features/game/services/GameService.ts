import { Payload, getPayload } from "payload";
import { Game } from "../models/Game";
import { GameData } from "../dto/GameDto";
import { FieldService } from "@/features/field/services/FieldService";
import config from "@payload-config";
import { Game as PayloadGame } from "@payload-types";

type GameExpand = {
  field?: boolean;
  registrations?: boolean;
}

type GetGamesParams = {
  limit?: number;
  page?: number;
  expand?: GameExpand;
}

type GetGamesFilter = {
  city?: string;
  sport?: PayloadGame['sport'];
  timeFrame?: 'past' | 'future' | 'all';
}

export class GameService {
  private constructor(
    private readonly payload: Payload
  ) {}

  static async init() {
    const payload = await getPayload({ config });
    return new GameService(payload);
  }

  private getQueryOptions(expand?: GameExpand) {
    const depth = 2;
    const fields = ['*'];

    if (expand?.registrations) {
      fields.push('registrations');
    }

    if (expand?.field) {
      fields.push('field');
    }

    return {
      depth,
      where: {},
      sort: '-createdAt',
      fields
    };
  }

  private getTimeFrameQuery(timeFrame: 'past' | 'future' | 'all') {
    const now = new Date().toISOString();
    if (timeFrame === 'past') {
      return { 'startTime': { less_than: now } };
    } else if (timeFrame === 'future') {
      return { 'startTime': { greater_than: now } };
    }
    return {};
  }

  private getCityQuery(city: string) {
    return { 'field.address': { like: city } };
  }

  private getSportQuery(sport: string) {
    return { sport: { equals: sport } };
  }

  async getGames(
    { city, sport, timeFrame }: GetGamesFilter,
    { limit = 10, page = 1, expand }: GetGamesParams = {}
  ) {
    try {
      const options = this.getQueryOptions(expand);
      
      if (timeFrame) {
        Object.assign(options.where, this.getTimeFrameQuery(timeFrame));
      }
      
      if (city) {
        Object.assign(options.where, this.getCityQuery(city));
      }

      if (sport) {
        Object.assign(options.where, this.getSportQuery(sport));
      }

      const { docs: games } = await this.payload.find({
        collection: 'games',
        limit,
        page,
        ...options
      });

      const gameDataArray = games.map((game: any) => {
        const { fieldAmenities, ...field } = game.field ?? {};

        const amenities = FieldService.prepareAmenities(fieldAmenities ?? []);

        return {
          ...game,
          registrations: game.registrations ?? [],
          field: {
            ...field,
            amenities,
          },
        } as GameData;
      });

      return gameDataArray.map(Game.from);
    } catch (error) {
      throw Error(error instanceof Error ? error.message : 'Failed to get games');
    }
  }

  async getGamesWhereUserIsRegistered(
    userId: string,
    { city, sport, timeFrame = 'all' }: GetGamesFilter,
    { limit = 10, page = 1, expand }: GetGamesParams = {}
  ) {
    try {
      const options = this.getQueryOptions(expand);
      
      Object.assign(options.where, {
        'registrations.user.id': { equals: userId }
      });

      if (timeFrame) {
        Object.assign(options.where, this.getTimeFrameQuery(timeFrame));
      }
      
      if (city) {
        Object.assign(options.where, this.getCityQuery(city));
      }

      if (sport) {
        Object.assign(options.where, this.getSportQuery(sport));
      }

      const { docs: games } = await this.payload.find({
        collection: 'games',
        limit,
        page,
        ...options
      });

      const gameDataArray = games.map((game: any) => {
        const { fieldAmenities, ...field } = game.field ?? {};

        const amenities = FieldService.prepareAmenities(fieldAmenities ?? []);

        return {
          ...game,
          registrations: game.registrations ?? [],
          field: {
            ...field,
            amenities,
          },
        } as GameData;
      });

      return gameDataArray.map(Game.from);
    } catch (error) {
      throw Error(error instanceof Error ? error.message : 'Failed to get user games');
    }
  }
}