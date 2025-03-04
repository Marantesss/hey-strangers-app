import { Database, Tables } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Field, FieldData } from "../models/Field";

type FieldAmenityRow = Tables<'field_amenity'>;

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
    private readonly supabase: SupabaseClient<Database, 'public'>
  ) {}

  static with(supabase: SupabaseClient<Database, 'public'>) {
    return new FieldService(supabase);
  }

  static prepareAmenities(amenityRows: FieldAmenityRow[]): FieldData['amenities'] {
    return amenityRows.map(amenity => amenity.type);
  }

  async getFields({ limit = 10, page = 1, expand }: GetFieldsParams = {}) {
    throw Error("TODO: implement");
  }

  async getFieldForGameId(gameId: string): Promise<Field> {
    const { data, error } = await this.supabase
      .from('game')
      .select('field(*, field_amenity(*))')
      .eq('id', gameId)
      .single();

    if (error) {
      throw Error(error.message);
    }

    if (!data?.field) {
      throw Error('Field not found for game');
    }

    const field = {
      ...data.field,
      amenities: FieldService.prepareAmenities(data.field.field_amenity),
    } satisfies FieldData;

    return Field.from(field);
  }
}