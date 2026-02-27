"use client"

import Link from "next/link"
import { FadeIn } from "@/components/motion"

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="flex flex-col gap-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                  <span className="text-sm font-medium text-background">{"羌"}</span>
                </span>
                <span className="text-lg font-medium text-foreground">{"羌绣传承"}</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {"致力于保护和传承羌族传统刺绣艺术，让千年技艺在当代焕发新生。"}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{"导航"}</p>
              <nav className="flex flex-col gap-3" aria-label="Footer navigation">
                {[
                  { href: "/", label: "首页" },
                  { href: "/gallery", label: "作品展览" },
                  { href: "/shop", label: "羌绣商城" },
                  { href: "/tutorials", label: "技艺教程" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="line-reveal text-sm text-foreground/70 pb-0.5 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* About */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{"关于"}</p>
              <div className="flex flex-col gap-3 text-sm text-foreground/70">
                <span>{"国家级非物质文化遗产"}</span>
                <span>{"2008年列入名录"}</span>
                <span>{"3000年传承历史"}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{"联系"}</p>
              <div className="flex flex-col gap-3 text-sm text-foreground/70">
                <span>{"四川省阿坝藏族羌族自治州"}</span>
                <span>{"qiangxiu@heritage.cn"}</span>
                <span>{"028-8888-8888"}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>{"© 2026 羌绣传承平台 · 保护非物质文化遗产"}</p>
        </div>
      </div>
    </footer>
  )
}
