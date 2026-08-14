import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactCta } from "@/components/ui/ContactCta";
import { ArtworkCard } from "@/components/ui/ArtworkCard";
import { relatedArtworks, teamBySlug } from "@/content";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Artwork, Locale } from "@/types";

export function ArtworkDetail({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  const title = getLocalised(artwork.title, locale);
  const artist = teamBySlug(artwork.instructor);
  const related = relatedArtworks(artwork.slug, 2);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: title },
        ]}
        eyebrow={getLocalised(artwork.category, locale)}
        title={title}
      />

      <section className="section--tight">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Bild */}
          <div className={cn("ph min-h-[360px] rounded-[32px]", `ph--${artwork.color}`)}>
            <span className="ph-label">{title}</span>
          </div>

          {/* Kauf-Box */}
          <aside>
            <div className="card">
              <div className="flex items-end justify-between">
                <span className="font-display text-3xl text-teal-ink">{artwork.price}</span>
                {artwork.availability && (
                  <span className="tag">{getLocalised(artwork.availability, locale)}</span>
                )}
              </div>

              <p className="mt-4 text-ink-soft">{getLocalised(artwork.teaser, locale)}</p>

              {artwork.specs && (
                <dl className="mt-5 divide-y divide-line">
                  {artwork.specs.map((s, i) => (
                    <div key={i} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-sm text-ink-mute">{getLocalised(s.label, locale)}</dt>
                      <dd className="text-right text-sm font-bold text-ink">
                        {getLocalised(s.value, locale)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {artist && (
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink-mute">
                  Von <span className="font-bold text-ink">{artist.name}</span>
                </p>
              )}

              <div className="mt-6">
                <ContactCta
                  whatsappText={`Hallo Atelier Türkis, ich interessiere mich für das Werk «${title}». Ist es noch verfügbar?`}
                  emailSubject={`Anfrage Werk ${title}`}
                />
              </div>
              <p className="mt-4 text-xs text-ink-mute">
                Abholung im Atelier oder Versand nach Absprache. Bezahlung vor Ort oder auf Rechnung.
              </p>
            </div>
          </aside>
        </div>

        {/* Beschreibung / Geschichte */}
        {(artwork.description || artwork.story) && (
          <div className="container-page mt-12 grid gap-8 md:grid-cols-2">
            {artwork.description && (
              <div>
                <h2 className="h3">Über das Werk</h2>
                <p className="mt-3 text-ink-soft">{getLocalised(artwork.description, locale)}</p>
              </div>
            )}
            {artwork.story && (
              <div>
                <h2 className="h3">Die Geschichte dahinter</h2>
                <p className="mt-3 text-ink-soft">{getLocalised(artwork.story, locale)}</p>
              </div>
            )}
          </div>
        )}

        {/* Ähnliche Werke */}
        {related.length > 0 && (
          <div className="container-page mt-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="h3">Das könnte dir auch gefallen</h2>
              <Link href="/shop" className="text-sm font-bold text-ink-mute hover:text-teal-deep">
                Alle Werke
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
