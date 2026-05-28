"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const pageTitles: Record<string, string> = {
  "/admin": "仪表盘",
  "/admin/analytics": "数据分析",
  "/admin/products": "商品管理",
  "/admin/products/new": "添加商品",
  "/admin/gallery": "作品管理",
  "/admin/tutorials": "教程管理",
  "/admin/artisans": "匠人管理",
  "/admin/news": "新闻管理",
  "/admin/events": "活动管理",
  "/admin/orders": "订单管理",
  "/admin/users": "用户管理",
  "/admin/settings": "系统设置",
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.startsWith("/admin/products/") && pathname !== "/admin/products/new") return "编辑商品"
  if (pathname.startsWith("/admin/orders/")) return "订单详情"
  return "管理后台"
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />

      {/* Main content area */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-6">
          {/* Left spacer for mobile hamburger */}
          <div className="lg:hidden w-10" />
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">管理员</span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                管
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
