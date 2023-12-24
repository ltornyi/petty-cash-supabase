# Supabase

## CLI

    npm i -D supabase
    npx supabase login

## Generate types using the CLI

    npx supabase gen types typescript --project-id "$PROJECT_REF" --schema pettycash > supabase.types.ts

It wasn't perfect, had to manually replace "public" with "pettycash" but it's useful.