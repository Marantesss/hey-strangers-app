import { Tables } from "@/utils/supabase/types";
import { Game } from "@/features/game/models/Game";

type UserRow = Tables<'user'>;


type UserConstructorParams = UserRow;

export class User {
  readonly id: string;
  readonly fullName: string | null;
  readonly city: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  private constructor(data: UserConstructorParams) {
    this.id = data.id;
    this.fullName = data.full_name;
    this.city = data.city;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.deletedAt = data.deleted_at ? new Date(data.deleted_at) : null;
  }

  /**
   * Returns the first name and last initial of the user
   */
  get privateName(): string {
    if (!this.fullName) return '';

    const nameParts = this.fullName.split(' ');
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1][0];

    return `${firstName} ${lastInitial}.`;
  }
  
  

  // Factory method
  static from(data: UserConstructorParams): User {
    return new User(data);
  }

  public toSerializable(): UserConstructorParams {
    return {
      id: this.id,
      full_name: this.fullName,
      city: this.city,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt?.toISOString() ?? null,
    };
  }
}
