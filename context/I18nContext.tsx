'use client';

import {usePathname, useRouter} from "next/navigation";
import React, {createContext, useContext, useState} from "react";
import {getAlternates as _getAlternates, translatePath as _translatePath} from "@/lib/i18n";

const I18nContext = createContext(null);

export const I18nProvider = ({initialLocale, children}) => {
  const [lang, setLang] = useState(initialLocale);
  const pathname = usePathname();
  const {replace} = useRouter();

  const getAlternates = (path = pathname) => _getAlternates(path, lang);
  const translatePath = (newLang, path = pathname) => _translatePath(newLang, path, lang);

  const switchLang = (newLang) => {
    if (newLang !== lang) {
      setLang(newLang);
      replace(translatePath(newLang));
    }
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
