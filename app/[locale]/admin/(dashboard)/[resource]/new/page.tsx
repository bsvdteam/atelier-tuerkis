import { notFound } from "next/navigation";
import { RESOURCES, type ResourceKey } from "@/lib/admin/resources";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { InlineCourseEditor } from "@/components/admin/inline/InlineCourseEditor";
import { InlineProductEditor } from "@/components/admin/inline/InlineProductEditor";
import { getAdminLookups } from "@/lib/db";

export default async function NewRecordPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = await params;
  if (!(resource in RESOURCES)) notFound();
  const key = resource as ResourceKey;
  const config = RESOURCES[key];
  const lookups = await getAdminLookups();

  return (
    <>
      <div className="admin__head">
        <h1 className="admin__title">Neu: {config.singular}</h1>
      </div>
      {key === "courses" ? (
        <InlineCourseEditor record={null} lookups={lookups} />
      ) : key === "products" ? (
        <InlineProductEditor record={null} lookups={lookups} />
      ) : (
        <ResourceForm resource={key} config={config} record={null} lookups={lookups} />
      )}
    </>
  );
}
