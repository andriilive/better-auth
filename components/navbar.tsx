import { LangToggle } from "@/components/i18n/LangToggle"
import { NavbarUser } from "@/components/navbar-user";
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { GithubStars } from "./github-stars"

export function Navbar() {

  return (
    <header className='sticky top-0 z-100 flex justify-center'>
      <div className='px-6 w-full pt-5'>
        <nav className='flex items-center justify-between gap-4 sm:gap-6'>
          <GithubStars/>
          <div className='flex items-center gap-2'>
            <NavbarUser/>
            <ThemeToggle/>
            <LangToggle/>
          </div>
        </nav>
      </div>
    </header>
  )
}
