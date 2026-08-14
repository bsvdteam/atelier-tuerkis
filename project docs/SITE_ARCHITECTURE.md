# SITE_ARCHITECTURE.md — Atelier Türkis
### Seitenaufbau & Informationsarchitektur

**Status:** Vorschlag / Diskussionsgrundlage
**Basis:** Wunschliste der Inhaberin + Konzept (3-Säulen-Navigation) + bestehende Projekt-Docs (`PRD.md`, `CLAUDE.md`)
**Ziel:** Eine schlanke, konversionsstarke Website — jede Seite beantwortet spürbar: *„Warum genau dieses Atelier?"*

---

## 0. Leitprinzip — der wichtigste Satz

> **Warum soll jemand genau hierher kommen und nicht in ein anderes Kreativatelier?**

Dieser Satz ist die Messlatte für **jede** Seite. Er wird nicht behauptet, sondern *bewiesen* — durch Philosophie, persönliche Begleitung, Atmosphäre und Kursvielfalt.

**Arbeits-Positionierung (Platzhalter, von der Inhaberin zu bestätigen):**
> *„Ein heller, ruhiger Ort, an dem Kinder und Erwachsene in kleinen Gruppen und mit persönlicher Begleitung gestalten dürfen — hier zählt die Freude, nicht die Perfektion."*

**Mehrwert-Bausteine, die überall durchscheinen müssen:**
- Persönliche Begleitung · kleine Gruppen
- Freude am Gestalten statt Leistungsdruck
- Für Kinder **und** Erwachsene
- Grosse Vielfalt (Nähen, Buchbinden, Lettering, Cyanotypie, Keramik, Malen …)
- Heller, ruhiger, inspirierender Raum · hochwertiges Material

➡️ **Regel:** Jede Detailseite unten hat einen **„Mehrwert-Beweis"** — ein konkretes Element, das die Positionierung auf dieser Seite belegt.

---

## 1. Sitemap (Gesamtübersicht)

```
Home  (/)
│
├─ Atelier            (/atelier)              ── eine durchgehende Seite (Scroll-Abschnitte)
│     · Slogan / Haltung
│     · Geschichte & Willkommen
│     · Philosophie & Werte
│     · Die Räume (Bilder)
│     · Team
│     · Kontakt & Anfahrt
│
├─ Angebot            (/angebot)              ── Übersicht der 4 Bereiche
│     ├─ Erwachsene   (/angebot/erwachsene)   ── Kursliste
│     ├─ Kinder       (/angebot/kinder)       ── Kursliste
│     ├─ Gruppen      (/angebot/gruppen)      ── Info + Anfrage
│     └─ Räume mieten (/angebot/raeume)       ── Info + Anfrage
│           │
│           └─ Kurs-Detail (/kurs/[slug])     ── EIN universelles Template
│
├─ Kunst             (/kunst)                 ── Übersicht
│     ├─ Galerie      (/kunst/galerie)        ── Impressionen (Atmosphäre)
│     └─ Verkauf      (/kunst/verkauf)         ── Werke & Produkte
│           └─ Werk-Detail (/kunst/verkauf/[slug])
│
├─ Gutscheine        (/gutscheine)            ── schlanke, prominente Seite
├─ Kontakt           (/kontakt)               ── optional eigenständig (sonst Abschnitt in Atelier)
│
└─ Rechtliches / Footer
      ├─ FAQ          (/faq)
      ├─ Unterstützen (/unterstuetzen)        ── Gönner + Sponsoren (optional)
      ├─ Impressum    (/impressum)
      ├─ Datenschutz  (/datenschutz)
      └─ AGB          (/agb)
```

**Kern = 3 Säulen + Home.** Alles andere ist entweder ein **Unterpunkt**, ein **wiederverwendbarer Baustein** oder lebt im **Footer**. So bleibt die Navigation ruhig und der Kopf frei.

---

## 2. Navigationskonzept

### Hauptnavigation (Desktop)
```
Atelier Türkis        Atelier    Angebot ▾    Kunst ▾            Kontakt   DE | EN
                                 ├ Erwachsene ├ Galerie
                                 ├ Kinder     └ Verkauf
                                 ├ Gruppen
                                 └ Räume mieten
```

- **3 Säulen** (Atelier / Angebot / Kunst) — ruhig und merkbar.
- **Atelier** führt direkt auf die Seite (kein Dropdown).
- **Angebot** & **Kunst** öffnen ein schlankes Dropdown mit den Unterseiten.
- **Kontakt** rechts als dezenter, immer sichtbarer Anker (kein eigenes Säulen-Gewicht).
- **Sprachumschalter** DE | EN rechts.

### Mobile
- Burger-Menü, gleiche Struktur, Unterpunkte eingerückt/ausklappbar.

### Footer (auf jeder Seite)
- **Kontakt-Kurzblock:** Adresse · Telefon · E-Mail · Öffnungszeiten
- **Schnell-Links:** Angebot · Kunst · Gutscheine · FAQ
- **Social:** Instagram / Facebook
- **Rechtliches:** Impressum · Datenschutz · AGB
- (Kein Newsletter — siehe §8)

> **Gutscheine** sind laut Inhaberin „sehr beliebt" → prominent im **Footer** + als **sekundärer CTA auf Home**, nicht im Haupt-Nav-Balken vergraben.

---

## 3. Die Seiten im Detail

### 3.1 Home `/`
**Zweck:** In 3 Sekunden verstehen, was das ist — und den nächsten Schritt anbieten. Home ist die **Highlight-Bühne** aller Unterseiten, kein Sammelbecken für Inhalt.

**Abschnitte (in Reihenfolge):**
1. **Hero** — stimmungsvolles Atelier-Bild, kurzer Slogan, 2 CTAs: `Kurse entdecken` · `Kontakt`
2. **Willkommen** — 2–3 Sätze: Wer? Vision? Für wen? → verlinkt auf `/atelier`
3. **Aktuelle Kurse** — 3 Kurskarten (nächste/hervorgehobene) → `/angebot`
4. **Aktuelles** — kleiner Streifen: neue Kurse · Ferienangebote · freie Plätze (aus markierten Inhalten, **kein** Blog)
5. **Einblicke / Kunst** — 4–6 Bilder aus Galerie & Werken → `/kunst`
6. **Stimmen** — 2–3 Teilnehmer-Zitate (Vertrauen!)
7. **Gutscheine** — kurzer Teaser → `/gutscheine`
8. **Kontakt-CTA** — Adresse, WhatsApp, E-Mail, Öffnungszeiten

> **Mehrwert-Beweis:** Willkommen + Stimmen direkt auf Home — Haltung und soziale Bestätigung sofort sichtbar.

---

### 3.2 Atelier `/atelier`
**Zweck:** Vertrauen & emotionale Bindung. Eine durchgehende Seite mit Scroll-Abschnitten (kein Unter-Menü).

**Abschnitte:**
1. **Haltung / Slogan** — ein starker Satz
2. **Geschichte & Willkommen** — 3–5 Absätze: Wer seid ihr? Vision? Für wen? Warum gibt es euch?
3. **Philosophie & Werte** — Raum zum Abschalten · Ausprobieren · Kreativität verbindet · wertschätzende Atmosphäre · kleine Gruppen · individuelle Begleitung
4. **Die Räume** — Bild-Strecke (hell, freundlich, ruhig, inspirierend, hochwertiges Material, viel Platz), kurze Beschreibung
5. **Team** — Karten je Person: Foto · Ausbildung · Beruf · kreative Schwerpunkte · Erfahrung · persönliche Motivation
6. **Kontakt & Anfahrt** — Adresse · Telefon · E-Mail · Öffnungszeiten · Lageplan

> **Mehrwert-Beweis:** Team + Philosophie — die persönliche Begleitung bekommt Gesichter.

---

### 3.3 Angebot — Übersicht `/angebot`
**Zweck:** Ordnung ins grosse Angebot bringen — Besucher in 1 Klick zum richtigen Bereich.

**Aufbau:** 4 grosse Einstiegskacheln:
| Bereich | Route | Inhalt |
|---|---|---|
| Erwachsene | `/angebot/erwachsene` | Kursliste |
| Kinder | `/angebot/kinder` | Kursliste |
| Gruppen | `/angebot/gruppen` | Firmen/Vereine/Feiern — Anfrage |
| Räume mieten | `/angebot/raeume` | Vermietung — Anfrage |

Optional darunter: **„Aktuelle Termine"** (kompakte Liste der nächsten Kursdaten, quer über alle Bereiche — ersetzt den separaten „Kurskalender", siehe §9).

---

### 3.4 Erwachsene `/angebot/erwachsene`  ·  Kinder `/angebot/kinder`
**Zweck:** Alle Kurse eines Publikums scannbar auflisten.

**Aufbau:**
- Kurze Einleitung (1–2 Sätze, publikumsgerecht)
- **Filter** (optional, nur wenn viele Kurse): Technik / Ferien / Termin
- **Kurskarten** → verlinken auf das universelle Kurs-Detail

**Kinder-Bereich** deckt zusätzlich ab: Kreativwerkstatt Mittwoch (4–7 / 8–12), Samstagkurse, Ferienkurse, Kindergeburtstage, „Stempel selber herstellen".
**Erwachsene** deckt ab: Nähen, Buchbinden, Lettering, Cyanotypie, Zeichnen, Malen, Schachteln, Tag der offenen Tür, Schnuppernachmittag.

> Jeder einzelne Kurs ist **kein** Sonderfall, sondern eine Instanz des gleichen Templates (§3.5).

---

### 3.5 Kurs-Detail `/kurs/[slug]`  ⭐ Universelles Template
**Zweck:** Alle Kursinfos + **eine** klare Handlung: anfragen. Ein Template für *alle* Kurse (Kinder wie Erwachsene) — nur mit Daten befüllt.

**Feste Struktur (immer gleich):**
1. **Kopf:** Technik-/Bereich-Tag · Titel · 1 starkes Bild
2. **Beschreibung:** Was lernt man, was erwartet einen
3. **Eckdaten-Block** (einheitlich):
   - Zielgruppe / Alter
   - Level (Anfänger · Fortgeschritten · Alle)
   - Dauer (pro Termin + Anzahl Termine)
   - Gruppengrösse
   - Preis (CHF) — oder „auf Anfrage"
   - Voraussetzungen
   - Material (inklusive / mitbringen)
   - **Nächste Termine**
4. **Leitung:** Foto + Kurzprofil (Verweis aufs Team)
5. **Bilder:** 2–4 Eindrücke aus dem Kurs
6. **Anfrage-CTA** (mobil klebend): `Jetzt anfragen` → WhatsApp (vorformuliert) + E-Mail
7. **Kurz-FAQ:** 2–3 relevante Fragen (aus zentraler FAQ gezogen)
8. **Ähnliche Kurse:** 2 Vorschläge

> **Anmeldung = WhatsApp / E-Mail / Telefon.** Kein Online-Kursformular (siehe §8).
> **Mehrwert-Beweis:** Material-inklusive-Angabe + „auf Freude, nicht Perfektion" im Beschreibungston.

---

### 3.6 Gruppen `/angebot/gruppen`
**Zweck:** Firmen, Vereine, Freundesgruppen, Geburtstage abholen.
**Inhalt:** bis 15 Personen · individuelle Themen · Dauer · **Preis auf Anfrage** · Beispiel-Bilder · Anfrage-CTA. Keine Detailseiten nötig — eine gute Seite genügt.

---

### 3.7 Räume mieten `/angebot/raeume`
**Zweck:** Raum an Kursleiter, Künstler, Kreative vermieten.
**Inhalt:** Grösse · Ausstattung (Tische, Nähmaschinen, Werkzeuge) · Küche · WC · Parkplätze · ÖV · Mietpreise · Mindestdauer · Bilder · Anfrage-CTA.

---

### 3.8 Kunst — Übersicht `/kunst`
**Zweck:** Einstieg in die visuelle Welt des Ateliers. Klar getrennt:
| Unterseite | Route | Wesen |
|---|---|---|
| **Galerie** | `/kunst/galerie` | **Impressionen** — Atmosphäre, keine Verkaufsansicht |
| **Verkauf** | `/kunst/verkauf` | **Werke & Produkte** zum Kaufen (Anfrage) |

---

### 3.9 Galerie (Impressionen) `/kunst/galerie`
**Zweck:** Stimmung verkaufen, nicht Bastelarbeiten. „Das verkauft viel mehr als Bilder von Bastelarbeiten."
**Aufbau:** grosses Bildraster, filterbar nach: Kinder · Erwachsene · Ferienkurse · Workshops · Atelier.
**Motive:** lachende Kinder, Arbeitstische, Farben, Material, Details, Atmosphäre.
Kein Detail-Klick nötig (Lightbox genügt).

> **Mehrwert-Beweis:** echte Atmosphäre statt Stockfotos — man *sieht* den Ort.

---

### 3.10 Verkauf (Werke & Produkte) `/kunst/verkauf`
**Zweck:** Verkäufliche Werke & Eigenproduktionen zeigen — **ohne** Online-Shop.
**Aufbau:** Bildraster mit Titel, Technik, Preis-Badge (oder „Preis auf Anfrage").
**Detailseite `/kunst/verkauf/[slug]`:** Bilder · Titel · Technik · Masse · Jahr · Beschreibung · Preis · CTA `Interesse? Auf WhatsApp schreiben` (+ E-Mail).
**Material / Kindergartenbedarf** (Kreativmaterial, Eigenproduktionen, Geschenkideen): als **Kategorie** hier integrierbar, Bestellung per E-Mail — **kein** Warenkorb/Checkout. *(Siehe offene Entscheidung §9.)*

---

### 3.11 Gutscheine `/gutscheine`
**Zweck:** Beliebtes Geschenk → starker Conversion-Hebel. Bewusst schlank.
**Inhalt:** Kurz-Text · Arten (Kurs- · Geburtstags- · Weihnachtsgutschein) · so bestellt man (WhatsApp/E-Mail). Prominent auf Home & im Footer verlinkt.

---

### 3.12 Kontakt `/kontakt`  *(optional eigenständig)*
**Zweck:** Alle Wege bündeln.
**Inhalt:** Adresse · Telefon · E-Mail · WhatsApp · Öffnungszeiten · Lageplan.
**Empfehlung:** Standardmässig als **Abschnitt in `/atelier` + Footer** — eigene Seite nur, wenn Lageplan/Formular es rechtfertigen. Direkte Kanäle (WhatsApp/E-Mail/Telefon) schlagen jedes Formular. *(Kontaktformular = offene Entscheidung §9.)*

---

### 3.13 FAQ `/faq`
**Zweck:** Hürden abbauen, Kontaktaufkommen senken.
**Inhalt:** Vorkenntnisse? · Material inklusive? · Was mitbringen? · Kurs verschenken? · Parkplätze? · Bei Krankheit? · Ablauf der Anmeldung?
Zusätzlich als **Kurz-FAQ-Baustein** auf Kurs-Detailseiten wiederverwenden.

---

### 3.14 Unterstützen `/unterstuetzen`  *(optional / niedrige Priorität)*
Gönner + Sponsoren zusammengefasst:
- **Gönner:** warum Unterstützung wichtig ist (Förderung Kreativität, Kinderangebote, Material) · einmalige Spende / jährlicher Beitrag
- **Sponsoren:** Logo-Wand mit Dankeschön · „Was erhalten Sponsoren?" · Kontakt

> Bewusst **eine** Seite statt zwei — hält die Struktur schlank. Kann in Phase 2 nachgezogen werden.

---

## 4. Wiederverwendbare Bausteine (Komponenten)

Diese Elemente werden **einmal** gebaut und überall eingesetzt — das hält die Seite „lean":

| Baustein | Eingesetzt auf |
|---|---|
| **Kurskarte** | Home, Angebot-Bereiche |
| **Eckdaten-Block** (Alter/Dauer/Preis…) | jede Kurs-Detailseite |
| **Anfrage-CTA** (WhatsApp + E-Mail) | Kurse, Werke, Gruppen, Räume |
| **Bildraster / Lightbox** | Galerie, Räume, Werke |
| **Stimmen / Testimonials** | Home, Atelier, Kurs-Detail |
| **Team-Karte** | Atelier, Kurs-Detail (Leitung) |
| **Aktuelles-Streifen** | Home, Angebot-Übersicht |
| **Footer + Kontaktblock** | jede Seite |

---

## 5. Inhaltsmodell (was wird gepflegt / CMS)

Damit das Team ohne Entwickler pflegen kann — klar definierte Inhaltstypen:

| Typ | Wichtigste Felder |
|---|---|
| **Kurs** | Titel, Slug, Zielgruppe (Kinder 4–7 / 8–12 / Erwachsene / Ferien / Gruppen), Technik, Kurz-/Langbeschrieb, Alter, Dauer, Gruppengrösse, Preis, Voraussetzungen, Material, **Termine[]**, Bilder[], Leitung→Team, Status (offen/wenige Plätze/ausgebucht), Featured |
| **Werk / Produkt** | Titel, Slug, Technik, Masse, Jahr, Beschreibung, Urheber (Atelier/Teilnehmer), Preis \| „auf Anfrage", zumVerkauf, Bilder[] |
| **Impression** (Galeriefoto) | Bild, Kategorie (Kinder/Erwachsene/Ferien/Workshop/Atelier), Alt-Text |
| **Teammitglied** | Foto, Name, Ausbildung, Beruf, Schwerpunkte, Erfahrung, Motivation, Reihenfolge |
| **Stimme** (Testimonial) | Zitat, Autor, Kontext (Kind/Erwachsen), Featured |
| **Atelier-Seite** (Singleton) | Slogan, Geschichte, Werte[], Philosophie, Räume-Bilder[] |
| **Einstellungen** (Singleton) | Adresse, Telefon, E-Mail, WhatsApp, Öffnungszeiten, Social-Links, Lageplan |
| **Aktuelles** (optional) | Titel, Text, Link, Datum |

> **Termine** liegen als Feld am Kurs — daraus speist sich sowohl die Kursseite als auch die „Aktuelle Termine"-Liste. **Kein** separates Kalender-System.

---

## 6. Der „Mehrwert-Faden" pro Seite (Checkliste)

Jede Seite muss mindestens **ein** Element haben, das die Positionierung belegt:

| Seite | Mehrwert-Beweis |
|---|---|
| Home | Willkommen-Haltung + Stimmen |
| Atelier | Team mit Gesichtern + gelebte Werte |
| Angebot / Kurse | Vielfalt sichtbar + „Material inklusive", kleine Gruppen |
| Kurs-Detail | Ton „Freude statt Perfektion" + persönliche Leitung |
| Galerie | echte Atmosphäre statt Stockbilder |
| Verkauf | Originale aus genau diesem Ort |
| Gruppen/Räume | individuelle, persönliche Betreuung |

---

## 7. Technische Architektur (kurz)

Aufbauend auf den bestehenden Docs (`TECH_STACK.md`, `CLAUDE.md`) — die neue IA ändert **Struktur**, nicht den Stack:

- **Next.js (App Router)** — Routen 1:1 wie Sitemap (§1).
- **i18n DE/EN** — DE Standard (`/angebot`), EN gespiegelt (`/en/offer` …). EN-Felder fallen still auf DE zurück.
- **CMS** für alle redaktionellen Inhalte (§5) — Seiten als SSG/ISR vorgerendert → schnell & günstig.
- **Rendering:** statisch generiert + periodische Revalidierung (Kurse/Werke). Keine Client-Fetches für redaktionellen Inhalt.
- **Conversion ohne Backend-Formular:** WhatsApp-/E-Mail-Deeplinks mit vorformulierter Nachricht (Kurs-/Werktitel eingesetzt).
- **Performance/Bilder:** optimierte Bildkomponente mit `sizes`/`priority`, WebP, Lazy-Load — Ziele aus `PRD.md` §6 bleiben gültig.
- **Route-Übersicht:**

| Seite | Route (DE) |
|---|---|
| Home | `/` |
| Atelier | `/atelier` |
| Angebot (Übersicht) | `/angebot` |
| Erwachsene | `/angebot/erwachsene` |
| Kinder | `/angebot/kinder` |
| Gruppen | `/angebot/gruppen` |
| Räume mieten | `/angebot/raeume` |
| Kurs-Detail | `/kurs/[slug]` |
| Kunst (Übersicht) | `/kunst` |
| Galerie | `/kunst/galerie` |
| Verkauf | `/kunst/verkauf` |
| Werk-Detail | `/kunst/verkauf/[slug]` |
| Gutscheine | `/gutscheine` |
| Kontakt | `/kontakt` *(optional)* |
| FAQ | `/faq` |
| Unterstützen | `/unterstuetzen` *(optional)* |
| Impressum / Datenschutz / AGB | `/impressum` · `/datenschutz` · `/agb` |

---

## 8. Bewusst NICHT enthalten (Scope-Grenze)

Explizit ausgeschlossen (bestätigt):
- ❌ **Newsletter** / E-Mail-Abo
- ❌ **Blog** / redaktioneller Feed (→ „Aktuelles" als schlanker Home-Abschnitt ersetzt das)
- ❌ **Online-Kursformular** (Anmeldung = WhatsApp / E-Mail / Telefon)
- ❌ **Online-Shop** / Warenkorb / Checkout / Online-Bezahlung
- ❌ Benutzerkonten / Login · Buchungskalender mit Echtzeit-Verfügbarkeit

→ Kommt so ein Wunsch später: auf die **Phase-2-Liste**, nicht spontan einbauen.

---

## 9. Offene Entscheidungen (bitte klären)

| # | Frage | Empfehlung |
|---|---|---|
| 1 | **Community Canvas** — im aktuellen Prototyp vorhanden, in der neuen Wunschliste nicht erwähnt. Behalten? | Als Engagement-Feature unter **Kunst** behalten *oder* streichen, um lean zu bleiben. **Tendenz: streichen**, bis es strategisch gewollt ist. |
| 2 | **Material / Kindergartenbedarf** — eigener Bereich oder als Kategorie unter Verkauf? | Als **Kategorie unter `/kunst/verkauf`** mit Bestellung per E-Mail (kein Shop). |
| 3 | **Kontaktformular** — einfaches Formular oder nur Direkt-Kanäle? | Nur **Direkt-Kanäle** (WhatsApp/E-Mail/Telefon). Formular nur, wenn ausdrücklich gewünscht. |
| 4 | **Kurskalender** — eigene Seite oder Termin-Liste? | **Termin-Liste** aus den Kursdaten (§5), keine separate Kalender-Seite. |
| 5 | **Gutscheine** — eigene Seite (empfohlen) oder nur Abschnitt? | **Eigene schlanke Seite** + Teaser auf Home/Footer. |
| 6 | **Unterstützen (Gönner/Sponsoren)** — Launch oder Phase 2? | **Phase 2**, sofern nicht zum Start nötig. |
| 7 | **EN-Version** — zum Launch oder später? | Struktur EN-ready bauen, Inhalte ggf. gestaffelt. |

---

*Dieses Dokument beschreibt die Ziel-Architektur. Bei Konflikt mit `PRD.md`/`CLAUDE.md` gewinnt die neue 3-Säulen-IA — Abweichung bitte dort nachziehen.*
