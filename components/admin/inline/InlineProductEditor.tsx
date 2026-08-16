"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { saveRecord } from "@/app/[locale]/admin/actions";
import { cn } from "@/lib/utils";
import type { Lookups } from "@/components/admin/ResourceForm";
import {
  TextField, AreaField, ImageField, GalleryField, SelectField, ComboField, RowsField,
} from "./primitives";

const COLORS = ["teal", "coral", "yellow", "violet", "green", "sky", "orange", "pink"];
const SPECS_DEFAULT = [
  { label: "Technik", value: "" }, { label: "Masse", value: "" }, { label: "Jahr", value: "" },
];
const GROUPS = [
  { value: "werke", label: "Werke (Originale)" },
  { value: "produkte", label: "Handgemachtes" },
  { value: "material", label: "Kreativmaterial" },
];

type Row = { label: string; value: string };
type V = {
  title: string; slug: string; group_name: string; category: string;
  price: string; teaser: string; description: string; story: string;
  availability: string; instructor_slug: string; color: string;
  image_url: string; images: string[]; specs: Row[];
  is_published: boolean; sort_order: number;
};

function initValues(record: Record<string, unknown> | null): V {
  const r = record ?? {};
  const arr = <T,>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);
  return {
    title: (r.title as string) ?? "",
    slug: (r.slug as string) ?? "",
    group_name: (r.group_name as string) ?? "werke",
    category: (r.category as string) ?? "",
    price: (r.price as string) ?? "",
    teaser: (r.teaser as string) ?? "",
    description: (r.description as string) ?? "",
    story: (r.story as string) ?? "",
    availability: (r.availability as string) ?? "",
    instructor_slug: (r.instructor_slug as string) ?? "",
    color: (r.color as string) ?? "teal",
    image_url: (r.image_url as string) ?? "",
    images: arr<string>(r.images),
    specs: arr<Row>(r.specs).length ? arr<Row>(r.specs) : (record ? [] : SPECS_DEFAULT),
    is_published: record ? Boolean(r.is_published) : true,
    sort_order: Number(r.sort_order ?? 0),
  };
}

export function InlineProductEditor({
  record, lookups,
}: {
  record: Record<string, unknown> | null;
  lookups: Lookups;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [v, setV] = useState<V>(() => initValues(record));
  const set = <K extends keyof V>(k: K, val: V[K]) => setV((s) => ({ ...s, [k]: val }));

  const submit = () => {
    setError(null);
    start(async () => {
      const res = await saveRecord("products", (record?.id as string) ?? null, v);
      if (res?.error) setError(res.error);
      else router.push("/admin/products");
    });
  };

  const catOptions = lookups.productCategories.map((c) => ({ value: c, label: c }));
  const mainImg = v.image_url || v.images[0] || "";

  return (
    <div className="ie-page">
      <p className="ie-hint">Klicke direkt in die Texte, um sie zu ändern. Bilder per Klick wechseln.</p>

      <section className="section" style={{ paddingTop: "20px" }}>
        <div className="container">
          <p className="crumbs" style={{ marginBottom: "26px" }}>Home · Shop · Vorschau</p>

          <div className="kunst-layout">
            {/* Bilder */}
            <div>
              <div className="ie-artmain">
                <ImageField value={mainImg} onChange={(x) => set("image_url", x)} folder="products" color={v.color} />
              </div>
              <div style={{ marginTop: "12px" }}>
                <div className="ie-block-label">Weitere Bilder</div>
                <GalleryField value={v.images} onChange={(x) => set("images", x)} folder="products" />
              </div>
            </div>

            {/* Info */}
            <aside className="artinfo">
              <div className="ie-tagline">
                <span className={`tag tag--${v.color}`}></span>
                <ComboField id="pcat" value={v.category} onChange={(x) => set("category", x)}
                  options={catOptions} className="ie-input--tag" placeholder="Kategorie" />
              </div>
              <h1 className="artinfo__title"><TextField value={v.title} onChange={(x) => set("title", x)}
                className="ie-input--h1" placeholder="Werktitel" /></h1>
              <div className="ie-badge-edit">
                <span className="spots"><span className="spots__dot" /></span>
                <TextField value={v.availability} onChange={(x) => set("availability", x)}
                  placeholder="Verfügbarkeit (z.B. Unikat)" />
              </div>
              <AreaField value={v.teaser} onChange={(x) => set("teaser", x)} className="lead"
                placeholder="Kurzbeschreibung …" />

              <div className="artinfo__buy">
                <div className="ie-price-row">
                  <span className="muted" style={{ fontWeight: 700 }}>Preis</span>
                  <TextField value={v.price} onChange={(x) => set("price", x)}
                    className="ie-input--price" placeholder="CHF …" />
                </div>
                <div className="btn btn--coral ie-cta-preview">Interesse? Auf WhatsApp schreiben</div>
              </div>

              <div className="ie-block-label" style={{ marginTop: "20px" }}>Details</div>
              <RowsField rows={v.specs} onChange={(x) => set("specs", x)} addLabel="Detail-Zeile" />

              <div className="ie-block-label" style={{ marginTop: "16px" }}>Urheber:in</div>
              <SelectField options={lookups.team} value={v.instructor_slug} onChange={(x) => set("instructor_slug", x)} />
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="frost" style={{ padding: "34px" }}>
            <div className="split" style={{ alignItems: "start", gap: "40px" }}>
              <div>
                <span className="eyebrow">Über das Werk</span>
                <AreaField value={v.description} onChange={(x) => set("description", x)}
                  className="muted mt-s" placeholder="Beschreibe das Werk …" />
              </div>
              <div>
                <span className="eyebrow">Die Geschichte dahinter</span>
                <AreaField value={v.story} onChange={(x) => set("story", x)}
                  className="muted mt-s" placeholder="Die Geschichte dahinter …" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <details className="ie-settings" open={!record}>
          <summary>Weitere Einstellungen</summary>
          <div className="ie-settings__grid">
            <label>Slug (URL-Teil)
              <input className="ie-plain" value={v.slug} onChange={(e) => set("slug", e.target.value)} /></label>
            <label>Gruppe
              <select className="ie-plain" value={v.group_name} onChange={(e) => set("group_name", e.target.value)}>
                {GROUPS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select></label>
            <label>Farbe
              <select className="ie-plain" value={v.color} onChange={(e) => set("color", e.target.value)}>
                {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select></label>
            <label>Reihenfolge
              <input className="ie-plain" type="number" value={v.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value))} /></label>
            <label className="ie-check"><input type="checkbox" checked={v.is_published}
              onChange={(e) => set("is_published", e.target.checked)} /> Sichtbar im Shop</label>
          </div>
        </details>
      </section>

      {error && <div className="admin-error" style={{ margin: "0 auto", maxWidth: "1100px" }}>{error}</div>}

      <div className="ie-savebar">
        <button type="button" className="btn btn--admin" onClick={submit} disabled={pending}>
          {pending ? "Speichert …" : "Speichern"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/products")}>Abbrechen</button>
      </div>
    </div>
  );
}
