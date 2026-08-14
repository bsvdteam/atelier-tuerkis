import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { fraunces, nunito, fredoka } from "../fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/layout/Intro";
import { RevealObserver } from "@/components/layout/RevealObserver";

export const metadata: Metadata = {
  title: {
    default: "Atelier Türkis · Kreativkurse & Workshops in Zürich",
    template: "%s · Atelier Türkis",
  },
  description:
    "Kreativkurse und Workshops für Kinder und Erwachsene in Zürich: Aquarell, Lettering, Nähen, Cyanotypie und mehr. Kleine Gruppen, persönliche Begleitung.",
};

// Setzt vor dem Paint die 'js'- und ggf. 'intro-seen'-Klasse (wie im Prototyp)
const bootScript = `document.documentElement.classList.add('js');try{if(localStorage.getItem('at_intro_seen')||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))document.documentElement.classList.add('intro-seen');}catch(e){}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${nunito.variable} ${fredoka.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <NextIntlClientProvider>
          <Intro />
          <Header />
          <main>{children}</main>
          <Footer />
          <RevealObserver />
          <Toaster position="top-center" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
