import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES, type ResourceKey } from "@/lib/admin/resources";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  if (!(resource in RESOURCES)) notFound();
  const key = resource as ResourceKey;
  const config = RESOURCES[key];

  const supabase = await createClient();
  const { data: rows } = await supabase.from(config.table).select("*").order(config.order, { ascending: true });

  const cell = (row: Record<string, unknown>, name: string) => {
    const v = row[name];
    if (name === "is_published") {
      return (
        <span className={`admin-badge ${v ? "admin-badge--on" : "admin-badge--off"}`}>
          {v ? "sichtbar" : "versteckt"}
        </span>
      );
    }
    return String(v ?? "—");
  };

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">{config.plural}</h1>
        <Link href={`/admin/${key}/new`} className="btn btn--admin btn--sm">
          + Neu
        </Link>
      </div>

      {!rows || rows.length === 0 ? (
        <div className="admin-card">Noch keine Einträge. Leg mit „+ Neu" den ersten an.</div>
      ) : (
        <div className="admin-tablewrap">
        <table className="admin-table">
          <thead>
            <tr>
              {config.listColumns.map((c) => (
                <th key={c.name}>{c.label}</th>
              ))}
              <th style={{ width: "1%" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id as string}>
                {config.listColumns.map((c, i) => (
                  <td key={c.name}>
                    {i === 0 ? (
                      <Link href={`/admin/${key}/${row.id}`} className="rowlink">
                        {cell(row, c.name)}
                      </Link>
                    ) : (
                      cell(row, c.name)
                    )}
                  </td>
                ))}
                <td>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <Link href={`/admin/${key}/${row.id}`} className="btn btn--ghost btn--sm">
                      Bearbeiten
                    </Link>
                    <DeleteButton
                      resource={key}
                      id={row.id as string}
                      label={String(row[config.titleField] ?? "Eintrag")}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </>
  );
}
