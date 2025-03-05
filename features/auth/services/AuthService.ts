import { Database } from "@/utils/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@/features/user/models/User";

export class AuthService {
  private constructor(
    private readonly supabase: SupabaseClient<Database, 'public'>
  ) {}

  static with(supabase: SupabaseClient<Database, 'public'>) {
    return new AuthService(supabase);
  }

  async getCurrentUser() {
    const { data: { user }, error: authError } = await this.supabase.auth.getUser();

    if (authError) {
      throw Error(authError.message);
    }

    if (!user) {
      throw Error('User not found');
    }

    const { data: userData, error: userError } = await this.supabase
      .from('user')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) {
      throw Error(userError.message);
    } 

    return User.from(userData);
  }
}
