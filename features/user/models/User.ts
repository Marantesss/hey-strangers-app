import { User as PayloadUser } from '@payload-types'

export type UserData = PayloadUser;

export class User {
  readonly id: string;
  readonly name: string | null;
  readonly city: string | null;
  readonly phoneNumber: string;
  readonly email: string | null;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  private constructor(data: UserData) {
    this.id = data.id;
    this.name = data.name ?? null;
    this.city = data.city ?? null;
    this.email = data.email ?? null;
    this.phoneNumber = data.phoneNumber;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
  }

  /**
   * Returns the first name and last initial of the user
   */
  get privateName(): string {
    if (!this.name) return '';

    const nameParts = this.name.split(' ');
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1][0];

    return `${firstName} ${lastInitial}.`;
  }
  
  // Factory method
  static from(data: UserData): User {
    return new User(data);
  }

  public toSerializable(): UserData {
    return {
      id: this.id,
      name: this.name,
      city: this.city,
      email: this.email,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      deletedAt: this.deletedAt?.toISOString() ?? null,
    };
  }
}
