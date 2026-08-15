import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase-Client mit Service-Role-Key — umgeht RLS.
 * NUR serverseitig (Seed-Skripte, vertrauenswürdige Server-Aktionen).
 * Niemals im Client importieren.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
