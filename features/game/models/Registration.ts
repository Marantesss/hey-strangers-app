import { User } from "@/features/user/models/User";
import { Game } from "./Game";
import { RegistrationData } from "../dto/ResgistrationDto";


export class Registration {
  readonly id: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  private readonly _gameId: string;
  private readonly _game?: Game;

  private readonly _userId: string;
  private readonly _user?: User;

  private constructor(data: RegistrationData) {
    this.id = data.id;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);

    this._gameId = data.game_id;
    this._game = data.game ? Game.from(data.game) : undefined;

    this._userId = data.user_id;
    this._user = data.user ? User.from(data.user) : undefined;

    console.log(data);
  }

  get game(): Game {
    if (!this._game) {
      throw new Error('Game not expanded');
    }
    return this._game;
  }

  get user(): User {
    if (!this._user) {
      throw new Error('User not expanded');
    }
    return this._user;
  }

  static from(data: RegistrationData): Registration {
    return new Registration(data);
  }
}
