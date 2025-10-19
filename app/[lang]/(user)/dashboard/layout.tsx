import AppHeader from "@/components/app-header"
import AppSidebar from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { UserProvider } from "@/context/UserContext"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const session = await auth.api.getSession({
      headers: await headers(),
   })

   if (!session) {
     return redirect("/sign")
   }

   const user = session?.user;
   return (
      <UserProvider user={user}>
         <SidebarProvider>
            <AppSidebar variant='inset' />
            <SidebarInset>
               <AppHeader user={user} />
               <main className='flex-1 p-6'>{children}</main>
            </SidebarInset>
         </SidebarProvider>
      </UserProvider>
   )
}

