import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <p className="font-display text-7xl text-teal-deep">404</p>
        <h1 className="h2">Diese Seite gibt es nicht</h1>
        <p className="lead max-w-md">
          Vielleicht wurde sie verschoben — oder ist gerade beim Trocknen. Zurück zum Anfang?
        </p>
        <Link href="/" className="btn btn--primary btn--lg">
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
