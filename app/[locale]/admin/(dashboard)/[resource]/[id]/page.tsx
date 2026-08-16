import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES, type ResourceKey } from "@/lib/admin/resources";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { getAdminLookups } from "@/lib/db";

export default async function EditRecordPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  if (!(resource in RESOURCES)) notFound();
  const key = resource as ResourceKey;
  const config = RESOURCES[key];

  const supabase = await createClient();
  const [{ data: record }, lookups] = await Promise.all([
    supabase.from(config.table).select("*").eq("id", id).single(),
    getAdminLookups(),
  ]);
  if (!record) notFound();

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">{config.singular} bearbeiten: {String(record[config.titleField] ?? "")}</h1>
      </div>
      <ResourceForm resource={key} config={config} record={record} lookups={lookups} />
    </>
  );
}
