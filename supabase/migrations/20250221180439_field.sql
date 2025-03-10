/**
 * ================================
 * field
 * ================================
 */
create type public.field_type as enum ('indoor', 'outdoor', 'hybrid', 'other');
create type public.flooring_type as enum ('natural_grass', 'artificial_turf', 'hybrid_turf', 'clay', 'hard_court', 'rubber', 'polyurethane', 'wood', 'sand', 'concrete', 'other');
create type public.field_sport_type as enum ('soccer', 'padel', 'tennis', 'basketball', 'volleyball', 'multi_purpose', 'other');

create table public.field (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  address text not null,

  type field_type not null,
  flooring flooring_type not null,
  sport field_sport_type not null,
  -- Timestamps
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);

-- create a trigger to set the updated_at timestamp when the field is updated
create trigger on_field_update
  before update on public.field
  for each row
    execute procedure public.set_updated_at_now();