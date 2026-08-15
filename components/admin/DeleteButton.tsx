"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { deleteRecord } from "@/app/[locale]/admin/actions";
import type { ResourceKey } from "@/lib/admin/resources";

export function DeleteButton({
  resource,
  id,
  label,
}: {
  resource: ResourceKey;
  id: string;
  label: string;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    if (!confirm(`„${label}" wirklich löschen?`)) return;
    start(async () => {
      const res = await deleteRecord(resource, id);
      if (res?.error) alert(res.error);
      else router.refresh();
    });
  };

  return (
    <button type="button" className="kv__del" onClick={onDelete} disabled={pending}>
      {pending ? "…" : "Löschen"}
    </button>
  );
}
