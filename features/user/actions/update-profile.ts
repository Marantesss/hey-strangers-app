"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { UserService } from "../services/UserService";

type ProfileFormData = {
  fullName: string
  email: string
  phone: string
  city: string
}

const updateProfileAction = async (data: ProfileFormData) => {
  const supabase = await createClient();
  const userService = UserService.with(supabase)

  await userService.updateProfile(data);

  encodedRedirect("success", "/app/profile", "Profile updated");
};

export default updateProfileAction; 