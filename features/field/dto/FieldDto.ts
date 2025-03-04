import { Tables } from "@/utils/supabase/types";

type FieldRow = Tables<'field'>;
type FieldAmenityRow = Tables<'field_amenity'>;

type FieldAmenity = FieldAmenityRow['type']

export type FieldData = FieldRow & {
  amenities?: FieldAmenity[]
};