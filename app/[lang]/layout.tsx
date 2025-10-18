import {ThemeProvider} from "@/components/theme/ThemeProvider";
import {Toaster} from "@/components/ui/sonner";
import {I18nProvider} from "@/context/I18nContext";
import {locales} from "@/lib/i18n";
import type {Metadata} from "next";
import {Noto_Sans_KR} from 'next/font/google';
import "@/app/globals.css";
import {notFound} from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const notoSansKR = Noto_Sans_KR({
  weight: [
    '300',
    '400',
    '500',
    '700'
  ],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Better Auth Starter",
  description: "Next.js + Better Auth + Shadcn UI + Tailwind CSS",
  icons: {
    icon: '/logo.png'
  }
};

export function generateStaticParams() {
  return [
    {lang: 'en'},
    {lang: 'cs'}
  ];
}

export default async function RootLayout({children, params}: {
  children: React.ReactNode,
  params: Promise<{ lang: 'en' | 'cs' }>
}) {
  const {lang} = await params;

  if (!lang || !locales.includes(lang)) {
    return notFound()
  }

  return (
    <html lang={lang} className={`${notoSansKR.variable}`} suppressHydrationWarning>
    <body className="antialiased">
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} height={6} color="#000000"/>
      <I18nProvider initialLocale={lang}>
        <Toaster richColors position="top-right"/>
        <main className="min-h-screen">
          {children}
        </main>
      </I18nProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
