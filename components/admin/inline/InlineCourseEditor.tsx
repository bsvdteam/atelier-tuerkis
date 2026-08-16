"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { saveRecord } from "@/app/[locale]/admin/actions";
import { DatePicker } from "@/components/admin/DatePicker";
import { cn } from "@/lib/utils";
import type { Lookups } from "@/components/admin/ResourceForm";
import {
  TextField, AreaField, ImageField, GalleryField, ChipSelect, ComboField, RowsField, QaField,
} from "./primitives";

const COLORS = ["teal", "coral", "yellow", "violet", "green", "sky", "orange", "pink"];
const META_DEFAULT = [
  { label: "Zielgruppe", value: "" }, { label: "Level", value: "" }, { label: "Dauer", value: "" },
  { label: "Termine", value: "" }, { label: "Gruppe", value: "" }, { label: "Material", value: "" },
  { label: "Start", value: "" },
];

type Row = { label: string; value: string };
type Qa = { q: string; a: string };
type V = {
  title: string; slug: string; audience: string; category: string;
  teaser: string; description: string; takeaway: string;
  price: string; price_note: string; schedule: string; start_label: string; availability: string;
  color: string; image_url: string;
  dates: string[]; images: string[]; instructor_slugs: string[];
  meta: Row[]; faq: Qa[];
  is_new: boolean; is_published: boolean; sort_order: number;
};

function initValues(record: Record<string, unknown> | null): V {
  const r = record ?? {};
  const arr = <T,>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);
  return {
    title: (r.title as string) ?? "",
    slug: (r.slug as string) ?? "",
    audience: (r.audience as string) ?? "erwachsene",
    category: (r.category as string) ?? "",
    teaser: (r.teaser as string) ?? "",
    description: (r.description as string) ?? "",
    takeaway: (r.takeaway as string) ?? "",
    price: (r.price as string) ?? "",
    price_note: (r.price_note as string) ?? "",
    schedule: (r.schedule as string) ?? "",
    start_label: (r.start_label as string) ?? "",
    availability: (r.availability as string) ?? "",
    color: (r.color as string) ?? "teal",
    image_url: (r.image_url as string) ?? "",
    dates: arr<string>(r.dates),
    images: arr<string>(r.images),
    instructor_slugs: arr<string>(r.instructor_slugs).length
      ? arr<string>(r.instructor_slugs)
      : (r.instructor_slug ? [r.instructor_slug as string] : []),
    meta: arr<Row>(r.meta).length ? arr<Row>(r.meta) : (record ? [] : META_DEFAULT),
    faq: arr<Qa>(r.faq),
    is_new: Boolean(r.is_new),
    is_published: record ? Boolean(r.is_published) : true,
    sort_order: Number(r.sort_order ?? 0),
  };
}

export function InlineCourseEditor({
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

  const isKids = v.audience === "kinder";
  const audienceLabel = isKids ? "Kinder" : "Erwachsene";

  const submit = () => {
    setError(null);
    // instructor_slug (Einzelfeld) mitschreiben für Abwärtskompatibilität
    const payload = { ...v, instructor_slug: v.instructor_slugs[0] ?? null };
    start(async () => {
      const res = await saveRecord("courses", (record?.id as string) ?? null, payload);
      if (res?.error) setError(res.error);
      else router.push("/admin/courses");
    });
  };

  const catOptions = mergeCats(lookups.courseCategories);

  return (
    <div className={cn("ie-page", isKids && "theme-kids")}>
      <p className="ie-hint">Klicke direkt in die Texte, um sie zu ändern. Bilder per Klick wechseln.</p>

      {/* Kopf */}
      <section className="pagehead">
        <div className="container">
          <p className="crumbs">Home · Angebot · {audienceLabel} · Vorschau</p>
          <div className="ie-tagline">
            <span className={`tag tag--${isKids ? "coral" : "coral"}`}>{audienceLabel} ·</span>
            <ComboField id="cat" value={v.category} onChange={(x) => set("category", x)}
              options={catOptions} className="ie-input--tag" placeholder="Kategorie" />
          </div>
          <h1 className="h1"><TextField value={v.title} onChange={(x) => set("title", x)}
            className="ie-input--h1" placeholder="Kurstitel" ariaLabel="Titel" /></h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "24px" }}>
        <div className="container">
          <div className="kurs-layout">
            {/* LINKS */}
            <div>
              <div className="kurs-hero-img">
                <ImageField value={v.image_url} onChange={(x) => set("image_url", x)} folder="courses" color={v.color} />
              </div>

              <div style={{ marginTop: "30px" }}>
                <h2 className="h3">Worum es geht</h2>
                <AreaField value={v.description} onChange={(x) => set("description", x)}
                  className="lead" placeholder="Beschreibe den Kurs …" />
              </div>

              <div className="takeaway" style={{ marginTop: "26px" }}>
                <span className="takeaway__icon">🎁</span>
                <div style={{ width: "100%" }}>
                  <strong>Das nimmst du mit nach Hause</strong>
                  <AreaField value={v.takeaway} onChange={(x) => set("takeaway", x)} placeholder="Was man mitnimmt …" />
                </div>
              </div>

              <div style={{ marginTop: "34px" }}>
                <h2 className="h3 mb-m">Eindrücke aus dem Kurs</h2>
                <GalleryField value={v.images} onChange={(x) => set("images", x)} folder="courses" />
              </div>

              <div style={{ marginTop: "34px" }}>
                <h2 className="h3 mb-m">Häufige Fragen</h2>
                <QaField items={v.faq} onChange={(x) => set("faq", x)} />
              </div>
            </div>

            {/* RECHTS */}
            <aside className="kurs-aside">
              <div className="frost" style={{ padding: "26px" }}>
                <div className="ie-block-label">Eckdaten</div>
                <RowsField rows={v.meta} onChange={(x) => set("meta", x)} addLabel="Eckdaten-Zeile" />

                <div className="ie-block-label" style={{ marginTop: "20px" }}>Termine (Kalender)</div>
                <DatePicker value={v.dates} onChange={(x) => set("dates", x)} />

                <div className="ie-price-row">
                  <TextField value={v.price_note} onChange={(x) => set("price_note", x)}
                    className="muted" placeholder="Kurskosten" />
                  <TextField value={v.price} onChange={(x) => set("price", x)}
                    className="ie-input--price" placeholder="CHF …" />
                </div>

                <div className="btn btn--coral ie-cta-preview">Jetzt per WhatsApp anmelden</div>

                <div className="ie-block-label" style={{ marginTop: "20px" }}>Kursleitung</div>
                <ChipSelect options={lookups.team} value={v.instructor_slugs}
                  onChange={(x) => set("instructor_slugs", x)} empty="Leg zuerst unter Team Personen an." />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Weitere Einstellungen */}
      <section className="container">
        <details className="ie-settings" open={!record}>
          <summary>Weitere Einstellungen (nicht direkt auf der Seite sichtbar)</summary>
          <div className="ie-settings__grid">
            <label>Slug (URL-Teil)
              <input className="ie-plain" value={v.slug} onChange={(e) => set("slug", e.target.value)}
                placeholder="z.B. aquarell-fuer-einsteiger" /></label>
            <label>Zielgruppe
              <select className="ie-plain" value={v.audience} onChange={(e) => set("audience", e.target.value)}>
                <option value="erwachsene">Erwachsene</option>
                <option value="kinder">Kinder</option>
              </select></label>
            <label>Farbe
              <select className="ie-plain" value={v.color} onChange={(e) => set("color", e.target.value)}>
                {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select></label>
            <label className="ie-settings__wide">Kurzbeschreibung (Text auf den Karten)
              <textarea className="ie-plain" value={v.teaser} onChange={(e) => set("teaser", e.target.value)} rows={2} /></label>
            <label>Zeit-Badge (z.B. Di 18 bis 20 Uhr)
              <input className="ie-plain" value={v.schedule} onChange={(e) => set("schedule", e.target.value)} /></label>
            <label>Start-Badge (z.B. Start 14. September)
              <input className="ie-plain" value={v.start_label} onChange={(e) => set("start_label", e.target.value)} /></label>
            <label>Verfügbarkeit-Badge (z.B. noch 3 Plätze)
              <input className="ie-plain" value={v.availability} onChange={(e) => set("availability", e.target.value)} /></label>
            <label>Reihenfolge (kleiner = weiter oben)
              <input className="ie-plain" type="number" value={v.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value))} /></label>
            <label className="ie-check"><input type="checkbox" checked={v.is_new}
              onChange={(e) => set("is_new", e.target.checked)} /> Als „Neu" markieren</label>
            <label className="ie-check"><input type="checkbox" checked={v.is_published}
              onChange={(e) => set("is_published", e.target.checked)} /> Sichtbar auf der Website</label>
          </div>
        </details>
      </section>

      {error && <div className="admin-error" style={{ margin: "0 auto", maxWidth: "1100px" }}>{error}</div>}

      <div className="ie-savebar">
        <button type="button" className="btn btn--admin" onClick={submit} disabled={pending}>
          {pending ? "Speichert …" : "Speichern"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/courses")}>Abbrechen</button>
      </div>
    </div>
  );
}

function mergeCats(extra: string[]) {
  const base = ["Malen", "Zeichnen", "Aquarell", "Handlettering", "Buchbinden", "Nähen", "Drucken", "Töpfern", "Basteln", "Ferienkurs"];
  const seen = new Set<string>();
  const out: { value: string; label: string }[] = [];
  for (const c of [...base, ...extra]) if (!seen.has(c)) { seen.add(c); out.push({ value: c, label: c }); }
  return out;
}
