"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ScrollProgressBar } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <>
      {!isAdmin && <ScrollProgressBar />}
      {children}
      {!isAdmin && <BackToTop />}
    </>
  )
}
