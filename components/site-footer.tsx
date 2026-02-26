import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground font-serif">{"羌"}</span>
              </div>
              <span className="text-lg font-semibold font-serif">{"羌绣传承"}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-background/70">
              {"致力于保护和传承羌族传统刺绣艺术，让千年技艺在当代焕发新生。"}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{"导航"}</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/" className="text-sm text-background/70 transition-colors hover:text-background">
                {"首页"}
              </Link>
              <Link href="/gallery" className="text-sm text-background/70 transition-colors hover:text-background">
                {"作品展览"}
              </Link>
              <Link href="/shop" className="text-sm text-background/70 transition-colors hover:text-background">
                {"羌绣商城"}
              </Link>
              <Link href="/tutorials" className="text-sm text-background/70 transition-colors hover:text-background">
                {"技艺教程"}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{"联系我们"}</h3>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <p>{"四川省阿坝藏族羌族自治州"}</p>
              <p>{"qiangxiu@heritage.cn"}</p>
              <p>{"028-8888-8888"}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-background/20 pt-6 text-center text-xs text-background/50">
          <p>{"2026 羌绣传承平台 - 保护非物质文化遗产"}</p>
        </div>
      </div>
    </footer>
  )
}
