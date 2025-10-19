import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/context/I18nContext";
import { UserProvider } from "@/context/UserContext";
import { auth } from "@/lib/auth";
import { type I18nLocale, locales, parseLangParams, translatePath } from "@/lib/i18n";
import type { Metadata, ResolvingMetadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/app/globals.css";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const notoSansKR = Noto_Sans_KR({
  weight: [
    "300",
    "400",
    "500",
    "700",
  ],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});


export async function generateMetadata({ params, searchParams }: PageProps<"/[lang]">, parent: ResolvingMetadata): Promise<Metadata> {

  const { lang, t } = parseLangParams(await params);

  const metadata = {
    metadataBase: new URL(baseUrl),
    title: "Better Auth Starter",
    description: "Next.js + Better Auth + Shadcn UI + Tailwind CSS",
    icons: {
      icon: "/logo.png",
    },
    alternates: {
      languages: {
        cs: new URL(translatePath("cs", "/"), baseUrl).toString(),
        en: new URL(translatePath("en", "/"), baseUrl).toString(),
      },
    },
  };

  return metadata as Metadata
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Layout({ params, children }: LayoutProps<"/[lang]">) {
  const { lang } = parseLangParams(await params);

  if (!lang || !locales.includes(lang)) {
    return notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user ?? null;

  return (
    <html lang={lang} className={`${notoSansKR.variable}`} suppressHydrationWarning>
    <body className='antialiased'>
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} height={6} color='#000000'/>
      <I18nProvider initialLocale={lang as I18nLocale}>
        <Toaster richColors position='top-right'/>
        <UserProvider user={user}>
          <Navbar/>
          <main className='min-h-screen'>
            {children}
          </main>
        </UserProvider>
      </I18nProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
