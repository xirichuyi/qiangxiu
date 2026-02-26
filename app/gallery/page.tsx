import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { works } from "@/lib/data"

export const metadata: Metadata = {
  title: "作品展览 - 羌绣传承",
  description: "欣赏精美的羌族传统刺绣作品，感受牡丹、凤凰、羊角纹等经典图案的艺术魅力。",
}

const categories = ["全部", "花卉纹样", "传统纹样", "经典图案", "服饰绣品", "婚嫁绣品", "装饰纹样"]

function GalleryContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl font-serif">
          {"作品展览"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
          {"每一件羌绣作品都是匠人心血的结晶，承载着羌族人民对美好生活的向往与对自然万物的敬畏。"}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat, index) => (
          <span
            key={cat}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <Link
            key={work.id}
            href={`/gallery/${work.id}`}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <span className="rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
                  {work.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">{work.title}</h3>
                <span className="text-xs text-muted-foreground">{work.year}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {work.description}
              </p>
              <div className="flex items-center gap-2 border-t border-border pt-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {work.artist.charAt(0)}
                </div>
                <span className="text-sm font-medium text-card-foreground">{work.artist}</span>
                <span className="text-xs text-muted-foreground">{"/ 非遗传承人"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <GalleryContent />
      </main>
      <SiteFooter />
    </div>
  )
}
