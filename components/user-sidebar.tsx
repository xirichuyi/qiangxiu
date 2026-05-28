"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User, Package, Heart, MapPin, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/data"

const navItems = [
  { label: "个人信息", href: "/user/profile", icon: User },
  { label: "我的订单", href: "/user/orders", icon: Package },
  { label: "我的收藏", href: "/user/favorites", icon: Heart },
  { label: "收货地址", href: "/user/address", icon: MapPin },
  { label: "账号设置", href: "/user/settings", icon: Settings },
]

export default function UserSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile: horizontal scrollable tabs */}
      <div className="w-full overflow-x-auto border-b border-border md:hidden scrollbar-hide">
        <div className="flex min-w-max px-6 py-3 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop: vertical sidebar */}
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="sticky top-32">
          {/* User avatar and name */}
          <div className="mb-8 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground">{"会员"}</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
