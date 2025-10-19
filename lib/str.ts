// typescript
import { defaultLocale, type I18nLocale } from "@/lib/i18n";

/*
 Usage:
 const trans = new Translations({ title: "App title", desc: "xxx" });
 trans.add("en", { title: "App title (EN)", desc: "desc (EN)" } satisfies Record<"title" | "desc", string>);
 const t = trans.t("en");
 t("title"); // autocomplete for "title" | "desc"
 */

export class Translations<Base extends Record<string, string>> {
  private defaultValues: Base;
  private data: Partial<Record<I18nLocale, Partial<Base>>> = {};

  constructor(defaultValues: Base) {
    this.defaultValues = defaultValues;
    this.data[defaultLocale] = defaultValues;
  }

  // Accepts partial or full translations; callers can use `satisfies Record<...>` for exact checking
  add(locale: Exclude<I18nLocale, "en">, keyValues: Partial<Record<keyof Base, string>>) {
    const prev = (this.data[locale] ?? {}) as Partial<Base>;
    this.data[locale] = { ...prev, ...(keyValues as Partial<Base>) };
  }

  // Returns a function typed to the known keys of the default values
  t(locale: I18nLocale = defaultLocale) {
    const localeData = (this.data[locale] ?? {}) as Partial<Base>;
    return (key: keyof Base) => {
      return (localeData[key] ?? this.defaultValues[key]) as string;
    };
  }

  // Optional: get full merged object for a locale (typed)
  get(locale: I18nLocale = defaultLocale): Partial<Base> {
    return { ...(this.defaultValues as Base), ...(this.data[locale] ?? {}) } as Partial<Base>;
  }
}
