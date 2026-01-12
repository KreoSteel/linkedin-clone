import { createClient } from "@supabase/supabase-js";
import { clientEnv } from "@/config/envs/client";
import { serverEnv } from "@/config/envs/server";

/**
 * Admin Supabase client with service role key.
 * This bypasses Row Level Security (RLS) policies.
 * 
 * ⚠️ WARNING: Only use this on the server-side in trusted contexts.
 * Never expose this client or the service role key to the client.
 */
export function createAdminClient() {
  return createClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
