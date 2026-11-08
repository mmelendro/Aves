-- Reuse the existing private subscriber registry. No public table access or mail is added.
begin;
create function public.account_email_updates(p_user_id uuid, p_subscribed boolean default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare email_value text; subscriber private.launch_subscribers%rowtype; previous_status text;
begin
  -- The service-only endpoint derives p_user_id from verified Auth, never request JSON.
  select lower(btrim(email)), email_confirmed_at into email_value, subscriber.email_verified_at
    from auth.users where id=p_user_id and email_confirmed_at is not null and not coalesce(is_anonymous,false);
  if email_value is null then raise sqlstate 'PT403' using message='Confirmed account required'; end if;
  if p_subscribed is null then
    return jsonb_build_object('subscribed',coalesce((select status='requested' from private.launch_subscribers where email_normalized=email_value),false));
  end if;
  -- Serialize changes for this email, including concurrent opt-in and unsubscribe.
  insert into private.launch_subscribers(email_normalized,status,suppressed_at)
    values(email_value,'suppressed',now()) on conflict(email_normalized) do nothing;
  select * into subscriber from private.launch_subscribers where email_normalized=email_value for update;
  previous_status := subscriber.status;
  update private.launch_subscribers set
    status=case when p_subscribed then 'requested' else 'suppressed' end,
    suppressed_at=case when p_subscribed then null else now() end,
    last_requested_at=case when p_subscribed then now() else last_requested_at end,
    email_verified_at=(select email_confirmed_at from auth.users where id=p_user_id)
    where id=subscriber.id;
  if (p_subscribed and previous_status<>'requested') or (not p_subscribed and previous_status<>'suppressed') then
    insert into private.consent_events(launch_subscriber_id,event_type,applied,consent_version,source)
    values(subscriber.id,case when p_subscribed then 'opt_in_request' else 'unsubscribe' end,true,
      case when p_subscribed then 'account-email-updates-v1' else null end,
      case when p_subscribed then 'website' else 'unsubscribe_link' end);
  end if;
  return jsonb_build_object('subscribed',p_subscribed);
end $$;
revoke all on function public.account_email_updates(uuid,boolean) from public, anon, authenticated;
grant execute on function public.account_email_updates(uuid,boolean) to service_role;
comment on function public.account_email_updates(uuid,boolean) is 'Service-only verified-account preference. Version account-email-updates-v1: Email me AVES birding stories, trip news and destination updates. I can unsubscribe at any time. No marketing email is sent by this function.';
commit;
