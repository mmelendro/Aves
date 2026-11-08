-- Extend the existing nonpersonal destination catalogue, not customer access.
-- Factual IDs cover all 377 living species in the published OSNZ 2024 main list.
-- Extinct entries remain searchable in the website but cannot become trip targets.
begin;
set local lock_timeout='3s';
set local statement_timeout='30s';
alter table public.destination_countries add column planning_bird_ids text[] not null default '{}'::text[];
update public.destination_countries set planning_bird_ids=array['nz-2cbbd7bc5b9c','nz-0b4a874a73ac','nz-e46644897e99','nz-be94efcb6b52','nz-656616f11323','nz-a30edf463d87','nz-4d0c16a33cb9','nz-48a73f65c167','nz-d759ffbf501e','nz-e96d7dae476a','nz-74cc213fb161','nz-4d1ca90747fe','nz-96c374d81384','nz-e36f33e8464a','nz-3e4a073fcd86','nz-d30c14dfb5c2','nz-54d0cc8e024e','nz-5615df529950','nz-c0b25643f702','nz-63677d8f9dc0','nz-99a3bf8cb67e','nz-bfaea2ffd133','nz-4844df029555','nz-78bfd53676f0','nz-9a3c49ac92f1','nz-10938006ad53','nz-29369fe7e708','nz-98e659f02230','nz-6eed0d4f621a','nz-8985a2aad810','nz-1f6971e99e34','nz-071bfd722f6b','nz-3397bf6e01de','nz-81daad0169dc','nz-bdc3cc58830c','nz-bab3b3106916','nz-afb86196818d','nz-80f716276d30','nz-5ed6d9a8b74e','nz-f377a91e2543','nz-a08dae1c162a','nz-6198f02c84b1','nz-93054f7fe38b','nz-131add6ace38','nz-9dca6530418f','nz-5eaca8506683','nz-1c75aa734471','nz-6ca8a5f73292','nz-b379e6a27126','nz-2f99e382a17a','nz-409b26df0719','nz-004585537e2d','nz-a5347e8d26fd','nz-f05467666459','nz-a4855ce63dfb','nz-7b31b705dd8b','nz-5f158d80b061','nz-4184dd59f8a1','nz-00d83b975bfd','nz-dcdf1e102a0c','nz-cc63a81018aa','nz-2e22f310f678','nz-a72f238f9cc0','nz-711f3312588b','nz-591f3b04d4c5','nz-0f3476865769','nz-b09bf97ba22d','nz-ccdf3d0f5a5f','nz-1ddb34fef712','nz-cac2f90e83c0','nz-ed47c41f3a54','nz-ab453d8b2e49','nz-c27fce8a1352','nz-e54a0921704e','nz-64953577a418','nz-3df5e0297157','nz-e1752a72b986','nz-d80597e4ae2d','nz-31073c73650f','nz-04403bc2d367','nz-1d44e6d2f13d','nz-a29cd2abae43','nz-4ab3a8d4706b','nz-0ebde0f9be85','nz-2803702e51ce','nz-c71ffab9b8f7','nz-deedf3262b51','nz-017427d5aaf8','nz-07b33bdba842','nz-9c99847ae50e','nz-5732c693ca31','nz-d4a3ff3d64cd','nz-a3d079fe22b3','nz-03c83fe36a9d','nz-afcfb5bb4b38','nz-493972d35157','nz-da961b29572a','nz-ee72f3e954fe','nz-0a2ae4f3e559','nz-bf7a95e72a7e','nz-2054decb4e3e','nz-a031e201c5e2','nz-59ca15ed82bb','nz-5494111fec2a','nz-9f212ea5bb58','nz-0775f7bfd422','nz-9d76478fbdbd','nz-cd6c2378d213','nz-e5ef8120d210','nz-773aae845f6a','nz-7b9e6856fe53','nz-63e06c00dd29','nz-c1923772ddd3','nz-c76b7b9f867e','nz-774d12fbaef8','nz-efb91d790d51','nz-f954b745e886','nz-dc692b771800','nz-bd5d50162a34','nz-90acb05c636d','nz-3b0ef6abf6b2','nz-e62987e27668','nz-3f48369cae57','nz-45952ec59843','nz-13fc1c593f7b','nz-7c627af043be','nz-9be51337f5ee','nz-8d07c81f3eac','nz-54694022a3e6','nz-e2e64f8c3ded','nz-153ba9a4ccc8','nz-6e83e61f2918','nz-82f78d4249d5','nz-da72cac81f25','nz-d9a5ea9baf32','nz-dd1a94a43213','nz-73e0a6e29ebc','nz-09758e8b2bee','nz-a53cda9d5db8','nz-95390d592cb1','nz-25846d1da875','nz-28788f30da86','nz-a6355144c948','nz-295f08000c5d','nz-94ca9e1775c9','nz-83b3f5588686','nz-7926adbfcc32','nz-a10ed93ed2a6','nz-855d32cd11bd','nz-c2d939095e61','nz-933bdd82ce1e','nz-21bbb3fed451','nz-1c5cc0917da9','nz-34b76f80404e','nz-1e5b9faf5be1','nz-57c14d0f4fae','nz-56fc238eee28','nz-f99bb68bea50','nz-3fa144c104bb','nz-aa98e6a33723','nz-bf78a66e29a7','nz-c007993ab924','nz-4b7f4c8a1099','nz-9a7cfcdd2dc5','nz-3490304b7f2e','nz-133b22472eb4','nz-7c6afa97c450','nz-e6ef844b4827','nz-129795c2c5dd','nz-25a366e32852','nz-f0d66728a499','nz-d823b54c1f66','nz-96fa3776f7c1','nz-27979ad1baed','nz-65d76be88552','nz-cac92d96959a','nz-7a7c9d6eeeb8','nz-0c167bd89bec','nz-5bfe6502e1a7','nz-6a34503aa939','nz-fb34f295c5f7','nz-f04aadfb53fe','nz-a53ffeba3961','nz-2978cc1f815a','nz-04fca3e0a60d','nz-ff896bda56ee','nz-1da20e516b8c','nz-7194c09f7e4c','nz-f67ac1a2187a','nz-a38a9f498401','nz-df7d00bec4ee','nz-2470eaa555ed','nz-b315bec1cc6c','nz-e7fb0a0f6cc5','nz-d9f91c79d7ee','nz-74048cb6e046','nz-cc099bb2873c','nz-071863cca036','nz-77e3e1715595','nz-3eea49ef2a26','nz-3e91623e21b7','nz-f324a5770ce5','nz-0a6909222f46','nz-9bb614fc02ee','nz-ce276af6fe84','nz-c28aea7f00dc','nz-3d7456eb7dc2','nz-79307e3f013c','nz-5ae7aa466295','nz-79c9028bf49e','nz-b5a5c9188b55','nz-eab08f4511a9','nz-5c7c285905c1','nz-d3858ab9df2d','nz-6f5e33401a57','nz-ae1411b72a06','nz-2c4feba0f64a','nz-027019cc720f','nz-19e223417b7b','nz-78e9f64c7d67','nz-9ad8cf789bc9','nz-9134a26aeaa8','nz-29d603d1322e','nz-df4365466152','nz-882cbc45780c','nz-7db85b6a1468','nz-1fb3e18f9dba','nz-1a40568b2a41','nz-5a3704c12f99','nz-3731a96e20b6','nz-a1c7c5bd3de2','nz-93ee9c9a6ea8','nz-8b2adc1fbf08','nz-e2a8dffd288c','nz-5dd3e9539462','nz-0c34297197e3','nz-8bd6a7af638d','nz-6a261dd13567','nz-b1cd88583514','nz-af7d49cf64e0','nz-f45c134794d5','nz-9b6313dce07b','nz-dbb61544654c','nz-df28efa3011d','nz-e670e545504d','nz-097b454f997f','nz-84cce7d81249','nz-865b39b0ae7a','nz-aee1d68dc79d','nz-5d051be423a0','nz-8c9884218647','nz-adec605c02fa','nz-ffc91403e98b','nz-cd06aa8a12fa','nz-7837bf48d63b','nz-cf820d810475','nz-2be9b543944a','nz-4b60833dec00','nz-494ffa589f69','nz-f84d457f709e','nz-c6a6be2e8735','nz-00aa9c1debdd','nz-38c69c550b27','nz-73a5f66965e6','nz-667ccb13a83a','nz-823ca6a805bc','nz-cdf5baf54d29','nz-c683f76f0dc9','nz-b83c0fcf389e','nz-957492b4a012','nz-7418d959b6d6','nz-b3fd60037966','nz-cbacad6a8efc','nz-b11dbb6ef8d3','nz-b5872cf79799','nz-e109b98f7374','nz-f359420f3943','nz-41fdaa611b5a','nz-0fbbc5f8aee1','nz-b189c4ffeb29','nz-95efdbf9b030','nz-198d4994a0b5','nz-052953968a1c','nz-c12f1d910f27','nz-e2a98f996ce0','nz-6dc3dc9f50ca','nz-b1be19cc18b3','nz-55cdde8a9fe0','nz-c1dc1a0f1f51','nz-e7ecb90f7e0b','nz-e1984eda2769','nz-5cfd67401327','nz-36a95870b6df','nz-d22a846295d2','nz-c8a17b3fe55a','nz-5350bf2661b4','nz-b8d499002f71','nz-c46549887623','nz-5166cc280b32','nz-4c9c0ec9940f','nz-93eb36265e3b','nz-50d8c56f3329','nz-2d20edfe005b','nz-a7eab1eaf614','nz-5a95f900d6f8','nz-2fa4a85bbf74','nz-4a6566c9525d','nz-fc00165124f6','nz-f27b4f72be6a','nz-75e0446c2b4c','nz-748eaf98a791','nz-726c442241f8','nz-70b4a90a57af','nz-b69e26461436','nz-48e06e699338','nz-7d2862d196ab','nz-71e9c390d5e3','nz-de1ba81fa03b','nz-373e1a0317d9','nz-e6ed647b8a25','nz-5e06dc6edd48','nz-6a98c8ee687f','nz-3fa9882f9196','nz-beb9c1d7e7c6','nz-84e6b9c4a063','nz-4b1e0baee4fb','nz-fc10dabc3059','nz-a93c483d98c5','nz-4f44dada89a2','nz-d994d2df02c5','nz-8012499b5e08','nz-372a50f96b9b','nz-0847d9dc75fc','nz-64a9f5d808b9','nz-8569938600cc','nz-9ea8215c6441','nz-2992f65f2684','nz-fdf0b45c7612','nz-9a0fe42a38e2','nz-ca969e90c76d','nz-d875fa8090cb','nz-d01acc39aed4','nz-75e7bd199b48','nz-a247cde2fc55','nz-79203b786da3','nz-7d5066d0fd53','nz-37d450cfc394','nz-06bff047759b','nz-8796ebc34462','nz-b13a09b3c1a6','nz-48bb4b796e64','nz-8b5e395cefa2','nz-e9193e903f10','nz-3b863bdeaac2','nz-197a9a4577b4','nz-4ed3aa18564b','nz-d89d30d6e59b','nz-66e9b0160934','nz-cd73f78332c7','nz-b8115ba326a8','nz-f1aea8fd8e7f','nz-13f36b65d011','nz-390ceeea78b3','nz-b33768f47261','nz-a04791cc46e1','nz-26ddd6b47007','nz-daddd7569928','nz-304815816656','nz-3dcda42b95df','nz-8c2f2e6bc03b','nz-f2b146e85b00','nz-ac90ad39fe88','nz-c97f74615334','nz-be9c76a3270e','nz-ba26cecd7090','nz-24bca5a7fa81','nz-3660a8ada213']::text[] where id='new-zealand';

create or replace function public.trip_details_valid(p_details jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare region jsonb; region_text text; q jsonb; interest jsonb; bird jsonb;
begin
  if p_details is null or jsonb_typeof(p_details) <> 'object' or octet_length(p_details::text) > 16384
    or not (p_details ?& array['regions','travelWhen','partySize','message'])
    or p_details - array['country','regions','travelWhen','partySize','message','questionnaire'] <> '{}'::jsonb then return false; end if;
  if p_details ? 'country' and (jsonb_typeof(p_details->'country') <> 'string'
    or char_length(p_details->>'country') not between 2 and 64
    or p_details->>'country' !~ '^[a-z]+(-[a-z]+)*$') then return false; end if;
  if jsonb_typeof(p_details->'regions') <> 'array' then return false; end if;
  if jsonb_array_length(p_details->'regions') > 20 then return false; end if;
  for region in select value from jsonb_array_elements(p_details->'regions') loop
    if jsonb_typeof(region) <> 'string' then return false; end if;
    region_text := region #>> '{}';
    if char_length(btrim(region_text)) not between 1 and 160 or region_text ~ '[[:cntrl:]]' then return false; end if;
  end loop;
  -- Questionnaire v1 is optional for historical plans and limited to NZ.
  -- Strict keys/enums bound the JSON at the database as well as the API.
  if p_details ? 'questionnaire' then
    q := p_details->'questionnaire';
    if p_details->>'country' is distinct from 'new-zealand'
      or jsonb_typeof(q) is distinct from 'object' then return false; end if;
    if not (q ?& array['version','pace','birding','comfort','interests'])
      or q - array['version','pace','birding','comfort','interests','birdIds'] <> '{}'::jsonb
      or q->'version' is distinct from '1'::jsonb
      or not coalesce(q->>'pace' = any(array['open','relaxed','balanced','active']),false)
      or not coalesce(q->>'birding' = any(array['open','occasional','alternate','daily']),false)
      or not coalesce(q->>'comfort' = any(array['open','simple','comfortable','special']),false)
      or jsonb_typeof(q->'interests') is distinct from 'array' then return false; end if;
    if jsonb_array_length(q->'interests') > 7 then return false; end if;
    for interest in select value from jsonb_array_elements(q->'interests') loop
      if jsonb_typeof(interest) <> 'string' or not ((interest #>> '{}') = any(array['birds','scenery','photography','food','culture','water','wellness'])) then return false; end if;
    end loop;
    if (select count(*) <> count(distinct value) from jsonb_array_elements(q->'interests')) then return false; end if;
    if q ? 'birdIds' then
      if jsonb_typeof(q->'birdIds') is distinct from 'array' then return false; end if;
      if jsonb_array_length(q->'birdIds') > 512 then return false; end if;
      for bird in select value from jsonb_array_elements(q->'birdIds') loop
        if jsonb_typeof(bird) <> 'string' or (bird #>> '{}') !~ '^nz-[a-f0-9]{12}$' then return false; end if;
      end loop;
      if (select count(*) <> count(distinct value) from jsonb_array_elements(q->'birdIds')) then return false; end if;
    end if;
  end if;
  return jsonb_typeof(p_details->'travelWhen') = 'string'
    and char_length(p_details->>'travelWhen') <= 160 and (p_details->>'travelWhen') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'partySize') = 'string'
    and char_length(p_details->>'partySize') <= 40 and (p_details->>'partySize') !~ '[[:cntrl:]]'
    and jsonb_typeof(p_details->'message') = 'string' and char_length(p_details->>'message') <= 5000;
end;
$$;

create or replace function private.guard_trip_country_regions()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare country text; region_text text; bird_id text; allowed_birds text[];
begin
  if not public.trip_details_valid(new.details) then return new; end if;
  country := coalesce(new.details->>'country','australia');
  -- Existing primary-key retries must retain their normal 23505 replay path.
  if tg_op = 'INSERT' and exists(select 1 from public.trip_plans where id = new.id and user_id = new.user_id) then return new; end if;
  if not public.trip_country_enabled(country) then
    -- A disabled destination cannot accept new plans or country changes, but
    -- owned drafts already saved there remain editable and quotable.
    if tg_op = 'INSERT' then
      raise exception using errcode = '23514', message = 'Choose an available destination country.';
    elsif country is distinct from coalesce(old.details->>'country','australia') then
      raise exception using errcode = '23514', message = 'Choose an available destination country.';
    end if;
  end if;
  for region_text in select jsonb_array_elements_text(new.details->'regions') loop
    if public.trip_region_valid(country,region_text) then continue; end if;
    if tg_op = 'UPDATE' then
      if country = 'australia' and coalesce(old.details->>'country','australia') = 'australia'
        and old.details->'regions' ? region_text
        and not public.trip_region_is_other_country(country,region_text) then continue; end if;
    end if;
    raise exception using errcode = '23514', message = 'Choose regions in the selected country.';
  end loop;
  -- The country catalogue is nonpersonal, read-only metadata. Ownership and
  -- draft-only RLS remain enforced independently on the trip row.
  if new.details->'questionnaire' ? 'birdIds' then
    select planning_bird_ids into allowed_birds from public.destination_countries where id=country;
    for bird_id in select jsonb_array_elements_text(new.details->'questionnaire'->'birdIds') loop
      if bird_id = any(coalesce(allowed_birds,'{}'::text[])) then continue; end if;
      -- A retired catalogue entry may remain on its original owned draft,
      -- but cannot be newly selected or copied into another destination.
      if tg_op='UPDATE' then
        if country=coalesce(old.details->>'country','australia')
          and old.details->'questionnaire'->'birdIds' ? bird_id then continue; end if;
      end if;
      raise exception using errcode='23514',message='Choose living birds from the selected destination checklist.';
    end loop;
  end if;
  return new;
end;
$$;
-- Existing table grants, RLS and function permissions are unchanged.
commit;
