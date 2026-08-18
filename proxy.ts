import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // next-intl erzeugt die Response (Locale-Handling)
  const response = intl(request);

  // Supabase-Session auffrischen und Cookies auf dieselbe Response schreiben
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Metadaten-Routen ohne Dateiendung (icon, apple-icon) von der i18n-Middleware ausnehmen
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|.*\\..*).*)"],
};
