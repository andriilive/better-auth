"use client";

import { useTranslations } from "@/context/I18nContext";
import { translatePath } from "@/lib/i18n";
import { default as NextLink } from "next/link"
import { usePathname } from "next/navigation";
import type { ComponentProps, FC } from "react";

type LinkProps = FC<ComponentProps<typeof NextLink> & {
  isTranslatible?: boolean
}>;

export const Link: LinkProps = ({ isTranslatible = true, href, ...props }) => {
  const pathname = usePathname();
  const { lang } = useTranslations();

  let className = props.className ?? "";
  const isExternal = typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));

  if (isExternal) {
    isTranslatible = false;
  }

  if (isTranslatible) {
    className += " link-external ";
    href = translatePath(lang, href ? href.toString() : "#");
  }

  const isCurrent = href === pathname;

  // if current add current class
  if (isCurrent && !isExternal) {
    className += " link-current ";
  }

  props = {
    ...props,
    className: className.trim(),
  }

  return <NextLink href={href} {...props} />
};
