"use client"

import type { ReactNode } from "react"
import { ScrollProgressBar } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      {children}
      <BackToTop />
    </>
  )
}
