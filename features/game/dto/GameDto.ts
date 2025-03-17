import { FieldData } from "@/features/field/models/Field";
import { Tables } from "@/utils/supabase/types";
import { RegistrationData } from "./ResgistrationDto";

type GameRow = Tables<'game'>;

export type GameRelations = {
  field: FieldData;
  registrations: RegistrationData[];
}

export type GameData = GameRow & Partial<GameRelations>;