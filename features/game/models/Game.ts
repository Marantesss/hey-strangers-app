import { Tables } from "@/utils/supabase/types";
import { Field } from "../../field/models/Field";
import { User } from "@/features/user/models/User";

type GameRow = Tables<'game'>;
type FieldRow = Tables<'field'>;
type UserRow = Tables<'user'>;

type GameSport = GameRow['sport'];

type GameRelations = {
  field: FieldRow;
  registrations: UserRow[];
}

type GameConstructorParams = GameRow & Partial<GameRelations>;

export class Game {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly price: number;
  readonly maxPlayers: number;
  readonly sport: GameSport;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  // Relations
  private readonly _field?: Field;
  private readonly _fieldId: string;

  private readonly _registrations?: User[];

  private constructor(data: GameConstructorParams) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.startTime = new Date(data.start_time);
    this.endTime = new Date(data.end_time);
    this.price = data.price;
    this.maxPlayers = data.max_players;
    this.sport = data.sport;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
    
    // Relations
    this._fieldId = data.field_id;
    this._field = data.field ? Field.from(data.field) : undefined;

    this._registrations = data.registrations?.map(user => User.from(user));
  }

  // Getters for relations
  get field(): Field {
    if (!this._field) {
      throw new Error('Field not found');
    }
    return this._field;
  }

  get registrations(): User[] {
    if (!this._registrations) {
      throw new Error('Registrations not found');
    }
    return this._registrations;
  }


  get sportEmoji(): string {
    const gameSportEmoji: Record<GameSport, string> = {
      soccer: '⚽️',
      basketball: '🏀',
      tennis: '🎾',
      paddle: '🎱',
      volleyball: '🏐',
    }

    return gameSportEmoji[this.sport];
  }

  get durationInMinutes(): number {
    return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60);
  }

  // Factory method
  static from(data: GameConstructorParams): Game {
    return new Game(data);
  }

  public toSerializable(): GameConstructorParams {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      start_time: this.startTime.toISOString(),
      end_time: this.endTime.toISOString(),
      price: this.price,
      max_players: this.maxPlayers,
      sport: this.sport,
      field_id: this._fieldId,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt?.toISOString() ?? null,
      ...(this._field ? { field: this._field.toSerializable() } : {}),
    };
  }
}
