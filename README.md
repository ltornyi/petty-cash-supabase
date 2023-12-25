# Petty Cash PoC on Supabase

## Architecture

Frontend Angular SPA hosted in Azure Blob storage calls Supabase APIs on top of managed Postgres.

## Supabase setup

* Sign up with free tier plan
* Create project, generate strong postgres database password, store it somewhere safe.
* Copy project URL and anon API key.

### Database

#### Connect to your database

You can use the Supabase portal or you can use a Postgres client like pgAdmin. The database connection information can be found in the Supabase portal under Settings -> Database Settings -> Connection info.

#### Custom schema

Create the "pettycash" schema on the Supabase portal and follow the setup [instructions](https://supabase.com/docs/guides/api/using-custom-schemas). Alternatively, execute `db/create_schema.sql`

#### Create database objects and policies

See `db/create.sql` and `db/policies.sql`

### APIs

Try querying the table using the anon API key; for this to work, you will need a policy like `policy_anon_read.sql` (don't forget to drop the policy):

  curl 'https://<PROJECT_REF>.supabase.co/rest/v1/cash_transaction' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>"
  -H "Accept-Profile: pettycash"

## UI

### SPA

See `ui` folder. Maybe login and signup could be one component.