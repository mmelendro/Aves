-- A trip's journal and album belong to its original country, including legacy Australia.
create function private.protect_saved_trip_destination()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if coalesce(new.details->>'country','australia') is distinct from coalesce(old.details->>'country','australia') then
    raise exception using errcode='23514', message='A saved trip keeps its destination. Start a separate plan for another country.';
  end if;
  return new;
end;
$$;
revoke all on function private.protect_saved_trip_destination() from public, anon, authenticated;
create trigger trip_plan_fixed_destination before update of details on public.trip_plans
for each row execute function private.protect_saved_trip_destination();
