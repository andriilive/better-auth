"use client"

import Link from "@/components/i18n/Link"
import Logo from "@/components/Logo"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"
import SignOutForm from "./sign-out-form"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/dashboard")
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader className='flex items-center'>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='px-2 py-4'>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={isActive} size='lg'>
              <Link href='/dashboard' className={`${isActive ? "text-foreground" : "text-primary"} flex items-center gap-3`}>
                <div className='flex h-9 w-9 items-center justify-center rounded-md bg-primary/10'>
                  <LayoutDashboard className='h-5 w-5'/>
                </div>
                <span className={`text-sm font-medium`}>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignOutForm/>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
