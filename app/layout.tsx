import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google"
import "./globals.css"

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
})

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
})

export const metadata: Metadata = {
  title: "羌绣传承 - 千年针线，指尖传承",
  description:
    "探索羌族传统刺绣艺术，欣赏精美羌绣作品，选购手工羌绣产品，学习羌绣技艺。传承千年非遗文化。",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#C23A2B",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${notoSerifSC.variable} antialiased`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
