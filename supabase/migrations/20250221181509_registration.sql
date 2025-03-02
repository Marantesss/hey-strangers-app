/**
 * ================================
 * registration
 * ================================
 */
create table public.registration (
  id uuid primary key default gen_random_uuid(),

  game_id uuid not null references public.game,
  user_id uuid not null references public.user,

  -- Timestamps
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);

create trigger on_registration_update
  before update on public.registration
  for each row
    execute procedure public.set_updated_at_now();