import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileForm from "@/features/user/components/ProfileForm";
import { UserService } from "@/features/user/services/UserService";
import { createClient } from "@/utils/supabase/server";
import { NextPage } from "next";

type ProfilePageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

const ProfilePage: NextPage<ProfilePageProps> = async ({ searchParams }) => {
  const supabase = await createClient();
  const authUser = await UserService.with(supabase).getAuthUser();
  const user = await UserService.with(supabase).getCurrentUser();

  const { success, error } = await searchParams;

  return (
    <main className="my-8 space-y-8 max-w-lg mx-auto">
      
      {success && (
        <div className="bg-green-200 text-primary p-4 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-200 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            authUser={authUser}
            user={user.toSerializable()}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You are currently on the free plan.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfilePage;
