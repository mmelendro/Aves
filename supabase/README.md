# Historical Colombia database files

This directory is **not the active shared AVES backend**. The previous Colombia database and unused replacement were retired after the owner selected one shared account system. Their replacement plan, migration and tests are preserved as historical evidence; they are not current setup instructions.

For the maintained schema, RLS/ownership rules and migration order, use the [Australian branch database guide](https://github.com/mmelendro/Aves/blob/australia/preview/supabase/README.md). The current public Colombia application forwards account/contact work to that maintained service.

SQL migrations describe changes made at a particular point in time. Do not edit and replay historical migrations to change a deployed database. Prepare a new reviewed migration in the maintained backend, test it safely and apply it only as an authorized database change. The old `scripts/` directory contains incompatible bootstrap schemas, including destructive operations; its SECURITY-NOTES.md explains why it must not be used for new setup.
