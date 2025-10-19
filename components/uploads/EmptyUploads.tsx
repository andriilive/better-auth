import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ArrowUpRightIcon, LucideCloudy } from "lucide-react"

export const str = {
  "EmptyUploads": {
    title: "You don't have any projects yet",
    description: "You don't have any projects yet. Upload own files or browse the library to get started.",
    "action.upload": "Upload image",
    "action.library": "Browse library",
    "action.login.description": "Already have an account? ",
    "action.login.button": "Login",
  },
};

export const getTranslations = (ns: keyof typeof str) => {

  if (!(ns in str)) {
    throw new Error(`Namespace ${ns} not found in translations.`);
  }

  return {
    t: (key: keyof typeof str[typeof ns]) => {
      if (!(key in str[ns])) {
        throw new Error(`Key ${key} not found in namespace ${ns}.`);
      }
      return str[ns][key];
    },
  }
}

export function EmptyUploads() {
  const { t } = getTranslations("EmptyUploads");

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
        <a href='#'>
          {t("action.login.button")} <ArrowUpRightIcon/>
        </a>
      </Button>

      </span>
    </Empty>
  )
}
