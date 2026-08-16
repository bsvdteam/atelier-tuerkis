import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Kontakt" };

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const wa = buildWhatsAppUrl("Hallo Elena, ich hätte eine Frage.");

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Kontakt" }]}
        eyebrow="Kontakt"
        title={<>Schreib uns <span className="squiggle-word">einfach</span>.</>}
        lead="Fragen zu einem Kurs, einem Werk oder einem Gutschein? Am schnellsten erreichst du uns per WhatsApp oder E-Mail. Für die Anmeldung genügt eine kurze Nachricht, wir melden uns rasch zurück."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid-3">
            <a className="pillar reveal" href={wa} target="_blank" rel="noopener noreferrer">
              <div className="pillar__icon" style={{ background: "var(--green)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 01-12 7.6L3 21l1.9-6a8.5 8.5 0 1116.1-3.5z" /></svg>
              </div>
              <h3>WhatsApp</h3>
              <p>Am schnellsten &amp; unkompliziert.</p>
              <span className="pillar__go">+41 79 656 11 26 <span className="arr">→</span></span>
            </a>
            <a className="pillar reveal d1" href="mailto:hallo@atelier-tuerkis.ch">
              <div className="pillar__icon" style={{ background: "var(--coral)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
              </div>
              <h3>E-Mail</h3>
              <p>Für ausführlichere Anliegen.</p>
              <span className="pillar__go">hallo@atelier-tuerkis.ch <span className="arr">→</span></span>
            </a>
            <a className="pillar reveal d2" href="tel:+41796561126">
              <div className="pillar__icon" style={{ background: "var(--violet)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.2a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" /></svg>
              </div>
              <h3>Telefon</h3>
              <p>Lieber persönlich? Ruf uns an.</p>
              <span className="pillar__go">+41 79 656 11 26 <span className="arr">→</span></span>
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="frost reveal" style={{ padding: 0, overflow: "hidden" }}>
            <div className="split" style={{ gap: 0 }}>
              <div style={{ padding: "40px 34px" }}>
                <span className="eyebrow">Besuch uns</span>
                <h2 className="h2 mt-s">Atelier Türkis</h2>
                <div className="contact-grid mt-m">
                  <div className="contact-card"><span className="label">Adresse</span><p>Wolfensbergstrasse 9<br />9113 Degersheim</p></div>
                  <div className="contact-card"><span className="label">Öffnungszeiten</span><p>Mi–Fr 9–18 Uhr<br />Sa 9–13 Uhr</p></div>
                  <div className="contact-card"><span className="label">Anreise</span><p>Parkplätze &amp; ÖV<br />in der Nähe</p></div>
                  <div className="contact-card"><span className="label">Social</span><p>Instagram<br />&amp; Facebook</p></div>
                </div>
              </div>
              <div className="split__media" style={{ borderRadius: 0, aspectRatio: "auto", minHeight: "340px" }}>
                <div className="ph ph--teal" style={{ position: "relative" }}><span className="ph-label">🗺️ Lageplan</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner reveal">
            <h2 className="h2">Häufige Fragen</h2>
            <p className="lead mt-s center maxw">Vorkenntnisse, Material, Anmeldung? Viele Antworten findest du direkt in unseren FAQ.</p>
            <div className="btn-row"><Link href="/faq" className="btn btn--outline btn--lg">Zu den FAQ <span className="arr">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
