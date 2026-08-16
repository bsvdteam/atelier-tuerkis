"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUpload({
  value,
  onChange,
  folder,
  adder = false,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  /** Kompakter „Bild hinzufügen"-Modus (für Galerien) – zeigt keine Vorschau. */
  adder?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const safe = file.name.replace(/[^a-z0-9.]+/gi, "-").toLowerCase();
    const path = `${folder}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("atelier").upload(path, file, { upsert: true });
    if (error) {
      alert("Upload fehlgeschlagen: " + error.message);
      setBusy(false);
      return;
    }
    const { data } = supabase.storage.from("atelier").getPublicUrl(path);
    onChange(data.publicUrl);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const pick = () => inputRef.current?.click();

  const hidden = (
    <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} disabled={busy} />
  );

  if (adder) {
    return (
      <button type="button" className="img-add" onClick={pick} disabled={busy}>
        {hidden}
        <span className="img-add__plus">＋</span>
        <span>{busy ? "lädt …" : "Bild hinzufügen"}</span>
      </button>
    );
  }

  if (!value) {
    return (
      <button type="button" className="img-drop" onClick={pick} disabled={busy}>
        {hidden}
        <span className="img-drop__icon">🖼️</span>
        <span>{busy ? "lädt …" : "Bild hochladen"}</span>
      </button>
    );
  }

  return (
    <div className="img-tile">
      {hidden}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value} alt="" />
      <div className="img-tile__actions">
        <button type="button" className="img-tile__btn" onClick={pick} title="Bild ersetzen">✏️</button>
        <button type="button" className="img-tile__btn img-tile__btn--del" onClick={() => onChange("")} title="entfernen">×</button>
      </div>
      {busy && <span className="img-tile__busy">lädt …</span>}
    </div>
  );
}
