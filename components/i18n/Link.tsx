'use client';

import {useTranslations} from "@/context/I18nContext";
import {translatePath} from "@/lib/i18n";
import {default as NextLink} from 'next/link'
import {usePathname} from "next/navigation";
import type {ComponentProps, FC} from "react";

type LinkProps = FC<ComponentProps<typeof NextLink> & {
  isTranslatible?: boolean
}>;

const Link: LinkProps = ({isTranslatible = true, href, ...props}) => {
  const pathname = usePathname();
  const {lang} = useTranslations();

  if (isTranslatible) {
    href = translatePath(lang, href ? href.toString() : '#');
  }

  const isCurrent = href === pathname;

  const isExternal = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));
  let className = props.className ?? '';
  // if current add current class
  if (isCurrent) {
    className += ' link-current ';
  }
  if (isExternal) {
    className += ' link-external ';
  }

  props = {
    ...props,
    className: className.trim(),
  }

  return <NextLink href={href} {...props} />
}

export default Link;
