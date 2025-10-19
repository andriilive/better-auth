"use client";

import { Link } from "@/components/i18n/link";
import SignOutForm from "@/components/sign-out-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { UserIcon } from "lucide-react";

export function NavbarUser(){
  const { user } = useUser();
  return (
    <>
      {user ? (
        <>
          <Link
            href='/user'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            <Button variant='outline'>user</Button>
          </Link>
          <SignOutForm/>
        </>
      ) : (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>
                <UserIcon className='size-3.5 mr-0.5'/> Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  <span>This action cannot be undone. Are you sure you want to permanently delete this file from our servers?</span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type='submit'>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
