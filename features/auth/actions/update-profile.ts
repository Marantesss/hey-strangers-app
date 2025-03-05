"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { AuthService } from "../services/AuthService";

type ProfileFormData = {
  fullName: string
  email: string
  phone: string
  city: string
}

const updateProfileAction = async (data: ProfileFormData) => {
  const supabase = await createClient();
  const authService = AuthService.with(supabase)

  await authService.updateProfile(data);

  encodedRedirect("success", "/app/profile", "Profile updated");
};

export default updateProfileAction; 