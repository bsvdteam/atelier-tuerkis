"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { saveRecord } from "@/app/[locale]/admin/actions";
import { ImageUpload } from "./ImageUpload";
import { DatePicker } from "./DatePicker";
import type { Field, ResourceConfig, ResourceKey } from "@/lib/admin/resources";

type Values = Record<string, unknown>;

function initialFor(type: Field["type"]): unknown {
  if (type === "boolean") return false;
  if (type === "number") return 0;
  if (type === "keyvalue" || type === "qalist" || type === "dates") return [];
  return "";
}

export function ResourceForm({
  resource,
  config,
  record,
}: {
  resource: ResourceKey;
  config: ResourceConfig;
  record: Record<string, unknown> | null;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState<Values>(() => {
    const init: Values = {};
    for (const f of config.fields) {
      init[f.name] = record?.[f.name] ?? f.default ?? initialFor(f.type);
    }
    return init;
  });
  const set = (name: string, v: unknown) => setValues((s) => ({ ...s, [name]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    start(async () => {
      const res = await saveRecord(resource, (record?.id as string) ?? null, values);
      if (res?.error) setError(res.error);
      else router.push(`/admin/${resource}`);
    });
  };

  const required = (name: string) => ["title", "slug", "name"].includes(name);

  return (
    <form className="admin-form" onSubmit={submit}>
      {config.fields.map((f) => (
        <div className={`field${f.type === "boolean" ? " field--switch" : ""}`} key={f.name}>
          {f.type === "boolean" ? (
            <>
              <input
                id={f.name}
                type="checkbox"
                checked={Boolean(values[f.name])}
                onChange={(e) => set(f.name, e.target.checked)}
              />
              <label htmlFor={f.name}>{f.label}</label>
            </>
          ) : (
            <>
              <label htmlFor={f.name}>{f.label}</label>

              {f.type === "text" && (
                <input id={f.name} type="text" required={required(f.name)}
                  value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
              )}

              {f.type === "number" && (
                <input id={f.name} type="number"
                  value={Number(values[f.name] ?? 0)} onChange={(e) => set(f.name, Number(e.target.value))} />
              )}

              {f.type === "textarea" && (
                <textarea id={f.name} value={String(values[f.name] ?? "")}
                  onChange={(e) => set(f.name, e.target.value)} />
              )}

              {f.type === "select" && (
                <select id={f.name} value={String(values[f.name] ?? "")}
                  onChange={(e) => set(f.name, e.target.value)}>
                  <option value="">— wählen —</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}

              {f.type === "image" && (
                <ImageUpload value={String(values[f.name] ?? "")} folder={resource}
                  onChange={(url) => set(f.name, url)} />
              )}

              {f.type === "dates" && (
                <DatePicker
                  value={(values[f.name] as string[]) ?? []}
                  onChange={(dates) => set(f.name, dates)}
                />
              )}

              {(f.type === "keyvalue" || f.type === "qalist") && (
                <PairEditor
                  keys={f.type === "keyvalue" ? ["label", "value"] : ["q", "a"]}
                  labels={f.itemLabels ?? ["Bezeichnung", "Wert"]}
                  items={(values[f.name] as Record<string, string>[]) ?? []}
                  onChange={(items) => set(f.name, items)}
                />
              )}

              {f.help && <p className="field__help">{f.help}</p>}
            </>
          )}
        </div>
      ))}

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-actions">
        <button type="submit" className="btn btn--admin" disabled={pending}>
          {pending ? "Speichert …" : "Speichern"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => router.push(`/admin/${resource}`)}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}

function PairEditor({
  keys,
  labels,
  items,
  onChange,
}: {
  keys: [string, string];
  labels: [string, string];
  items: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
}) {
  const [k1, k2] = keys;
  const update = (i: number, key: string, v: string) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it));
    onChange(next);
  };
  const add = () => onChange([...items, { [k1]: "", [k2]: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="kv">
      {items.map((it, i) => (
        <div className="kv__row" key={i}>
          <input type="text" placeholder={labels[0]} value={it[k1] ?? ""} onChange={(e) => update(i, k1, e.target.value)} />
          <textarea placeholder={labels[1]} value={it[k2] ?? ""} onChange={(e) => update(i, k2, e.target.value)} />
          <button type="button" className="kv__del" onClick={() => remove(i)}>×</button>
        </div>
      ))}
      <button type="button" className="kv__add" onClick={add}>+ {labels[0]} hinzufügen</button>
    </div>
  );
}
