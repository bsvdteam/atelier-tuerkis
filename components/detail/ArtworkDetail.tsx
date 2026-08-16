import { Link } from "@/i18n/navigation";
import { ArtworkGallery } from "@/components/detail/ArtworkGallery";
import { getProducts, getTeamMember } from "@/lib/db";
import { getLocalised } from "@/lib/localise";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/whatsapp";
import type { Artwork, Locale, PlaceholderColor } from "@/types";

const PALETTE: PlaceholderColor[] = ["sky", "teal", "green", "violet"];

export async function ArtworkDetail({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  const title = getLocalised(artwork.title, locale);
  const artist = await getTeamMember(artwork.instructor);
  const related = (await getProducts()).filter((a) => a.slug !== artwork.slug).slice(0, 3);
  const galleryColors = [artwork.color, ...PALETTE.filter((c) => c !== artwork.color)].slice(0, 4);

  return (
    <>
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <p className="crumbs reveal" style={{ marginBottom: "26px" }}>
            <Link href="/">Home</Link> · <Link href="/shop">Shop</Link> · {title}
          </p>

          <div className="kunst-layout">
            <ArtworkGallery colors={galleryColors} images={artwork.images} />

            <aside className="artinfo reveal d1">
              <span className={`tag tag--${artwork.color}`}>{getLocalised(artwork.category, locale)}</span>
              <h1 className="artinfo__title">{title}</h1>
              {artwork.availability && (
                <span className="spots"><span className="spots__dot" />{getLocalised(artwork.availability, locale)}</span>
              )}
              <p className="lead" style={{ marginTop: "14px" }}>{getLocalised(artwork.teaser, locale)}</p>

              <div className="artinfo__buy">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span className="muted" style={{ fontWeight: 700 }}>Preis</span>
                  <span className="artprice">{artwork.price}</span>
                </div>
                <a href={buildWhatsAppUrl(`Hallo Elena, ich interessiere mich für das Werk «${title}». Ist es noch verfügbar?`)} target="_blank" rel="noopener noreferrer" className="btn btn--coral" style={{ width: "100%", justifyContent: "center" }}>
                  Interesse? Auf WhatsApp schreiben
                </a>
                <a href={buildMailtoUrl(`Anfrage Werk ${title}`)} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}>
                  Per E-Mail anfragen
                </a>
                <p className="artnote">Abholung im Atelier oder Versand nach Absprache. Bezahlung vor Ort oder auf Rechnung.</p>
              </div>

              {artwork.specs && (
                <dl className="specs" style={{ marginTop: "20px" }}>
                  {artwork.specs.map((s, i) => (
                    <div className="spec" key={i}><dt>{getLocalised(s.label, locale)}</dt><dd>{getLocalised(s.value, locale)}</dd></div>
                  ))}
                  {artist && <div className="spec"><dt>Urheber:in</dt><dd>{artist.name}</dd></div>}
                </dl>
              )}
            </aside>
          </div>
        </div>
      </section>

      {(artwork.description || artwork.story) && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="frost reveal" style={{ padding: "44px 34px" }}>
              <div className="split" style={{ alignItems: "start", gap: "40px" }}>
                {artwork.description && (
                  <div>
                    <span className="eyebrow">Über das Werk</span>
                    <h2 className="h3 mt-s">{title}</h2>
                    <p className="mt-s muted">{getLocalised(artwork.description, locale)}</p>
                  </div>
                )}
                {artwork.story && (
                  <div>
                    <span className="eyebrow">Die Geschichte dahinter</span>
                    <h2 className="h3 mt-s">{getLocalised(artwork.category, locale)}</h2>
                    <p className="mt-s muted">{getLocalised(artwork.story, locale)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stack-head reveal">
            <div><span className="eyebrow">Vielleicht auch schön</span><h2 className="h2 mt-s">Weitere Werke</h2></div>
            <Link href="/shop" className="btn btn--outline">Alle Werke <span className="arr">→</span></Link>
          </div>
          <div className="grid grid-3">
            {related.map((a, i) => (
              <Link key={a.slug} className={`card reveal${i === 1 ? " d1" : i === 2 ? " d2" : ""}`} href={`/shop/${a.slug}`}>
                <div className="card__media"><div className={`ph ph--${a.color}`} /></div>
                <div className="card__body">
                  <span className={`tag tag--${a.color}`}>{getLocalised(a.category, locale)}</span>
                  <h3 className="card__title">{getLocalised(a.title, locale)}</h3>
                  <p className="card__desc">{getLocalised(a.teaser, locale)}</p>
                  <div className="card__foot"><span className="card__price">{a.price}</span><span className="card__arrow">→</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
