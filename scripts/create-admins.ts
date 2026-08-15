/**
 * Legt die zwei Inhaberinnen als Auth-User an und setzt is_admin=true.
 * Aufruf: set -a; source .env.local; set +a; npx tsx scripts/create-admins.ts
 */
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const db = createClient(url, key, { auth: { persistSession: false } });

const OWNERS = [
  { name: "Elena Borlini", email: "elena@atelier-tuerkis.ch" },
  { name: "Marianne Holenstein", email: "marianne@atelier-tuerkis.ch" },
];

function tempPassword() {
  // gut merkbar-genug, aber zufällig; wird beim ersten Login geändert
  return "AT-" + randomBytes(6).toString("base64url") + "!9";
}

async function run() {
  for (const o of OWNERS) {
    const password = tempPassword();
    const { data, error } = await db.auth.admin.createUser({
      email: o.email,
      password,
      email_confirm: true,
      user_metadata: { name: o.name },
    });
    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        console.log(`• ${o.email}: existierte schon (übersprungen)`);
        continue;
      }
      throw error;
    }
    // Admin-Recht setzen
    const up = await db.from("profiles").update({ is_admin: true }).eq("id", data.user!.id);
    if (up.error) throw up.error;
    console.log(`✅ ${o.name}  <${o.email}>  Passwort: ${password}`);
  }
}

run().catch((e) => {
  console.error("❌", e.message ?? e);
  process.exit(1);
});
