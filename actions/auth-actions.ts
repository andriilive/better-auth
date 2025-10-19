"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function signOut() {
   try {
      const res = await auth.api.signOut({
         headers: await headers(),
      })
      return {
         status: true,
         data: res,
      };
   } catch (error) {
      console.error(error);
      return {
         status: false,
         error,
      };
   }
}
