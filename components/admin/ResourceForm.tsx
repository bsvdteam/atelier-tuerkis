"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { saveRecord } from "@/app/[locale]/admin/actions";
import { ImageUpload } from "./ImageUpload";
import { DatePicker } from "./DatePicker";
import { cn } from "@/lib/utils";
import type { Field, ResourceConfig, ResourceKey } from "@/lib/admin/resources";

type Values = Record<string, unknown>;
type Opt = { value: string; label: string; color?: string };

export type Lookups = {
  team: Opt[];
  courseCategories: string[];
  productCategories: string[];
};

function initialFor(type: Field["type"]): unknown {
  if (type === "boolean") return false;
  if (type === "number") return 0;
  if (type === "keyvalue" || type === "qalist" || type === "dates" || type === "multiselect" || type === "gallery")
    return [];
  return "";
}

export function ResourceForm({
  resource,
  config,
  record,
  lookups,
}: {
  resource: ResourceKey;
  config: ResourceConfig;
  record: Record<string, unknown> | null;
  lookups: Lookups;
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

  const optionsFor = (f: Field): Opt[] => {
    const base = f.options ?? [];
    if (f.optionsFrom === "team") return lookups.team;
    if (f.optionsFrom === "courseCategories")
      return mergeCats(base, lookups.courseCategories);
    if (f.optionsFrom === "productCategories")
      return mergeCats(base, lookups.productCategories);
    return base;
  };

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

  // Felder nach Abschnitt gruppieren (Reihenfolge nach erstem Auftreten).
  const sections: { title: string; fields: Field[] }[] = [];
  for (const f of config.fields) {
    const title = f.section ?? "";
    let s = sections.find((x) => x.title === title);
    if (!s) {
      s = { title, fields: [] };
      sections.push(s);
    }
    s.fields.push(f);
  }

  const renderField = (f: Field) => {
    if (f.type === "boolean") {
      return (
        <div className="field field--switch" key={f.name}>
          <input id={f.name} type="checkbox" checked={Boolean(values[f.name])}
            onChange={(e) => set(f.name, e.target.checked)} />
          <label htmlFor={f.name}>{f.label}</label>
        </div>
      );
    }

    return (
      <div className={cn("field", (f.type === "textarea" || f.type === "gallery" || f.type === "keyvalue" || f.type === "qalist" || f.type === "dates") && "field--wide")} key={f.name}>
        <label htmlFor={f.name}>{f.label}</label>

        {f.type === "text" && (
          <input id={f.name} type="text" required={required(f.name)} placeholder={f.placeholder}
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
            {optionsFor(f).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        )}

        {f.type === "combobox" && (
          <>
            <input id={f.name} type="text" list={`dl-${f.name}`} placeholder="Auswählen oder tippen …"
              value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
            <datalist id={`dl-${f.name}`}>
              {optionsFor(f).map((o) => <option key={o.value} value={o.value} />)}
            </datalist>
          </>
        )}

        {f.type === "multiselect" && (
          <ChipSelect options={optionsFor(f)} value={(values[f.name] as string[]) ?? []}
            onChange={(v) => set(f.name, v)} />
        )}

        {f.type === "image" && (
          <ImageUpload value={String(values[f.name] ?? "")} folder={resource}
            onChange={(url) => set(f.name, url)} />
        )}

        {f.type === "gallery" && (
          <GalleryEditor resource={resource} value={(values[f.name] as string[]) ?? []}
            onChange={(v) => set(f.name, v)} />
        )}

        {f.type === "dates" && (
          <DatePicker value={(values[f.name] as string[]) ?? []} onChange={(dates) => set(f.name, dates)} />
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
      </div>
    );
  };

  return (
    <form className="admin-editor" onSubmit={submit}>
      {sections.map((s) => (
        <fieldset className="admin-section" key={s.title || "_"}>
          {s.title && <legend className="admin-section__title">{s.title}</legend>}
          <div className="admin-section__grid">{s.fields.map(renderField)}</div>
        </fieldset>
      ))}

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-actions admin-actions--sticky">
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

function mergeCats(base: Opt[], extra: string[]): Opt[] {
  const seen = new Set(base.map((b) => b.value));
  const merged = [...base];
  for (const c of extra) if (!seen.has(c)) { merged.push({ value: c, label: c }); seen.add(c); }
  return merged;
}

/* ---- Team-Mehrfachauswahl als Chips ---- */
function ChipSelect({ options, value, onChange }: { options: Opt[]; value: string[]; onChange: (v: string[]) => void }) {
  if (!options.length) {
    return <p className="field__help">Noch keine Auswahl vorhanden. Leg zuerst unter „Team" Personen an.</p>;
  }
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className="chips">
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button type="button" key={o.value} className={cn("chip", on && "chip--on")} onClick={() => toggle(o.value)}>
            <span className={`chip__dot ph ph--${o.color ?? "teal"}`} />
            {o.label}
            <span className="chip__mark">{on ? "✓" : "+"}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---- Bildergalerie (mehrere) ---- */
function GalleryEditor({ resource, value, onChange }: { resource: string; value: string[]; onChange: (v: string[]) => void }) {
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = value.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="gallery-edit">
      {value.length > 0 && (
        <div className="gallery-edit__grid">
          {value.map((url, i) => (
            <div className="gallery-tile" key={url + i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" />
              <div className="gallery-tile__bar">
                <button type="button" onClick={() => move(i, -1)} title="nach vorne">←</button>
                <button type="button" onClick={() => move(i, 1)} title="nach hinten">→</button>
                <button type="button" className="gallery-tile__del" onClick={() => remove(i)} title="entfernen">×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ImageUpload value="" folder={resource} adder onChange={(url) => url && onChange([...value, url])} />
    </div>
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
