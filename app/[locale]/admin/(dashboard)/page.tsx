import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES, RESOURCE_KEYS } from "@/lib/admin/resources";

export default async function AdminHome() {
  const supabase = await createClient();

  const counts: Record<string, number> = {};
  for (const key of RESOURCE_KEYS) {
    const { count } = await supabase
      .from(RESOURCES[key].table)
      .select("*", { count: "exact", head: true });
    counts[key] = count ?? 0;
  }

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">Willkommen im Atelier-Admin 🎨</h1>
      </div>

      <p style={{ color: "var(--ink-soft)", marginBottom: "22px" }}>
        Hier verwaltet ihr Kurse, Shop-Produkte, Galerie-Bilder und das Team. Klickt einen Bereich
        an, um Einträge zu bearbeiten, hinzuzufügen oder auszublenden.
      </p>

      <div className="admin-stats">
        {RESOURCE_KEYS.map((key) => (
          <Link key={key} href={`/admin/${key}`} className="admin-stat">
            <div className="admin-stat__num">{counts[key]}</div>
            <div className="admin-stat__label">{RESOURCES[key].plural}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
