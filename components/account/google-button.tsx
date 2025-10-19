"use client";

import { signInWithGoogle } from "@/actions/google-auth-action";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  return (
    <Button variant='outline' className='w-full' asChild>
      <button onClick={signInWithGoogle}>
        <GoogleIcon className='size-4' aria-hidden={true}/>
        Continue with Google
      </button>
    </Button>
  );
}
