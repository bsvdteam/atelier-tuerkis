"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

/* Einzeiliges, direkt bearbeitbares Textfeld, das wie der Seitentext aussieht. */
export function TextField({
  value, onChange, className, placeholder, ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <input
      className={cn("ie-input", className)}
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* Mehrzeiliges Feld, das automatisch mitwächst. */
export function AreaField({
  value, onChange, className, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={1}
      className={cn("ie-input ie-area", className)}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* Upload-Helper für Storage-Bucket „atelier". */
export function useUpload(folder: string) {
  const supabase = createClient();
  return async (file: File): Promise<string | null> => {
    const safe = file.name.replace(/[^a-z0-9.]+/gi, "-").toLowerCase();
    const path = `${folder}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("atelier").upload(path, file, { upsert: true });
    if (error) { alert("Upload fehlgeschlagen: " + error.message); return null; }
    return supabase.storage.from("atelier").getPublicUrl(path).data.publicUrl;
  };
}

/* Ein Bild mit Farb-Platzhalter-Fallback und Stift zum Wechseln. */
export function ImageField({
  value, onChange, folder, color = "teal", className,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const upload = useUpload(folder);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    const url = await upload(f);
    setBusy(false);
    if (url) onChange(url);
    if (ref.current) ref.current.value = "";
  };
  return (
    <div className={cn("ie-image", className)}>
      <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />
      {value
        ? // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        : <div className={`ph ph--${color}`} />}
      <div className="ie-image__actions">
        <button type="button" className="ie-image__btn" onClick={() => ref.current?.click()}>
          {busy ? "lädt …" : value ? "✏️ Bild wechseln" : "＋ Bild"}
        </button>
        {value && <button type="button" className="ie-image__btn ie-image__btn--del" onClick={() => onChange("")}>×</button>}
      </div>
    </div>
  );
}

/* Mehrere Bilder (Galerie) inline. */
export function GalleryField({
  value, onChange, folder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  folder: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const upload = useUpload(folder);
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await upload(f);
    if (url) onChange([...value, url]);
    if (ref.current) ref.current.value = "";
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="ie-gallery">
      <input ref={ref} type="file" accept="image/*" hidden onChange={onFile} />
      {value.map((url, i) => (
        <div className="ie-gallery__tile" key={url + i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" />
          <button type="button" className="ie-gallery__del" onClick={() => remove(i)}>×</button>
        </div>
      ))}
      <button type="button" className="ie-gallery__add" onClick={() => ref.current?.click()}>＋</button>
    </div>
  );
}

/* Team-Mehrfachauswahl als Chips (Kursleitung). */
export function ChipSelect({
  options, value, onChange, empty,
}: {
  options: { value: string; label: string; color?: string }[];
  value: string[];
  onChange: (v: string[]) => void;
  empty?: string;
}) {
  if (!options.length) return <p className="muted" style={{ fontSize: "0.85rem" }}>{empty ?? "Keine Auswahl vorhanden."}</p>;
  const toggle = (v: string) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
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

/* Einzelauswahl (z.B. Urheber:in). */
export function SelectField({
  options, value, onChange, placeholder = "— wählen —",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <select className="ie-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

/* Combobox: tippen ODER aus Vorschlägen wählen. */
export function ComboField({
  value, onChange, options, className, id, placeholder = "Auswählen oder tippen …",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  id: string;
  placeholder?: string;
}) {
  return (
    <>
      <input className={cn("ie-input", className)} list={`dl-${id}`} value={value}
        placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      <datalist id={`dl-${id}`}>
        {options.map((o) => <option key={o.value} value={o.value} />)}
      </datalist>
    </>
  );
}

/* Label/Wert-Zeilen (Eckdaten / Details) inline editierbar. */
export function RowsField({
  rows, onChange, addLabel = "Zeile hinzufügen",
}: {
  rows: { label: string; value: string }[];
  onChange: (rows: { label: string; value: string }[]) => void;
  addLabel?: string;
}) {
  const upd = (i: number, k: "label" | "value", v: string) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const add = () => onChange([...rows, { label: "", value: "" }]);
  const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));
  return (
    <div className="ie-rows">
      {rows.map((r, i) => (
        <div className="ie-row" key={i}>
          <input className="ie-input ie-row__k" value={r.label} placeholder="Bezeichnung"
            onChange={(e) => upd(i, "label", e.target.value)} />
          <input className="ie-input ie-row__v" value={r.value} placeholder="Wert"
            onChange={(e) => upd(i, "value", e.target.value)} />
          <button type="button" className="ie-row__del" onClick={() => remove(i)}>×</button>
        </div>
      ))}
      <button type="button" className="ie-row__add" onClick={add}>＋ {addLabel}</button>
    </div>
  );
}

/* Frage/Antwort-Liste inline. */
export function QaField({
  items, onChange,
}: {
  items: { q: string; a: string }[];
  onChange: (items: { q: string; a: string }[]) => void;
}) {
  const upd = (i: number, k: "q" | "a", v: string) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const add = () => onChange([...items, { q: "", a: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="ie-qa">
      {items.map((it, i) => (
        <div className="ie-qa__item" key={i}>
          <input className="ie-input ie-qa__q" value={it.q} placeholder="Frage"
            onChange={(e) => upd(i, "q", e.target.value)} />
          <AreaField value={it.a} onChange={(v) => upd(i, "a", v)} className="ie-qa__a" placeholder="Antwort" />
          <button type="button" className="ie-row__del" onClick={() => remove(i)}>×</button>
        </div>
      ))}
      <button type="button" className="ie-row__add" onClick={add}>＋ Frage hinzufügen</button>
    </div>
  );
}
