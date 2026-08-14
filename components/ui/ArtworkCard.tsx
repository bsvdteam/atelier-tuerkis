import { Link } from "@/i18n/navigation";
import { getLocalised } from "@/lib/localise";
import { cn } from "@/lib/utils";
import type { Artwork, Locale } from "@/types";

export function ArtworkCard({ artwork, locale }: { artwork: Artwork; locale: Locale }) {
  return (
    <Link
      href={`/shop/${artwork.slug}`}
      className="card card--hover group flex flex-col overflow-hidden !p-0"
    >
      <div className={cn("ph relative h-56", `ph--${artwork.color}`)}>
        <span className="ph-label text-sm opacity-90">
          {getLocalised(artwork.title, locale)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="tag self-start">{getLocalised(artwork.category, locale)}</span>
        <h3 className="mt-3 font-display text-lg text-ink">
          {getLocalised(artwork.title, locale)}
        </h3>
        <p className="mt-1 flex-1 text-sm text-ink-soft">
          {getLocalised(artwork.teaser, locale)}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="font-display text-lg text-teal-ink">{artwork.price}</span>
          {artwork.availability && (
            <span className="text-xs font-semibold text-ink-mute">
              {getLocalised(artwork.availability, locale)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
