"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, null as { error?: string } | null);

  return (
    <div className="admin" style={{ display: "grid", placeItems: "center", padding: "24px" }}>
      <div className="admin-card" style={{ width: "min(400px, 100%)" }}>
        <div className="admin__brand" style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
          Atelier <span>Türkis</span>
        </div>
        <p style={{ color: "var(--ink-mute)", marginBottom: "20px", fontSize: "0.9rem" }}>
          Bitte einloggen.
        </p>

        <form action={action} className="admin-form" style={{ gap: "14px" }}>
          <div className="field">
            <label htmlFor="email">E-Mail</label>
            <input id="email" name="email" type="text" autoComplete="username" required />
          </div>
          <div className="field">
            <label htmlFor="password">Passwort</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>

          {state?.error && <div className="admin-error">{state.error}</div>}

          <button type="submit" className="btn btn--admin" disabled={pending} style={{ justifyContent: "center" }}>
            {pending ? "Wird geprüft …" : "Einloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}
