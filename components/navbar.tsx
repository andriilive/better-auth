"use client"

import {LangToggle} from "@/components/i18n/LangToggle"
import Logo from "@/components/Logo";
import Link from "@/components/i18n/Link";
import {ThemeToggle} from "@/components/theme/ThemeToggle"
import {useUser} from '@/context/UserContext'
import {GithubStars} from './github-stars'
import SignOutForm from './sign-out-form'
import {Button} from './ui/button'

export function Navbar() {
  const {user} = useUser()

  return (
    <header className="sticky top-0 z-100 flex justify-center">
      <div className="px-10 w-full pt-4">
        <nav className="flex items-center justify-between gap-4 sm:gap-6">
          <Logo />
          <Link href={'/'}>/</Link>
          <Link href={'/sign-in'}>/sign-in</Link>
          <Link href={'/sign-up'}>/sign-up</Link>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <SignOutForm/>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Button variant="outline">Login</Button>
                </Link>
                <Button asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            )}
            <GithubStars/>
            <ThemeToggle/>
            <LangToggle/>
          </div>
        </nav>
      </div>
    </header>
  )
}
