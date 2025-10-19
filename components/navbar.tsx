import { LangToggle } from "@/components/i18n/LangToggle"
import Logo from "@/components/Logo";
import Link from "@/components/i18n/Link";
import { NavbarUser } from "@/components/navbar-user";
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { GithubStars } from "./github-stars"

export function Navbar() {

  return (
    <header className="sticky top-0 z-100 flex justify-center">
      <div className="px-10 w-full pt-4">
        <nav className="flex items-center justify-between gap-4 sm:gap-6">
          <Logo />
          <Link href={"/"}>/</Link>
          <Link href={"/sign-in"}>/sign-in</Link>
          <Link href={"/sign-up"}>/sign-up</Link>
          <div className="flex items-center gap-2">
            <NavbarUser />
            <GithubStars/>
            <ThemeToggle/>
            <LangToggle/>
          </div>
        </nav>
      </div>
    </header>
  )
}
