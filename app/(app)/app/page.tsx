import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const AppPage: NextPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/app/games");
  }

  return redirect("/sign-in");
}

export default AppPage;
