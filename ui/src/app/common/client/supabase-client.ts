import { SupabaseClient, createClient } from "@supabase/supabase-js"
import { SupabaseConfig } from "./supabase.config"
import { Database } from "./supabase.types"

export const createSupabaseClient = (schema?: keyof Database): SupabaseClient<Database> => {
  const options = schema ? {db: {schema}} : undefined

  return createClient(
    SupabaseConfig.endpoint,
    SupabaseConfig.key,
    options
  )
}
