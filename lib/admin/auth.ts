import { createClient } from "@/lib/supabase/server";

/** Gibt den eingeloggten Admin zurück — oder null, wenn kein Admin. */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, email")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) return null;
  return { id: user.id, email: profile.email ?? user.email ?? "" };
}
