/**
 * ================================
 * schema
 * ================================
 */
create schema if not exists public;

/**
 * ================================
 * functions
 * ================================
 */
create function public.set_updated_at_now()
returns trigger
as $$
  begin
    new.updated_at = now();
    return new;
  end;
$$
language plpgsql security definer;
