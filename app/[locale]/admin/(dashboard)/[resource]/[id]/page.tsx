import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES, type ResourceKey } from "@/lib/admin/resources";
import { ResourceForm } from "@/components/admin/ResourceForm";

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
  const { data: record } = await supabase.from(config.table).select("*").eq("id", id).single();
  if (!record) notFound();

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">{config.singular} bearbeiten</h1>
      </div>
      <div className="admin-card">
        <ResourceForm resource={key} config={config} record={record} />
      </div>
    </>
  );
}
