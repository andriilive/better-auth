import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/context/I18nContext";
import { getAlternates, type I18nLocale, locales } from "@/lib/i18n";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { type ReactNode } from "react";

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

export const metadata: Metadata = {
  title: "Better Auth Starter",
  description: "Next.js + Better Auth + Shadcn UI + Tailwind CSS",
  icons: {
    icon: "/logo.png",
  },
  alternates: getAlternates("/"),
};

type LangParam<T = string> = {
  lang: I18nLocale | T;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang })) as LangParam[];
}


export default async function Layout({ params, children }: {
  params: Promise<LangParam>,
  children: ReactNode
}) {
  const { lang } = await params as LangParam<never>;

  if (!lang || !locales.includes(lang)) {
    return notFound();
  }

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
        <main className='min-h-screen'>
          {children}
        </main>
      </I18nProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
