/**
 * ================================
 * USER
 * ================================
 *
 * Note: This table contains user data. Users should only be able to view and update their own data.
 */
create table public.user (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  city text,

  -- Timestamps
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);
alter table public.user enable row level security;
create policy "Can view own user data." on public.user for select using ((select auth.uid()) = id);
create policy "Can update own user data." on public.user for update using ((select auth.uid()) = id);

/** This trigger automatically creates a user entry when a new user signs up via Supabase Auth */
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
  begin
    insert into public.user (id, full_name)
    values (new.id, new.raw_user_meta_data->>'full_name');
    return new;
  end;
$$
language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
    execute procedure public.handle_new_user();

/** This trigger automatically updates the updated_at timestamp when a user is updated. */
create trigger on_user_update
  before update on public.user
  for each row
    execute procedure public.set_updated_at_now();