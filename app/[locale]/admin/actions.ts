"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/admin/auth";
import { RESOURCES, type ResourceKey } from "@/lib/admin/resources";

export async function login(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "E-Mail oder Passwort ist falsch." };
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/** Datensatz anlegen oder aktualisieren. */
export async function saveRecord(resource: ResourceKey, id: string | null, values: Record<string, unknown>) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Nicht berechtigt." };

  const config = RESOURCES[resource];
  const supabase = await createClient();

  if (id) {
    const { error } = await supabase.from(config.table).update(values).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from(config.table).insert(values);
    if (error) return { error: error.message };
  }
  revalidatePath("/admin/" + resource);
  return { ok: true };
}

export async function deleteRecord(resource: ResourceKey, id: string) {
  const admin = await getAdminUser();
  if (!admin) return { error: "Nicht berechtigt." };
  const config = RESOURCES[resource];
  const supabase = await createClient();
  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/" + resource);
  return { ok: true };
}
