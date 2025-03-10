/**
 * ================================
 * game
 * ================================
 */
create type public.game_sport_type as enum ('soccer', 'padel', 'tennis', 'basketball', 'volleyball');

create table public.game (
  id uuid primary key default gen_random_uuid(),

  name text not null, 
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  price numeric not null,
  max_players integer not null,
  sport game_sport_type not null,

  field_id uuid not null references public.field,
  
  -- Timestamps
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);

create trigger on_game_update
  before update on public.game
  for each row
    execute procedure public.set_updated_at_now();
