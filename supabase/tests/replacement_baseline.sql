-- Local rollback test only. No production data, mail, or external requests.
begin;
set local plpgsql.check_asserts = on;

create table public.baseline_test_public(id integer, owner_id uuid);
create sequence public.baseline_test_sequence;
create function public.baseline_test_function() returns integer language sql as $$ select 1 $$;
create table private.baseline_test_private(id integer);
create sequence private.baseline_test_sequence;
create function private.baseline_test_function() returns integer language sql as $$ select 1 $$;

do $$
declare r text; s text;
begin
  assert (select nspowner = 'postgres'::regrole from pg_namespace where nspname = 'private'),
    'Application schema belongs to the reviewed migration creator';
  assert has_schema_privilege('service_role','private','USAGE'),'Backend can use explicitly granted private objects';
  assert not has_schema_privilege('service_role','private','CREATE'),'Backend cannot create private objects';
  foreach r in array array['anon','authenticated'] loop
    assert not has_schema_privilege(r,'public','CREATE'),'Browser cannot create exposed objects';
    assert not has_schema_privilege(r,'private','USAGE,CREATE'),'Private schema is not exposed to browsers';
    foreach s in array array['public','private'] loop
      assert not has_table_privilege(r,s || '.baseline_test_' || s,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER'),
        'Future application tables require explicit grants';
      assert not has_sequence_privilege(r,s || '.baseline_test_sequence','USAGE,SELECT,UPDATE'),
        'Future sequences require explicit grants';
      assert not has_function_privilege(r,s || '.baseline_test_function()','EXECUTE'),
        'Future routines require explicit grants';
    end loop;
  end loop;
end;
$$;

create function pg_temp.expect_denied(p_sql text) returns void language plpgsql as $$
declare actual text;
begin
  begin execute p_sql; exception when others then get stacked diagnostics actual = returned_sqlstate; end;
  assert actual = '42501',format('Expected permission denial, received %s',coalesce(actual,'success'));
end;
$$;
grant execute on function pg_temp.expect_denied(text) to anon, authenticated;
set local role anon;
select pg_temp.expect_denied('select id from public.baseline_test_public');
select pg_temp.expect_denied('select public.baseline_test_function()');
select pg_temp.expect_denied($q$select nextval('public.baseline_test_sequence')$q$);
select pg_temp.expect_denied('select id from private.baseline_test_private');
reset role;
set local role authenticated;
select pg_temp.expect_denied('insert into public.baseline_test_public values(1,null)');
select pg_temp.expect_denied('select public.baseline_test_function()');
select pg_temp.expect_denied('create table public.forbidden_table(id integer)');
reset role;

-- A reviewed future migration can deliberately enable a narrow, own-row read.
alter table public.baseline_test_public enable row level security;
create policy baseline_test_own on public.baseline_test_public for select to authenticated
  using ((select auth.uid()) = owner_id);
grant select(id,owner_id) on public.baseline_test_public to authenticated;
insert into public.baseline_test_public values
  (1,'11111111-1111-4111-8111-111111111111'),(2,'22222222-2222-4222-8222-222222222222');
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
do $$ begin
  assert (select array_agg(id) = array[1] from public.baseline_test_public),'Explicit grant still enforces ownership';
end; $$;
select pg_temp.expect_denied('update public.baseline_test_public set id = 3');
reset role;
rollback;
