"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const [busy, setBusy] = useState(false);
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
  };

  return (
    <div className="admin-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {value ? <img className="admin-img__preview" src={value} alt="" /> : <span className="admin-img__preview" />}
      <div>
        <input type="file" accept="image/*" onChange={onFile} disabled={busy} />
        {busy && <span style={{ marginLeft: 8 }}>lädt …</span>}
        {value && (
          <button type="button" className="kv__del" style={{ marginLeft: 8 }} onClick={() => onChange("")}>
            entfernen
          </button>
        )}
      </div>
    </div>
  );
}
