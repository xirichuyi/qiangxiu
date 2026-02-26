import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingBag, Star } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products } from "@/lib/data"

export const metadata: Metadata = {
  title: "羌绣商城 - 羌绣传承",
  description: "选购由非遗传承人手工制作的羌绣产品，手提包、靠垫、挂画、丝巾等，将千年技艺融入现代生活。",
}

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    "热销": "bg-primary text-primary-foreground",
    "新品": "bg-accent text-accent-foreground",
    "收藏": "bg-foreground text-background",
    "礼品": "bg-chart-5 text-primary-foreground",
    "家居": "bg-chart-4 text-foreground",
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[tag] || "bg-muted text-muted-foreground"}`}>
      {tag}
    </span>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.src}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <TagBadge tag={product.tag} />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-card-foreground">{product.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-chart-4 text-chart-4"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {"¥"}{product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {"¥"}{product.originalPrice}
            </span>
          </div>
          <span
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{"查看详情"}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function ShopContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl font-serif">
          {"羌绣商城"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
          {"每一件产品均由非遗传承人手工制作，从选料到成品，倾注匠心。让千年技艺走进您的日常生活。"}
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-chart-5" />
          {"手工制作"}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {"非遗认证"}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {"全国包邮"}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-chart-4" />
          {"七天无理由"}
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ShopContent />
      </main>
      <SiteFooter />
    </div>
  )
}
