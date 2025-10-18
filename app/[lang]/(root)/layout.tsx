import {Navbar} from "@/components/navbar";
import Footer from "@/components/footer";
import { auth } from "@/lib/auth";
import type {SearchParams} from "next/dist/server/request/search-params";
import { headers } from "next/headers";
import { UserProvider } from "@/context/UserContext";

export default async function HomeLayout({children}: {
    children: React.ReactNode;
    params: Promise<{ lang: 'cs' | 'en' }>;
    searchParams?: Promise<SearchParams>;
}) {
   const session = await auth.api.getSession({
      headers: await headers()
   });
   const user = session?.user ?? null;
   return (
      <UserProvider user={user}>
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/>
      </UserProvider>
   );
}
