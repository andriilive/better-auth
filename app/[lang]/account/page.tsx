import { Link } from "@/components/i18n/link";
import type { I18nLocale } from "@/lib/i18n";
import { Translations } from "@/lib/str";

const userActions = ["login", "register"] as const;

const str = new Translations({
  "user.login": "Login",
  "user.register": "Register",
});

str.add("cs", {
  "user.login": "Přihlásit se",
  "user.register": "Registrovat se",
});

export default async function AccountPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const t = str.t(lang as I18nLocale);

  return (
    <div>
      {userActions.map((actionLabel) => (
        <Link href={`/account?q=${actionLabel}`} key={actionLabel} className='block underline my-2'>
          {t(`user.${actionLabel}`)}
        </Link>
      ))}
    </div>
  )
}
