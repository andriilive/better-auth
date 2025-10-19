"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/context/I18nContext";
import { localesConfig } from "@/lib/i18n";
import { ChevronDownIcon } from "lucide-react";

export function LangToggle() {
  const { switchLang, lang } = useTranslations();

  const locale = localesConfig.getByKey(lang);
  const locales = localesConfig.items;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>{locale.code.toUpperCase()}</span>
          <span>{locale.flag}</span>
          <ChevronDownIcon className="ml-2 h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.key}
            onClick={() => switchLang(locale.key)}
          >
            <span className="mr-2">{locale.flag}</span>
            {locale.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
