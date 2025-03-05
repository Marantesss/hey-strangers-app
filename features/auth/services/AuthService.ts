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

  async getAuthUser() {
    const { data: { user }, error: authError } = await this.supabase.auth.getUser();

    if (authError) {
      throw Error(authError.message);
    }

    if (!user) {
      throw Error('User not found');
    }

    return user;
  }

  async getCurrentUser() {
    const authUser = await this.getAuthUser();

    const { data: userData, error: userError } = await this.supabase
      .from('user')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (userError) {
      throw Error(userError.message);
    } 

    return User.from(userData);
  }

  async updateProfile(data: { 
    email?: string;
    phone?: string;
    fullName?: string;
    city?: string;
  }) {
    const authUser = await this.getAuthUser();

    const { error } = await this.supabase.auth.updateUser({
      email: data.email,
      phone: data.phone,
    });

    if (error) {
      throw Error(error.message);
    }

    const { error: userError } = await this.supabase
      .from('user')
      .update({
        full_name: data.fullName,
        city: data.city,
      })
      .eq('id', authUser.id);

    if (userError) {
      throw Error(userError.message);
    }

    // Refresh and return the updated user
    return this.getCurrentUser();
  }
}
