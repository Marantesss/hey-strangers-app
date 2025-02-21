/**
 * ================================
 * field_amenity
 * ================================
 */
create type public.field_amenity_type as enum ('parking', 'restrooms', 'changing_rooms', 'showers', 'equipment_rental', 'lockers', 'storage_space', 'water_fountain', 'vending_machines', 'cafe', 'seating_area', 'first_aid_station', 'wifi', 'lighting', 'scoreboard');

create table public.field_amenity (
  field_id uuid not null references public.field,
  type field_amenity_type not null,

  primary key (field_id, type),

  -- Timestamps
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone
);

-- create a trigger to set the updated_at timestamp when the field is updated
create trigger on_field_amenity_update
  before update on public.field_amenity
  for each row
    execute procedure public.set_updated_at_now();