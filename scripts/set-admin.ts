/**
 * Legt kreativ@atelier-tuerkis.ch als (gemeinsamen) Admin an und entfernt die
 * Platzhalter-Konten elena@/marianne@.
 * Aufruf: set -a; source .env.local; set +a; npx tsx scripts/set-admin.ts
 */
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const db = createClient(url, key, { auth: { persistSession: false } });

const NEW_EMAIL = "kreativ@atelier-tuerkis.ch";
const REMOVE = ["elena@atelier-tuerkis.ch", "marianne@atelier-tuerkis.ch"];

async function findUserByEmail(email: string) {
  // profiles hat die E-Mail (per Trigger gesetzt)
  const { data } = await db.from("profiles").select("id").eq("email", email).maybeSingle();
  return data?.id as string | undefined;
}

async function run() {
  // 1. Neues Konto anlegen (falls nicht vorhanden)
  const password = "AT-" + randomBytes(6).toString("base64url") + "!9";
  const { data, error } = await db.auth.admin.createUser({
    email: NEW_EMAIL,
    password,
    email_confirm: true,
    user_metadata: { name: "Atelier Türkis" },
  });
  if (error && !error.message.toLowerCase().includes("already")) throw error;

  const id = data?.user?.id ?? (await findUserByEmail(NEW_EMAIL));
  if (id) await db.from("profiles").update({ is_admin: true }).eq("id", id);

  if (error) console.log(`• ${NEW_EMAIL}: existierte schon — Admin-Recht gesetzt.`);
  else console.log(`✅ ${NEW_EMAIL}  Passwort: ${password}`);

  // 2. Platzhalter entfernen
  for (const email of REMOVE) {
    const uid = await findUserByEmail(email);
    if (uid) {
      await db.auth.admin.deleteUser(uid);
      console.log(`🗑  entfernt: ${email}`);
    }
  }
}

run().catch((e) => {
  console.error("❌", e.message ?? e);
  process.exit(1);
});
