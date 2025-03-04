import { FieldData } from "@/features/field/models/Field";
import { UserData } from "@/features/user/models/User";
import { Tables } from "@/utils/supabase/types";
import { GameData } from "./GameDto";

type RegistrationRow = Tables<'registration'>;

export type RegistrationRelations = {
  game: GameData;
  user: UserData;
}

export type RegistrationData = RegistrationRow & Partial<RegistrationRelations>;