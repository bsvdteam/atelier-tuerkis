# lessons.md — Fehler- & Erkenntnis-Log · Atelier Türkis

**Append-only.** Einträge werden nie gelöscht. Überholtes wird mit `[SUPERSEDED]`
markiert und der Ersatz darunter angehängt. Diese Datei VOR dem Beginn einer neuen
Phase / vor dem Anfassen eines neuen Subsystems lesen. Stößt du auf eine neue,
nicht-offensichtliche Falle → sofort Eintrag anhängen, bevor die Session endet.

## FORMAT
```
### [YYYY-MM-DD] — [AREA] — [Kurztitel]
Context:  Was wurde gebaut.
Finding:  Das nicht-offensichtliche Problem (sah plausibel/kompilierte, war falsch).
Fix:      Was es löst — mit konkreten Datei-/API-/Befehlsnamen.
Takeaway: Die generalisierbare Regel.
```

---

### [2026-08-14] — SETUP — Stack weicht von der ursprünglichen Doku ab
Context:  Prototypen + project docs planten Next 14 + Sanity + Framer Motion; die
          real installierte package.json nutzt Next 16 + Supabase + GSAP + shadcn/Base UI.
Finding:  Die project-docs (TECH_STACK/PRD/etc.) waren teils veraltet und hätten eine
          KI in Richtung Sanity/Framer Motion gelenkt — Dependencies, die es nicht gibt.
Fix:      Root-CLAUDE.md + TECH_STACK.md auf den REALEN Stack gesetzt; CLAUDE.md hat
          bei Konflikten Vorrang vor älteren project-docs.
Takeaway: Immer die installierte package.json als Wahrheit nehmen, nicht die Planungsdoku.
          Vor Empfehlungen den tatsächlichen Stand verifizieren.

### [2026-08-14] — DEPS — Ungewöhnliche Paketversionen sind real
Context:  Ziel-Liste enthielt @base-ui/react ^1.7.0 und lucide-react ^1.31.0 — Versionen,
          die älter wirkten als erwartet.
Finding:  Beide existieren tatsächlich (Stand Aug 2026); Skepsis aus veraltetem Wissen.
Fix:      Bei unsicheren Versionen isoliert installieren und npm entscheiden lassen,
          statt aus dem Gedächtnis zu urteilen.
Takeaway: Versionen empirisch prüfen (npm/registry), nicht aus dem Trainingsstand ableiten.
