import {defaultLocale, type I18nLocale, locales} from "@/lib/i18n";
import {match} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {NextRequest, NextResponse} from "next/server";

const matchLocale = (request: NextRequest) => {
  const negotiator = new Negotiator({
    headers: Object.fromEntries(request.headers),
  })
  const languages = negotiator.languages()
  // Match the best locale (may be 'en-US', 'cs-CZ', etc.)
  const matched = match(languages, locales, defaultLocale)
  // Always return the base language only (e.g., 'en', 'cs')
  const base = matched.split('-')[0]

  return locales.includes(base as I18nLocale) ? base : defaultLocale
}


export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // 301 redirect for all /en, /en/, or /en/anything to / or /anything
  if (pathname === '/en' || pathname === '/en/') {
    request.nextUrl.pathname = '/';
    return NextResponse.redirect(request.nextUrl, 301);
  }
  if (pathname.startsWith('/en/')) {
    // Remove '/en' prefix
    request.nextUrl.pathname = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(request.nextUrl, 301);
  }

  // Check if the pathname is exactly '/'
  if (pathname === '/') {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = matchLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  return;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}

