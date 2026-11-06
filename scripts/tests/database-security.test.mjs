// Isolated PostgreSQL tests: no network, real users, or deployed database.
// PGLITE_TEST_MODULE may point to an independently installed pinned PGlite module.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const moduleName = process.env.PGLITE_TEST_MODULE
const { PGlite } = await import(moduleName ? pathToFileURL(moduleName).href : '@electric-sql/pglite')
const customer = '10000000-0000-4000-8000-000000000001'
const other = '10000000-0000-4000-8000-000000000002'
const admin = '10000000-0000-4000-8000-000000000003'
const booking = '20000000-0000-4000-8000-000000000001'
const trip = '30000000-0000-4000-8000-000000000001'

async function createDatabase() {
  const db = await PGlite.create()
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE ROLE service_role NOLOGIN BYPASSRLS;
    CREATE SCHEMA auth;
    CREATE TABLE auth.users(id uuid PRIMARY KEY, raw_app_meta_data jsonb DEFAULT '{}', raw_user_meta_data jsonb DEFAULT '{}');
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
      SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$;
    GRANT USAGE ON SCHEMA public, auth TO anon, authenticated, service_role;
    CREATE FUNCTION public.uuid_generate_v4() RETURNS uuid LANGUAGE sql AS $$ SELECT gen_random_uuid() $$;
    INSERT INTO auth.users(id, raw_user_meta_data) VALUES ('${customer}', '{"role":"admin"}'), ('${other}', '{}');
    INSERT INTO auth.users(id, raw_app_meta_data) VALUES ('${admin}', '{"role":"admin"}');
  `)
  return db
}

async function apply(db, name) {
  const sql = await readFile(new URL(`../${name}`, import.meta.url), 'utf8')
  // PGlite lacks uuid-ossp; the equivalent local wrapper above supplies UUID v4.
  await db.exec(sql.replace('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', ''))
}

async function asRole(db, role, userId, run) {
  assert.ok(['anon', 'authenticated', 'service_role'].includes(role))
  await db.exec(`SET ROLE ${role}`)
  await db.query("SELECT set_config('request.jwt.claim.sub', $1, false)", [userId || ''])
  try { return await run() } finally {
    await db.exec('RESET ROLE')
    await db.query("SELECT set_config('request.jwt.claim.sub', '', false)")
  }
}

const denied = operation => assert.rejects(operation, error => error.code === '42501')

test('legacy booking/profile scripts enforce caller authority', async t => {
  const db = await createDatabase()
  try {
    await apply(db, 'create-user-tables.sql')
    await apply(db, 'admin-functions.sql')
    await db.exec(`
      INSERT INTO public.user_profiles(user_id, first_name, last_name, email)
      VALUES ('${customer}', 'Synthetic', 'One', 'one@example.invalid'), ('${other}', 'Synthetic', 'Two', 'two@example.invalid');
      INSERT INTO public.user_bookings(booking_id, user_id, tour_type, region, start_date, end_date, price, booking_status)
      VALUES ('${booking}', '${other}', 'Synthetic test', 'Andes', CURRENT_DATE + 30, CURRENT_DATE + 35, 1250, 'confirmed');
    `)

    await t.test('anonymous cannot execute any booking RPC', async () => asRole(db, 'anon', '', async () => {
      await denied(() => db.query('SELECT * FROM public.get_user_booking_summary($1)', [other]))
      await denied(() => db.query('SELECT public.admin_update_booking_status($1, $2)', [booking, 'cancelled']))
      await denied(() => db.query('SELECT * FROM public.get_booking_analytics()'))
    }))
    await t.test('owner summary works; another customer is denied', async () => asRole(db, 'authenticated', other, async () => {
      const { rows } = await db.query('SELECT * FROM public.get_user_booking_summary($1)', [other])
      assert.equal(Number(rows[0].total_spent), 1250)
      await denied(() => db.query('SELECT * FROM public.get_user_booking_summary($1)', [customer]))
    }))
    await t.test('editable user metadata cannot grant staff authority', async () => asRole(db, 'authenticated', customer, async () => {
      assert.equal((await db.query('SELECT private.is_site_admin() AS allowed')).rows[0].allowed, false)
      await denied(() => db.query('SELECT public.admin_update_booking_status($1, $2)', [booking, 'cancelled']))
      await denied(() => db.query('SELECT * FROM public.get_booking_analytics()'))
      await denied(() => db.query('SELECT id FROM auth.users'))
    }))
    await t.test('profiles and bookings remain private across customers', async () => asRole(db, 'authenticated', customer, async () => {
      assert.equal((await db.query('SELECT * FROM public.user_profiles')).rows.length, 1)
      assert.equal((await db.query('SELECT * FROM public.user_bookings')).rows.length, 0)
      assert.equal((await db.query('SELECT * FROM public.booking_statistics')).rows.length, 0)
    }))
    await t.test('customer may create and edit an unpriced pending request', async () => asRole(db, 'authenticated', customer, async () => {
      const result = await db.query(`INSERT INTO public.user_bookings(user_id,tour_type,region,start_date,end_date)
        VALUES ($1,'Synthetic request','Andes',CURRENT_DATE+30,CURRENT_DATE+35) RETURNING *`, [customer])
      assert.equal(result.rows[0].booking_status, 'pending')
      assert.equal(Number(result.rows[0].price), 0)
      assert.equal((await db.query("UPDATE public.user_bookings SET region='Cauca' WHERE user_id=$1 RETURNING region", [customer])).rows[0].region, 'Cauca')
    }))
    await t.test('customer cannot supply price/status or change protected fields', async () => asRole(db, 'authenticated', customer, async () => {
      await denied(() => db.query(`INSERT INTO public.user_bookings(user_id,tour_type,region,start_date,end_date,price)
        VALUES ($1,'Synthetic','Andes',CURRENT_DATE+30,CURRENT_DATE+35,1)`, [customer]))
      await denied(() => db.query(`INSERT INTO public.user_bookings(user_id,tour_type,region,start_date,end_date,booking_status)
        VALUES ($1,'Synthetic','Andes',CURRENT_DATE+30,CURRENT_DATE+35,'confirmed')`, [customer]))
      for (const assignment of ["price=0", "booking_status='completed'", `user_id='${other}'`, "created_at=now()-interval '1 year'"]) {
        await denied(() => db.query(`UPDATE public.user_bookings SET ${assignment} WHERE user_id=$1`, [customer]))
      }
    }))
    await t.test('confirmed booking details cannot be rewritten by its customer', async () => asRole(db, 'authenticated', other, async () => {
      assert.equal((await db.query("UPDATE public.user_bookings SET region='Forged' WHERE booking_id=$1 RETURNING booking_id", [booking])).rows.length, 0)
    }))
    await t.test('staff authority uses stored app metadata; summaries and date-filtered analytics work', async () => asRole(db, 'authenticated', admin, async () => {
      assert.equal((await db.query('SELECT private.is_site_admin() AS allowed')).rows[0].allowed, true)
      assert.equal(Number((await db.query('SELECT * FROM public.get_user_booking_summary($1)', [other])).rows[0].total_spent), 1250)
      assert.equal(Number((await db.query('SELECT * FROM public.get_booking_analytics(CURRENT_DATE, CURRENT_DATE)')).rows[0].total_revenue), 1250)
      assert.equal((await db.query('SELECT public.admin_update_booking_status($1,$2) AS changed', [booking, 'completed'])).rows[0].changed, true)
      await assert.rejects(() => db.query('SELECT public.admin_update_booking_status($1,NULL)', [booking]))
    }))
    await t.test('qualified functions ignore a shadow relation in the caller search path', async () => {
      await db.exec('CREATE TEMP TABLE user_bookings(user_id uuid, price numeric)')
      await asRole(db, 'authenticated', other, async () => {
        assert.equal(Number((await db.query('SELECT * FROM public.get_user_booking_summary($1)', [other])).rows[0].total_spent), 1250)
      })
      await db.exec('DROP TABLE pg_temp.user_bookings')
    })
    await t.test('all definer functions have fixed search paths and no PUBLIC/anon execute', async () => {
      const { rows } = await db.query(`SELECT n.nspname, p.proname, p.proconfig,
        has_function_privilege('anon', p.oid, 'EXECUTE') AS anonymous
        FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
        WHERE p.prosecdef AND n.nspname IN ('public','private')`)
      assert.equal(rows.length, 4)
      for (const row of rows) {
        assert.ok(row.proconfig.some(value => value === 'search_path=""'))
        assert.equal(row.anonymous, false)
      }
    })
    await t.test('private document paths remain owner-only without exposing auth.users', async () => {
      await db.exec(`CREATE SCHEMA storage;
        CREATE TABLE storage.buckets(id text PRIMARY KEY,name text,public boolean);
        CREATE TABLE storage.objects(id uuid DEFAULT gen_random_uuid(),bucket_id text,name text);
        ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
        CREATE FUNCTION storage.foldername(text) RETURNS text[] LANGUAGE sql IMMUTABLE AS $$ SELECT string_to_array($1,'/') $$;
        GRANT USAGE ON SCHEMA storage TO authenticated;
        GRANT SELECT,INSERT,UPDATE,DELETE ON storage.objects TO authenticated;`)
      await apply(db, 'create-storage-buckets.sql')
      await asRole(db, 'authenticated', customer, async () => {
        await db.query('INSERT INTO storage.objects(bucket_id,name) VALUES ($1,$2)', ['user-documents', `${customer}/synthetic.pdf`])
        await denied(() => db.query('INSERT INTO storage.objects(bucket_id,name) VALUES ($1,$2)', ['user-documents', `${other}/forged.pdf`]))
      })
      await asRole(db, 'authenticated', other, async () => assert.equal((await db.query('SELECT * FROM storage.objects')).rows.length, 0))
      await asRole(db, 'authenticated', admin, async () => assert.equal((await db.query('SELECT * FROM storage.objects')).rows.length, 1))
      assert.equal((await db.query("SELECT public FROM storage.buckets WHERE id='user-documents'")).rows[0].public, false)
    })
  } finally { await db.close() }
})

test('alternative trip schema protects payment fields and chat identity', async t => {
  const db = await createDatabase()
  try {
    await apply(db, 'optimized-schema.sql')
    await db.exec(`INSERT INTO public.user_profiles(id,email) VALUES ('${customer}','one@example.invalid'),('${other}','two@example.invalid');
      INSERT INTO public.trips(id,title,slug,duration_days,price_per_person,region) VALUES ('${trip}','Synthetic','synthetic',2,500,'Andes');`)
    await t.test('customer can save an unpriced trip and edit its request details', async () => asRole(db, 'authenticated', customer, async () => {
      const { rows } = await db.query(`INSERT INTO public.trip_bookings(id,user_id,trip_id,booking_status) VALUES ($1,$2,$3,'inquiry') RETURNING *`, [booking, customer, trip])
      assert.equal(rows[0].payment_status, 'pending')
      assert.equal(rows[0].total_amount, null)
      assert.equal((await db.query('UPDATE public.trip_bookings SET participants=2 WHERE id=$1 RETURNING participants', [booking])).rows[0].participants, 2)
    }))
    await t.test('customers cannot forge a confirmed insert or insert for another user', async () => asRole(db, 'authenticated', customer, async () => {
      await denied(() => db.query(`INSERT INTO public.trip_bookings(user_id,trip_id,booking_status) VALUES ($1,$2,'confirmed')`, [customer, trip]))
      await denied(() => db.query('INSERT INTO public.trip_bookings(user_id,trip_id) VALUES ($1,$2)', [other, trip]))
      await denied(() => db.query('INSERT INTO public.trip_bookings(user_id,trip_id,total_amount) VALUES ($1,$2,0)', [customer, trip]))
    }))
    await t.test('financial, status, identity and audit fields cannot be rewritten', async () => asRole(db, 'authenticated', customer, async () => {
      for (const assignment of ["payment_status='paid'", "booking_status='paid'", 'total_amount=0', "currency='XXX'", "payment_reference='fake'", "payment_method='cash'", `user_id='${other}'`, "notes='staff note'", "created_at=now()-interval '1 year'"]) {
        await denied(() => db.query(`UPDATE public.trip_bookings SET ${assignment} WHERE id=$1`, [booking]))
      }
    }))
    await t.test('another customer cannot read or edit the request', async () => asRole(db, 'authenticated', other, async () => {
      assert.equal((await db.query('SELECT * FROM public.trip_bookings')).rows.length, 0)
      assert.equal((await db.query('UPDATE public.trip_bookings SET participants=7 WHERE id=$1 RETURNING id', [booking])).rows.length, 0)
    }))
    await t.test('honest customer chat works; staff/system/other identity spoofing fails', async () => asRole(db, 'authenticated', customer, async () => {
      const insert = (sender, type, messageType='text') => db.query(`INSERT INTO public.chat_messages(booking_id,sender_id,sender_type,message,message_type)
        VALUES ($1,$2,$3,'Synthetic test message',$4) RETURNING id`, [booking, sender, type, messageType])
      assert.equal((await insert(customer, 'user')).rows.length, 1)
      await denied(() => insert(other, 'user'))
      await denied(() => insert(customer, 'admin'))
      await denied(() => insert(customer, 'guide'))
      await denied(() => insert(customer, 'user', 'system'))
      await denied(() => db.query("UPDATE public.chat_messages SET message='changed'"))
    }))
    await t.test('other customers cannot read or inject chat into the request', async () => asRole(db, 'authenticated', other, async () => {
      assert.equal((await db.query('SELECT * FROM public.chat_messages')).rows.length, 0)
      await denied(() => db.query(`INSERT INTO public.chat_messages(booking_id,sender_id,sender_type,message) VALUES ($1,$2,'user','forged')`, [booking, other]))
    }))
    await t.test('trusted server can set financial state; customer cannot change the priced trip', async () => {
      await asRole(db, 'service_role', '', async () => {
        await db.query("UPDATE public.trip_bookings SET total_amount=1000,booking_status='confirmed',payment_status='paid' WHERE id=$1", [booking])
      })
      await asRole(db, 'authenticated', customer, async () => {
        assert.equal((await db.query('UPDATE public.trip_bookings SET participants=9 WHERE id=$1 RETURNING id', [booking])).rows.length, 0)
        assert.equal(Number((await db.query('SELECT total_amount FROM public.trip_bookings WHERE id=$1', [booking])).rows[0].total_amount), 1000)
      })
    })
    await t.test('anonymous may view active tours but never customer tables', async () => asRole(db, 'anon', '', async () => {
      assert.equal((await db.query('SELECT * FROM public.trips')).rows.length, 1)
      for (const table of ['user_profiles', 'trip_bookings', 'chat_messages']) await denied(() => db.query(`SELECT * FROM public.${table}`))
    }))
  } finally { await db.close() }
})
