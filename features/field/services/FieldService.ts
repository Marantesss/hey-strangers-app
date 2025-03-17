import { Payload } from "payload";
import { Field, FieldData } from "../models/Field";
import { Field as PayloadField } from "@payload-types";


export type FieldExpand = {
  field?: boolean;
  registrations?: boolean;
}

type GetFieldsParams = {
  limit?: number;
  page?: number;
  expand?: FieldExpand;
}

export class FieldService {
  private constructor(
    private readonly payload: Payload
  ) {}

  static with(payload: Payload) {
    return new FieldService(payload);
  }

  static prepareAmenities(amenityRows: FieldAmenityRow[]): FieldData['amenities'] {
    return amenityRows.map(amenity => amenity.type);
  }

  async getFields({ limit = 10, page = 1, expand }: GetFieldsParams = {}) {
    throw Error("TODO: implement");
  }

  async getFieldForGameId(gameId: string): Promise<Field> {
    const game = await this.payload.findByID({
      collection: 'games',
      id: gameId,
      depth: 2
    });

    if (!game?.field) {
      throw Error('Field not found for game');
    }

    const field = {
      ...game.field,
      amenities: FieldService.prepareAmenities(game.field.fieldAmenities ?? []),
    } satisfies FieldData;

    return Field.from(field);
  }
}