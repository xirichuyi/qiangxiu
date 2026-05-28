"use client"

import type { ReactNode } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import UserSidebar from "@/components/user-sidebar"
import { PageTransition } from "@/components/page-transition"

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageTransition>
        <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:gap-12">
            <UserSidebar />
            <main className="mt-6 flex-1 md:mt-0">{children}</main>
          </div>
        </div>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}
