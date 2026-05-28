"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "作品展览", href: "/gallery" },
  { label: "羌绣商城", href: "/shop" },
  { label: "技艺教程", href: "/tutorials" },
  { label: "传承匠人", href: "/artisans" },
  { label: "关于羌绣", href: "/about" },
]

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg rounded-full"
            : "bg-transparent"
        )}
      >
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          scrolled ? "px-4 py-2" : "px-2 pl-5 py-2"
        )}>
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "text-lg font-medium tracking-tight transition-colors duration-300",
              scrolled || !isHome ? "text-foreground" : "text-white"
            )}
          >
            {"羌绣"}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-sm transition-colors",
                    isActive
                      ? (scrolled || !isHome ? "text-foreground" : "text-white")
                      : (scrolled || !isHome ? "text-foreground/60 hover:text-foreground" : "text-white/70 hover:text-white")
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={cn(
                        "absolute -bottom-0.5 left-0 right-0 h-[1.5px]",
                        scrolled || !isHome ? "bg-foreground" : "bg-white"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right icons */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/search"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                scrolled || !isHome ? "text-foreground/60 hover:text-foreground hover:bg-muted" : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              aria-label="搜索"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/cart"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                scrolled || !isHome ? "text-foreground/60 hover:text-foreground hover:bg-muted" : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              aria-label="购物车"
            >
              <ShoppingBag className="h-4 w-4" />
            </Link>
            <Link
              href="/user/profile"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                scrolled || !isHome ? "text-foreground/60 hover:text-foreground hover:bg-muted" : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              aria-label="个人中心"
            >
              <User className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "transition-colors md:hidden",
              scrolled || !isHome ? "text-foreground" : "text-white"
            )}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-1/2 -translate-x-1/2 top-20 z-50 w-[90%] max-w-3xl rounded-2xl bg-background p-6 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    pathname === "/" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {"首页"}
                </Link>
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
