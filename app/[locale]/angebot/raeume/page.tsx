import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Räume mieten" };

const SPECS = [
  ["Grösse", "ca. 65 m²"],
  ["Plätze", "bis 15 Personen"],
  ["Ausstattung", "Tische, Nähmaschinen, Werkzeuge"],
  ["Infrastruktur", "Küche, WC"],
  ["Anreise", "Parkplätze & ÖV in der Nähe"],
  ["Mindestdauer", "3 Stunden"],
  ["Mietpreis", "ab CHF 45 / Stunde"],
];

export default async function RaeumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Angebot", href: "/angebot" }, { label: "Räume mieten" }]}
        eyebrow="Räume mieten"
        title={<>Dein <span className="squiggle-word">Raum</span> für Kreatives.</>}
        lead="Du gibst selbst Kurse oder brauchst einen inspirierenden Ort für dein Projekt? Unsere hellen, gut ausgestatteten Räume kannst du stundenweise oder für ganze Tage mieten."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="split split--wide-l">
            <div className="split__media reveal"><div className="ph ph--sky" /></div>
            <div className="reveal d1">
              <span className="eyebrow">Für wen?</span>
              <h2 className="h2 mt-s">Kursleiter, Künstler &amp; Kreative</h2>
              <p className="lead mt-s">Ein Ort, der Konzentration und Freude gleichermassen fördert, mit allem, was du zum Arbeiten brauchst.</p>
              <ul className="checklist mt-m">
                <li>Viel Tageslicht &amp; ruhige Lage</li>
                <li>Grosse Arbeitstische &amp; Stühle</li>
                <li>Nähmaschinen &amp; Werkzeuge nutzbar</li>
                <li>Küche &amp; WC vor Ort</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="reveal">
              <span className="eyebrow">Ausstattung &amp; Konditionen</span>
              <h2 className="h2 mt-s">Auf einen Blick</h2>
              <dl className="specs mt-m">
                {SPECS.map(([dt, dd]) => (
                  <div className="spec" key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
                ))}
              </dl>
            </div>
            <div className="reveal d1">
              <div className="frost" style={{ padding: "34px 30px" }}>
                <h3 className="h3">Verfügbarkeit anfragen</h3>
                <p className="muted mt-s">Sag uns deinen Wunschtermin und wozu du den Raum brauchst, wir prüfen die Verfügbarkeit und melden uns rasch.</p>
                <div className="btn-row mt-m"><Link href="/kontakt" className="btn btn--coral">Raum anfragen <span className="arr">→</span></Link></div>
                <div className="masonry mt-m" style={{ columns: 2 }}>
                  {[["green", "t2"], ["yellow", "t1"], ["teal", "t1"], ["coral", "t2"]].map(([c, t], i) => (
                    <div className="masonry__item" key={i}><div className={`ph ph--${c} ${t}`} /></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
