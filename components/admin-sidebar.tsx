"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Image,
  Video,
  Users,
  Newspaper,
  Calendar,
  Package,
  UserCog,
  Settings,
  Menu,
  X,
} from "lucide-react"

const navGroups = [
  {
    label: "概览",
    items: [
      { title: "仪表盘", href: "/admin", icon: LayoutDashboard },
      { title: "数据分析", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "内容管理",
    items: [
      { title: "商品管理", href: "/admin/products", icon: ShoppingBag },
      { title: "作品管理", href: "/admin/gallery", icon: Image },
      { title: "教程管理", href: "/admin/tutorials", icon: Video },
      { title: "匠人管理", href: "/admin/artisans", icon: Users },
      { title: "新闻管理", href: "/admin/news", icon: Newspaper },
      { title: "活动管理", href: "/admin/events", icon: Calendar },
    ],
  },
  {
    label: "业务管理",
    items: [
      { title: "订单管理", href: "/admin/orders", icon: Package },
      { title: "用户管理", href: "/admin/users", icon: UserCog },
    ],
  },
  {
    label: "系统",
    items: [
      { title: "系统设置", href: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
          羌
        </div>
        <span className="text-lg font-semibold tracking-tight">羌绣管理</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-xs uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border bg-background shadow-sm lg:hidden"
        aria-label="Toggle sidebar"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r bg-background transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background lg:block">
        {sidebarContent}
      </aside>
    </>
  )
}
