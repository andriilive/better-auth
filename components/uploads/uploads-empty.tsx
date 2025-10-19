import { Link } from "@/components/i18n/link";
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { I18nLocale } from "@/lib/i18n";
import { Translations } from "@/lib/str";
import { ArrowUpRightIcon, LucideCloudy } from "lucide-react"

const str = new Translations({
  title: "You don't have any projects yet",
  description: "You don't have any projects yet. Upload own files or browse the library to get started.",
  "action.upload": "Upload image",
  "action.library": "Browse library",
  "action.login.description": "Already have an account?",
  "action.login.button": "Login",
});

str.add("cs", {
  title: "Ještě nemáte žádné projekty",
  description: "Ještě nemáte žádné projekty. Nahrajte vlastní soubory nebo procházejte knihovnu a začněte.",
  "action.upload": "Nahrát obrázek",
  "action.library": "Procházet knihovnu",
  "action.login.description": "Už máte účet?",
})

export function UploadsEmpty({
  locale,
}: {
  locale: I18nLocale
}) {
  const t = str.t(locale);

  return (
    <Empty className='border border-dashed md:py-16'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <LucideCloudy/>
        </EmptyMedia>
        <EmptyTitle>{t("title")}</EmptyTitle>
        <EmptyDescription>
          {t("description")}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className='flex gap-2'>
          <Button>{t("action.upload")}</Button>
          <Button variant='outline'>{t("action.library")}</Button>
        </div>
      </EmptyContent>
      <span>
        <span className='text-xs'>
          {t("action.login.description")}
        </span>
        <Button
          variant='link'
          asChild
          className='text-muted-foreground'
          size='sm'
        >
        <Link href='#'>
          {t("action.login.button")}{" "}<ArrowUpRightIcon/>
        </Link>
      </Button>

      </span>
    </Empty>
  )
}
