'use client';

import {usePathname, useRouter} from "next/navigation";
import React, {createContext, type PropsWithChildren, useContext, useState} from "react";
import {
  getAlternates as _getAlternates,
  type I18nLocale,
  translatePath as _translatePath
} from "@/lib/i18n";

interface I18nContextType {
  lang: I18nLocale,
  switchLang: (lang: I18nLocale) => void,
  getAlternates: (
    pathname?: string,
    currentLang?: I18nLocale
  ) => { hrefLang: I18nLocale, href: string }[],
  translatePath: (
    newLang: I18nLocale, path?: string
  ) => string,
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({
  initialLocale,
  children
}: PropsWithChildren<{ initialLocale: I18nLocale }>) => {
  const [lang, setLang] = useState(initialLocale);
  const pathname = usePathname();
  const {replace} = useRouter();

  const getAlternates : I18nContextType['getAlternates'] = (path = pathname) => _getAlternates(path, lang);
  const translatePath : I18nContextType['translatePath'] = (newLang, path = pathname) => _translatePath(newLang, path, lang);

  const switchLang : I18nContextType['switchLang'] = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    replace(translatePath(newLang));
  };

  return (
    <I18nContext.Provider value={{lang, switchLang, getAlternates, translatePath}}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useTranslations must be used within I18nProvider");
  return context;
};
