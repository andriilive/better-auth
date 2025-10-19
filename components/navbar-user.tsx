"use client";

import Link from "@/components/i18n/Link";
import SignOutForm from "@/components/sign-out-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export function NavbarUser(){
  const { user } = useUser();
  return (
    <>
      {user ? (
        <>
          <Link
            href='/dashboard'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            <Button variant='outline'>Dashboard</Button>
          </Link>
          <SignOutForm/>
        </>
      ) : (
        <>
          <Link
            href='/sign-in'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            <Button variant='outline'>Login</Button>
          </Link>
          <Button asChild>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </>
      )}
    </>
  )
}
